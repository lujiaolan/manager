/**
 * Created by Udea-Manager on 2017/8/16.
 */
import {
    store
} from 'utils/'
export default {
    userinfo: store.get('userinfo') || {},
    remumber: {
        remumber_flag: store.get('remumber_flag') ?  false: true,
        remumber_login_info: store.get('remumber_login_info') || {
            username: '',
            password:'',
            token: ''
        }
    }
}
