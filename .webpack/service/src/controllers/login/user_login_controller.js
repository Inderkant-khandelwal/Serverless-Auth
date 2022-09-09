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

/***/ "./src/controllers/login/helper/user_login_helper_f.ts":
/*!*************************************************************!*\
  !*** ./src/controllers/login/helper/user_login_helper_f.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userLoginHelper = void 0;
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
const utils_1 = __webpack_require__(/*! ../../../global/utils */ "./src/global/utils.ts");
const userLoginHelper = (userLoginData) => {
    // here we have receive the user login data 
    let isEmail, isPhoneNumber;
    // step - 1
    // destructure user data
    const { user_username, user_password } = JSON.parse(userLoginData);
    // check if the [Destructured] data is valid or not 
    if ((0, condition_checking_1.isDataPassedConditionChecking)(user_username), (0, condition_checking_1.isDataPassedConditionChecking)(user_password)) {
        // now we have test the condition 
        // now we have two condition that user can send the [data] as username either mobile number or email not other than
        // first we need to check that the data we have in username
        // checking is username is email or not
        if (utils_1.email_regex.test(user_username)) {
            isEmail = true;
            isPhoneNumber = false;
            // if user email 
        }
        else {
            // checking if username is Phonenumber or not
            if (utils_1.phone_number_regex.test(user_username)) {
                // it means user has provided the number in the place of username
                isEmail = false;
                isPhoneNumber = true;
            }
            else {
                // it means user did not provide the [Email or Phonnumber] in place of username
                isEmail = false;
                isPhoneNumber = false;
            }
        }
        // now we have checked the codition that username is [Email] or [Number]
        // in case we did not reveive none of them
        // return false
        if (isEmail) {
            // means username is [Email]
            return true;
        }
        else if (isPhoneNumber) {
            // means usernname is [PhoneNumber]
            return true;
        }
        else {
            // means we did not get the idea what user has provided 
            // falied the condtion 
            return false;
        }
    }
    else {
        // here is somehow the user data does not [Passed] the codition
        // return false
        return false;
    }
};
exports.userLoginHelper = userLoginHelper;


/***/ }),

