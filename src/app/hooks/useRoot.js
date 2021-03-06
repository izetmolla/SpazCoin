import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../../config';
import { createAction } from '../../vendors/utils/createAction';
import { sleep } from '../../vendors/utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';

export function useRoot() {
    const [rootData, dispatch] = React.useReducer(
        (rootData, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...rootData,
                        user: { ...action.payload },
                    };
                case 'REMOVE_USER':
                    return {
                        ...rootData,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...rootData,
                        loading: action.payload,
                    };
                default:
                    return rootData;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );
    const rootFunctions = React.useMemo(
        () => ({
            login: async (email, password) => {
                const { data } = await axios.post(`${BASE_URL}/auth/local`, {
                    identifier: email,
                    password,
                });
                const user = {
                    email: data.user.email,
                    token: data.jwt,
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
                await axios.post(`${BASE_URL}/auth/local/register`, {
                    username: email,
                    email,
                    password,
                });
            },
        }),
        [],
    );
    React.useEffect(() => {
        sleep(2000).then(() => {
            AsyncStorage.getItem('user').then(user => {
                if (user) {
                    dispatch(createAction('SET_USER', JSON.parse(user)));
                }
                dispatch(createAction('SET_LOADING', false));
            });
        });
    }, []);
    return { rootFunctions, rootData };
}
