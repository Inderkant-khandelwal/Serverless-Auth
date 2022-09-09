import { Handler, Context, Callback } from "aws-lambda";
import { connection } from "../../dbconfig/db_connection";
import { ErrorConst } from "../../constant/error_constant";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { userLoginHelper } from "./helper/user_login_helper_f";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otp from "otp-generator";
import { configureTransportOptions } from "../../global/email_transporter";







// making login controller
const Login: Handler = async (event: any, context: Context, callback: Callback) => {

    // declare connection and other variable so that we can assign the connection to it later
    let con: any;

    let jwt_token_otp: any;

    // check if [ event.body ] object has data or not
    if (event.body) {



        // check the data which we have receive the from event body
        if (userLoginHelper(event.body)) {
            // if our data which we have received from the [Event.body] object is correct 
            // now here we are good to go for the next flow of our program
            // which is to check the user_credentials in our db 
            // if user exists and user password is valid 
            // generate [JWT] and send it to the user with the [JWT] expirytime 
            // and send a [OTP] to user on their mail for Email Verification
            console.log(event.body + "   " + "Inder");
            try {

                // resolve connection to db
                con = await connection();

                // destructure the data
                const { user_username, user_password } = JSON.parse(event.body);


                // query
                const query_login = `Call login_user(?)`;


                // resolve query
                const result = await con.query(query_login, [user_username]);

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
                    const isPasswordMatch = await bcrypt.compare(pass, user_db_password);

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

                            const user_payload = { user_id: user_key }
                            const secret_key: any = process.env.FinalAuthKey
                            const token_will_expire_time = { expiresIn: '1h' }

                            const auth_final_user_token = jwt.sign(user_payload, secret_key, token_will_expire_time);


                            // now we have generated the token
                            const userMessage = { access_token: auth_final_user_token, successMessage: "Successfully LoggedIn" };

                            // send the [Success Message to user with Sucess Message]
                            return sendSuccessResponse(200, userMessage);

                        } else {
                            // user is not varified we need to send the [OTP] on mail
                            // generate one  jwt for [OTP] so that we can decide that the 
                            // the otp which is entered into the system is correct or expired
                            // means we have time limited while Authenticated the [OTP] 
                            // of 15 min if user did not entered the [OTP] in the given time 
                            // then otp should not be validate

                            const payload_otp = { name: user_db_name, email: user_db_email };
                            const expires_otp = { expiresIn: '15m' };
                            const env_key_jwt_otp: any = process.env.otp_jwt_key;
                            jwt_token_otp = jwt.sign(payload_otp, env_key_jwt_otp, expires_otp);


                            // now we need to send the OTP on user mail

                            // generate otp
                            const otpToSend = otp.generate(8, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

                            // send generated otp to user on his mail


                            // configure mail to send
                            // check gloabl folder [email_transporter.ts] file for configuring the mail auth
                            // which is responsible for sending the mail
                            // console.log(process.env.HOST_G , process.env.PORT , process.env.Email_Id , process.env.Email_Pass)
                            // console.log("kahani yaah taki eeyo");
                            const isEmailSend = await configureTransportOptions(process.env.HOST_G, process.env.PORT, process.env.Email_UserName, process.env.Email_Pass).sendMail({
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
                                const successMessage = { successMessage: "we send you an otp on your email please verify with in 15 Minutes", otp_token: jwt_token_otp }


                                // now we have send the mail to user now save otp to [DB]
                                // if we save otp to db we can easily detect the otp
                                // send by the user is  valid or not only when the jwt is not expired in that case only

                                // user otp query to add 
                                const otp_query = `Call save_otp(?,?,?)`;

                                const status_of_otp = "OTP SENT";
                                // resolving otp query
                                const isOtpUpdated = await con.query(otp_query, [otpToSend, user_db_email, status_of_otp]);



                                // if otp updated successfully
                                if (isOtpUpdated) {
                                    return sendSuccessResponse(200, successMessage);
                                } else {
                                    // when [OTP] failed to add into the system
                                    return throwErrorNow(401, ErrorConst.OtpFailedToUpdate);
                                }





                            } else {
                                // when some error occured while sending Email
                                return throwErrorNow(401, ErrorConst.Emailnotsend);
                            }




                        }









                    } else {
                        // if the password not match throw error to client
                        return throwErrorNow(401, ErrorConst.PasswordNotMatched);

                    }





                } else {

                    // if we did not get the result or login failed
                    return throwErrorNow(401, ErrorConst.LoginFailedWhileChecking);

                }

            } catch (error) {
                // if something unexpected happen
                console.log("Login Query Catch Error");
                console.log(error);

                // if we did not get the result or login failed
                return throwErrorNow(401, ErrorConst.LoginFailedWhileChecking);
            }
            finally {
                // IF connection is open close it
                if (con) {
                    con.end();
                }
            }





        } else {
            // it means our data which is sent by user has failed validation now 
            // throw error to client
            console.log("Inderkant - Data Condition Failed");
            return throwErrorNow(200, ErrorConst.LoginDataConditionFalied);
        }



    } else {
        // if event.body is empty
        // throw error 

        return throwErrorNow(200, ErrorConst.EventBodyEmpty);

    }
}

export { Login }