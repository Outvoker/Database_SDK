"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var BaseErrors_1 = require("../BaseErrors");
var url_1 = require("./url");
var salt_1 = require("./salt");
var crypto_js_1 = require("crypto-js");
var Errors;
(function (Errors) {
    var SaltError = /** @class */ (function (_super) {
        __extends(SaltError, _super);
        function SaltError(msg) {
            return _super.call(this, msg || 'Unable to get salt') || this;
        }
        return SaltError;
    }(Error));
    Errors.SaltError = SaltError;
    var LoginError = /** @class */ (function (_super) {
        __extends(LoginError, _super);
        function LoginError(msg) {
            return _super.call(this, msg || 'Login error') || this;
        }
        return LoginError;
    }(Error));
    Errors.LoginError = LoginError;
    var AlreadyLoginError = /** @class */ (function (_super) {
        __extends(AlreadyLoginError, _super);
        function AlreadyLoginError(msg) {
            return _super.call(this, msg || 'Already logged in') || this;
        }
        return AlreadyLoginError;
    }(Error));
    Errors.AlreadyLoginError = AlreadyLoginError;
    var UsernameOrPasswordError = /** @class */ (function (_super) {
        __extends(UsernameOrPasswordError, _super);
        function UsernameOrPasswordError(msg) {
            return _super.call(this, msg || 'Username or password incorrect') || this;
        }
        return UsernameOrPasswordError;
    }(Error));
    Errors.UsernameOrPasswordError = UsernameOrPasswordError;
})(Errors = exports.Errors || (exports.Errors = {}));
function default_1(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var staticSalt, dynamicSalt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    assert_1.default(username && password, 'Username and password are required');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url_1.default.LOGIN + "?username=" + encodeURIComponent(username)).then(function (res) { return res.text(); })];
                case 2:
                    staticSalt = _b.sent();
                    return [4 /*yield*/, salt_1.default()];
                case 3:
                    dynamicSalt = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    throw new Errors.SaltError;
                case 5: 
                // Calculate
                return [4 /*yield*/, fetch(url_1.default.LOGIN + "?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(crypto_js_1.SHA512(dynamicSalt + crypto_js_1.SHA512(staticSalt + password).toString()).toString() // Dynamic-salted static-salted password
                    ))
                        .then(function (res) {
                        if (res.status == 200)
                            return;
                        return res.text();
                    })
                        .then(function (msg) {
                        var _msg;
                        try {
                            _msg = JSON.parse(msg);
                        }
                        catch (_a) {
                            throw new Errors.LoginError('Cannot login at this time');
                        }
                        console.error(msg);
                        switch (_msg.status) {
                            case 400: throw new Errors.LoginError('Bad request'); // Usually an InvalidStateError
                            case 403: throw new Errors.UsernameOrPasswordError;
                            case 409: throw new Errors.AlreadyLoginError;
                            case 500: throw new BaseErrors_1.default.ServerError;
                            default: throw new BaseErrors_1.default.UnknownError;
                        }
                    })];
                case 6:
                    // Calculate
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=login.js.map