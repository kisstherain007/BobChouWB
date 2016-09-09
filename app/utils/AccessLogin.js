/**
 * Created by zhoubo on 16/9/7.
 */

var { NativeModules } = require('react-native');
import {toastShort} from '../utils/ToastUtils';

// export var AccountInfo = {
//     'KEY_ACCESS_TOKEN' : '',
//     'KEY_UID' : ''
// };

export function GoWBAuthAccess(Callback){

    NativeModules.WBIntentMoudle.startActivityFromJSGetResult("com.bobchouwb.WBAuthActivity", 200).then(

        result => {
             Callback(result)
        }
    );
}

export function LoginOut(){
    NativeModules.WBIntentMoudle.loginOut();
}