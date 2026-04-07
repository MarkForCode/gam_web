export type TableListItem = {
  id: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
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
  status?: string;
  type?: string;
  pageSize?: number;
  currentPage?: number;
};
