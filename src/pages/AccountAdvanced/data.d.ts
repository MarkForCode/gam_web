export type AdvancedOperation1 = {
  name: string;
  avatar: string;
  userid: string;
  email: string;
  signature: string;
  group: string;
  phone: string;
};

export type AdvancedOperation2 = {
  key: string;
  name: string;
  updatedAt: string;
  memo: string;
};


export interface AdvancedProfileData {
  state?: AdvancedOperation1;
  log?: AdvancedOperation2[];
}
