import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

type AuthType = {
    accessToken: string;
    id: string;
    role: string;
    resumeId?: string;
}

type AuthContextType = {
    auth: AuthType | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null> (null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<AuthType | null>(null);

    const logout = () => {
        setAuth(null);
    }

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if(auth?.accessToken){
                    config.headers.Authorization = `Bearer ${auth.accessToken}`
                }

                return config
            }
        )

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        }
    }, [auth?.accessToken])

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "/auth/refresh"
                ) {
                    originalRequest._retry = true;

                    try {
                        const response = await axios.post("/auth/refresh");

                        const newToken = response.data.accessToken;

                        setAuth((prevAuth) => {
                            if (!prevAuth) return null;

                            return {
                                ...prevAuth,
                                accessToken: newToken
                            };
                        });

                        originalRequest.headers.Authorization =
                            `Bearer ${newToken}`;

                        return axios(originalRequest);
                    } catch {
                        logout();
                    }
                }

                throw error;
            }
        );

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;