
// making forgot password helper

import { isDataPassedConditionChecking } from "../../../global/condition_checking";
import { email_regex } from "../../../global/utils";



const ForgotPasswordHelper = (userData:any)=>{
  // here we need to destructure the data from [event.body]
  
  // destruct the email
  const {user_email} = JSON.parse(userData);

  // now we got the email
  // now need to check if email should not be empty or null or undefined

  if(isDataPassedConditionChecking(user_email)){
     // means that user data is valid for furthur
     // process
     // now its time to check whether 
     // the given [Email] is valid or not
     
     if(email_regex.test(user_email)){
        // now user email valid we can go for furthur programm flow
        return true
     }else{
        return false;
     }
    

  }else{
    // means our user data is not correct

    return false;

  }
}

export {ForgotPasswordHelper}