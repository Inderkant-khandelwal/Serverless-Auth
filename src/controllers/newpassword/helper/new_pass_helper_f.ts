import { isDataPassedConditionChecking } from "../../../global/condition_checking";


const NewPasswordHelper = (userData:any)=>{
 

  // destructure the data from the [event.body]

   // destructuring data
    const {new_password , confirm_password} = JSON.parse(userData);
  
  // check if [new Passoword] and [confirm_password] not empty or null or undefined

  if(isDataPassedConditionChecking(new_password) && isDataPassedConditionChecking(confirm_password)){
    // now means our [new passoword] and [confirm password] is valid for furthur process
    
    // check if both password is correct or not
    if(new_password == confirm_password){
       // means our [new password] is equals to [confirm password]
       // pass the flow back to the programm

       return true;

    }else{
       // means both password is not equal
       // [Terminate] the programm
       return false;
    }



  }else{
    // means [New Password] and [Confirm Password] is not valid 
    // terminate the programm
    return false;
  }
}

export {NewPasswordHelper}