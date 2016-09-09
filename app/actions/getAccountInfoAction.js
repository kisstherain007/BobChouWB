/**
 * Created by zhoubo on 16/9/7.
 */
import * as urls from '../constants/Urls';
import { request } from '../utils/RequestUtils';
import {Global} from '../constants/Global';
import {toastShort} from '../utils/ToastUtils';
import Storage from '../utils/Storage';

function getFetchUrl(urlAction){

    console.log(">>>>>>" + Global.UserInfo.KEY_ACCESS_TOKEN);

    return urlAction + "?access_token=" + Global.UserInfo.KEY_ACCESS_TOKEN +"&uid=" + Global.UserInfo.KEY_UID;
}

function getFetchUrl2(urlAction){

    return urlAction + "?access_token=" + Global.UserInfo.KEY_ACCESS_TOKEN;
}

export function getAccountInfo(){

    return dispatch =>{

        return request(getFetchUrl(urls.READ_USER), 'get')
            .then((responseText)=> {
                dispatch(fetchAccountInfo(responseText))
            })
            .catch(()=>{
                toastShort(error);
            });
    }
}

function fetchAccountInfo(accountInfo){
    return {
        type: 'getUserInfo',
        accountInfo
    };
}

// https://api.weibo.com/2/friendships/groups.json?source=2362431378&access_token=2.00nEM7ECu_WsZCabaa72687f8m6TfD、

export function getFriends(){

    return dispatch =>{
        return request(getFetchUrl2(urls.public_timeline), 'get')
            .then((responseText)=> {
                console.log(responseText);
                dispatch(fetchFriendsInfo(responseText))
            })
            .catch((error)=>{
                dispatch(fetchFriendsInfo(''))
            })
    }
}

function fetchFriendsInfo(friendsInfo){
    return{
        type: 'getFriendsInfo',
        friendsInfo
    };
}