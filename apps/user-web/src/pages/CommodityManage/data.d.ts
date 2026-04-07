export type TableListItem = {
  id: string;
  title: string;
  type: string;
  content?: string;
  file?: string;
  basicPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListParams = {
  title?: string;
  type?: string;
  status?: string;
  pageSize?: number;
  currentPage?: number;
};
