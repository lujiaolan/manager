/**
 * Created by Udea-Manager on 2018/1/22.
 */
import * as types from './mutations_types';
export default {
    update_drawMoney: ({
                          commit
                      }, {
        inMoneyFlag,

                      }) => {
        return new Promise((resolve, reject) => {
            commit(types.UPDATE_DRAWMONEY, {
                inMoneyFlag,
            });
            resolve()
        });
    },
    remove_drawMoney: ({
                          commit
                      }) => {
        return new Promise((resolve, reject) => {
            commit(types.REMOVE_DRAWMONEY);
            resolve();
        })
    },
    update_withDraw: ({
                           commit
                       }, {
        outMoneyFlag,

                       }) => {
        return new Promise((resolve, reject) => {
            commit(types.UPDATE_WIDTHDRAW, {
                outMoneyFlag,
            });
            resolve()
        });
    },
    remove_withDraw: ({
                           commit
                       }) => {
        return new Promise((resolve, reject) => {
            commit(types.REMOVE_DRAWMONEY);
            resolve();
        })
    }
}

