import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../resources/screens/HomeScreen';

const MainStack = createStackNavigator();

export function PrivateStackNavigator() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name={'ProductsList'}
                component={HomeScreen}
                options={{
                    title: 'Products List',
                }}
            />
        </MainStack.Navigator>
    );
}