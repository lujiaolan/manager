/**
 * Created by Udea-Manager on 2017/9/25.
 */
import *  as types from './mutations_types';
export default {
    update_domain:({commit},domain)=>{
        console.log('commit')
        // console.log(domain)
        commit(types.UPDATE_DOMAIN,{domain});
    },
    remove_domain:({commit})=>{
        commit(types.REMOVE_DOMAIN)
    }
}
