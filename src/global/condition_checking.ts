   // creating a function for testing the samecondition
   const isDataPassedConditionChecking = (userSingleGenericData: string | null | undefined | number | any)=>{
    
    if(userSingleGenericData !== "null" && userSingleGenericData !== "undefined" && userSingleGenericData !== "" && userSingleGenericData !== undefined &&  userSingleGenericData !== null && userSingleGenericData && userSingleGenericData != undefined && userSingleGenericData != null){
      // return true back to the flow so that flow can go furthur 
       return true;
     }else{
        // return false back to the flow so that flow can [Terminate] at the [controller] level
        return false;
     }
   }

    // named export
   export {isDataPassedConditionChecking}

