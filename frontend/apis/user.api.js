////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const searchUsers = async (searchedUsername) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/searchUsers`, {
        accessToken: accessToken,
        searchedUsername: searchedUsername
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const searchUsersWithInterestX = async (interestName) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/searchUsersWithInterestX`, {
        accessToken: accessToken,
        interestName: interestName
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const searchMoreUsersWithInterestX = async (interestName, prevUsernames) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/searchMoreUsersWithInterestX`, {
        accessToken: accessToken,
        interestName: interestName,
        prevUsernames: prevUsernames
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const doesUserExist = async (emailAddress, username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/doesUserExist`, {
        accessToken: accessToken,
        emailAddress: emailAddress,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const getMutualInterestsUsers = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/getMutualInterestsUsers`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const login = async (username, password) => {
    const response = await axios.post(`${backendURL}/user/login`, {
        username: username,
        password: password
    }).then(
        res => {
            const accessToken = res.data.accessToken;
            AsyncStorage.setItem('accessToken', accessToken);
            return res;
        }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const signUp = async (username, emailAddress, profileAvatar, identity, age, about, password) => {
    const response = await axios.post(`${backendURL}/user/signUp`, {
        username: username,
        emailAddress: emailAddress,
        profileAvatar: profileAvatar,
        identity: identity,
        age: age,
        about: about,
        password: password
    }).then(
        res => {
            const accessToken = res.data.accessToken;
            AsyncStorage.setItem('accessToken', accessToken);
            return res;
        }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const verifyAccount = async (emailAddress) => {
    const response = await axios.put(`${backendURL}/user/verifyAccount`, {
        emailAddress: emailAddress
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const updateProfile = async (currentUsername, username, emailAddress, profileAvatar, identity, age, about, newPassword, links) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/user/updateProfile`, {
        accessToken: accessToken,
        currentUsername: currentUsername,
        username: username,
        emailAddress: emailAddress,
        profileAvatar: profileAvatar,
        identity: identity,
        age: age,
        about: about,
        newPassword: newPassword,
        links: links
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const follow = async (followerUsername, followedUsername) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/user/follow`, {
        accessToken: accessToken,
        followerUsername: followerUsername,
        followedUsername: followedUsername
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

export const getFollowers = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/getFollowers`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const getMoreFollowers = async (username, prevFetchedFollowerUsernames) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/getMoreFollowers`, {
        accessToken: accessToken,
        username: username,
        prevFetchedFollowerUsernames: prevFetchedFollowerUsernames
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const getFollowings = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/getFollowings`, {
        accessToken: accessToken,
        username: username
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const getMoreFollowings = async (username, prevFetchedFollowingUsernames) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/user/getMoreFollowings`, {
        accessToken: accessToken,
        username: username,
        prevFetchedFollowingUsernames: prevFetchedFollowingUsernames
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const unfollow = async (followerUsername, followedUsername) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/user/unfollow`, {
        accessToken: accessToken,
        followerUsername: followerUsername,
        followedUsername: followedUsername
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

export const deleteAccount = async (username) => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/user/deleteAccount`, {
        data: {
            accessToken: accessToken,
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