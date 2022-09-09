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

/***/ "./src/controllers/registration/helper/user_registration_helper_f.ts":
/*!***************************************************************************!*\
  !*** ./src/controllers/registration/helper/user_registration_helper_f.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkUserRegistrationFormData = void 0;
// importing userRegistration Interface for typeChecking
const condition_checking_1 = __webpack_require__(/*! ../../../global/condition_checking */ "./src/global/condition_checking.ts");
const utils_1 = __webpack_require__(/*! ../../../global/utils */ "./src/global/utils.ts");
const checkUserRegistrationFormData = (userData) => {
    // destructure the data from the event.body   
    const { user_name, user_email, user_mobile, user_city, user_country, user_password } = JSON.parse(userData);
    // here we are checking the field of every form is valid or not  
    // if even single field is not valid or null or undefined or empty 
    // return false else return true
    if ((0, condition_checking_1.isDataPassedConditionChecking)(user_name), (0, condition_checking_1.isDataPassedConditionChecking)(user_email), (0, condition_checking_1.isDataPassedConditionChecking)(user_mobile), (0, condition_checking_1.isDataPassedConditionChecking)(user_city), (0, condition_checking_1.isDataPassedConditionChecking)(user_country), (0, condition_checking_1.isDataPassedConditionChecking)(user_password)) {
        // now if we have all the variable then we need to check the email sent by the user to us
        // if the email is not correct then return false else return true
        // cheking email field through regex
        if (utils_1.email_regex.test(user_email)) {
            // here we have also test the email
            // if the email is valid then we are good to go 
            // for return the response to [true] 
            // we have tested the all data above through function
            // and we have also checkced the email
            // now we have to check the [mobile] number
            // to back to the flow of programm
            if (utils_1.phone_number_regex.test(user_mobile)) {
                // our phone number is correct return true for furthur process
                return true;
            }
            else {
                // our pnone number is not correct return false for 
                // Termination
                return false;
            }
        }
        else {
            // here we are returning the [false] becoz our email not passed the condition
            return false;
        }
    }
    else {
        // here we are returning the false to the flow of porgramm 
        // becoz  it may possbile our all field did not passed the condition
        // or we can say that the our One of the field did not passed the condition
        return false;
    }
    // end of main function 
};
exports.checkUserRegistrationFormData = checkUserRegistrationFormData;


/***/ }),

/***/ "./src/controllers/registration/user_registration_controller.ts":
/*!**********************************************************************!*\
  !*** ./src/controllers/registration/user_registration_controller.ts ***!
  \**********************************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthUserRegistration = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const user_registration_helper_f_1 = __webpack_require__(/*! ./helper/user_registration_helper_f */ "./src/controllers/registration/helper/user_registration_helper_f.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
// creating a function that will handle the user registration process 
const AuthUserRegistration = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // now if need to register the user than we need the data from the client | user
    // we can get the data from the [event] object in its body like [event.body];
    // we also need to check that the event.body has the data or not if [event.body] has not the data
    // send the error to the client that we need the data
    // check if the event.body object has data or not
    if (event.body) {
        // if event.body has data we are good to go
        // here we are passing the [event.body] to the [checkUserRegistrationFormData] function 
        // the function will return true only in case the [event.body] has all the data
        // and email is valid
        let con;
        if ((0, user_registration_helper_f_1.checkUserRegistrationFormData)(event.body)) {
            // here if all the data provide by the user then we are good to go
            // for the user registration into the [DB] 
            // for that we need to make the connection to [DB]
            // try block open
            try {
                // resolving  connection promise   
                con = yield (0, db_connection_1.connection)();
                // generate unique id for user
                const user_unique_id = (0, uuid_1.v4)();
                // query 
                const query = `CALL save_user(?,?,?,?,?,?,?)`;
                // destructure the data from the event.body   
                const { user_name, user_email, user_mobile, user_city, user_country, user_password } = JSON.parse(event.body);
                // now we are hashing the password
                const salt = yield bcrypt.genSalt(10);
                // hash the password
                const password_hashed = yield bcrypt.hash(user_password, salt);
                console.log(password_hashed);
                // resolving the query
                const result = yield con.query(query, [user_name, user_email, user_mobile, user_city, user_country, password_hashed, user_unique_id]);
                // checking if [result] has something or not
                if (result) {
                    // if query successfull
                    const successResult = {
                        statusCode: 201,
                        body: JSON.stringify({ message: "Successfully Created User", result: result })
                    };
                    // return the successResult
                    return successResult;
                }
                else {
                    // if query not successfull or something happen unknown
                    const failedResult = {
                        statusCode: 200,
                        body: JSON.stringify({ message: "Failed Query" })
                    };
                    // return the failed result
                    return failedResult;
                }
                // catch block open
            }
            catch (error) {
                console.log(error);
                // declare err msgv var
                let errMsg;
                // checking if error object has something or not 
                if (error) {
                    // assigning the my sql error msg which we have created in the [MYSQL-PROCEDURE-STATEMENT]
                    errMsg = error.sqlMessage;
                }
                // creating the error object
                const errorObject = {
                    statusCode: 502,
                    body: JSON.stringify({ message: error_constant_1.ErrorConst.RegisterUserCon, err: errMsg })
                };
                // return errorObject;
                return errorObject;
            }
            finally {
                // if connection is open
                // close it
                if (con) {
                    con.end();
                }
            }
        }
        else {
            // making error object if the data provided by the user not valid
            const errorObject = {
                statusCode: 200,
                body: JSON.stringify({ message: error_constant_1.ErrorConst.RegisterFiledError })
            };
            // returning the error object   
            return errorObject;
        }
    }
    else {
        // here in case [event.body] is undefined or null or empty
        // then we are returing the response to the client in the JSON format
        // returning the error object
        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.EventBodyEmpty);
    }
    // here the end of main function    
});
exports.AuthUserRegistration = AuthUserRegistration;


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

/***/ "promise-mysql":
/*!********************************!*\
  !*** external "promise-mysql" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("promise-mysql");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/registration/user_registration_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=user_registration_controller.js.map