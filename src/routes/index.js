import { logInRoute } from './loginRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { testEmailRoute } from './testEmailRoute';
import updateUserInfoRoute from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOAuthUrlRoute } from './getGoogleOAuthUrlRoute';
import { googleOAuthCallbackRoute } from './googleOAuthCallbackRoute';

export const routes = [
    logInRoute,
    signUpRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOAuthUrlRoute,
    googleOAuthCallbackRoute,
    testRoute,
];
