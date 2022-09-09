// importing [Handler , Context , Callback]
import { Handler, Context, Callback } from "aws-lambda";
import { ErrorConst } from "../../constant/error_constant";
import { connection } from "../../dbconfig/db_connection";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { UserUpdationHelper } from "./helper/user_updation_helper_f";
import jwt from "jsonwebtoken";
import * as dotevn from "dotenv";


// create a controller for handling the [User-Details-Update] part

const UserDetailsUpdate: Handler = async (event: any, context: Context, callback: Callback) => {


    // config dotenv 
    dotevn.config();


    // declare connection var
    let con: any;
    // here we are creating a function which will be responsible for the 
    // for updating the user details 

    // step first check [event.body] Object
    // IF [event.body] is empty or not

    if (event.body) {
        // means we have got something in the [event.body] object

        // check whether the [event.body] has proper data or not 
        // means any field is 
        if (UserUpdationHelper(event.body)) {
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
                        const isTokenValid: any = jwt.verify(token, process.env.FinalAuthKey ?? "No Key");

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
                            con = await connection();

                            // query
                            const update_query = `Call update_user(?,?,?,?)`;

                            // resolve query
                            const updateResult = await con.query(update_query, [user_id, user_mobile, user_city, user_country]);

                            if (updateResult) {
                                // if our [DB] successfull update the records
                                console.log(updateResult);
                                const successMessage = "Congratulations your data updated Successfully !";
                                return sendSuccessResponse(200, { serverResponse: successMessage })

                            } else {
                                // when our updation failed 

                                return throwErrorNow(502, ErrorConst.updationFailedInDb);

                            }



                        } else {
                            // token is not valid
                            return throwErrorNow(401, ErrorConst.invalidToken);

                        }



                    } else {
                        // token is not here
                        return throwErrorNow(401, ErrorConst.tokenNotAvailableInHeader);

                    }


                } catch (error) {
                    // some error occured 
                    console.log(error);

                    return throwErrorNow(401, ErrorConst.unknowErrorOccured);
                } finally {
                    // IF connection is open close it 

                    if (con) {
                        con.end();
                    }
                }

                // end of else of [Header Checking]
            } else {
                // we did not got the headers
                return throwErrorNow(400, ErrorConst.headersNotAvailable);
            }






        } else {
            // this codition will only run IF we failed to satisfy the codition
            return throwErrorNow(400, ErrorConst.updateFieldEmpty);
        }
        // return sendSuccessResponse(200,{successMessage:"Welcome Service is working fine"});

    } else {
        // means we did not got something in the [event.body]
        // send error message to client
        return throwErrorNow(400, ErrorConst.EventBodyEmpty)

    }




}

export { UserDetailsUpdate }
