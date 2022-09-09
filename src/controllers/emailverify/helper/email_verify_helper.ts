import { isDataPassedConditionChecking } from "../../../global/condition_checking";
import { otp_regex } from "../../../global/utils";

const UserEmailVerificationHerlper = (userData:any)=>{
// we get the data in [userDat] variable
// we need to destructuture the data

// destructurin the otp from the event.body 
const {otp} = JSON.parse(userData);

console.log("ye ara " + otp)

// verify the otp is valid or not

 if(isDataPassedConditionChecking(otp)){
    // now the otp passes the condition
    // now we have to check 
    // if the opt is valid or not
    // means we need the otp only eight digit not more than and 
    // only numeric type

    if(otp_regex.test(otp)){
      // if otp match then only pass the flow for furthur
      // else return false terminate the flow by sending the error to client
      return true;
    }else{
        // otp not matched
        console.log("OTP not matched");
        return false;
    }

    
 }else{
    // in case otp did not passed the codition
    return false;
 }

}

export {UserEmailVerificationHerlper}