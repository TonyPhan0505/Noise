////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/moment/get`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (momentId, writing, media) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/moment/update`, {
        accessToken: accessToken,
        momentId: momentId,
        writing: writing,
        media: media
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (momentId, username, year, month, day, hour, minute, writing, media) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/moment/create`, {
        accessToken: accessToken,
        momentId: momentId,
        username: username,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        writing: writing,
        media: media
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteMoment = async (momentId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/moment/delete`, {
        data: {
            accessToken: accessToken,
            momentId: momentId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const like = async (momentId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/moment/like`, {
        accessToken: accessToken,
        momentId: momentId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const unlike = async (momentId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/moment/unlike`, {
        accessToken: accessToken,
        momentId: momentId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////