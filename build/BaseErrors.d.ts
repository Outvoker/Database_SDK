declare namespace BaseErrors {
    class ServerError extends Error {
        constructor(msg?: string);
    }
    class UnknownError extends Error {
        constructor(msg?: string);
    }
}
export default BaseErrors;
