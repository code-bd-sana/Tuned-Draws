import { api } from './api';

export interface AssignedCompetition {
  id: string;
  title: string;
  slug: string | null;
  mainImage: string | null;
  pricePerTicket: number;
  totalTickets: number;
  ticketsSold: number;
  remainingTickets: number;
  status: string;
  isAutoDraw: boolean;
  autoDrawSoldOut: boolean;
  startDate: string;
  endDate: string;
  host: {
    id: string;
    businessName: string;
    slug: string | null;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  instantWins: {
    total: number;
    claimed: number;
    unclaimed: number;
  };
}

export interface CompetitionDetails {
  id: string;
  title: string;
  slug: string | null;
  mainImage: string | null;
  category: string | null;
  description: string | null;
  status: string;
  startDate: string;
  endDate: string;
  isAutoDraw: boolean;
  autoDrawDate: boolean;
  autoDrawSoldOut: boolean;
  stats: {
    pricePerTicket: number;
    totalTickets: number;
    ticketsSold: number;
    remainingTickets: number;
    mainPrizeValue: number | null;
  };
  host: {
    id: string;
    businessName: string;
    slug: string | null;
    walletBalance: number;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  instantWins: Array<{
    id: string;
    ticketNumber: number;
    prizeName: string;
    rrpValue: number | null;
    image: string | null;
    isClaimed: boolean;
  }>;
  soldTickets: Array<{
    id: string;
    ticketNumber: number;
    purchaseDate: string;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    buyerAvatar: string | null;
    paymentGateway: string;
    transactionId: string;
    gatewayTransactionId: string;
  }>;
  soldNumbers: number[];
}

export interface SearchedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
  location: string | null;
}

export interface AssignTicketsPayload {
  raffleId: string;
  userId: string;
  ticketNumbers?: number[];
  quantity?: number;
  adminNotes?: string;
}

export interface AssignmentResult {
  success: boolean;
  transactionId: string;
  gatewayTransactionId: string;
  competition: {
    id: string;
    title: string;
    slug: string | null;
    pricePerTicket: number;
    ticketsSold: number;
    totalTickets: number;
  };
  recipient: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
  ticketNumbers: number[];
  quantity: number;
  totalAmount: number;
  hostCreditedAmount: number;
  adminNotes: string | null;
  instantWins: Array<{
    winnerId: string;
    ticketNumber: number;
    prizeName: string;
    rrpValue: number | null;
    image: string | null;
  }>;
  isAutoDrawTriggered: boolean;
  createdAt?: string;
}

export interface HistoryItem {
  id: string;
  orderId: string;
  transactionId: string;
  gatewayTransactionId: string;
  date: string;
  totalValue: number;
  adminNotes: string | null;
  status: string;
  quantity: number;
  assignedNumbers: number[];
  instantWinsCount: number;
  recipient: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: string;
  };
  competition: {
    id: string;
    title: string;
    slug: string | null;
    mainImage: string | null;
  } | null;
}

export interface HistoryResponse {
  history: HistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const adminTicketAssignmentService = {
  async getCompetitions(params?: { q?: string; hostId?: string }): Promise<AssignedCompetition[]> {
    const response = await api.get('/admin/ticket-assignment/competitions', { params });
    return response.data;
  },

  async getCompetitionById(id: string): Promise<CompetitionDetails> {
    const response = await api.get(`/admin/ticket-assignment/competitions/${id}`);
    return response.data;
  },

  async searchUsers(q?: string): Promise<SearchedUser[]> {
    const response = await api.get('/admin/ticket-assignment/users/search', {
      params: q ? { q } : undefined,
    });
    return response.data;
  },

  async assignTickets(payload: AssignTicketsPayload): Promise<AssignmentResult> {
    const response = await api.post('/admin/ticket-assignment/assign', payload);
    return response.data;
  },

  async getHistory(params?: { page?: number; limit?: number; search?: string }): Promise<HistoryResponse> {
    const response = await api.get('/admin/ticket-assignment/history', { params });
    return response.data;
  },
};
