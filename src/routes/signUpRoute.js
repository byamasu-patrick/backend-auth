import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        //console.log(req.body);
        const {email, password } = req.body;
        // get connection to the database
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.sendStatus(409);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const startingInfo = {
            hairColor: '',
            favoriteColor: '',
            bio: '',
        };
        // Inserting the data into the database
        const result = await db.collection('users').insertOne({
            email, 
            passwordHash, 
            info: startingInfo,
            isVerified: false,
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
            console.log(token)
            res.status(200).json({ token });
        }
        );
    },
};

