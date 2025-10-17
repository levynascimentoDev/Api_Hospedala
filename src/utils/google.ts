import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI_GOOGLE } from '../configs/env.js';
import type { googleAuthorization, googleUserinfo } from './types.js';
import axios from 'axios'

export async function getPayloadGoogleApi(code:string) : Promise<googleUserinfo>{

    const reqAuthorization = await axios.post("https://oauth2.googleapis.com/token", {
        code:code,
        client_id:GOOGLE_CLIENT_ID,
        client_secret:GOOGLE_CLIENT_SECRET,
        redirect_uri:REDIRECT_URI_GOOGLE,
        grant_type:"authorization_code"
    });

    const data = reqAuthorization.data as googleAuthorization  
    const reqUserinfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers:{
            Authorization:`Bearer ${data.access_token}`
        }
    });


    return reqUserinfo.data as googleUserinfo;

    
}

