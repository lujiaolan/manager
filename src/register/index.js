/**
 * Created by Udea-Manager on 2017/10/19.
 */
import libs from './lib';
import Vue from 'vue';
Vue.use({
    install(Vue,options){
        _.each(libs,(item,key)=>{
            Vue.prototype['$$'+key] = item;
        })
    }
})
