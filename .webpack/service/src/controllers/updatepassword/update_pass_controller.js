/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constant/error_constant.ts":
/*!****************************************!*\
  !*** ./src/constant/error_constant.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorConst = void 0;
const ErrorConst = {
    EventBodyEmpty: "Sorry invalid data provided or empty filed!",
    RegisterFiledError: "Sorry we could not validate the data you provided",
    RegisterUserCon: "Oops some error occured while registering",
    LoginDataConditionFalied: "Invalid Data Provided !",
    LoginFailedWhileChecking: "Sorry Invalid Credentials or Some Error Occured !",
    PasswordNotMatched: "Sorry Invalid Credentials",
    Emailnotsend: "Opps some error occured while sending OTP",
    OtpFailedToUpdate: "Opps... Sorry Otp not updated! Try again",
    otpnotvalidclienterror: "Opps... invalid otp",
    headersNotAvailable: "Opps.. Headers not received",
    tokenNotValidAuth: "Opps... Auth token not valid",
    otpNotVarified: "Opps... wrong otp",
    updateFieldEmpty: "Invalid Data Provided or Invalid Mobile Number",
    updationFailedInDb: "Sorry...  data not updated try again later !",
    tokenNotAvailableInHeader: "Sorry.. we could not Process the request It seems you are not Authorized!",
    unknowErrorOccured: "Sorry.. some error occured!",
    invalidToken: "Opps.. you are not authenticated!",
    passWordRequiredForUpdate: "Password can't be empty",
    passwordNotValidValidationFailed: "Opps... sorry password not acceptable!",
    passwordNotUpdatedIntoDb: "Sorry... Password Updation Failed!",
    invalidEmail: "In valid Email! Make Sure It is Correct",
    invalidUser: "User Not Found!",
    bothPasswordError: "Opps... we found some error in your data",
    newPasswordFailedToUpdate: "Sorry... Failed To Update Password"
};
exports.ErrorConst = ErrorConst;


/***/ }),

/***/ "./src/controllers/updatepassword/helper/user_pass_updation_helper_f.ts":
/*!******************************************************************************!*\
  !*** ./src/controllers/updatepassword/helper/user_pass_updation_helper_f.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePasswordHelper = void 0;
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
// making [Update Password] Helper
const UpdatePasswordHelper = (userData) => {
    // first wee need to extract the data from the [Event.body is Present in [userDat]]
    // destructure user password
    const { user_password } = JSON.parse(userData);
    // now we got the user password
    // we need to make sure that
    // pass should not be empty or undefined
    if ((0, condition_checking_1.isDataPassedConditionChecking)(user_password)) {
        // it means the password which user has send us 
        //  is ok now we can return [true] back to the flow
        return true;
    }
    else {
        // means [user password] is not valid
        // [Terminate] the programm
        return false;
    }
};
exports.UpdatePasswordHelper = UpdatePasswordHelper;


/***/ }),

/***/ "./src/controllers/updatepassword/update_pass_controller.ts":
/*!******************************************************************!*\
  !*** ./src/controllers/updatepassword/update_pass_controller.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserPassword = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const user_pass_updation_helper_f_1 = __webpack_require__(/*! ./helper/user_pass_updation_helper_f */ "./src/controllers/updatepassword/helper/user_pass_updation_helper_f.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
