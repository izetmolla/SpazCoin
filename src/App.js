import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Routes
// import { PublicStackNavigator } from './routes/PublicStackNavigator';
// import { PrivateStackNavigator } from './routes/PrivateStackNavigator';
import { PublicStackNavigator } from './routes/PublicStackNavigator';
import { PrivateStackNavigator } from './routes/PrivateStackNavigator';


//Themes
import { lightTheme } from './resources/themes/light';
import { darkTheme } from './resources/themes/dark';

//Contexts
import { AuthContext } from './app/contexts/AuthContext';
import { UserContext } from './app/contexts/UserContext';
import { ThemeContext } from './app/contexts/ThemeContext';

//Hooks
import { useAuth } from './app/hooks/useAuth';

import { SplashScreenStatic } from './resources/screens/SplashScreenStatic';
import { StatusBar } from 'react-native';
// import {useDarkMode} from 'react-native-dark-mode';

const RootStack = createStackNavigator();

export default function () {
    const { auth, state } = useAuth();
    // const isDarkMode = useDarkMode();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
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
        <ThemeContext.Provider value={switchTheme}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AuthContext.Provider value={auth}>
                <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
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
    );
}