////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (itemId, itemType) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/comment/get`, {
        accessToken: accessToken,
        itemId: itemId,
        itemType: itemType
    }).then(
        res => {
            return res;
        }
    ).catch(
        err => {
            console.error(err);
        }
    );
    return response;
};

export const getMore = async (itemId, itemType, prevFetchedCommentIds) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/comment/getMore`, {
        accessToken: accessToken,
        itemId: itemId,
        itemType: itemType,
        prevFetchedCommentIds: prevFetchedCommentIds
    }).then(
        res => {
            return res;
        }
    ).catch(
        err => {
            console.error(err);
        }
    );
    return response;
};

export const update = async (commentId, writing) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/comment/update`, {
        accessToken: accessToken,
        commentId: commentId,
        writing: writing
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (commentId, username, writing, year, month, day, hour, minute, hostId, hostType, parentCommentId) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/comment/create`, {
        accessToken: accessToken,
        commentId: commentId,
        username: username,
        writing: writing,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        hostId: hostId,
        hostType: hostType,
        parentCommentId: parentCommentId
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteComment = async (commentId, hostId, hostType, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/comment/delete`, {
        data: {
            accessToken: accessToken,
            commentId: commentId,
            hostId: hostId,
            hostType: hostType,
            username: username
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const like = async (commentId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/comment/like`, {
        accessToken: accessToken,
        commentId: commentId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const unlike = async (commentId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/comment/unlike`, {
        accessToken: accessToken,
        commentId: commentId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////