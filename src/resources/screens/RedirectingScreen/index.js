import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { AuthContext } from '../../../app/contexts/AuthContext';
import { ThemeContext } from '../../../app/contexts/ThemeContext';

export function RedirectingScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const switchTheme = React.useContext(ThemeContext);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text style={{fontWeight: "bold", fontSize: 25}}>Redirecting Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    productsListContainer: {
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});