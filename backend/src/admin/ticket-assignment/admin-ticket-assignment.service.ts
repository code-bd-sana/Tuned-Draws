import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { RafflesService } from '../../raffles/raffles.service';
import { AssignTicketsDto } from './dto/assign-tickets.dto';
import {
  CompetitionsQueryDto,
  HistoryQueryDto,
} from './dto/ticket-assignment-query.dto';

@Injectable()
export class AdminTicketAssignmentService {
  private readonly logger = new Logger(AdminTicketAssignmentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly rafflesService: RafflesService,
  ) {}

  /**
   * 1. GET /competitions
   * Returns active/eligible competitions with stats, host details, and instant win counts.
   */
  async getCompetitions(query: CompetitionsQueryDto) {
    const where: any = {
      status: { in: ['ACTIVE', 'PENDING_APPROVAL'] },
    };

    if (query.q && query.q.trim()) {
      const searchTerm = query.q.trim();
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (query.hostId) {
      where.hostId = query.hostId;
    }

    const raffles = await this.prisma.raffle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        host: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        instantWins: {
          select: {
            id: true,
            ticketNumber: true,
            prizeName: true,
            rrpValue: true,
            isClaimed: true,
          },
        },
        _count: {
          select: { tickets: true },
        },
      },
    });

    return raffles.map((raffle) => {
      const ticketsSold = raffle._count?.tickets ?? raffle.ticketsSold ?? 0;
      const remainingTickets = Math.max(0, raffle.totalTickets - ticketsSold);
      const totalInstantWins = raffle.instantWins?.length || 0;
      const claimedInstantWins =
        raffle.instantWins?.filter((iw) => iw.isClaimed).length || 0;
      const unclaimedInstantWins = totalInstantWins - claimedInstantWins;

      const hostName = raffle.host?.user
        ? `${raffle.host.user.firstName || ''} ${raffle.host.user.lastName || ''}`.trim() ||
          raffle.host.businessName ||
          raffle.host.user.email
        : raffle.host?.businessName || 'Platform Host';

      return {
        id: raffle.id,
        title: raffle.title,
        slug: raffle.slug,
        mainImage: raffle.mainImage,
        pricePerTicket: Number(raffle.pricePerTicket),
        totalTickets: raffle.totalTickets,
        ticketsSold,
        remainingTickets,
        status: raffle.status,
        isAutoDraw: raffle.isAutoDraw,
        autoDrawSoldOut: raffle.autoDrawSoldOut,
        startDate: raffle.startDate,
        endDate: raffle.endDate,
        host: {
          id: raffle.host?.id,
          businessName: raffle.host?.businessName,
          slug: raffle.host?.slug,
          name: hostName,
          email: raffle.host?.user?.email,
          avatarUrl: raffle.host?.user?.avatarUrl,
        },
        instantWins: {
          total: totalInstantWins,
          claimed: claimedInstantWins,
          unclaimed: unclaimedInstantWins,
        },
      };
    });
  }

  /**
   * 2. GET /competitions/:id
   * Returns full competition data including:
   * - Total/Sold/Remaining stats and pricing.
   * - All instant wins (ticketNumber, prizeName, rrpValue, isClaimed).
   * - List of all sold tickets with buyer name, email, purchase date, and payment gateway.
   */
  async getCompetitionById(id: string) {
    const raffle = await this.prisma.raffle.findUnique({
      where: { id },
      include: {
        host: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
                phone: true,
              },
            },
          },
        },
        instantWins: {
          orderBy: { ticketNumber: 'asc' },
          select: {
            id: true,
            ticketNumber: true,
            prizeName: true,
            rrpValue: true,
            image: true,
            isClaimed: true,
          },
        },
        tickets: {
          orderBy: { ticketNumber: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
            transaction: {
              select: {
                id: true,
                paymentGateway: true,
                gatewayTransactionId: true,
                amount: true,
              },
            },
          },
        },
      },
    });

    if (!raffle) {
      throw new NotFoundException(`Competition with ID "${id}" was not found`);
    }

    const actualSold = raffle.tickets.length;
    const remainingTickets = Math.max(0, raffle.totalTickets - actualSold);

    const soldTickets = raffle.tickets.map((t) => {
      const buyerName = t.user
        ? `${t.user.firstName || ''} ${t.user.lastName || ''}`.trim() || t.user.email
        : 'Unknown Buyer';

      return {
        id: t.id,
        ticketNumber: t.ticketNumber,
        purchaseDate: t.createdAt,
        buyerId: t.userId,
        buyerName,
        buyerEmail: t.user?.email || 'N/A',
        buyerAvatar: t.user?.avatarUrl || null,
        paymentGateway: t.transaction?.paymentGateway || 'CARD',
        transactionId: t.transactionId,
        gatewayTransactionId: t.transaction?.gatewayTransactionId || t.transactionId,
      };
    });

    const soldNumbers = soldTickets.map((t) => t.ticketNumber);

    const instantWins = raffle.instantWins.map((iw) => ({
      id: iw.id,
      ticketNumber: iw.ticketNumber,
      prizeName: iw.prizeName,
      rrpValue: iw.rrpValue ? Number(iw.rrpValue) : null,
      image: iw.image,
      isClaimed: iw.isClaimed,
    }));

    const hostName = raffle.host?.user
      ? `${raffle.host.user.firstName || ''} ${raffle.host.user.lastName || ''}`.trim() ||
        raffle.host.businessName ||
        raffle.host.user.email
      : raffle.host?.businessName || 'Platform Host';

    return {
      id: raffle.id,
      title: raffle.title,
      slug: raffle.slug,
      mainImage: raffle.mainImage,
      category: raffle.category,
      description: raffle.description,
      status: raffle.status,
      startDate: raffle.startDate,
      endDate: raffle.endDate,
      isAutoDraw: raffle.isAutoDraw,
      autoDrawDate: raffle.autoDrawDate,
      autoDrawSoldOut: raffle.autoDrawSoldOut,
      stats: {
        pricePerTicket: Number(raffle.pricePerTicket),
        totalTickets: raffle.totalTickets,
        ticketsSold: actualSold,
        remainingTickets,
        mainPrizeValue: raffle.mainPrizeValue ? Number(raffle.mainPrizeValue) : null,
      },
      host: {
        id: raffle.host?.id,
        businessName: raffle.host?.businessName,
        slug: raffle.host?.slug,
        walletBalance: raffle.host?.walletBalance
          ? Number(raffle.host.walletBalance)
          : 0,
        name: hostName,
        email: raffle.host?.user?.email,
        avatarUrl: raffle.host?.user?.avatarUrl,
      },
      instantWins,
      soldTickets,
      soldNumbers,
    };
  }

  /**
   * 3. GET /users/search?q=<term>
   * Autocomplete live search matching email, firstName, lastName, or id.
   * Returns active users (excluding blocked accounts).
   */
  async searchUsers(q?: string) {
    const where: any = {
      isBlocked: false,
    };

    if (q && q.trim()) {
      const term = q.trim();
      where.OR = [
        { email: { contains: term, mode: 'insensitive' } },
        { firstName: { contains: term, mode: 'insensitive' } },
        { lastName: { contains: term, mode: 'insensitive' } },
        { id: { contains: term, mode: 'insensitive' } },
      ];
    }

    const users = await this.prisma.user.findMany({
      where,
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatarUrl: true,
        phone: true,
        location: true,
      },
    });

    return users.map((u) => {
      const name =
        `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email;
      return {
        id: u.id,
        name,
        email: u.email,
        role: u.role,
        avatar: u.avatarUrl,
        phone: u.phone,
        location: u.location,
      };
    });
  }

  /**
   * 4. POST /assign
   * Validates within an atomic database transaction ($transaction):
   * - Raffle exists and is not ended/cancelled.
   * - User exists and is not blocked.
   * - Specific ticket numbers or random quantity picks.
   * - Financial crediting: host wallet += totalAmount.
   * - Ticket records created.
   * - Instant win prizes checked & claimed with Winner created.
   * - AuditLog created.
   * - Notification dispatched.
   * - Auto-draw triggered if sold out and autoDrawSoldOut enabled.
   */
  async assignTickets(adminId: string, dto: AssignTicketsDto) {
    if (!dto.raffleId) {
      throw new BadRequestException('raffleId is required');
    }
    if (!dto.userId) {
      throw new BadRequestException('userId is required');
    }

    const txResult = await this.prisma.$transaction(
      async (tx) => {
        // 1. Validate Raffle
        const raffle = await tx.raffle.findUnique({
          where: { id: dto.raffleId },
          include: {
            instantWins: true,
            host: true,
          },
        });

        if (!raffle) {
          throw new NotFoundException('Competition not found');
        }

        if (raffle.status === 'ENDED' || raffle.status === 'CANCELLED') {
          throw new BadRequestException(
            `Cannot assign tickets: competition is currently ${raffle.status}.`,
          );
        }

        // 2. Validate User
        const user = await tx.user.findUnique({
          where: { id: dto.userId },
        });

        if (!user) {
          throw new NotFoundException('Recipient user not found');
        }

        if (user.isBlocked) {
          throw new BadRequestException(
            'Cannot assign tickets to a blocked user account.',
          );
        }

        // 3. Query existing sold tickets for conflict detection
        const existingTickets = await tx.ticket.findMany({
          where: { raffleId: raffle.id },
          select: { ticketNumber: true },
        });

        const soldNumbersSet = new Set(existingTickets.map((t) => t.ticketNumber));
        const remainingCount = Math.max(0, raffle.totalTickets - existingTickets.length);

        let finalNumbers: number[] = [];

        if (dto.ticketNumbers && dto.ticketNumbers.length > 0) {
          // Specific Numbers Mode
          const requestedNumbers = dto.ticketNumbers.map((n) => Number(n));
          const uniqueRequested = Array.from(new Set(requestedNumbers));

          if (uniqueRequested.length !== requestedNumbers.length) {
            throw new BadRequestException('Duplicate ticket numbers in request');
          }

          for (const num of uniqueRequested) {
            if (num < 1 || num > raffle.totalTickets) {
              throw new BadRequestException(
                `Ticket number #${num} is outside the valid range (1 - ${raffle.totalTickets}).`,
              );
            }
          }

          const alreadySold = uniqueRequested.filter((num) => soldNumbersSet.has(num));
          if (alreadySold.length > 0) {
            throw new BadRequestException(
              `The following ticket(s) are already sold: ${alreadySold.map((n) => `#${n}`).join(', ')}.`,
            );
          }

          finalNumbers = uniqueRequested;
        } else {
          // Random Quantity Mode
          const qty = Number(dto.quantity) || 1;
          if (qty <= 0) {
            throw new BadRequestException('Quantity must be greater than zero.');
          }

          if (qty > remainingCount) {
            throw new BadRequestException(
              `Requested ${qty} ticket(s), but only ${remainingCount} ticket(s) remain available.`,
            );
          }

          const availableNumbers: number[] = [];
          for (let i = 1; i <= raffle.totalTickets; i++) {
            if (!soldNumbersSet.has(i)) {
              availableNumbers.push(i);
            }
          }

          // Fisher-Yates shuffle
          for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [
              availableNumbers[j],
              availableNumbers[i],
            ];
          }

          finalNumbers = availableNumbers.slice(0, qty).sort((a, b) => a - b);
        }

        if (finalNumbers.length === 0) {
          throw new BadRequestException('No ticket numbers were allocated.');
        }

        // 4. Financial Calculations
        const pricePerTicket = Number(raffle.pricePerTicket);
        const totalAmount = finalNumbers.length * pricePerTicket;

        // 5. Unique Gateway Transaction ID
        const uniqueId = Math.random().toString(36).substring(2, 9).toUpperCase();
        const gatewayTransactionId = `ADMIN_ASSIGN_${Date.now()}_${uniqueId}`;

        // 6. Create Transaction
        const transaction = await tx.transaction.create({
          data: {
            userId: user.id,
            type: 'TICKET_PURCHASE',
            amount: totalAmount,
            status: 'COMPLETED',
            paymentGateway: 'ADMIN_MANUAL',
            gatewayTransactionId,
            relatedEntityId: raffle.id,
            adminNotes: dto.adminNotes?.trim() || null,
          },
        });

        // 7. Create Tickets
        await tx.ticket.createMany({
          data: finalNumbers.map((num) => ({
            raffleId: raffle.id,
            userId: user.id,
            transactionId: transaction.id,
            ticketNumber: num,
          })),
        });

        const createdTickets = await tx.ticket.findMany({
          where: {
            transactionId: transaction.id,
            raffleId: raffle.id,
          },
        });

        // 8. Instant Win Evaluation & Automation
        const unlockedInstantWins: Array<{
          winnerId: string;
          ticketNumber: number;
          prizeName: string;
          rrpValue: number | null;
          image: string | null;
        }> = [];

        for (const ticket of createdTickets) {
          const matchedInstantWin = raffle.instantWins.find(
            (iw) => iw.ticketNumber === ticket.ticketNumber && !iw.isClaimed,
          );

          if (matchedInstantWin) {
            // Claim instant win
            await tx.instantWin.update({
              where: { id: matchedInstantWin.id },
              data: { isClaimed: true },
            });

            // Create Winner record
            const winner = await tx.winner.create({
              data: {
                userId: user.id,
                raffleId: raffle.id,
                ticketId: ticket.id,
                winType: 'INSTANT_WIN',
                prizeName: matchedInstantWin.prizeName,
                deliveryStatus: 'PENDING',
                verificationStatus: 'VERIFIED',
                isClaimed: false,
              },
            });

            unlockedInstantWins.push({
              winnerId: winner.id,
              ticketNumber: ticket.ticketNumber,
              prizeName: matchedInstantWin.prizeName,
              rrpValue: matchedInstantWin.rrpValue
                ? Number(matchedInstantWin.rrpValue)
                : null,
              image: matchedInstantWin.image,
            });
          }
        }

        // 9. Recalculate and update ticketsSold
        const actualTotalSold = await tx.ticket.count({
          where: { raffleId: raffle.id },
        });

        const updatedRaffle = await tx.raffle.update({
          where: { id: raffle.id },
          data: {
            ticketsSold: actualTotalSold,
          },
        });

        // 10. Credit Host Wallet Balance
        if (raffle.hostId && totalAmount > 0) {
          await tx.hostProfile.update({
            where: { id: raffle.hostId },
            data: {
              walletBalance: {
                increment: totalAmount,
              },
            },
          });
        }

        // 11. Audit Logging
        await tx.auditLog.create({
          data: {
            adminId,
            action: 'ADMIN_MANUAL_TICKET_ASSIGNMENT',
            targetRaffle: raffle.id,
            targetUserId: user.id,
            ticketNumbers: finalNumbers,
            totalAmount,
            details: {
              adminNotes: dto.adminNotes?.trim() || null,
              competitionTitle: raffle.title,
              recipientName:
                `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                user.email,
              recipientEmail: user.email,
              ticketCount: finalNumbers.length,
              instantWinsCount: unlockedInstantWins.length,
              instantWins: unlockedInstantWins,
              gatewayTransactionId,
            },
          },
        });

        return {
          raffle,
          updatedRaffle,
          user,
          transaction,
          gatewayTransactionId,
          finalNumbers,
          totalAmount,
          unlockedInstantWins,
        };
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );

    const {
      raffle,
      updatedRaffle,
      user,
      transaction,
      gatewayTransactionId,
      finalNumbers,
      totalAmount,
      unlockedInstantWins,
    } = txResult;

    // Outside Transaction: Auto-Draw Execution Check
    let isAutoDrawTriggered = false;
    if (
      updatedRaffle.isAutoDraw &&
      updatedRaffle.autoDrawSoldOut &&
      updatedRaffle.ticketsSold >= updatedRaffle.totalTickets &&
      updatedRaffle.status === 'ACTIVE'
    ) {
      try {
        this.logger.log(
          `Auto-draw sold-out triggered for competition: ${updatedRaffle.id} (${updatedRaffle.title})`,
        );
        await this.rafflesService.drawWinner(updatedRaffle.id);
        isAutoDrawTriggered = true;
      } catch (err: any) {
        this.logger.error(
          `Failed auto draw on sold out for ${updatedRaffle.id}: ${err.message}`,
          err.stack,
        );
      }
    } else if (
      !updatedRaffle.isAutoDraw &&
      updatedRaffle.ticketsSold >= updatedRaffle.totalTickets &&
      updatedRaffle.status === 'ACTIVE'
    ) {
      try {
        await this.prisma.raffle.update({
          where: { id: updatedRaffle.id },
          data: { status: 'ENDED' },
        });
      } catch (err: any) {
        this.logger.error(
          `Failed to update manual raffle status on sold out for ${updatedRaffle.id}: ${err.message}`,
        );
      }
    }

    // In-app Notifications Dispatch (Non-blocking fail-safe)
    try {
      // 1. Recipient Ticket Notification
      await this.notificationsService.notifyUser(
        user.id,
        'PURCHASE',
        '🎟️ Tickets Manually Assigned by Admin',
        `You have been issued ${finalNumbers.length} ticket(s) for "${raffle.title}" by an administrator! Ticket Numbers: ${finalNumbers.map((n) => `#${n}`).join(', ')}.`,
        '/dashboard/user/tickets',
        {
          raffleId: raffle.id,
          ticketNumbers: finalNumbers,
          transactionId: transaction.id,
          adminNotes: dto.adminNotes,
        },
      );

      // 2. Instant Win Prize Notifications
      for (const win of unlockedInstantWins) {
        await this.notificationsService.notifyUser(
          user.id,
          'INSTANT_WIN',
          '⚡ Instant Win Prize Unlocked!',
          `Congratulations! Your manually assigned ticket #${win.ticketNumber} just won an Instant Win prize: ${win.prizeName} in "${raffle.title}"!`,
          '/dashboard/user/winners',
          {
            raffleId: raffle.id,
            ticketNumber: win.ticketNumber,
            prizeName: win.prizeName,
          },
        );
      }
    } catch (notifErr: any) {
      this.logger.error(
        `Failed sending notification after ticket assignment: ${notifErr.message}`,
      );
    }

    const recipientName =
      `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;

    return {
      success: true,
      transactionId: transaction.id,
      gatewayTransactionId,
      competition: {
        id: raffle.id,
        title: raffle.title,
        slug: raffle.slug,
        pricePerTicket: Number(raffle.pricePerTicket),
        ticketsSold: updatedRaffle.ticketsSold,
        totalTickets: updatedRaffle.totalTickets,
      },
      recipient: {
        id: user.id,
        name: recipientName,
        email: user.email,
        avatar: user.avatarUrl,
      },
      ticketNumbers: finalNumbers,
      quantity: finalNumbers.length,
      totalAmount,
      hostCreditedAmount: totalAmount,
      adminNotes: dto.adminNotes || null,
      instantWins: unlockedInstantWins,
      isAutoDrawTriggered,
      createdAt: transaction.createdAt,
    };
  }

  /**
   * 5. GET /history
   * Paginated history of all ADMIN_MANUAL transactions showing:
   * Date, Transaction ID, Recipient, Competition, Assigned Numbers, Total Value, and Admin Notes.
   */
  async getHistory(query: HistoryQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
    const skip = (page - 1) * limit;

    const where: any = {
      paymentGateway: 'ADMIN_MANUAL',
    };

    if (query.search && query.search.trim()) {
      const s = query.search.trim();
      where.OR = [
        { gatewayTransactionId: { contains: s, mode: 'insensitive' } },
        { adminNotes: { contains: s, mode: 'insensitive' } },
        { user: { email: { contains: s, mode: 'insensitive' } } },
        { user: { firstName: { contains: s, mode: 'insensitive' } } },
        { user: { lastName: { contains: s, mode: 'insensitive' } } },
      ];
    }

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatarUrl: true,
              role: true,
            },
          },
          tickets: {
            orderBy: { ticketNumber: 'asc' },
            include: {
              raffle: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  mainImage: true,
                  pricePerTicket: true,
                },
              },
              winners: {
                select: {
                  id: true,
                  winType: true,
                  prizeName: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    const history = transactions.map((tx) => {
      const recipientName = tx.user
        ? `${tx.user.firstName || ''} ${tx.user.lastName || ''}`.trim() ||
          tx.user.email
        : 'Unknown User';

      const firstTicket = tx.tickets[0];
      const competition = firstTicket?.raffle
        ? {
            id: firstTicket.raffle.id,
            title: firstTicket.raffle.title,
            slug: firstTicket.raffle.slug,
            mainImage: firstTicket.raffle.mainImage,
          }
        : null;

      const assignedNumbers = tx.tickets.map((t) => t.ticketNumber).sort((a, b) => a - b);

      const instantWinsCount = tx.tickets.reduce((acc, t) => {
        return (
          acc +
          (t.winners?.filter((w) => w.winType === 'INSTANT_WIN').length || 0)
        );
      }, 0);

      return {
        id: tx.id,
        orderId: tx.gatewayTransactionId?.substring(0, 12) || tx.id.substring(0, 8),
        transactionId: tx.id,
        gatewayTransactionId: tx.gatewayTransactionId || tx.id,
        date: tx.createdAt,
        totalValue: Number(tx.amount),
        adminNotes: tx.adminNotes || null,
        status: tx.status,
        quantity: assignedNumbers.length,
        assignedNumbers,
        instantWinsCount,
        recipient: {
          id: tx.user?.id || tx.userId,
          name: recipientName,
          email: tx.user?.email || 'N/A',
          avatarUrl: tx.user?.avatarUrl || null,
          role: tx.user?.role || 'CLIENT',
        },
        competition,
      };
    });

    return {
      history,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
