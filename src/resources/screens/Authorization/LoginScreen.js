import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../app/contexts/AuthContext';



export function LoginScreen({ navigation }) {
    const { login } = React.useContext(AuthContext);

    return (
        <View>
            <Text>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 48,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});