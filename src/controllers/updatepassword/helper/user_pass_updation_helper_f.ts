
import { isDataPassedConditionChecking } from "../../../global/condition_checking";

// making [Update Password] Helper
const UpdatePasswordHelper = (userData:any)=>{
  // first wee need to extract the data from the [Event.body is Present in [userDat]]

  // destructure user password
  const {user_password} = JSON.parse(userData);

  // now we got the user password
  // we need to make sure that
  // pass should not be empty or undefined

  if(isDataPassedConditionChecking(user_password)){
      // it means the password which user has send us 
     //  is ok now we can return [true] back to the flow
     return true;

  }else{
    // means [user password] is not valid
    // [Terminate] the programm

    return false;
  }
}

export {UpdatePasswordHelper}