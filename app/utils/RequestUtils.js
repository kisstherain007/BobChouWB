import * as params from '../constants/WBConfig';
import * as urls from '../constants/Urls';
import Storage from '../utils/Storage';
import {toastShort} from '../utils/ToastUtils';

const HOST = urls.API_SERVER;

var cache_debug = true;

export function request(url, method, body){
    let isOk;
    return new Promise((resolve, reject) =>{

        fetch(HOST + url, {
            method,
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body
        })
            .then((response) =>{
                if(response.ok){
                    console.log("---------request1:--------", "");
                    isOk = true;
                } else {
                    console.log("---------request2:--------", "");
                    isOk = false;
                }
                return response.json();
            })
            .then((responseData) =>{

                if(isOk){
                    console.log("---------request3:--------", responseData);
                    Storage.save(url, responseData);
                    resolve(responseData);
                } else {
                    Storage.get(url).then((responseText)=>{
                        console.log("---------request4:--------", responseText);
                        if(responseText == undefined){
                            reject(responseData);
                        }else{
                            resolve(responseText);
                        }
                    });
                }
            })
            .catch((error) =>{
                console.log("---------request5:--------", error);
                Storage.get(url).then((responseText)=>{
                    if(responseText == undefined){
                        reject(error);
                    }else{
                        resolve(responseText);
                    }
                });
            });
    });
}
