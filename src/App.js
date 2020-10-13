import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Routes
import { navigate, navigationRef, isReadyRef } from './routes/nav'
import { PublicStackNavigator } from './routes/PublicStackNavigator';
import { PrivateStackNavigator } from './routes/PrivateStackNavigator';


//Themes
import { lightTheme } from './resources/themes/light';
import { darkTheme } from './resources/themes/dark';

//Contexts
import { RootContext } from './app/contexts/RootContext';
import { AuthContext } from './app/contexts/AuthContext';
import { UserContext } from './app/contexts/UserContext';
import { ThemeContext } from './app/contexts/ThemeContext';

//Hooks
import { useAuth } from './app/hooks/useAuth';
import { useRoot } from './app/hooks/useRoot';

//Vendors/FIREBASE
import { fcmService } from './vendors/Firebase/FCMService'
import { localNotificationService } from './vendors/Firebase/LocalNotificationService'


import { SplashScreenStatic } from './resources/screens/SplashScreenStatic';
import { StatusBar } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';

const RootStack = createStackNavigator();

export default function () {


    React.useEffect(() => {
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)

        function onRegister(token) {
            console.log("[App] onRegister: ", token)
        }

        function onNotification(notify) {
            console.log("[App] onNotification: ", notify)
            const options = {
                soundName: 'default',
                playSound: true //,
                // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
                // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
            }
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify) {
            console.log("[App] onOpenNotification: ", notify)


            console.log(' navigator --- ', navigate)
            console.log(' navigator --- ', navigate)
            console.log('navigationRef.current.getRootState() --- ', navigationRef.current.getRootState())
            navigate("AuthStack", {
                screen: "AccountScreen",
                params: { activityId: 1 }
            })



            // alert("Open Notification: " + notify.body)
        }




        return () => {
            console.log("[App] unRegister")
            fcmService.unRegister()
            localNotificationService.unregister()
        }

    }, [])




    const { auth, state } = useAuth();
    console.log(state)
    const [isDarkMode, setIsDarkMode] = React.useState(useDarkMode());
    const switchTheme = React.useCallback(() => {
        setIsDarkMode(!isDarkMode);
    }, [isDarkMode]);

    function renderScreens() {
        if (state.loading) {
            return <RootStack.Screen name={'Splash'} component={SplashScreenStatic} />;
        }
        return state.user ? (
            <RootStack.Screen name={'MainStack'}>
                {() => (
                    <UserContext.Provider value={state.user}>
                        <PrivateStackNavigator />
                    </UserContext.Provider>
                )}
            </RootStack.Screen>
        ) : (
                <RootStack.Screen name={'AuthStack'} component={PublicStackNavigator} />
            );
    }

    return (
        <RootContext.Provider value={useRoot()}>
            <ThemeContext.Provider value={switchTheme}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <AuthContext.Provider value={auth}>
                    <NavigationContainer
                        theme={isDarkMode ? darkTheme : lightTheme}
                        ref={navigationRef}
                        onReady={() => { isReadyRef.current = true }}
                        fallback={<RootStack.Screen name={'Splash'} component={SplashScreenStatic} />}
                    >

                        <RootStack.Navigator
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: false,
                            }}>
                            {renderScreens()}
                        </RootStack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </RootContext.Provider>
    );
}