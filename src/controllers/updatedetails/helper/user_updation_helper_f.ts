import { isDataPassedConditionChecking } from "../../../global/condition_checking";
import { phone_number_regex } from "../../../global/utils";


const UserUpdationHelper = (userData:any)=>{
   // here we need to destruct the data receive from [event.body]
   // here [userData] contains the [event.body] data
   
   // destructure the [userData]
   const {user_mobile , user_city , user_country} = JSON.parse(userData);

   console.log("b--------------");
   console.log(user_mobile);

   // now we have destructre the data so its time to check whether any field  [null or undefined or empty]
   // Note in case of update it is the choice of user whether to update the all field or somefield
   //Note that we need at least anyone field for update so we have to make sure that 
   // we should get the at least one field [data] from the user
   // if all field is empty [Terminate] the programm

   if(user_mobile || user_city || user_country){
        // if anyone value is present in the any column
        // then it means the user only wants to update that field

       // now we have to make sure that the if the field is [user_mobile] THEN
       // it should be validate
       // how to do that

       if(user_mobile){
            // it means [user also wants to updat the mobile or only mobile]
            // lets check the phone number validation

            if(phone_number_regex.test(user_mobile)){
                 // means we have test the mobile 
                 return true;
            }else{
                // [Termiate] the programm we can not push the wrong number into the [DB]
                return false;
            }
       }

       // in any case [Phone Number] is [empty | null | undefined] the above condition will not 
       // run but before above we have one more IF condition so if nay variable has data
       // this IF condition will run
     
       return true;


       

    }else{
        // all field are empty
        // [Terminate] the program
        return false;

    }
   


   



   
}

export{UserUpdationHelper}