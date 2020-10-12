import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../resources/screens/Authorization/LoginScreen';
import { RegistrationScreen } from '../resources/screens/Authorization/RegistrationScreen';
import { AccountScreen } from '../resources/screens/AccountScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function PublicStackNavigator() {
    return (
        <AuthStack.Navigator
            mode={'modal'}
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name={'LoginStack'}>
                {() => (
                    <LoginStack.Navigator
                        mode={'card'}
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <LoginStack.Screen name={'Login'} component={LoginScreen} />
                    </LoginStack.Navigator>
                )}
            </AuthStack.Screen>
            <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />
            <MainStack.Screen name={'AccountScreen'} component={AccountScreen} options={{ title: 'Account Screen', }} />

        </AuthStack.Navigator>
    );
}