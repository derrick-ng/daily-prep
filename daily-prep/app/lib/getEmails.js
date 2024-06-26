"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.getEmails = void 0;
var client_1 = require("../../prisma/client");
var getEmails = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var senders, user, additionalInfo, additionalInfoCount, i, userEmail, emailSenderPriorityString, emailSenderPriority, numberOfSenders, i_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                senders = [];
                return [4 /*yield*/, client_1.default.user.findMany({
                        where: {
                            id: id,
                        }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, client_1.default.additionalInfo.findMany({
                        where: {
                            authorId: id,
                        }
                    })];
            case 2:
                additionalInfo = _a.sent();
                return [4 /*yield*/, client_1.default.additionalInfo.count({
                        where: {
                            authorId: id,
                        }
                    })];
            case 3:
                additionalInfoCount = _a.sent();
                for (i = 0; i < additionalInfoCount; i++) {
                    userEmail = user[i].email;
                    console.log(userEmail);
                    emailSenderPriorityString = additionalInfo[i].emailPriority;
                    emailSenderPriority = emailSenderPriorityString === null || emailSenderPriorityString === void 0 ? void 0 : emailSenderPriorityString.split(",").map(function (str) { return str.trim(); }).filter(function (str) { return str != ""; });
                    numberOfSenders = emailSenderPriority === null || emailSenderPriority === void 0 ? void 0 : emailSenderPriority.length;
                    for (i_1 = 0; i_1 < numberOfSenders; i_1++) {
                        if (isValidEmail(emailSenderPriority[i_1])) {
                            senders.push(emailSenderPriority[i_1]);
                        }
                    }
                }
                console.log(senders);
                return [2 /*return*/];
        }
    });
}); };
exports.getEmails = getEmails;
(0, exports.getEmails)(25);
//function param type string. function itself type boolean
var isValidEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //.test is built in regex function to test if pattern exists in string, returns true/false
    return emailRegex.test(email);
};
