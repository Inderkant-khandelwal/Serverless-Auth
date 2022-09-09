// importing Handler && Callback && Context types form aws-lambda type defination
import { Handler, Context, Callback } from "aws-lambda";
import { ErrorConst } from "../../constant/error_constant";
import { connection } from "../../dbconfig/db_connection";
import { checkUserRegistrationFormData } from "./helper/user_registration_helper_f";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { throwErrorNow } from "../../global/utils";

// creating a function that will handle the user registration process 

const AuthUserRegistration: Handler = async (event: any, context: Context, callback: Callback) => {


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

        let con: any;


        if (checkUserRegistrationFormData(event.body)) {

            // here if all the data provide by the user then we are good to go
            // for the user registration into the [DB] 
            // for that we need to make the connection to [DB]


            // try block open
            try {
                // resolving  connection promise   
                con = await connection();


                // generate unique id for user
                const user_unique_id = uuidv4();

                // query 
                const query = `CALL save_user(?,?,?,?,?,?,?)`;


                // destructure the data from the event.body   
                const { user_name, user_email, user_mobile, user_city, user_country, user_password } = JSON.parse(event.body);


                // now we are hashing the password
                const salt = await bcrypt.genSalt(10);

                // hash the password
                const password_hashed = await bcrypt.hash(user_password, salt);
                console.log(password_hashed);

                // resolving the query
                const result = await con.query(query, [user_name, user_email, user_mobile, user_city, user_country, password_hashed, user_unique_id]);

                // checking if [result] has something or not
                if (result) {
                    // if query successfull
                    const successResult = {
                        statusCode: 201,
                        body: JSON.stringify({ message: "Successfully Created User", result: result })
                    }

                    // return the successResult
                    return successResult;


                } else {
                    // if query not successfull or something happen unknown
                    const failedResult = {
                        statusCode: 200,
                        body: JSON.stringify({ message: "Failed Query" })

                    }

                    // return the failed result
                    return failedResult;
                }



                // catch block open
            } catch (error: any) {

                console.log(error);
                // declare err msgv var
                let errMsg: any;

                // checking if error object has something or not 
                if (error) {
                    // assigning the my sql error msg which we have created in the [MYSQL-PROCEDURE-STATEMENT]
                    errMsg = error.sqlMessage
                }

                // creating the error object
                const errorObject = {
                    statusCode: 502,
                    body: JSON.stringify({ message: ErrorConst.RegisterUserCon, err: errMsg })
                }


                // return errorObject;
                return errorObject;

            } finally {
                // if connection is open
                // close it

                if (con) {
                    con.end();
                }

            }




        } else {

            // making error object if the data provided by the user not valid

            const errorObject = {
                statusCode: 200,
                body: JSON.stringify({ message: ErrorConst.RegisterFiledError })
            }

            // returning the error object   
            return errorObject;
        }








    } else {
        // here in case [event.body] is undefined or null or empty
        // then we are returing the response to the client in the JSON format


        // returning the error object
        return throwErrorNow(400, ErrorConst.EventBodyEmpty);



    }




    // here the end of main function    
}


export { AuthUserRegistration }
