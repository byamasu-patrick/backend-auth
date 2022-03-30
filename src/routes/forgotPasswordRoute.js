import { getDbConnection } from "../db";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from './util/awsUserPool';
// import { v4 as uuid } from 'uuid';
// import { sendEmail } from "./util/sendEmail";


export const forgotPasswordRoute = {
    path: "/api/forgot-password/:email",
    method: "put",
    handler: async (req, res) => {
        const { email } = req.params;

        // console.log(email);
        
        // console.log(awsUserPool);
        new CognitoUser({ Username: email, Pool: awsUserPool })
            .forgotPassword({   
                onSuccess: () => {
                    res.sendStatus(200);
                },
                onFailure: () => {
                    res.sendStatus(500);
                }
        });

    //     const db = getDbConnection('react-auth-db');
    //    // const passwordResetCode = uuid();

    //     const { result } = await db.collection('users').updateOne({
    //         email
    //     }, { $set: { passwordResetCode }});

    //     if (result.nModified) {
    //         try {
    //             await sendEmail({
    //                 to: email,
    //                 from: 'ptrckbyamasu@gmail.com',
    //                 subject: 'Password Reset',
    //                 text: `
    //                     To reset your password, click this link:
    //                     http://localhost:3000/reset-password/${passwordResetCode}
    //                 `,
    
    //             });
    //         } catch (error) {
    //             console.log(error);
    //             res.sendStatus(500);
    //         }
    //     }
    //     res.sendStatus(200);
    }
}