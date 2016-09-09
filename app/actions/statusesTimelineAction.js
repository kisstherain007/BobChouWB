/**
 * Created by zhoubo on 16/9/8.
 */
import * as urls from '../constants/Urls';
import { request } from '../utils/RequestUtils';
import {Global} from '../constants/Global';
import {toastShort} from '../utils/ToastUtils';
import Storage from '../utils/Storage';

function getFetchUrl(urlAction){

    return urlAction + "?access_token=" + Global.UserInfo.KEY_ACCESS_TOKEN;
}

export function getFriendsTimeline(){

    return dispatch =>{

        return request(getFetchUrl(urls.public_timeline), 'get')
            .then((responseText)=> {
                dispatch(fetchFriendsTimeline(responseText))
            })
            .catch((error)=>{
                toastShort(error);
            })
    }
}

function fetchFriendsTimeline(friendsTimeline){
    return {
        type: 'getFriendsTimeline',
        friendsTimeline
    }
}