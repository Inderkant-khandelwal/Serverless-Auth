
import  dotenv from "dotenv";
import mysql  from "promise-mysql";

// creating a connection functiopn

const connection = async ()=>{
   
     // we are calling dotenv.congif() object function for making available our [Environment Variable]
      dotenv.config();
    
    // here we are declaring the variable of connection  
    let connc:any;

    // here we are opening the try block
    try{
        // making the required connection properties 
        // note if the [multistatement] is true then you are inviting youself or i can say your application to the sql injection attack
        
        const connectionProperties = {
            host:process.env.HOST,
            user:process.env.USER,
            password:process.env.PASSWORD,
            database:process.env.DB,
            multipleStatements:true
        }

        // here we are resolving the connection object
        // if you want to see the whats inside the connection 
        // you can console.log(connc)
      connc =  await mysql.createConnection(connectionProperties);

      // here we are returning the [connc] object to the flow of the programm
      
      return  Promise.resolve(connc);
        
    }catch(e){
        // here we are throw the error in case something did not happen according to our need
        console.log(e);
    }
 
}

export {connection}
