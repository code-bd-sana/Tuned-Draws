import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  adminTicketAssignmentService,
  AssignTicketsPayload,
} from '../services/admin-ticket-assignment.service';

export * from '../services/admin-ticket-assignment.service';

export const useAdminAssignmentCompetitions = (params?: { q?: string; hostId?: string }) => {
  return useQuery({
    queryKey: ['adminTicketAssignment', 'competitions', params],
    queryFn: () => adminTicketAssignmentService.getCompetitions(params),
    staleTime: 30 * 1000,
  });
};

export const useAdminAssignmentCompetitionDetails = (id: string | null) => {
  return useQuery({
    queryKey: ['adminTicketAssignment', 'competition', id],
    queryFn: () => adminTicketAssignmentService.getCompetitionById(id!),
    enabled: Boolean(id),
    staleTime: 15 * 1000,
  });
};

export const useAdminUserSearch = (query: string) => {
  return useQuery({
    queryKey: ['adminTicketAssignment', 'users', query],
    queryFn: () => adminTicketAssignmentService.searchUsers(query),
    enabled: query.trim().length >= 1,
    staleTime: 10 * 1000,
  });
};

export const useAssignTicketsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignTicketsPayload) =>
      adminTicketAssignmentService.assignTickets(payload),
    onSuccess: (data, variables) => {
      // Invalidate relevant caches
      queryClient.invalidateQueries({
        queryKey: ['adminTicketAssignment', 'competitions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminTicketAssignment', 'competition', variables.raffleId],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminTicketAssignment', 'history'],
      });
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrdersStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminHostStats'] });
    },
  });
};

export const useAdminAssignmentHistory = (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['adminTicketAssignment', 'history', params],
    queryFn: () => adminTicketAssignmentService.getHistory(params),
  });
};
