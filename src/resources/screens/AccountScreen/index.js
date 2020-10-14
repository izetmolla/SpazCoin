import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';



export function AccountScreen({ navigation }) {


    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Account Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    productsListContainer: {
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});