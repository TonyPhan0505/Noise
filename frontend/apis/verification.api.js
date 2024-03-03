////////////////////////////// Import dependencies //////////////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// APIs //////////////////////////////
exports.send = async (emailAddress) => {
    const response = await axios.post(`${backendURL}/verification/send`, {
        emailAddress: emailAddress
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

exports.verify = async (emailAddress, code) => {
    const response = await axios.post(`${backendURL}/verification/verify`, {
        emailAddress: emailAddress,
        code: code
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////////////////////