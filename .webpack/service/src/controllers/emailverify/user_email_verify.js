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

/***/ "./src/controllers/emailverify/helper/email_verify_helper.ts":
/*!*******************************************************************!*\
  !*** ./src/controllers/emailverify/helper/email_verify_helper.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEmailVerificationHerlper = void 0;
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
const utils_1 = __webpack_require__(/*! ../../../global/utils */ "./src/global/utils.ts");
const UserEmailVerificationHerlper = (userData) => {
    // we get the data in [userDat] variable
    // we need to destructuture the data
    // destructurin the otp from the event.body 
    const { otp } = JSON.parse(userData);
    console.log("ye ara " + otp);
    // verify the otp is valid or not
    if ((0, condition_checking_1.isDataPassedConditionChecking)(otp)) {
        // now the otp passes the condition
        // now we have to check 
        // if the opt is valid or not
        // means we need the otp only eight digit not more than and 
        // only numeric type
        if (utils_1.otp_regex.test(otp)) {
            // if otp match then only pass the flow for furthur
            // else return false terminate the flow by sending the error to client
            return true;
        }
        else {
            // otp not matched
            console.log("OTP not matched");
            return false;
        }
    }
    else {
        // in case otp did not passed the codition
        return false;
    }
};
exports.UserEmailVerificationHerlper = UserEmailVerificationHerlper;


/***/ }),

/***/ "./src/controllers/emailverify/user_email_verify.ts":
/*!**********************************************************!*\
  !*** ./src/controllers/emailverify/user_email_verify.ts ***!
  \**********************************************************/
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
exports.EmailVerification = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const email_verify_helper_1 = __webpack_require__(/*! ./helper/email_verify_helper */ "./src/controllers/emailverify/helper/email_verify_helper.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const EmailVerification = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // initialze dotenv variable
    dotenv.config();
    // init con var
    let con;
    // step first 
    // check the event.body object is empty or not
    // if not empty through the error
    if (event.body) {
        // now it means our event body is not empty 
        // now we have to validated the data
        if ((0, email_verify_helper_1.UserEmailVerificationHerlper)(event.body)) {
            // here it means we have test the otp and all condition
            // now client has sent us the otp
            // which is [Eight numeric Digit]
            // now otp verification is [Protected Route] means
            // user need to send us the token
            // in our case 
            // only one
            // getting the both token
            try {
                if (event.headers.Authorization) {
                    // if we get the headers
                    // get the headers
                    const auth_token = event.headers.Authorization;
                    // extract user auth token
                    const user_otp_token = auth_token.split(" ")[1];
                    // verify the token
                    const isAuthTokenVerified = jsonwebtoken_1.default.verify(user_otp_token, (_a = process.env.otp_jwt_key) !== null && _a !== void 0 ? _a : "");
                    // check if the [user auth token is verifiend or not]
                    if (isAuthTokenVerified) {
                        console.log("true condition");
                        console.log(isAuthTokenVerified);
                        // it means [user auth is valid and user is trustable]
                        // extract the user details so that we can make sure that the
                        // otp send by the user is valid or not
                        const { name, email } = isAuthTokenVerified;
                        console.log("destructure result");
                        console.log(name, email);
                        // get the otp from [event.body]
                        const { otp } = JSON.parse(event.body);
                        // resolve connection now
                        con = yield (0, db_connection_1.connection)();
                        // query for otp checking
                        const query_otp = `Call check_otp(?,?,?,?)`;
                        const verified_status = "Verified";
                        const failed_to_verified = "Failed";
                        // resolve query
                        const isOtpVerified = yield con.query(query_otp, [email, otp, verified_status, failed_to_verified]);
                        // check if otp verifiend and also update the [user_verified_status  = Verified] if otp is match
                        if (isOtpVerified) {
                            // now our otp is verified 
                            // generaten then [access token] so that we can verify the user 
                            // when he will try to access the [Private Resource]
                            console.log("below is the data ");
                            console.log(isOtpVerified);
                            // extract user unique kye
                            const { user_unique_key: user_key } = isOtpVerified[0][0];
                            // now we have the key now generate the [Access Token ] so that
                            // the user can have access to [Private Route]
                            // let's generate the [Access Token]
                            // encrypt user_id 
                            const user_payload = { user_id: user_key };
                            const secret_key = process.env.FinalAuthKey;
                            const token_will_expire_time = { expiresIn: '1h' };
                            const auth_final_user_token = jsonwebtoken_1.default.sign(user_payload, secret_key, token_will_expire_time);
                            // now we have generated the token
                            const userMessage = { access_token: auth_final_user_token, successMessage: "Successfully Verified" };
                            // send the [Success Message to user with Sucess Message]
                            return (0, utils_1.sendSuccessResponse)(200, userMessage);
                        }
                        else {
                            // otp not varified 
                            return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.otpNotVarified);
                        }
                    }
                    else {
                        // this means user is not trusted break the flow or terminated the programm
                        return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.tokenNotValidAuth);
                    }
                }
                else {
                    // in case we did not get the headers
                    return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.headersNotAvailable);
                }
            }
            catch (error) {
                // in case some error occured
                console.log(error);
                const erroMess = error.sqlMessage;
                console.log("catch run hua");
                return (0, utils_1.throwErrorNow)(400, erroMess !== null && erroMess !== void 0 ? erroMess : error_constant_1.ErrorConst.headersNotAvailable);
            }
            finally {
                if (con) {
                    con.end();
                }
            }
        }
        else {
            // our otp fails to validate
            // send error to the client
            return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.otpnotvalidclienterror);
        }
    }
    else {
        // event.body is empty throw the error to the client
        // that the body is required
        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.EventBodyEmpty);
    }
});
exports.EmailVerification = EmailVerification;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/emailverify/user_email_verify.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=user_email_verify.js.map