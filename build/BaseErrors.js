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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseErrors;
(function (BaseErrors) {
    var ServerError = /** @class */ (function (_super) {
        __extends(ServerError, _super);
        function ServerError(msg) {
            return _super.call(this, msg || 'Server error') || this;
        }
        return ServerError;
    }(Error));
    BaseErrors.ServerError = ServerError;
    var UnknownError = /** @class */ (function (_super) {
        __extends(UnknownError, _super);
        function UnknownError(msg) {
            return _super.call(this, msg || 'Unknown error') || this;
        }
        return UnknownError;
    }(Error));
    BaseErrors.UnknownError = UnknownError;
})(BaseErrors || (BaseErrors = {}));
exports.default = BaseErrors;
//# sourceMappingURL=BaseErrors.js.map