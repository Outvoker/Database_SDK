export declare namespace Errors {
    class SaltError extends Error {
        constructor(msg?: string);
    }
    class LoginError extends Error {
        constructor(msg?: string);
    }
    class AlreadyLoginError extends Error {
        constructor(msg?: string);
    }
    class UsernameOrPasswordError extends Error {
        constructor(msg?: string);
    }
}
export default function (username: string, password: string): Promise<void>;
