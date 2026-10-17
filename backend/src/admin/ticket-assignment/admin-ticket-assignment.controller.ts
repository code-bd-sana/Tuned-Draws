import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AdminTicketAssignmentService } from './admin-ticket-assignment.service';
import { AssignTicketsDto } from './dto/assign-tickets.dto';
import {
  CompetitionsQueryDto,
  HistoryQueryDto,
  UsersSearchQueryDto,
} from './dto/ticket-assignment-query.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import type { Request } from 'express';

@ApiTags('Admin - Manual Ticket Assignment')
@ApiBearerAuth()
@Controller('api/v1/admin/ticket-assignment')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminTicketAssignmentController {
  constructor(
    private readonly ticketAssignmentService: AdminTicketAssignmentService,
  ) {}

  @Get('competitions')
  @ApiOperation({
    summary: 'Get active competitions for ticket assignment (Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Active competitions retrieved successfully',
  })
  async getCompetitions(@Query() query: CompetitionsQueryDto) {
    return this.ticketAssignmentService.getCompetitions(query);
  }

  @Get('competitions/:id')
  @ApiOperation({
    summary: 'Get detailed competition data, instant wins, and sold tickets (Admin)',
  })
  @ApiParam({ name: 'id', description: 'Competition/Raffle UUID' })
  @ApiResponse({
    status: 200,
    description: 'Competition details retrieved successfully',
  })
  async getCompetitionById(@Param('id') id: string) {
    return this.ticketAssignmentService.getCompetitionById(id);
  }

  @Get('users/search')
  @ApiOperation({
    summary: 'Live autocomplete user search (Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Active users retrieved successfully',
  })
  async searchUsers(@Query() query: UsersSearchQueryDto) {
    return this.ticketAssignmentService.searchUsers(query.q);
  }

  @Post('assign')
  @ApiOperation({
    summary: 'Manually assign tickets to a user with full financial & instant win automation (Admin)',
  })
  @ApiResponse({
    status: 201,
    description: 'Tickets successfully assigned',
  })
  async assignTickets(
    @Req() req: Request,
    @Body() dto: AssignTicketsDto,
  ) {
    const adminUser = (req as any).user;
    const adminId = adminUser?.sub || adminUser?.id || 'admin';
    return this.ticketAssignmentService.assignTickets(adminId, dto);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get paginated history of all ADMIN_MANUAL ticket assignments (Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Manual assignment history retrieved successfully',
  })
  async getHistory(@Query() query: HistoryQueryDto) {
    return this.ticketAssignmentService.getHistory(query);
  }
}
