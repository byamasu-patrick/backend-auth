import { oAuthClient } from "./oAuthClient";
import axios from 'axios'

const getAccessAndBearerTokenUrl = ({ accessToken }) => `
https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}
`; 

export const getGoogleUser = async ({ code }) => {
    const { tokens } = await oAuthClient.getToken(code);
    oAuthClient.setCredentials(tokens);

    console.log("Query data are -------------------------------");
    //console.log(tokens);

    const response = await axios.get(
        getAccessAndBearerTokenUrl({ accessToken: tokens.access_token }),
        { headers : { Authorization: `Bearer ${tokens.id_token}`}},
    );
    
    return response.data;
    //return "";
}
