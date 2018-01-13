/**
 * Created by Udea-Manager on 2017/9/25.
 */
import * as types from './mutations_types';
import {
    store
} from 'utils/'
export default {
   [types.UPDATE_DOMAIN]:(state,domain)=>{
        console.log("state")
        console.log(state)
        // console.log("domain")
        // console.log(domain)
       state.domain = domain||{};
        store.set('domain',state.domain)

    },
    [types.REMOVE_DOMAIN]:(state)=>{
        store.remove= ('domain');
        state.domain = {};
        // localStorage.removeItem('vuex_domain')
    }
}
