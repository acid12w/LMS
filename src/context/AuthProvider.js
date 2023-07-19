import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [persist, setPersist] = useState(false);
   
    return (
        <AuthContext.Provider value={{ persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;