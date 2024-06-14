import { ReactNode } from "react"
import { useAuth } from "../../services/authContext"


export const PrivateUser = ({ children }: {children: ReactNode}) => {
    const { isUserLogged } = useAuth()
    
    return (
        <>
            {isUserLogged ? children : null}
        </>
    )
}