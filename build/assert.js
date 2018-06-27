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
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
function default_1(condition, message) {
    if (!condition)
        throw new AssertionError(message);
}
exports.default = default_1;
//# sourceMappingURL=assert.js.map