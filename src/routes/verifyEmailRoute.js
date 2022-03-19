import { ObjectID } from 'mongodb';
import  jwt  from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from './util/awsUserPool'



export const  verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { email, verificationString } = req.body;
        
        new CognitoUser({
            Username: email, Pool: awsUserPool
        })
        .confirmRegistration(verificationString, true, async (error) => {
            if(error) return res.status(401).json({ message: "The email verification is incorrect"});

            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate(
                { email }, { $set: { isVerified: true }}, { returnOriginal: false });
            
            const { _id: id, info } = result.value;
            
            jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, 
            (error, token) => {
                if(error) return res.sendStatus(500);
                console.log(token);
                // Send the updated json object
                res.status(200).json({ token });
            });


        });

        //console.log(req.body);
        // const result = await db.collection('users').findOne({
        //     verificationString,
        // });
        // console.log(result);
        // if(!result) return res.status(401).json({ message: 'The email verification code is incorrect'});

        // const { _id: id, email, info } = result;

        // await db.collection('users').updateOne({
        //     _id: ObjectID(id)
        // }, { $set: { isVerified: true }});

        // jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, 
        // (error, token) => {
        //     if(error) return res.sendStatus(500);
        //     console.log(token);

        //     // Send the updated json object
        //     res.status(200).json({ token });
        // });
    }
}