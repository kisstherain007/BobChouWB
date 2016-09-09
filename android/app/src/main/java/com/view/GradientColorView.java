//package com.bobchouwb.view;
//
//import android.annotation.TargetApi;
//import android.content.Context;
//import android.graphics.Canvas;
//import android.graphics.drawable.GradientDrawable;
//import android.os.Build;
//import android.util.AttributeSet;
//import android.view.View;
//
///**
// * Created by zhoubo on 16/9/1.
// */
//public class GradientColorView extends View {
//
//    private GradientDrawable mDrawable;
//
//    private int mStartColor;
//    private int mEndColor;
//
//    public GradientColorView(Context context) {
//        super(context);
//        mDrawable = new GradientDrawable();
//        mDrawable.setOrientation(GradientDrawable.Orientation.TOP_BOTTOM);
//    }
//
//    public void setStartColor(int startColor) {
//        this.mStartColor = startColor;
//    }
//
//    public void setEndColor(int endColor) {
//        this.mEndColor = endColor;
//    }
//
//    @Override
//    protected void onDraw(Canvas canvas) {
//        super.onDraw(canvas);
//        mDrawable.setBounds(0, 0, getWidth(), getHeight());
//        mDrawable.setColors(new int[]{mStartColor, mEndColor});
//        mDrawable.draw(canvas);
//    }
//}
