import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../../config';
import { createAction } from '../../vendors/utils/createAction';
import { sleep } from '../../vendors/utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';

export function useLocalStorage() {
    const [localStorageData, dispatch] = React.useReducer(
        (localStorageData, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...localStorageData,
                        data: { ...action.payload },
                    };
                case 'REMOVE_USER':
                    return {
                        ...localStorageData,
                        data: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...localStorageData,
                        loading: action.payload,
                    };
                default:
                    return localStorageData;
            }
        },
        {
            data: undefined,
            loading: true,
        },
    );
    const localStorage = React.useMemo(
        () => ({
            storeData: async (p) => {
                await AsyncStorage.setItem('@generalData', JSON.stringify(p));
                dispatch(createAction('SET_STORE_DATA', p));
            },
            getData: async () => {
                AsyncStorage.getItem('@generalData').then(p => {
                    dispatch(createAction('SET_GET_DATA', JSON.parse(p)));
                });
            },

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

        dispatch(createAction('SET_GET_DATA'));
        dispatch(createAction('SET_LOADING', false));
    }, []);
    return { localStorage, localStorageData };
}
