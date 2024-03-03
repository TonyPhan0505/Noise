////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/post/get`, {
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
    const response = await axios.post(`${backendURL}/post/search`, {
        accessToken: accessToken,
        keyword: keyword
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const searchMore = async (keyword, prevPostIds) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/post/searchMore`, {
        accessToken: accessToken,
        keyword: keyword,
        prevPostIds: prevPostIds
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (postId, writing, media, tags) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/post/update`, {
        accessToken: accessToken,
        postId: postId,
        writing: writing,
        media: media,
        tags: tags
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (postId, username, year, month, day, hour, minute, writing, media, tags, storyId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/post/create`, {
        accessToken: accessToken,
        postId: postId,
        username: username,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        writing: writing,
        media: media,
        tags: tags,
        storyId: storyId
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deletePost = async (postId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/post/delete`, {
        data: {
            accessToken: accessToken,
            postId: postId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const like = async (postId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/post/like`, {
        accessToken: accessToken,
        postId: postId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const unlike = async (postId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/post/unlike`, {
        accessToken: accessToken,
        postId: postId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////