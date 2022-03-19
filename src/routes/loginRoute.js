// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser
} from 'amazon-cognito-identity-js';
import { awsUserPool } from './util/awsUserPool';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        
        new CognitoUser({ Username: email, Pool: awsUserPool })
        .authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
            onSuccess: async result => {
                //Connect to the database
                const db = getDbConnection('react-auth-db');
                const user = await db.collection('users').findOne({ email });            
                if(!user) return res.sendStatus(401);
                // send the token to the client
                const {_id: id, isVerified, info } = user;
                //const isCorrect = await bcrypt.compare(password, passwordHash);           
                jwt.sign({
                    id, email, info, isVerified,
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d'
                }, 
                (err, token) => {
                    if(err){
                        res.status(500).json(err);
                    }

                    res.status(200).json({ token });
                });
              
            },
            onFailure: err => {
                res.status(401);
            }
        });
        // //Connect to the database
        // const db = getDbConnection('react-auth-db');
        // const user = await db.collection('users').findOne({ email });
       
        // if(!user) return res.sendStatus(401);
        // // send the token to the client
        // const {_id: id, isVerified, passwordHash, info } = user;

        // const isCorrect = await bcrypt.compare(password, passwordHash);

        // if(isCorrect){            
        //     jwt.sign({
        //         id, email, info, isVerified,
        //     }, 
        //     process.env.JWT_SECRET,
        //     {
        //         expiresIn: '2d'
        //     }, 
        //     (err, token) => {
        //         if(err){
        //             res.status(500).json(err);
        //         }
        //         console.log(token);
        //         res.status(200).json({ token });
        //     });
        // }
        // else{
        //     res.sendStatus(401);
        // }
     },
};