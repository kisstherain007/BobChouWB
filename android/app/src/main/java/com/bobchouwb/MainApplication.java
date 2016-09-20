package com.bobchouwb;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
//import com.bobchouwb.view.GradientColorViewManager;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.BV.LinearGradient.LinearGradientPackage;
import com.view.WBTextViewManager;

public class MainApplication extends Application implements ReactApplication {

  public static List<Object> results = new ArrayList<>();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new LinearGradientPackage(),
              new IntentReactPackage(),
              new ReactPackage() {
                @Override
                public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
                  return Collections.emptyList();
                }

                @Override
                public List<Class<? extends JavaScriptModule>> createJSModules() {
                  return Collections.emptyList();
                }

                @Override
                public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
                  return Arrays.<ViewManager>asList(new WBTextViewManager());
                }
              }
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
