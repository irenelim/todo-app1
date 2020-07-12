// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext();
const UpdateContext = React.createContext(null);


const authentication = 'authentication';  //sessionStorage or localStorage?
export const AuthProvider = ({children}) => { 
    // const [user, setUser] = useState(null); 
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem(authentication)) || null);  

    useEffect(()=>{
        sessionStorage.setItem(authentication, JSON.stringify(user));
  }, [user]);

    return (
        <UpdateContext.Provider value={setUser}>
            <AuthContext.Provider value={user} >
                {children}
            </AuthContext.Provider>
        </UpdateContext.Provider>
    );
};

export function useAuth() {
    return [useContext(AuthContext), useContext(UpdateContext)];
  }