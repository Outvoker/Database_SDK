declare const _default: {
    user: {
        url: {
            SALT: string;
            LOGIN: string;
            LOGOUT: string;
            RESET: string;
            SIGNUP: string;
        };
        salt: typeof import("./user/salt").default;
        login: typeof import("./user/login").default;
    };
};
export default _default;
