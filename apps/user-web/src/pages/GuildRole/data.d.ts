export type TableListItem = {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListParams = {
  name?: string;
  pageSize?: number;
  currentPage?: number;
};
