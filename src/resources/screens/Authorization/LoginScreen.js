import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../app/contexts/AuthContext';
import { RootContext } from '../../../app/contexts/RootContext';
import { LocalStorageContext } from '../../../app/contexts/LocalStorageContext';



export function LoginScreen({ navigation }) {
    const { rootFunctions, rootData } = React.useContext(RootContext);
    const { login } = React.useContext(AuthContext);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    return (
        <View style={{ flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            <Text>Login Screen</Text>
            <Text>{error}</Text>
            {
                loading ?
                    <ActivityIndicator color="black" />
                    :
                    <Button
                        title="Login"
                        onPress={async () => {
                            try {
                                setLoading(true);
                                await login("izetmolla@gmail.com", "milani10");
                            } catch (e) {
                                console.error(e)
                                setError(e.message);
                                setLoading(false);
                            }
                        }} />
            }

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