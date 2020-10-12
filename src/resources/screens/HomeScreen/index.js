import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { AuthContext } from '../../../app/contexts/AuthContext';
import { ThemeContext } from '../../../app/contexts/ThemeContext';

export function HomeScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const switchTheme = React.useContext(ThemeContext);

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    productsListContainer: {
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});