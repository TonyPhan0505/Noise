////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/trophy/get`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const search = async (keyword) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/trophy/search`, {
        accessToken: accessToken,
        keyword: keyword
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const searchMore = async (keyword, prevTrophyIds) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/trophy/searchMore`, {
        accessToken: accessToken,
        keyword: keyword,
        prevTrophyIds: prevTrophyIds
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (trophyId, title, media, mediaTypes, writing) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/trophy/update`, {
        accessToken: accessToken,
        trophyId: trophyId,
        title: title,
        media: media,
        mediaTypes: mediaTypes,
        writing: writing
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (trophyId, title, month, year, storyId, usernames, media, mediaTypes, writing) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/trophy/create`, {
        accessToken: accessToken,
        trophyId: trophyId,
        title: title,
        month: month,
        year: year,
        storyId: storyId,
        usernames: usernames,
        media: media,
        mediaTypes: mediaTypes,
        writing: writing
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteTrophy = async (trophyId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/trophy/delete`, {
        data: {
            accessToken: accessToken,
            trophyId: trophyId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////