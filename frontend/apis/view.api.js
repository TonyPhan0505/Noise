////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/view/get`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (viewId, members) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/view/update`, {
        accessToken: accessToken,
        viewId: viewId,
        members: members
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (id, username, members) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/view/create`, {
        accessToken: accessToken,
        id: id,
        username: username,
        members: members
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteView = async (viewId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/view/delete`, {
        data: {
            accessToken: accessToken,
            viewId: viewId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////