import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { AuthContext } from '../../../app/contexts/AuthContext';
import { ThemeContext } from '../../../app/contexts/ThemeContext';

export function HomeScreen({ navigation, route }) {
    const { logout } = React.useContext(AuthContext);
    const switchTheme = React.useContext(ThemeContext);
    console.log(route)
    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Home Screen</Text>
            {/* <Text>{route.params.type}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    productsListContainer: {
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});