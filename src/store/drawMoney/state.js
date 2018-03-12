/**
 * Created by Udea-Manager on 2018/1/22.
 */
import {
    store
} from 'utils/'
export default {
    drawMoney: {
        inMoneyFlag: store.get('inMoneyFlag') ?  true : false,
    },
    widthDraw:{
        outMoneyFlag: store.get('outMoneyFlag') ?  true : false
    }
}
