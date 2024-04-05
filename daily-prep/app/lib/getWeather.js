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
exports.getWeather = void 0;
var axios_1 = require("axios");
var client_1 = require("../../prisma/client");
var getWeather = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var weather, apiKey, apiUrl, apiUrl2, AdditionalInfo, AdditionalInfoCount, i, weatherCity, URL_1, currentWeatherResponse, currentWeather, URL2, forecastWeatherResponse, forecastWeather, minTemp, maxTemp, weatherCondition, wind, sendWind, rainyHours, i_1, hourlyForecast, hourInPST, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                weather = "";
                apiKey = "0f519fb83d4e4e8407dc01c9311395ef";
                apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
                apiUrl2 = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=";
                return [4 /*yield*/, client_1.default.additionalInfo.findMany({
                        where: {
                            authorId: id,
                        }
                    })];
            case 1:
                AdditionalInfo = _a.sent();
                return [4 /*yield*/, client_1.default.additionalInfo.count({
                        where: {
                            authorId: id,
                        }
                    })];
            case 2:
                AdditionalInfoCount = _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < AdditionalInfoCount)) return [3 /*break*/, 9];
                weatherCity = AdditionalInfo[i].weatherCity;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                URL_1 = "".concat(apiUrl).concat(weatherCity, "&appid=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(URL_1)];
            case 5:
                currentWeatherResponse = _a.sent();
                currentWeather = currentWeatherResponse.data;
                URL2 = "".concat(apiUrl2).concat(weatherCity, "&appid=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(URL2)];
            case 6:
                forecastWeatherResponse = _a.sent();
                forecastWeather = forecastWeatherResponse.data;
                minTemp = Math.round(currentWeather.main.temp_min);
                maxTemp = Math.round(currentWeather.main.temp_max);
                weatherCondition = currentWeather.weather[0].main;
                wind = currentWeather.wind.speed;
                sendWind = wind > 20 ? true : false;
                rainyHours = [];
                for (i_1 = 0; i_1 < 10; i_1++) {
                    hourlyForecast = forecastWeather.list[i_1].weather[0].main;
                    if (hourlyForecast === "Rain") {
                        hourInPST = (i_1 + 8) % 12;
                        rainyHours.push(hourInPST);
                    }
                }
                weather = "".concat(minTemp, "-").concat(maxTemp, "\u00B0F, ").concat(weatherCondition);
                if (rainyHours.length > 0) {
                    weather += ", raining at ".concat(rainyHours);
                }
                if (sendWind) {
                    weather += ", wind: ".concat(wind, " mph");
                }
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log("ffail");
                return [3 /*break*/, 8];
            case 8:
                i++;
                return [3 /*break*/, 3];
            case 9: return [2 /*return*/, weather];
        }
    });
}); };
exports.getWeather = getWeather;
// const weather = async () => {
//     const a = await getWeather(21);
//     console.log(a);
// }
// weather();
