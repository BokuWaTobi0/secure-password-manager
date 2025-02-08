import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { createContext } from "react";

const UserAuthContext = createContext();
export const UserAuthProvider = ({children})=>{

    const [user,setUser]=useState(null);

    const handleSetUser=(user)=>setUser(user);

    return(
        <UserAuthContext.Provider value={{user,handleSetUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}
UserAuthProvider.propTypes={
    children:PropTypes.node,
}
export const useUserAuthContext=()=>useContext(UserAuthContext);