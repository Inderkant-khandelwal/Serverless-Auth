import { Handler, Context, Callback } from "aws-lambda";
import { ErrorConst } from "../../constant/error_constant";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { UserEmailVerificationHerlper } from "./helper/email_verify_helper";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { connection } from "../../dbconfig/db_connection";



const EmailVerification = async (event: any, context: Context, callback: Callback) => {


    // initialze dotenv variable
    dotenv.config();


    // init con var
    let con: any;
    // step first 
    // check the event.body object is empty or not
    // if not empty through the error


    if (event.body) {
        // now it means our event body is not empty 
        // now we have to validated the data

        if (UserEmailVerificationHerlper(event.body)) {
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
                    const isAuthTokenVerified: any = jwt.verify(user_otp_token, process.env.otp_jwt_key ?? "");


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
                        con = await connection();


                        // query for otp checking
                        const query_otp = `Call check_otp(?,?,?,?)`;


                        const verified_status = "Verified";
                        const failed_to_verified = "Failed"
                        // resolve query
                        const isOtpVerified = await con.query(query_otp, [email, otp, verified_status, failed_to_verified]);


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





                            const user_payload = { user_id: user_key }
                            const secret_key: any = process.env.FinalAuthKey
                            const token_will_expire_time = { expiresIn: '1h' }

                            const auth_final_user_token = jwt.sign(user_payload, secret_key, token_will_expire_time);


                            // now we have generated the token
                            const userMessage = { access_token: auth_final_user_token, successMessage: "Successfully Verified" };

                            // send the [Success Message to user with Sucess Message]
                            return sendSuccessResponse(200, userMessage);



                        } else {
                            // otp not varified 

                            return throwErrorNow(401, ErrorConst.otpNotVarified);
                        }













                    } else {
                        // this means user is not trusted break the flow or terminated the programm
                        return throwErrorNow(401, ErrorConst.tokenNotValidAuth);
                    }





                } else {
                    // in case we did not get the headers
                    return throwErrorNow(400, ErrorConst.headersNotAvailable);
                }


            } catch (error: any) {
                // in case some error occured
                console.log(error);
                const erroMess = error.sqlMessage;
                console.log("catch run hua")
                return throwErrorNow(400, erroMess ?? ErrorConst.headersNotAvailable);
            } finally {
                if (con) {
                    con.end();
                }
            }



        } else {
            // our otp fails to validate
            // send error to the client

            return throwErrorNow(400, ErrorConst.otpnotvalidclienterror);
        }

    } else {
        // event.body is empty throw the error to the client
        // that the body is required

        return throwErrorNow(400, ErrorConst.EventBodyEmpty);

    }


}

export { EmailVerification }