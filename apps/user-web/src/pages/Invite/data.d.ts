export type TableListItem = {
  id: string;
  inviteeEmail: string;
  message?: string;
  inviteCode: string;
  status: string;
  expiresAt: string;
  createdAt: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListParams = {
  inviteeEmail?: string;
  status?: string;
  pageSize?: number;
  currentPage?: number;
};
