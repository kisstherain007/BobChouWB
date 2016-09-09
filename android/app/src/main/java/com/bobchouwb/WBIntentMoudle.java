package com.bobchouwb;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.bobchouwb.constants.Constants;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.sina.weibo.sdk.auth.AuthInfo;
import com.sina.weibo.sdk.auth.Oauth2AccessToken;
import com.sina.weibo.sdk.auth.sso.SsoHandler;
import com.sina.weibo.sdk.exception.WeiboException;

/**
 * Created by zhoubo on 16/9/5.
 */
public class WBIntentMoudle extends ReactContextBaseJavaModule implements ActivityEventListener{

    ReactApplicationContext mReactContext;

    public WBIntentMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "WBIntentMoudle";
    }

    @ReactMethod
    public void startActivityFromJS(String name, String params){

        try{
            Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity){
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity,toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        }catch(Exception e){
            throw new JSApplicationIllegalArgumentException( "不能打开Activity : "+e.getMessage());
        }
    }

    Promise mPromise;
    @ReactMethod
    public void startActivityFromJSGetResult(String className, int requestCode, Promise promise){

        this.mPromise = promise;

        try {

            AccountInfo accountInfo = getAccountInfo();

            if ( accountInfo != null){
                WritableMap map = Arguments.createMap();
                map.putString("KEY_ACCESS_TOKEN", accountInfo.KEY_ACCESS_TOKEN);
                map.putString("KEY_UID", accountInfo.KEY_UID);
                mPromise.resolve(map);
                return;
            }

            Activity currentActivity = getCurrentActivity();

            if(currentActivity != null) {
                Class toActivity = Class.forName(className);
                Intent intent = new Intent(currentActivity, toActivity);
                currentActivity.startActivityForResult(intent, requestCode);
            }
        } catch (Exception e) {
            mPromise.reject("0", e.getMessage());
            e.printStackTrace();
        }
    }

    private AccountInfo getAccountInfo(){

        AccountInfo accountInfo = null;
        Oauth2AccessToken mAccessToken = AccessTokenKeeper.readAccessToken(mReactContext);
        if (mAccessToken != null && mAccessToken.isSessionValid()){
            accountInfo = new AccountInfo();
            accountInfo.KEY_UID = mAccessToken.getUid();
            accountInfo.KEY_ACCESS_TOKEN = mAccessToken.getToken();
            accountInfo.KEY_PHONE_NUM = mAccessToken.getPhoneNum();
        }

        return accountInfo;
    }

    @ReactMethod
    public void loginOut(){
        AccessTokenKeeper.clear(mReactContext);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        Log.d("onActivityResult", "requestCode:"+requestCode + " resultCode:" + resultCode + " data:" + data);

        if (requestCode == 200){

            if (resultCode == Activity.RESULT_OK){

                if (mPromise != null && data.getSerializableExtra("accountInfo") != null){
                    AccountInfo accountInfo = (AccountInfo) data.getSerializableExtra("accountInfo");
                    WritableMap map = Arguments.createMap();
                    map.putString("KEY_ACCESS_TOKEN", accountInfo.KEY_ACCESS_TOKEN);
                    map.putString("KEY_UID", accountInfo.KEY_UID);
                    mPromise.resolve(map);
                }
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
