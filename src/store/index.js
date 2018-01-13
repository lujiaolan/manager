
/**
 * Created by Udea-Manager on 2017/8/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user/';
import global from './global/';
import domain from './domain/';

const store = new Vuex.Store({
    modules:{
        user,
        global,
        domain
    },
    state: {
        curMenu:{
            leftCurMenu: '',
            headerCurMenu: '',
        },
        myInfoStatus: {
            myInfoStep: 0,
            successStatus: true,
            successFlag: false
        },
    },
    mutations: {
        SET_CUR_MENU(state,paths){
            state.curMenu.leftCurMenu = paths.leftMenu;
            state.curMenu.headerCurMenu = paths.headerMenu;
        },
        UPDATE_INFO_STATUS(state,info_status){
            state.myInfoStatus.myInfoStep = info_status.step;
            state.myInfoStatus.successStatus = info_status.success;
            state.myInfoStatus.successFlag = info_status.sucflag;
        }
    },
    actions: {
        set_cur_menu({commit},paths){
            commit('SET_CUR_MENU',paths)
        },
        update_info_status({commit},info_status){
            commit('UPDATE_INFO_STATUS',info_status)
        }
    }
});
export default store;

