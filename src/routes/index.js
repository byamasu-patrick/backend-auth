import { logInRoute } from './loginRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { testEmailRoute } from './testEmailRoute';
import updateUserInfoRoute from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    logInRoute,
    signUpRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    testRoute,
];
