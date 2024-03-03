////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const get = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/activity/get`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const getMore = async (username, prevFetchedActivityItemIds) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/activity/getMore`, {
        accessToken: accessToken,
        username: username,
        prevFetchedActivityItemIds: prevFetchedActivityItemIds
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (activityId, writing, tags) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/activity/update`, {
        accessToken: accessToken,
        activityId: activityId,
        writing: writing,
        tags: tags
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (activityId, activityType, year, month, day, hour, minute, itemId, username, tags, writing) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/activity/create`, {
        accessToken: accessToken,
        activityId: activityId,
        activityType: activityType,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        itemId: itemId,
        username: username,
        tags: tags,
        writing: writing
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

export const deleteActivity = async (activityId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/activity/delete`, {
        data: {
            accessToken: accessToken,
            activityId: activityId,
            username: username
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const like = async (activityId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/activity/like`, {
        accessToken: accessToken,
        activityId: activityId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const unlike = async (activityId, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/activity/unlike`, {
        accessToken: accessToken,
        activityId: activityId,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
////////////////////////////////////////////////////////////////////////////////