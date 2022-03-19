import { getGoogleUser } from "./util/getGoogleUser";
import { updateOrCreateUserFromOAuth } from "./util/updateOrCreateUserFromOAuth";
import jwt from 'jsonwebtoken';


export const googleOAuthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });
        console.log(oauthUserInfo);

        const updateUser = await updateOrCreateUserFromOAuth({ oauthUserInfo });
        const { _id: id, isVerified, email, info } = updateUser;
        jwt.sign(
            { id, isVerified, email, info }, process.env.JWT_SECRET, 
            (err, token) => {  
                if(err) return res.sendStatus(500);              
                res.redirect(`http://localhost:3000/login?token=${token}`)
            }
        );
    }
}