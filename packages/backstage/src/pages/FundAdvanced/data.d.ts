export type AdvancedOperation1 = {
  key: string;
  type: string;
  name: string;
  amount: number;
  status: string;
  role: string;
  updatedAt: string;
  memo: string;
};

export type AdvancedOperation2 = {
  key: string;
  type: string;
  name: string;
  target: string;
  status: string;
  updatedAt: string;
  memo: string;
};


export interface AdvancedProfileData {
  state?: AdvancedOperation1;
  log?: AdvancedOperation2[];
}
