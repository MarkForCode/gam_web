export type TableListItem = {
  id: string;
  title: string;
  type: string;
  content?: string;
  file?: string;
  basicPrice: number;
  quantity: number;
  sellQuantity: number;
  status: string;
  createTime: string;
  modifyTime?: string;
  creator?: {
    id: string;
    username: string;
    nickname: string;
  };
  commodity_deal?: {
    id: string;
    status: string;
  }[];
  commodity_deal_apply?: {
    commodityId: string;
    buyerId: string;
    bid: number;
    quantity: number;
    status: string;
    createTime: string;
    buyer: {
      id: string;
      username: string;
      nickname: string;
    };
  }[];
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