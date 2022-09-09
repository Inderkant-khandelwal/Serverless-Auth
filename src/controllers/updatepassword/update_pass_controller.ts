// importing types from [aws-lambda]
import { Handler, Context, Callback } from "aws-lambda";

import { ErrorConst } from "../../constant/error_constant";
import { sendSuccessResponse, throwErrorNow } from "../../global/utils";
import { UpdatePasswordHelper } from "./helper/user_pass_updation_helper_f";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { connection } from "../../dbconfig/db_connection";
import * as bcrypt from "bcryptjs";




// making [Update Password] Controller
const UpdateUserPassword: Handler = async (event: any, context: Context, Callback: Callback) => {

  // config dotenv variable
  dotenv.config();

  // here first we need to declare the [DB] connection var
  let con: any;

  // now we need to check that the [event.body] should not be empty

  if (event.body) {
    // means we have somedata in the body 
    // but we have to make sure that 
    // the data in the password field should be valid

    if (UpdatePasswordHelper(event.body)) {
      // Means we have finally check that the [Password] is valid

      // now we have to check if the user header contains [Authorization] token
      if (event.headers.Authorization) {
        // Means our [Authorization] has some data lets 
        // find out what kind of data
        // it have

        try {

          // extract token
          const token = event.headers.Authorization.split(" ")[1];

          // checking token [valid or not]
          // not valid [Terminate] the programm

          // verify token
          const isTokenValid: any = jwt.verify(token, process.env.FinalAuthKey ?? "No key");

          if (isTokenValid) {
            // if tokken is valid THEN
            // extract the user id from token
            const { user_id } = isTokenValid;

            // destruct user password
            const { user_password } = JSON.parse(event.body);

            // now we need to [hash] the user password

            // now we are hashing the password
            const salt = await bcrypt.genSalt(10);

            // hash the password
            const password_hashed = await bcrypt.hash(user_password, salt);


            // now we have the [User-Id]
            // now resolve connection

            con = await connection();


            // prepare query
            const update_password_query = `Call update_user_password(?,?)`;

            // resolve query

            const isPasswordUpdated = await con.query(update_password_query, [user_id, password_hashed]);


            // check we have successfully updated the password or not
            if (isPasswordUpdated) {
              // means we have successfully updated the [password]
              // send success message to user that 
              // password has been updated into the [DB]

              // sucess message for user
              const successMessage = { message: "Congrats! Your password updated Successfully" }

              // send success message to usr
              return sendSuccessResponse(200, successMessage);


            } else {
              // IF somehow the password failed to update
              // send error to clinet that [Password] not updated

              return throwErrorNow(400, ErrorConst.passwordNotUpdatedIntoDb);


            }






          } else {
            // means token is not valid [Terminate] the programm

            return throwErrorNow(401, ErrorConst.invalidToken);

          }


          // check 
        } catch (error) {
          // means some error occurs
          console.log(error);

          return throwErrorNow(401, ErrorConst.unknowErrorOccured);
        } finally {
          // IF connection is open 
          // close the connection

          if (con) {
            con.end();
          }
        }


      } else {
        // means we dont have [data] into the [Authorization]
        // [Terminate] the programm

        return throwErrorNow(401, ErrorConst.headersNotAvailable);
      }


    } else {
      // it means our password not [valid]
      // [Terminated] the programm

      return throwErrorNow(401, ErrorConst.passwordNotValidValidationFailed);
    }


  } else {
    // it means we dont have anything in the body
    // send error to user that 
    // for updating the password 
    // we need password
    return throwErrorNow(400, ErrorConst.passWordRequiredForUpdate);

  }


}

export { UpdateUserPassword }