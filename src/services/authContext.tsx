import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import inMemoryJWT from "./inMemoryJWT";
import { Request } from "../redux/requests";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IUser } from "../redux/slices/user";
import { json } from "stream/consumers";

interface AuthContextType {
    me: IUser | null,
    isUserLogged: boolean
    SignIn?: any
    Logout?: any
    Register?: any
    ChangePassword?: any
}

export const AuthContext = createContext<AuthContextType>({
    me: null,
    isUserLogged: false,
})

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [isAppReady, setIsAppReady] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [me, setMe] = useState<IUser | null>(null)

    const navigate = useNavigate()

    const Logout = () => {
        Request.post('auth/logout')
            .then(res => {
                setIsUserLogged(false)
                inMemoryJWT.deleteToken();
                setMe(null)
            })
            .catch(err => console.log(err))
    }

    const SignIn = (data: any) => {
        const myPromise = Request.post('auth/signin', data)
            .then(res => {
                const { accessToken, accessTokenExpiration, user } = res
                inMemoryJWT.setToken(accessToken, accessTokenExpiration)
                setIsUserLogged(true)
                setMe(user)
                navigate('/workspace')
            })
        
            toast.promise(myPromise, {
                pending: "Promise is pending",
                success: "Signed in successfully 🚀",
                error: "Something went wrong! 🚨",
              });
    }

    const Register = (data: any) => {
        const myPromise = Request.post('users', data)
            .then((res) => {
                toast(res.message, { type: 'success'})
                const { accessToken, accessTokenExpiration, user } = res
                inMemoryJWT.setToken(accessToken, accessTokenExpiration)
                setIsUserLogged(true)
                setMe(user)
                navigate('/workspace')
            })

            toast.promise(myPromise, {
                pending: "Promise is pending",
                success: "Signed in successfully 🚀",
                error: "Something went wrong! 🚨",
              });
    }

    useEffect(() => {
        Request.post('auth/refresh')
            .then(res => {
                const { accessToken, accessTokenExpiration, user } = res;
                inMemoryJWT.setToken(accessToken, accessTokenExpiration);

                setIsAppReady(true);
                setIsUserLogged(true);
                setMe(user)
            })
            .catch(err => {
                setIsAppReady(true);
                setIsUserLogged(false);
            })
        }, [])

    useEffect(() => {
        const handlePersistedLogOut = (event: any) => {
          if (event.key === 'logout') {
            inMemoryJWT.deleteToken();
            setIsUserLogged(false);
          }
      };
    
      window.addEventListener("storage", handlePersistedLogOut);
    
      return () => {
        window.removeEventListener("storage", handlePersistedLogOut);
      };
      }, [])

      return (
        <AuthContext.Provider
            value={{
                me,
                SignIn,
                Logout,
                Register,
                isUserLogged,
            }}
        >
            {isAppReady ? (
                children
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}>
                    <CircularProgress />
                </Box>
            )}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider;