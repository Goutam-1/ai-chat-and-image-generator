import React from "react";
import './App.css'
import Navbar from "./component/Navbar/Navbar.jsx";
import Text from "./component/Text/Text.jsx";
import Generatore from "./component/Generatore/Generatore.jsx";
import History from "./component/History/History.jsx";
import Noutfound from "./component/Notfound/Noutfound.jsx";
import { createBrowserRouter} from "react-router-dom";
import SignUp from "./component/SignUp/SignUp.jsx";



export const router = createBrowserRouter(
      [
     { 
        path:"/",
        element:<>
          <SignUp/>
        </>
     },
     
        {  
        path:'/image',
        element:<div>   
           <Navbar/>
           <Generatore/>
           </div>
      },

      {
        path:"/text",
        element:
        <div>
           <Navbar/>
           <Text/>
       </div>

      },

      {
        path:"/history",
        element:
        <div>     
           <Navbar/>
           <History/>
        </div>
  
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
