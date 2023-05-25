import React, { createContext,useState } from "react";
// create context
const web = createContext();

function WebScrap({ Children }) {
  const [user, setUser] = useState(null);
  
 function changeUserLog(){
  const User = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")):null
   setUser(User)
 }
  
  return (
    // provide the context 
    <web.Provider
      value={{setUser:setUser, changeUserLog:changeUserLog ,user:user}}
    >
      {Children}
    </web.Provider>
  );
}

export default WebScrap;
export { web };