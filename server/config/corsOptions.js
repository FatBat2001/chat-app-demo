const whiteList = ["http://localhost:5173", "https://example.com","https://promoters-intl.onrender.com"] 
// config for accessing the server from certain domains 
const corsOptions = {
    origin: (origin, callback) => {
        if (~whiteList.indexOf(origin) || !origin) { // remove ! origin line in production  
            callback(null, true); 
        } else {
            callback(new Error("Not allowed by CORS")); 
        }
    },  
    credentials:true, 
    optionsSuccessStatus: 200
} 
module.exports = corsOptions; 