import salt from './salt';
import login from './login';
declare const _default: {
    url: {
        SALT: string;
        LOGIN: string;
        LOGOUT: string;
        RESET: string;
        SIGNUP: string;
    };
    salt: typeof salt;
    login: typeof login;
};
export default _default;
