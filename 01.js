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


import { StatusBar, View } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';
import { AccountScreen } from './resources/screens/AccountScreen';
import { HomeScreen } from './resources/screens/HomeScreen';

const RootStack = createStackNavigator();

export default function () {
    const { auth, state } = useAuth();
    const [isDarkMode, setIsDarkMode] = React.useState(useDarkMode());
    const switchTheme = React.useCallback(() => {
        setIsDarkMode(!isDarkMode);
    }, [isDarkMode]);

    const [aaa, setAaa] = React.useState(false);


    React.useEffect(() => {
        console.log('navigationRef.current.getRootState() --- ', navigationRef.current.getRootState())
        console.log('navigationRef.current.getRootState() --- ', isReadyRef.current)



        return () => {
            console.log("[App] unRegister")
        }

    }, [])



    // if (state.loading) {
    //     return (<View style={{ flex: 1, backgroundColor: "red" }} />)
    // }


    return (
        <RootContext.Provider value={useRoot()}>
            <ThemeContext.Provider value={switchTheme}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <AuthContext.Provider value={auth}>
                    <NavigationContainer
                        theme={isDarkMode ? darkTheme : lightTheme}
                        ref={navigationRef}
                        onReady={() => { isReadyRef.current = true }}
                        fallback={() => {
                            console.log(123)
                            return <View />
                        }}
                    >
                        <RootStack.Navigator screenOptions={{ headerShown: false, animationEnabled: false, }}>
                            <RootStack.Screen name={'HomeScreen'} component={HomeScreen} options={{ title: 'Home Screen', }} />
                            <RootStack.Screen name={'AccountScreen'} component={AccountScreen} options={{ title: 'Account Screen', }} />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </RootContext.Provider>
    );
}