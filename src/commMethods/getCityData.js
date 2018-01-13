/**
 * Created by Udea-Manager on 2017/11/2.
 */
import $ from 'jquery'
export function getCityData(query) {
    return $.get({
        // url: '../../static/city.json',
        url: 'http://manager.crm79.com/static/city.json',
        params: query
    });
}
