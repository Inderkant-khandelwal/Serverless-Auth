import { isDataPassedConditionChecking } from "../../../global/condition_checking";
import { email_regex, phone_number_regex } from "../../../global/utils";


const userLoginHelper = (userLoginData:any)=>{
    // here we have receive the user login data 
     
    let isEmail:boolean , isPhoneNumber:boolean;

   
   
   // step - 1
   // destructure user data
  
   const {user_username, user_password} = JSON.parse(userLoginData);

   // check if the [Destructured] data is valid or not 

    if(isDataPassedConditionChecking(user_username) , isDataPassedConditionChecking(user_password)){
       // now we have test the condition 
       // now we have two condition that user can send the [data] as username either mobile number or email not other than
       // first we need to check that the data we have in username

       
       // checking is username is email or not
       if(email_regex.test(user_username)){
              isEmail = true;
              isPhoneNumber = false;

        // if user email 
        }else{
            // checking if username is Phonenumber or not
            if(phone_number_regex.test(user_username)){
                // it means user has provided the number in the place of username
                isEmail = false;
                isPhoneNumber = true;
            }else{
                // it means user did not provide the [Email or Phonnumber] in place of username

                isEmail = false;
                isPhoneNumber = false;
            }


        }

        // now we have checked the codition that username is [Email] or [Number]
        // in case we did not reveive none of them
        // return false

        if(isEmail){

           // means username is [Email]
           return true;
        }else if(isPhoneNumber){

            // means usernname is [PhoneNumber]
            return true;
        }else{
            // means we did not get the idea what user has provided 
            // falied the condtion 

            return false
        }


      



     }else{
        // here is somehow the user data does not [Passed] the codition
        // return false

        return false;
     }

}

export {userLoginHelper}