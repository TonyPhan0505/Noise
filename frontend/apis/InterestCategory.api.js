////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
export const getAll = async () => {
    const accessToken = AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/interestCategory/getAll`, {
        accessToken: accessToken
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////