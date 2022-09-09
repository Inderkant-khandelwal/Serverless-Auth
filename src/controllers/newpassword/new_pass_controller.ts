// imorting types from aws-lambda
import { Handler, Context, Callback } from "aws-lambda";
import { ErrorConst } from "../../constant/error_constant";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { NewPasswordHelper } from "./helper/new_pass_helper_f";
import jwt from "jsonwebtoken";
import { connection } from "../../dbconfig/db_connection";
import * as dotenv from "dotenv";
import * as bcrypt from "bcryptjs";




//making controller for [New Password]
const NewUserPassword: Handler = async (event: any, context: Context, callback: Callback) => {
    // Now This is our New Password Controller 
    // First Step Declare Connection Variable

    let con: any;

    // available environment variable
    dotenv.config();

    // Now its time to check whether [event.body] contains data or not

    if (event.body) {
        // means that the [event.body] is not empty
        // now we have to check the [new password] and [confirm Password]
        // should be equal and should not be empty;

        if (NewPasswordHelper(event.body)) {
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
                const userToken = event.pathParameters?.token;

                // console the token
                console.log("Your token = " + userToken);
                // now we have the token
                // now its time to verify the token
                const isTokenVarified: any = jwt.verify(userToken, process.env.ForgotPasswordkey ?? "No Key");

                if (isTokenVarified) {
                    // IF token is verified extract the user id from the tokem
                    const { user_id } = isTokenVarified;

                    console.log("Inder User Id = " + user_id);

                    // extract the user new password from [event.body] object
                    const { new_password } = JSON.parse(event.body);

                    // hash the user password


                    // now we are hashing the password
                    const salt = await bcrypt.genSalt(10);

                    // hash the password
                    const password_hashed = await bcrypt.hash(new_password, salt);

                    // resolve connection to db
                    con = await connection();

                    // const prepared query 
                    const new_pass_query = `Call new_password(? , ?)`;

                    // resolve query
                    const isUserPasswordChanged = await con.query(new_pass_query, [user_id, password_hashed]);

                    // check if new password updated or not THEN  react go accrodingly
                    if (isUserPasswordChanged) {
                        // means our password is updated successfully 
                        // send message to user that their password is updated successfully
                        const successMessage = { message: "Conratulations! your password is now updated you can now login into the system" }
                        return sendSuccessResponse(200, successMessage);


                    } else {
                        // means our password is not updated successfully 
                        // Send error response to user 

                        return throwErrorNow(400, ErrorConst.newPasswordFailedToUpdate);
                    }








                } else {
                    // if token is not varified  throw error
                    return throwErrorNow(401, ErrorConst.invalidToken)
                }

            } catch (e) {
                // IF some error occured
                console.log("Catch run hua");
                console.log(e);
                return throwErrorNow(401, ErrorConst.unknowErrorOccured);

            } finally {
                // if connection open 
                // close it now
                if (con) {
                    con.end();
                }
            }







        } else {
            // means [New Password] and [Confirm Password]
            // is not equal or data is [invalid]
            return throwErrorNow(401, ErrorConst.bothPasswordError);
        }

    } else {
        // event.body does not contains the data
        // [Terminate] the programm

        return throwErrorNow(502, ErrorConst.EventBodyEmpty);
    }
}

export { NewUserPassword }