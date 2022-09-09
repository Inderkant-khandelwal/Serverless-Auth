// importing userRegistration Interface for typeChecking
import { isDataPassedConditionChecking } from "../../../global/condition_checking";
import { email_regex, phone_number_regex } from "../../../global/utils";

const checkUserRegistrationFormData = (userData: any) => {



  // destructure the data from the event.body   
  const { user_name, user_email, user_mobile, user_city, user_country, user_password } = JSON.parse(userData);



  // here we are checking the field of every form is valid or not  
  // if even single field is not valid or null or undefined or empty 
  // return false else return true
  if (isDataPassedConditionChecking(user_name), isDataPassedConditionChecking(user_email), isDataPassedConditionChecking(user_mobile), isDataPassedConditionChecking(user_city), isDataPassedConditionChecking(user_country), isDataPassedConditionChecking(user_password)) {
    // now if we have all the variable then we need to check the email sent by the user to us
    // if the email is not correct then return false else return true



    // cheking email field through regex
    if (email_regex.test(user_email)) {
      // here we have also test the email
      // if the email is valid then we are good to go 
      // for return the response to [true] 

      // we have tested the all data above through function
      // and we have also checkced the email
      // now we have to check the [mobile] number
      // to back to the flow of programm

      if (phone_number_regex.test(user_mobile)) {
        // our phone number is correct return true for furthur process
        return true;
      } else {
        // our pnone number is not correct return false for 
        // Termination

        return false;
      }


    } else {
      // here we are returning the [false] becoz our email not passed the condition

      return false;

    }

  } else {
    // here we are returning the false to the flow of porgramm 
    // becoz  it may possbile our all field did not passed the condition
    // or we can say that the our One of the field did not passed the condition
    return false

  }

  // end of main function 
}

export { checkUserRegistrationFormData };