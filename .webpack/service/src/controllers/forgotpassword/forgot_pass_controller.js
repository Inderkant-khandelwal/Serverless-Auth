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

/***/ "./src/controllers/forgotpassword/forgot_pass_controller.ts":
/*!******************************************************************!*\
  !*** ./src/controllers/forgotpassword/forgot_pass_controller.ts ***!
  \******************************************************************/
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
exports.ForgotUserPassword = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const email_transporter_1 = __webpack_require__(/*! ../../global/email_transporter */ "./src/global/email_transporter.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const forgot_pass_helper_f_1 = __webpack_require__(/*! ./helper/forgot_pass_helper_f */ "./src/controllers/forgotpassword/helper/forgot_pass_helper_f.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
// create [forgot password] handler
const ForgotUserPassword = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // here our first step to declare connection variable
    let con;
    // now we have to check whether [Event.body] is empty or not
    if (event.body) {
        // means our [event.body] is not empty
        // return sendSuccessResponse(200 , {message:"your datat is" + event.body});
        // now it time to check [event.body] Should Contain the
        // [Valid] email why ? because this is 
        // [Forgot Password] Flow and means user does not remember 
        // their password and also means that user is not loggedin
        // IF user is not loggedin means it will not send the 
        // [Token] thats why we need the [User - Email]
        // check is user data is valid for furthur process
        if ((0, forgot_pass_helper_f_1.ForgotPasswordHelper)(event.body)) {
            // now means our our email is valid for furthur programm
            try {
                // destructure the user-email 
                const { user_email } = JSON.parse(event.body);
                // resolve Connection
                con = yield (0, db_connection_1.connection)();
                // prepare query 
                const user_forgot_password_query = `Call user_forgot_password(?)`;
                // resolve query
                const isUserFound = yield con.query(user_forgot_password_query, [user_email]);
                // check if we found the user
                // IF so then make [one] Link and send it to user email
                // on that link user can change their password
                if (isUserFound) {
                    // means IF user found
                    // destrcut the user name
                    const { user_name: user_db_name, user_unique_key: user_key } = isUserFound[0][0];
                    // generate a [jwt] that will be valid till 15 min
                    // and add the user [unique key ] int the jwt payload
                    const user_payload = { user_id: user_key };
                    const secret_key = process.env.ForgotPasswordkey;
                    const token_will_expire_time = { expiresIn: '15min' };
                    const auth_final_user_token = jsonwebtoken_1.default.sign(user_payload, secret_key, token_will_expire_time);
                    // make one link for sending to user
                    const userLink = `http://localhost:3000/dev/user/newpassword/${auth_final_user_token}`;
                    // now send the mail to user
                    const isEmailSend = yield (0, email_transporter_1.configureTransportOptions)(process.env.HOST_G, process.env.PORT, process.env.Email_UserName, process.env.Email_Pass).sendMail({
                        from: process.env.Email_Id,
                        to: user_email,
                        subject: "Password Reset Link",
                        html: `<p> Dear <em>${user_db_name}</em> click this link for Reset your <b>Password</b> <a href=${userLink}">${userLink}</a> Valid till 15 minutes </p>`
                    });
                    // check if mail is send or not
                    if (isEmailSend) {
                        // means we have finally send the mail to user
                        // notify the user with message
                        const successMessage = { message: "We sends you a Password Reset Link on your mail Valid till 15min", userLink: userLink };
                        // return success response
                        return (0, utils_1.sendSuccessResponse)(200, successMessage);
                    }
                    else {
                        // means IF email not send
                        // return error to user
                        return (0, utils_1.throwErrorNow)(502, error_constant_1.ErrorConst.Emailnotsend);
                    }
                }
                else {
                    // means user not found [Terminate] the programm
                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.invalidUser);
                }
            }
            catch (error) {
                // when error bhai comes handle it
                console.log(error);
                return (0, utils_1.throwErrorNow)(502, error_constant_1.ErrorConst.unknowErrorOccured);
            }
            finally {
                // IF connection is open close the connection
                if (con) {
                    con.end();
                }
            }
        }
        else {
            // it clearly means our email is not valid 
            // [Terminate] the programm
            return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.invalidEmail);
        }
    }
    else {
        // means we did not receive the [event.body] 
        // terminate the programm
        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.EventBodyEmpty);
    }
});
exports.ForgotUserPassword = ForgotUserPassword;


/***/ }),

/***/ "./src/controllers/forgotpassword/helper/forgot_pass_helper_f.ts":
/*!***********************************************************************!*\
  !*** ./src/controllers/forgotpassword/helper/forgot_pass_helper_f.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// making forgot password helper
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgotPasswordHelper = void 0;
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
const utils_1 = __webpack_require__(/*! ../../../global/utils */ "./src/global/utils.ts");
const ForgotPasswordHelper = (userData) => {
    // here we need to destructure the data from [event.body]
    // destruct the email
    const { user_email } = JSON.parse(userData);
    // now we got the email
    // now need to check if email should not be empty or null or undefined
    if ((0, condition_checking_1.isDataPassedConditionChecking)(user_email)) {
        // means that user data is valid for furthur
        // process
        // now its time to check whether 
        // the given [Email] is valid or not
        if (utils_1.email_regex.test(user_email)) {
            // now user email valid we can go for furthur programm flow
            return true;
        }
        else {
            return false;
        }
    }
    else {
        // means our user data is not correct
        return false;
    }
};
exports.ForgotPasswordHelper = ForgotPasswordHelper;


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

/***/ "./src/global/email_transporter.ts":
/*!*****************************************!*\
  !*** ./src/global/email_transporter.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configureTransportOptions = void 0;
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
const configureTransportOptions = (servc, prt, userEmail, userPass) => {
    const finalUserName = userEmail + "@gmail.com";
    const transport = nodemailer_1.default.createTransport({
        service: servc,
        port: prt,
        secure: false,
        auth: {
            user: finalUserName,
            pass: userPass,
        }, tls: {
            rejectUnauthorized: false
        }
    });
    return transport;
};
exports.configureTransportOptions = configureTransportOptions;
//""


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

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/forgotpassword/forgot_pass_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=forgot_pass_controller.js.map