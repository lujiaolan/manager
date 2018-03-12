/**
 * Created by Udea-Manager on 2018/2/2.
 */
import {
  store
} from 'utils/';
import * as types from './mutations_types';
export default {
  [types.UPDATE_TOKEN](state,token){
    console.log('token')
    console.log(token)
    state.token = token || '';
    store.set('token',state.token);
  },
  [types.REMOVE_TOKEN](state){
    store.remove('token');
    state.token = '';
  }
}
