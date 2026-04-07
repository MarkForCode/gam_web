export type TableListItem = {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  username?: string;
  nickname?: string;
  status?: string;
  pageSize?: number;
  currentPage?: number;
};
