import { request } from 'umi';
import { AdvancedProfileData } from './data';

const host = API_URL + '/api/v1/guild/account';


export async function queryAdvancedProfile(): Promise<{ data: AdvancedProfileData }> {
  const state = await request(host + '/state');
  const log = await request(host + '/log');
  console.log(state, log);
  return { data: { state: state.data, log: log.data } };
}
