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

/***/ "./src/controllers/newpassword/helper/new_pass_helper_f.ts":
/*!*****************************************************************!*\
  !*** ./src/controllers/newpassword/helper/new_pass_helper_f.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordHelper = void 0;
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
const NewPasswordHelper = (userData) => {
    // destructure the data from the [event.body]
    // destructuring data
    const { new_password, confirm_password } = JSON.parse(userData);
    // check if [new Passoword] and [confirm_password] not empty or null or undefined
    if ((0, condition_checking_1.isDataPassedConditionChecking)(new_password) && (0, condition_checking_1.isDataPassedConditionChecking)(confirm_password)) {
        // now means our [new passoword] and [confirm password] is valid for furthur process
        // check if both password is correct or not
        if (new_password == confirm_password) {
            // means our [new password] is equals to [confirm password]
            // pass the flow back to the programm
            return true;
        }
        else {
            // means both password is not equal
            // [Terminate] the programm
            return false;
        }
    }
    else {
        // means [New Password] and [Confirm Password] is not valid 
        // terminate the programm
        return false;
    }
};
exports.NewPasswordHelper = NewPasswordHelper;


/***/ }),

/***/ "./src/controllers/newpassword/new_pass_controller.ts":
/*!************************************************************!*\
  !*** ./src/controllers/newpassword/new_pass_controller.ts ***!
  \************************************************************/
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
exports.NewUserPassword = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const new_pass_helper_f_1 = __webpack_require__(/*! ./helper/new_pass_helper_f */ "./src/controllers/newpassword/helper/new_pass_helper_f.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
//making controller for [New Password]
const NewUserPassword = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // Now This is our New Password Controller 
    // First Step Declare Connection Variable
    var _a, _b;
    let con;
    // available environment variable
    dotenv.config();
    // Now its time to check whether [event.body] contains data or not
    if (event.body) {
        // means that the [event.body] is not empty
        // now we have to check the [new password] and [confirm Password]
        // should be equal and should not be empty;
        if ((0, new_pass_helper_f_1.NewPasswordHelper)(event.body)) {
            // Now our both password is equal but we need 
            // only new passworf not confirm  password [Confirm password] was only for equality validation prupose
            // now our flow will be now 
            // customer is not loggedin 
            // so we need to verify the [token] which we have send in the user email
            // in the token we have store the user id 
            // and our token expiry time is [15] min if somehow 
            // user will not able to click the link withiN 15min 
            // the link will expire and we will [Terminate] the programm
            // so we need to make sure that [Token] is not expired and if expired thorw error to user
            // If token is not expired extract user id from [Token]
            // and take new password field from [event.body]
            // and update the user password where user_unique_key  = userid
            // hope you are understanding the programm flow
            try {
                // extract the token from path parameter 
                const userToken = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.token;
                // console the token
                console.log("Your token = " + userToken);
                // now we have the token
                // now its time to verify the token
                const isTokenVarified = jsonwebtoken_1.default.verify(userToken, (_b = process.env.ForgotPasswordkey) !== null && _b !== void 0 ? _b : "No Key");
                if (isTokenVarified) {
                    // IF token is verified extract the user id from the tokem
                    const { user_id } = isTokenVarified;
                    console.log("Inder User Id = " + user_id);
                    // extract the user new password from [event.body] object
                    const { new_password } = JSON.parse(event.body);
                    // hash the user password
                    // now we are hashing the password
                    const salt = yield bcrypt.genSalt(10);
                    // hash the password
                    const password_hashed = yield bcrypt.hash(new_password, salt);
                    // resolve connection to db
                    con = yield (0, db_connection_1.connection)();
                    // const prepared query 
                    const new_pass_query = `Call new_password(? , ?)`;
                    // resolve query
                    const isUserPasswordChanged = yield con.query(new_pass_query, [user_id, password_hashed]);
                    // check if new password updated or not THEN  react go accrodingly
                    if (isUserPasswordChanged) {
                        // means our password is updated successfully 
                        // send message to user that their password is updated successfully
                        const successMessage = { message: "Conratulations! your password is now updated you can now login into the system" };
                        return (0, utils_1.sendSuccessResponse)(200, successMessage);
                    }
                    else {
                        // means our password is not updated successfully 
                        // Send error response to user 
                        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.newPasswordFailedToUpdate);
                    }
                }
                else {
                    // if token is not varified  throw error
                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.invalidToken);
                }
            }
            catch (e) {
                // IF some error occured
                console.log("Catch run hua");
                console.log(e);
                return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.unknowErrorOccured);
            }
            finally {
                // if connection open 
                // close it now
                if (con) {
                    con.end();
                }
            }
        }
        else {
            // means [New Password] and [Confirm Password]
            // is not equal or data is [invalid]
            return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.bothPasswordError);
        }
    }
    else {
        // event.body does not contains the data
        // [Terminate] the programm
        return (0, utils_1.throwErrorNow)(502, error_constant_1.ErrorConst.EventBodyEmpty);
    }
});
exports.NewUserPassword = NewUserPassword;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/newpassword/new_pass_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=new_pass_controller.js.map