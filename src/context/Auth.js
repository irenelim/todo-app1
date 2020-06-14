// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();
const UpdateContext = React.createContext(null);

export const AuthProvider = ({children}) => { 
    const [user, setUser] = useState(null);  

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