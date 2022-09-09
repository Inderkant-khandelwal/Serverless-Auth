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

/***/ "./src/controllers/updatedetails/helper/user_updation_helper_f.ts":
/*!************************************************************************!*\
  !*** ./src/controllers/updatedetails/helper/user_updation_helper_f.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserUpdationHelper = void 0;
const utils_1 = __webpack_require__(/*! ../../../global/utils */ "./src/global/utils.ts");
const UserUpdationHelper = (userData) => {
    // here we need to destruct the data receive from [event.body]
    // here [userData] contains the [event.body] data
    // destructure the [userData]
    const { user_mobile, user_city, user_country } = JSON.parse(userData);
    console.log("b--------------");
    console.log(user_mobile);
    // now we have destructre the data so its time to check whether any field  [null or undefined or empty]
    // Note in case of update it is the choice of user whether to update the all field or somefield
    //Note that we need at least anyone field for update so we have to make sure that 
    // we should get the at least one field [data] from the user
    // if all field is empty [Terminate] the programm
    if (user_mobile || user_city || user_country) {
        // if anyone value is present in the any column
        // then it means the user only wants to update that field
        // now we have to make sure that the if the field is [user_mobile] THEN
        // it should be validate
        // how to do that
        if (user_mobile) {
            // it means [user also wants to updat the mobile or only mobile]
            // lets check the phone number validation
            if (utils_1.phone_number_regex.test(user_mobile)) {
                // means we have test the mobile 
                return true;
            }
            else {
                // [Termiate] the programm we can not push the wrong number into the [DB]
                return false;
            }
        }
        // in any case [Phone Number] is [empty | null | undefined] the above condition will not 
        // run but before above we have one more IF condition so if nay variable has data
        // this IF condition will run
        return true;
    }
    else {
        // all field are empty
        // [Terminate] the program
        return false;
    }
};
exports.UserUpdationHelper = UserUpdationHelper;


/***/ }),

/***/ "./src/controllers/updatedetails/user_details_update_controller.ts":
/*!*************************************************************************!*\
  !*** ./src/controllers/updatedetails/user_details_update_controller.ts ***!
  \*************************************************************************/
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
exports.UserDetailsUpdate = void 0;
const error_constant_1 = __webpack_require__(/*! ../../constant/error_constant */ "./src/constant/error_constant.ts");
const db_connection_1 = __webpack_require__(/*! ../../dbconfig/db_connection */ "./src/dbconfig/db_connection.ts");
const utils_1 = __webpack_require__(/*! ../../global/utils */ "./src/global/utils.ts");
const user_updation_helper_f_1 = __webpack_require__(/*! ./helper/user_updation_helper_f */ "./src/controllers/updatedetails/helper/user_updation_helper_f.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const dotevn = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
// create a controller for handling the [User-Details-Update] part
const UserDetailsUpdate = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // config dotenv 
    dotevn.config();
    // declare connection var
    let con;
    // here we are creating a function which will be responsible for the 
    // for updating the user details 
    // step first check [event.body] Object
    // IF [event.body] is empty or not
    if (event.body) {
        // means we have got something in the [event.body] object
        // check whether the [event.body] has proper data or not 
        // means any field is 
        if ((0, user_updation_helper_f_1.UserUpdationHelper)(event.body)) {
            // it means that [Event.body] has some data or that is need to be updated in the [Db]
            // before that we need to verify the [Token] of user
            // check if we got the tokens in header or not
            // we did not got the token [Terminated] the programm
            if (event.headers.Authorization) {
                try {
                    // extract the token from the headers
                    const header_token = event.headers.Authorization;
                    const token = header_token.split(" ")[1];
                    if (token) {
                        // verify the user [Token]
                        const isTokenValid = jsonwebtoken_1.default.verify(token, (_a = process.env.FinalAuthKey) !== null && _a !== void 0 ? _a : "No Key");
                        if (isTokenValid) {
                            // token is Valid
                            //  return sendSuccessResponse(200, {message:isTokenValid , token:token});
                            // now our user [Token] is valid we need to detect whether the 
                            // user exists in our [DB] corresponds to [user id] which we receive from the
                            // user [token]
                            // user id
                            const { user_id } = isTokenValid;
                            // destructure the data
                            const { user_mobile, user_city, user_country } = JSON.parse(event.body);
                            // resolve connection
                            con = yield (0, db_connection_1.connection)();
                            // query
                            const update_query = `Call update_user(?,?,?,?)`;
                            // resolve query
                            const updateResult = yield con.query(update_query, [user_id, user_mobile, user_city, user_country]);
                            if (updateResult) {
                                // if our [DB] successfull update the records
                                console.log(updateResult);
                                const successMessage = "Congratulations your data updated Successfully !";
                                return (0, utils_1.sendSuccessResponse)(200, { serverResponse: successMessage });
                            }
                            else {
                                // when our updation failed 
                                return (0, utils_1.throwErrorNow)(502, error_constant_1.ErrorConst.updationFailedInDb);
                            }
                        }
                        else {
                            // token is not valid
                            return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.invalidToken);
                        }
                    }
                    else {
                        // token is not here
                        return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.tokenNotAvailableInHeader);
                    }
                }
                catch (error) {
                    // some error occured 
                    console.log(error);
                    return (0, utils_1.throwErrorNow)(401, error_constant_1.ErrorConst.unknowErrorOccured);
                }
                finally {
                    // IF connection is open close it 
                    if (con) {
                        con.end();
                    }
                }
                // end of else of [Header Checking]
            }
            else {
                // we did not got the headers
                return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.headersNotAvailable);
            }
        }
        else {
            // this codition will only run IF we failed to satisfy the codition
            return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.updateFieldEmpty);
        }
        // return sendSuccessResponse(200,{successMessage:"Welcome Service is working fine"});
    }
    else {
        // means we did not got something in the [event.body]
        // send error message to client
        return (0, utils_1.throwErrorNow)(400, error_constant_1.ErrorConst.EventBodyEmpty);
    }
});
exports.UserDetailsUpdate = UserDetailsUpdate;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controllers/updatedetails/user_details_update_controller.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=user_details_update_controller.js.map