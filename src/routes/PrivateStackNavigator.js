import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../resources/screens/HomeScreen';
import { AccountScreen } from '../resources/screens/AccountScreen';

const MainStack = createStackNavigator();

export function PrivateStackNavigator() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name={'ProductsList'} component={HomeScreen} options={{ title: 'Home Screen', }} />
            <MainStack.Screen name={'AccountScreen'} component={AccountScreen} options={{ title: 'Account Screen', }} />
        </MainStack.Navigator>
    );
}