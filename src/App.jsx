import React from "react";
import './App.css'
import Navbar from "./component/Navbar/Navbar.jsx";
import Text from "./component/Text/Text.jsx";
import Generatore from "./component/Generatore/Generatore.jsx";
import History from "./component/History/History.jsx";
import Noutfound from "./component/Notfound/Noutfound.jsx";
import { createBrowserRouter} from "react-router-dom";
import SignUp from "./component/SignUp/SignUp.jsx";
import ProtectRoute from "./component/ProtectRoute/ProtectRoute.jsx";



export const router = createBrowserRouter(
      [

     { 
        path:"/",
        element:<>
          <SignUp/>
        </>
     },

     {
       path:"/dashboard",
       element:
              <Navbar/>
     },
     
     {  
        path:'/image',
        element:
            <ProtectRoute> 
              <Navbar/>
              <Generatore/>
               </ProtectRoute>
          
    },

      {
        path:"/text",
        element:
        <ProtectRoute> 
            <Navbar/>
            <Text/>
        </ProtectRoute>
      
      },

      {
        path:"/history",
        element:
        <ProtectRoute>   
           <Navbar/>
           <History/>
        </ProtectRoute>
  
      },

      {

        path:"*",
        element:<Noutfound/>

      }

    ]);




function App() {
   










return(
      
        <div>
            
        </div>
        )
   }

 export default App;