/***/ "./src/controllers/login/user_login_controller.ts":
/*!********************************************************!*\
  !*** ./src/controllers/login/user_login_controller.ts ***!
  \********************************************************/
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
exports.Login = void 0;
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const user_login_helper_f_1 = __webpack_require__(/*! ./helper/user_login_helper_f */ "./src/controllers/login/helper/user_login_helper_f.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const otp_generator_1 = __importDefault(__webpack_require__(/*! otp-generator */ "otp-generator"));
const email_transporter_1 = __webpack_require__(/*! ../../global/email_transporter */ "./src/global/email_transporter.ts");
// making login controller
const Login = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // declare connection and other variable so that we can assign the connection to it later
    let con;
    let jwt_token_otp;
    // check if [ event.body ] object has data or not
    if (event.body) {
        // check the data which we have receive the from event body
        if ((0, user_login_helper_f_1.userLoginHelper)(event.body)) {
            // if our data which we have received from the [Event.body] object is correct 
            // now here we are good to go for the next flow of our program
            // which is to check the user_credentials in our db 
            // if user exists and user password is valid 
            // generate [JWT] and send it to the user with the [JWT] expirytime 
            // and send a [OTP] to user on their mail for Email Verification
            console.log(event.body + "   " + "Inder");
            try {
                // resolve connection to db
                con = yield (0, db_connection_1.connection)();
                // destructure the data
                const { user_username, user_password } = JSON.parse(event.body);
                // query
                const query_login = `Call login_user(?)`;
                // resolve query
                const result = yield con.query(query_login, [user_username]);
                if (result) {
                    // it means we have found the user in our db now its time to
                    // Authenticate user with password 
                    // if we get the data from the db extract the data
                    const { user_unique_key: user_key, user_email: user_db_email, user_password: user_db_password, user_name: user_db_name, user_verified_status: user_is_verified } = result[0][0];
                    // now we have user_email and user_password
                    // verify the user [DB] password which user sends us in the event.body object
                    // destructure the password send by the user
                    const { user_password: pass } = JSON.parse(event.body);
                    // compare the password
                    const isPasswordMatch = yield bcrypt.compare(pass, user_db_password);
                    console.log(user_db_password);
                    if (isPasswordMatch) {
                        // now one more thing we have to do
                        // is that IF [user-email] already verified 
                        // no need to send the OTP on email but 
                        // IF user is not Verified then continue to the flow
                        // check if user email is verified or not
                        if (user_is_verified && user_is_verified == "Verified") {
                            // means user is Verified no need to send the OTP on mail
                            // generate [JWT] and send it to the user
                            const user_payload = { user_id: user_key };
                            const secret_key = process.env.FinalAuthKey;
                            const token_will_expire_time = { expiresIn: '1h' };
                            const auth_final_user_token = jsonwebtoken_1.default.sign(user_payload, secret_key, token_will_expire_time);
                            // now we have generated the token
                            const userMessage = { access_token: auth_final_user_token, successMessage: "Successfully LoggedIn" };
                            // send the [Success Message to user with Sucess Message]
                            return (0, utils_1.sendSuccessResponse)(200, userMessage);
                        }
                        else {
                            // user is not varified we need to send the [OTP] on mail
                            // generate one  jwt for [OTP] so that we can decide that the 
                            // the otp which is entered into the system is correct or expired
                            // means we have time limited while Authenticated the [OTP] 
                            // of 15 min if user did not entered the [OTP] in the given time 
                            // then otp should not be validate
                            const payload_otp = { name: user_db_name, email: user_db_email };
                            const expires_otp = { expiresIn: '15m' };
                            const env_key_jwt_otp = process.env.otp_jwt_key;
                            jwt_token_otp = jsonwebtoken_1.default.sign(payload_otp, env_key_jwt_otp, expires_otp);
                            // now we need to send the OTP on user mail
                            // generate otp
                            const otpToSend = otp_generator_1.default.generate(8, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
                            // send generated otp to user on his mail
                            // configure mail to send
                            // check gloabl folder [email_transporter.ts] file for configuring the mail auth
                            // which is responsible for sending the mail
                            // console.log(process.env.HOST_G , process.env.PORT , process.env.Email_Id , process.env.Email_Pass)
                            // console.log("kahani yaah taki eeyo");
                            const isEmailSend = yield (0, email_transporter_1.configureTransportOptions)(process.env.HOST_G, process.env.PORT, process.env.Email_UserName, process.env.Email_Pass).sendMail({
                                from: process.env.Email_Id,
                                to: user_db_email,
                                subject: "Your One Time OTP for Email Verify",
                                html: `<p> Dear <em>${user_db_name}</em> Your one time <b>OTP</b> is <strong style="color:red;font-size:50px">${otpToSend}</strong> Valid till 15 minutes </p>`
                            });
                            // console.log("Kahani AAge");
                            // check if email is send or not
                            // if email is send then send 
                            // user response that we have send your otp on mail check your mail
                            // with jwt token 
                            // why jwt token because this is login 
                            // and if user does not have the token then it means he or she not authencated
                            // console.log("Before Email Send");
                            if (isEmailSend) {
                                console.log("After Email Send");
                                // it means email is send  to user
                                const successMessage = { successMessage: "we send you an otp on your email please verify with in 15 Minutes", otp_token: jwt_token_otp };
                                // now we have send the mail to user now save otp to [DB]
                                // if we save otp to db we can easily detect the otp
                                // send by the user is  valid or not only when the jwt is not expired in that case only
                                // user otp query to add 
                                const otp_query = `Call save_otp(?,?,?)`;
                                const status_of_otp = "OTP SENT";
                                // resolving otp query
                                const isOtpUpdated = yield con.query(otp_query, [otpToSend, user_db_email, status_of_otp]);
                                // if otp updated successfully
                                if (isOtpUpdated) {
                                    return (0, utils_1.sendSuccessResponse)(200, successMessage);
                                }
                                else {
                                    // when [OTP] failed to add into the system
                                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.OtpFailedToUpdate);
                                }
                            }
                            else {
                                // when some error occured while sending Email
                                return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.Emailnotsend);
                            }
                        }
                    }
                    else {
                        // if the password not match throw error to client
                        return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.PasswordNotMatched);
                    }
                }
                else {
                    // if we did not get the result or login failed
                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.LoginFailedWhileChecking);
                }
            }
            catch (error) {
                // if something unexpected happen
                console.log("Login Query Catch Error");
                console.log(error);
                // if we did not get the result or login failed
                return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.LoginFailedWhileChecking);
            }
            finally {
                // IF connection is open close it
                if (con) {
                    con.end();
                }
            }
        }
        else {
            // it means our data which is sent by user has failed validation now 
            // throw error to client
            console.log("Inderkant - Data Condition Failed");
            return (0, utils_1.throwErrorNow)(200, error_constant_1.ErrorConst.LoginDataConditionFalied);
        }
    }
    else {
        // if event.body is empty
        // throw error 
        return (0, utils_1.throwErrorNow)(200, error_constant_1.ErrorConst.EventBodyEmpty);
    }
});
exports.Login = Login;


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

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "otp-generator":
/*!********************************!*\
  !*** external "otp-generator" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("otp-generator");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/login/user_login_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=user_login_controller.js.map