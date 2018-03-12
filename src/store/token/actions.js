/**
 * Created by Udea-Manager on 2018/2/2.
 */
import * as types from './mutations_types.js';
export default {
  update_token:({
    commit
  },token)=>{
    return new Promise((resolve,reject)=>{
      console.log('resolve')
      console.log(token)
      commit(types.UPDATE_TOKEN,token);
      resolve()
    });
  },
  remove_token:({
    commit
               })=>{
    return new Promise((resolve,reject)=>{
      commit(types.REMOVE_TOKEN);
      resolve()
    })
}

}
