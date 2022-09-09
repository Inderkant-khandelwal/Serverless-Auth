// Email Regex
 const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 //mobile regex
 const phone_number_regex = /^[6-9]\d{9}$/;

 
 // otp regex
 const otp_regex = /^[0-9]{8}$/;

 // eror response
 const throwErrorNow = (sCode:number , msg:any)=>{
    const errorObject = {
        statusCode: sCode,
        body: JSON.stringify({ message:msg})
    }

    return errorObject;
 }

 const sendSuccessResponse = (sCode:number , msg:any)=>{
      const successResponse = {
        statusCode:sCode,
        body:JSON.stringify({message:msg})
      }

      return successResponse;
 }

 export {email_regex , phone_number_regex , otp_regex , throwErrorNow , sendSuccessResponse}