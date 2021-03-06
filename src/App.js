import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Routes
import { navigate, navigationRef, isReadyRef } from './routes/RootNavigation'
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


import { Linking, StatusBar, View } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';
import { SplashScreenStatic } from './resources/screens/SplashScreenStatic';
import { RedirectingScreen } from './resources/screens/RedirectingScreen';

const RootStack = createStackNavigator();

export default function () {
    const { auth, state } = useAuth();
    const [isDarkMode, setIsDarkMode] = React.useState(useDarkMode());
    const switchTheme = React.useCallback(() => {
        setIsDarkMode(!isDarkMode);
    }, [isDarkMode]);

    React.useEffect(() => {

        Linking.getInitialURL().then(url => {
            if (url) {
                navigate("RedirectingScreen", {
                    type: "deeplink",
                    data: url.replace(/.*?:\/\//g, '')
                })
            }

        });


        console.log('navigationRef.current.getRootState() --- ', navigationRef.current.getRootState())
        console.log('navigationRef.current.getRootState() --- ', isReadyRef.current)

        return () => {
            console.log("[App] unRegister")
        }

    }, [])



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
                        fallback={<View />}
                    >
                        <RootStack.Navigator
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: false,
                            }}>
                            {renderScreens()}
                            <RootStack.Screen name={'RedirectingScreen'} component={RedirectingScreen} />

                        </RootStack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </RootContext.Provider>
    );
}