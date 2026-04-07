export type TableListItem = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
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
  fileName?: string;
  pageSize?: number;
  currentPage?: number;
};
