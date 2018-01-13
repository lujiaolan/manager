/**
 * Created by Udea-Manager on 2017/8/16.
 */
export default {
    getUserInfo(state){
        return state.userinfo;
    },
    getToken(state){
        return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
    },
    getRemumber(state){
        return state.remumber;
    }
}
