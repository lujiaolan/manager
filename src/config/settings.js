/**
 * Created by Udea-Manager on 2017/8/16.
 */

var env = process.env;

var gbs = {
    host: '/crm', //接口根地址。
    // host: 'http://47.91.252.137:80/crm', //接口根地址。AGX
    // host: 'http://120.77.55.98:8080/crm', //接口根地址。udea
    // host: 'http://47.52.90.89:80/crm', //接口根地址。DW
    // host: 'http://47.75.1.189:80/crm', //接口根地址。NUN
    // host:'http://47.52.206.28:80/crm', //接口根地址。sns
    // host: 'http://47.91.252.137:80/crm', //接口根地址。AGX
    // host: 'http://hkdc1.crm79.com/crm', //接口根地址。后台集群地址
    // host: 'http://hkdc2.crm79.com/crm', //接口根地址。后台集群地址
    // host: 'http://hkdc3.crm79.com/crm', //接口根地址。后台集群地址
    // host: 'http://backupserver1.crm79.com:8080/crm', //接口根地址。后台集群地址
    db_prefix: 'my_config_', //本地存储的key
    //状态码字段
    api_status_key_field: 'status',
    //状态码value
    api_status_value_field: 200,
    api_value: 0,
    api_data_field: 'data',

    api_custom: {
        404: function (res) {
            this.$store.dispatch('remove_userinfo').then(() => {
                this.$alert(res.status + ',' + res.message + '！', '登录错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push('/login');
                    }
                });
            });
        }
    }
};

var cbs = {
    /**
     * ajax请求成功，返回的状态码不是200时调用
     * @param  {object} err 返回的对象，包含错误码和错误信息
     */
    statusError(err) {
        console.log('err');
        if (err.status !== 404) {
            this.$message({
                showClose: true,
                message: '返回错误：' + err.message,
                type: 'error'
            });
        } else {
            this.$store.dispatch('remove_userinfo').then(() => {
                this.$alert(err.status + ',' + err.message + '！', '登录错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push('/login');
                    }
                });
            });
        }
    },

    /**
     * ajax请求网络出错时调用
     */
    requestError(err) {
        this.$message({
            showClose: true,
            message: '请求错误：' + (err.retCode ? err.retCode : '') + ',' + (err.message ? err.message : ''),
            type: 'error'
        });
    }
};

export  default {
    gbs,
    cbs
};
