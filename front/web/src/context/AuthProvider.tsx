import { createContext, useState } from "react";

type AuthType = {
    accessToken: string;
    role: string;
}

type AuthContextType = {
    auth: AuthType | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>;
};

const AuthContext = createContext<AuthContextType | null> (null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<AuthType | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;