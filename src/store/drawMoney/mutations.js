/**
 * Created by Udea-Manager on 2018/1/22.
 */
import {
    store
} from 'utils/';
import * as types from './mutations_types';
export default {
    [types.UPDATE_DRAWMONEY](state, user_db) {
        console.log(state);
        console.log('mutations 接收user_db start');
        console.log(user_db);
        console.log('mutations 接收user_db end');
        state.drawMoney.inMoneyFlag = user_db.inMoneyFlag;
        store.set('inMoneyFlag', state.drawMoney.inMoneyFlag);
    },

    [types.REMOVE_DRAWMONEY](state){
        store.remove('inMoneyFlag');
        state.drawMoney.inMoneyFlag = false;
    },
    [types.UPDATE_WIDTHDRAW](state, user_db) {
        console.log(state);
        console.log('mutations 接收user_db start');
        console.log(user_db);
        console.log('mutations 接收user_db end');
        state.widthDraw.outMoneyFlag = user_db.outMoneyFlag;
        store.set('outMoneyFlag', state.widthDraw.outMoneyFlag);
    },

    [types.REMOVE_WIDTHDRAW](state){
        store.remove('outMoneyFlag');
        state.widthDraw.outMoneyFlag = false;
    }
}

