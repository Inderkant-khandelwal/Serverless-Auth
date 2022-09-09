import nodemailer from "nodemailer";


const configureTransportOptions = (servc: string | undefined, prt:any, userEmail:string | undefined | any, userPass:string | undefined)=>{
 
    
    
    
   const finalUserName = userEmail+"@gmail.com";
   const transport =  nodemailer.createTransport({
        service:servc,
        port:prt,
        secure: false,
        auth:{
            user:finalUserName,
            pass:userPass, 
        }, tls:{
           rejectUnauthorized:false 
        }
    });
   
 

    return transport;
}


export {configureTransportOptions}

//""