// importing types from aws lambda
import { Handler, Context, Callback } from "aws-lambda";
import { Connection } from "promise-mysql";
import { ErrorConst } from "../../constant/error_constant";
import { connection } from "../../dbconfig/db_connection";
import { configureTransportOptions } from "../../global/email_transporter";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { ForgotPasswordHelper } from "./helper/forgot_pass_helper_f";
import jwt from "jsonwebtoken";


// create [forgot password] handler

const ForgotUserPassword: Handler = async (event: any, context: Context, callback: Callback) => {
    // here our first step to declare connection variable
    let con: any;

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
        if (ForgotPasswordHelper(event.body)) {
            // now means our our email is valid for furthur programm

            try {

                // destructure the user-email 
                const { user_email } = JSON.parse(event.body);


                // resolve Connection
                con = await connection();

                // prepare query 
                const user_forgot_password_query = `Call user_forgot_password(?)`;


                // resolve query
                const isUserFound = await con.query(user_forgot_password_query, [user_email]);

                // check if we found the user
                // IF so then make [one] Link and send it to user email
                // on that link user can change their password

                if (isUserFound) {
                    // means IF user found

                    // destrcut the user name
                    const { user_name: user_db_name, user_unique_key: user_key } = isUserFound[0][0];

                    // generate a [jwt] that will be valid till 15 min
                    // and add the user [unique key ] int the jwt payload

                    const user_payload = { user_id: user_key }
                    const secret_key: any = process.env.ForgotPasswordkey
                    const token_will_expire_time = { expiresIn: '15min' }

                    const auth_final_user_token = jwt.sign(user_payload, secret_key, token_will_expire_time);

                    // make one link for sending to user
                    const userLink = `http://localhost:3000/dev/user/newpassword/${auth_final_user_token}`;

                    // now send the mail to user
                    const isEmailSend = await configureTransportOptions(process.env.HOST_G, process.env.PORT, process.env.Email_UserName, process.env.Email_Pass).sendMail({
                        from: process.env.Email_Id,
                        to: user_email,
                        subject: "Password Reset Link",
                        html: `<p> Dear <em>${user_db_name}</em> click this link for Reset your <b>Password</b> <a href=${userLink}">${userLink}</a> Valid till 15 minutes </p>`

                    });

                    // check if mail is send or not
                    if (isEmailSend) {
                        // means we have finally send the mail to user
                        // notify the user with message
                        const successMessage = { message: "We sends you a Password Reset Link on your mail Valid till 15min", userLink: userLink }

                        // return success response
                        return sendSuccessResponse(200, successMessage)
                    } else {
                        // means IF email not send
                        // return error to user

                        return throwErrorNow(502, ErrorConst.Emailnotsend);

                    }




                } else {
                    // means user not found [Terminate] the programm
                    return throwErrorNow(401, ErrorConst.invalidUser);
                }



            } catch (error) {
                // when error bhai comes handle it
                console.log(error);

                return throwErrorNow(502, ErrorConst.unknowErrorOccured);
            } finally {
                // IF connection is open close the connection
                if (con) {
                    con.end();
                }

            }


        } else {
            // it clearly means our email is not valid 
            // [Terminate] the programm

            return throwErrorNow(401, ErrorConst.invalidEmail);
        }

    } else {
        // means we did not receive the [event.body] 
        // terminate the programm

        return throwErrorNow(400, ErrorConst.EventBodyEmpty);

    }
}

export { ForgotUserPassword }