// making [Update Password] Controller
const UpdateUserPassword = (event, context, Callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // config dotenv variable
    dotenv.config();
    // here first we need to declare the [DB] connection var
    let con;
    // now we need to check that the [event.body] should not be empty
    if (event.body) {
        // means we have somedata in the body 
        // but we have to make sure that 
        // the data in the password field should be valid
        if ((0, user_pass_updation_helper_f_1.UpdatePasswordHelper)(event.body)) {
            // Means we have finally check that the [Password] is valid
            // now we have to check if the user header contains [Authorization] token
            if (event.headers.Authorization) {
                // Means our [Authorization] has some data lets 
                // find out what kind of data
                // it have
                try {
                    // extract token
                    const token = event.headers.Authorization.split(" ")[1];
                    // checking token [valid or not]
                    // not valid [Terminate] the programm
                    // verify token
                    const isTokenValid = jsonwebtoken_1.default.verify(token, (_a = process.env.FinalAuthKey) !== null && _a !== void 0 ? _a : "No key");
                    if (isTokenValid) {
                        // if tokken is valid THEN
                        // extract the user id from token
                        const { user_id } = isTokenValid;
                        // destruct user password
                        const { user_password } = JSON.parse(event.body);
                        // now we need to [hash] the user password
                        // now we are hashing the password
                        const salt = yield bcrypt.genSalt(10);
                        // hash the password
                        const password_hashed = yield bcrypt.hash(user_password, salt);
                        // now we have the [User-Id]
                        // now resolve connection
                        con = yield (0, db_connection_1.connection)();
                        // prepare query
                        const update_password_query = `Call update_user_password(?,?)`;
                        // resolve query
                        const isPasswordUpdated = yield con.query(update_password_query, [user_id, password_hashed]);
                        // check we have successfully updated the password or not
                        if (isPasswordUpdated) {
                            // means we have successfully updated the [password]
                            // send success message to user that 
                            // password has been updated into the [DB]
                            // sucess message for user
                            const successMessage = { message: "Congrats! Your password updated Successfully" };
                            // send success message to usr
                            return (0, utils_1.sendSuccessResponse)(200, successMessage);
                        }
                        else {
                            // IF somehow the password failed to update
                            // send error to clinet that [Password] not updated
                            return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.passwordNotUpdatedIntoDb);
                        }
                    }
                    else {
                        // means token is not valid [Terminate] the programm
                        return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.invalidToken);
                    }
                    // check 
                }
                catch (error) {
                    // means some error occurs
                    console.log(error);
                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.unknowErrorOccured);
                }
                finally {
                    // IF connection is open 
                    // close the connection
                    if (con) {
                        con.end();
                    }
                }
            }
            else {
                // means we dont have [data] into the [Authorization]
                // [Terminate] the programm
                return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.headersNotAvailable);
            }
        }
        else {
            // it means our password not [valid]
            // [Terminated] the programm
            return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.passwordNotValidValidationFailed);
        }
    }
    else {
        // it means we dont have anything in the body
        // send error to user that 
        // for updating the password 
        // we need password
        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.passWordRequiredForUpdate);
    }
});
exports.UpdateUserPassword = UpdateUserPassword;


/***/ }),

/***/ "./src/dbconfig/db_connection.ts":
/*!***************************************!*\
  !*** ./src/dbconfig/db_connection.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connection = void 0;
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const promise_mysql_1 = __importDefault(__webpack_require__(/*! promise-mysql */ "promise-mysql"));
// creating a connection functiopn
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    // we are calling dotenv.congif() object function for making available our [Environment Variable]
    dotenv_1.default.config();
    // here we are declaring the variable of connection  
    let connc;
    // here we are opening the try block
    try {
        // making the required connection properties 
        // note if the [multistatement] is true then you are inviting youself or i can say your application to the sql injection attack
        const connectionProperties = {
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB,
            multipleStatements: true
        };
        // here we are resolving the connection object
        // if you want to see the whats inside the connection 
        // you can console.log(connc)
        connc = yield promise_mysql_1.default.createConnection(connectionProperties);
        // here we are returning the [connc] object to the flow of the programm
        return Promise.resolve(connc);
    }
    catch (e) {
        // here we are throw the error in case something did not happen according to our need
        throw e;
    }
});
exports.connection = connection;


/***/ }),

/***/ "./src/global/condition_checking.ts":
/*!******************************************!*\
  !*** ./src/global/condition_checking.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDataPassedConditionChecking = void 0;
// creating a function for testing the samecondition
const isDataPassedConditionChecking = (userSingleGenericData) => {
    if (userSingleGenericData !== "null" && userSingleGenericData !== "undefined" && userSingleGenericData !== "" && userSingleGenericData !== undefined && userSingleGenericData !== null && userSingleGenericData && userSingleGenericData != undefined && userSingleGenericData != null) {
        // return true back to the flow so that flow can go furthur 
        return true;
    }
    else {
        // return false back to the flow so that flow can [Terminate] at the [controller] level
        return false;
    }
};
exports.isDataPassedConditionChecking = isDataPassedConditionChecking;


/***/ }),

/***/ "./src/global/utils.ts":
/*!*****************************!*\
  !*** ./src/global/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendSuccessResponse = exports.throwErrorNow = exports.otp_regex = exports.phone_number_regex = exports.email_regex = void 0;
// Email Regex
const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
exports.email_regex = email_regex;
//mobile regex
const phone_number_regex = /^[6-9]\d{9}$/;
exports.phone_number_regex = phone_number_regex;
// otp regex
const otp_regex = /^[0-9]{8}$/;
exports.otp_regex = otp_regex;
// eror response
const throwErrorNow = (sCode, msg) => {
    const errorObject = {
        statusCode: sCode,
        body: JSON.stringify({ message: msg })
    };
    return errorObject;
};
exports.throwErrorNow = throwErrorNow;
const sendSuccessResponse = (sCode, msg) => {
    const successResponse = {
        statusCode: sCode,
        body: JSON.stringify({ message: msg })
    };
    return successResponse;
};
exports.sendSuccessResponse = sendSuccessResponse;


/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "promise-mysql":
/*!********************************!*\
  !*** external "promise-mysql" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("promise-mysql");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/updatepassword/update_pass_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=update_pass_controller.js.map