package com.app;

import android.content.Context;
import android.content.res.Resources;
import android.os.Build;
import android.view.WindowInsets;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class NavigationModeModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "NavigationMode";

    public NavigationModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getNavigationMode(Promise promise) {
        try {
            WritableMap result = Arguments.createMap();
            Context context = getReactApplicationContext();

            int navBarHeight = getNavigationBarHeight(context);
            result.putInt("navigationBarHeight", navBarHeight);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                int navBarInteractionMode = getNavBarInteractionMode(context);
                result.putInt("interactionMode", navBarInteractionMode);
                result.putString("type", getNavigationTypeFromInteractionMode(navBarInteractionMode));
                result.putBoolean("isGestureNavigation", navBarInteractionMode == 2);
            } else {
                // For older Android versions, assume gesture if height is small
                boolean isGesture = navBarHeight < 60;
                result.putBoolean("isGestureNavigation", isGesture);
                result.putString("type", isGesture ? "gesture" : "unknown");
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("NAVIGATION_MODE_ERROR", "Failed to get navigation mode: " + e.getMessage(), e);
        }
    }

    @ReactMethod
    public void isGestureNavigation(Promise promise) {
        try {
            Context context = getReactApplicationContext();
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                int navBarInteractionMode = getNavBarInteractionMode(context);
                promise.resolve(navBarInteractionMode == 2);
            } else {
                int navBarHeight = getNavigationBarHeight(context);
                promise.resolve(navBarHeight < 60);
            }
        } catch (Exception e) {
            promise.reject("GESTURE_NAV_ERROR", "Failed to check gesture navigation: " + e.getMessage(), e);
        }
    }

    @ReactMethod
    public void getNavigationBarHeight(Promise promise) {
        try {
            Context context = getReactApplicationContext();
            int navBarHeight = getNavigationBarHeight(context);
            promise.resolve(navBarHeight);
        } catch (Exception e) {
            promise.reject("NAV_BAR_HEIGHT_ERROR", "Failed to get navigation bar height: " + e.getMessage(), e);
        }
    }

    private int getNavigationBarHeight(Context context) {
        float density = context.getResources().getDisplayMetrics().density;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && getCurrentActivity() != null) {
            WindowInsets insets = getCurrentActivity().getWindow().getDecorView().getRootWindowInsets();
            if (insets != null) {
                android.graphics.Insets navBar = insets.getInsets(WindowInsets.Type.navigationBars());
                if (navBar != null) {
                    return (int) (navBar.bottom / density);
                }
            }
        }

        // Fallback to resource-based approach
        Resources resources = context.getResources();
        int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
        if (resourceId > 0) {
            return (int) (resources.getDimensionPixelSize(resourceId) / density);
        }
        
        return 0;
    }

    private int getNavBarInteractionMode(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            try {
                Resources resources = context.getResources();
                int resourceId = resources.getIdentifier("config_navBarInteractionMode", "integer", "android");
                if (resourceId > 0) {
                    return resources.getInteger(resourceId);
                }
            } catch (Exception e) {
                // Ignore
            }
        }
        return -1;
    }

    private String getNavigationTypeFromInteractionMode(int mode) {
        switch (mode) {
            case 0:
                return "3_button";
            case 1:
                return "2_button";
            case 2:
                return "gesture";
            default:
                return "unknown";
        }
    }
}
