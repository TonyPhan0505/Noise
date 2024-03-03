////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/dream/get`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (dreamId, name, media, details, status) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/dream/update`, {
        accessToken: accessToken,
        dreamId: dreamId,
        name: name,
        media: media,
        details: details,
        status: status
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (id, name, media, details, status, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/dream/create`, {
        accessToken: accessToken,
        id: id,
        name: name,
        media: media,
        details: details,
        status: status,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteDream = async (dreamId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/dream/delete`, {
        data: {
            accessToken: accessToken,
            dreamId: dreamId,
            username: username
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////