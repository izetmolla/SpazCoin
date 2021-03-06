import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../../config';
import { createAction } from '../../vendors/utils/createAction';
import { sleep } from '../../vendors/utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';

export function useAuth() {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...state,
                        user: { ...action.payload },
                    };
                case 'REMOVE_USER':
                    return {
                        ...state,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...state,
                        loading: action.payload,
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );
    const auth = React.useMemo(
        () => ({
            login: async (email, password) => {
                const { data } = await axios.post(`${BASE_URL}/v1/authorization/login`, {
                    identifier: email,
                    password,
                });
                const user = {
                    email: "izetmolla@gmail.com",
                    token: "gfdgjsknjcrdfnjkensfjdk",
                };

                await AsyncStorage.setItem('user', JSON.stringify(user));
                dispatch(createAction('SET_USER', user));
            },
            logout: async () => {
                await AsyncStorage.removeItem('user');
                dispatch(createAction('REMOVE_USER'));
            },
            register: async (email, password) => {
                await sleep(2000);
                await axios.post(`${BASE_URL}/v1/authorization/login`, {
                    username: email,
                    email,
                    password,
                });
            },
        }),
        [],
    );
    React.useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                dispatch(createAction('SET_USER', JSON.parse(user)));
            }
            dispatch(createAction('SET_LOADING', false));
        });
    }, []);
    return { auth, state };
}
