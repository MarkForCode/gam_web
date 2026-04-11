export type DealItem = {
  id: string;
  title: string;
  basicPrice: number;
  quantity: number;
  sellQuantity: number;
  commodity_deal_apply: {
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
  commodity_deal: {
    id: string;
    bid: number;
    quantity: number;
    status: string;
    buyerConfirmTime?: string;
    sellerConfirmTime?: string;
    buyer: {
      id: string;
      username: string;
      nickname: string;
    };
  }[];
};

export type DealParams = {
  status?: string;
  pageSize?: number;
  currentPage?: number;
};