import { getDbConnection } from "../db";
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { awsUserPool } from "./util/awsUserPool";
// import { v4 as uuid } from 'uuid';
// import { sendEmail } from "./util/sendEmail";
 
export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const {email, password } = req.body;

        const attributes = [
            new CognitoUserAttribute({ Name: 'email', Value: email })
        ];

        awsUserPool.signUp(email, password, attributes, null, async (err, awsResult) => {
            try {
                if(err){
                    console.log(err);
                    return res.status(500).json({ message: 'Unable to signup the user'});
                }

                const db = getDbConnection('react-auth-db');

                const startingInfo = {
                    hairColor: '',
                    favoriteFood: '',
                    bio: ''
                };

                const result = await db.collection('users').insertOne({
                    email,
                    info: startingInfo,
                });
                const { insertedId } = result;
                jwt.sign({
                            id: insertedId,
                            email,
                            info: startingInfo,
                            isVerified: false,
                        }, 
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '2d'
                        },
                        (err, token) => {
                            if(err){
                                return res.status(500).send(err);
                            }
                            console.log(token);
                            res.status(200).json({ token });
                        }
                    );


            } catch (error) {
                
            }
        })

    }
} 

// export const signUpRoute = {
//     path: '/api/signup',
//     method: 'post',
//     handler: async (req, res) => {
//         //console.log(req.body);
//         const {email, password } = req.body;
//         // get connection to the database
//         const db = getDbConnection('react-auth-db');
//         const user = await db.collection('users').findOne({ email });

//         if (user) {
//             res.sendStatus(409);
//         }
//         const passwordHash = await bcrypt.hash(password, 10);
//         const startingInfo = {
//             hairColor: '',
//             favoriteColor: '',
//             bio: '',
//         };

//         console.log(req.body);

//         const verificationString = uuid();
//         // Inserting the data into the database
//         const result = await db.collection('users').insertOne({
//             email, 
//             passwordHash, 
//             info: startingInfo,
//             isVerified: false,
//             verificationString,

//         });

//         const { insertedId } = result;


//         // Send verification email
//         try {
//             await sendEmail({
//                 to: email,
//                 from: 'ptrckbyamasu@gmail.com',
//                 subject: 'Please verify your email',
//                 text: `
//                     Thank you for signing up! To verify your email, click here: 
//                     http://localhost:3000/verify-email/${ verificationString }
//                 `,
//             });
//         } catch (error) {
//             console.log(error);
//             res.sendStatus(500);
//         }


//         jwt.sign({
//             id: insertedId,
//             email,
//             info: startingInfo,
//             isVerified: false,
//         }, 
//         process.env.JWT_SECRET,
//         {
//             expiresIn: '2d'
//         },
//         (err, token) => {
//             if(err){
//                 return res.status(500).send(err);
//             }
//             console.log(token)
//             res.status(200).json({ token });
//         }
//         );
//     },
// };

