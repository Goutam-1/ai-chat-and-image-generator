import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import Navbar from "./component/Navbar/Navbar.jsx";
import Text from "./component/Text/Text.jsx";
import Generatore from "./component/Generatore/Generatore.jsx";
import History from "./component/History/History.jsx";
import Noutfound from "./component/Notfound/Noutfound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./component/SignUp/SignUp.jsx";


    const router = createBrowserRouter(
      [
      {
        path:'/',
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
     path:"/signup",
 element:<div>
 <SignUp/>    

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
             <RouterProvider router={router}/>
        </div>
    )
   }

 export default App;
