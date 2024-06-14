import React, { Component, ComponentType } from 'react'
import { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { SignIn } from './pages/SignIn/SignIn'
import { Layout } from './pages/User'
import { useAuth } from './services/authContext'
import { Registration } from './pages/Registration/Registration'
import { PrivateUser } from './pages/Private/PrivateUser'
import { UsersPending } from './pages/User/Users/UsersPending'
import { UserProfile } from './pages/User/Users/UserProfile'

export const AppRoutes = () => {
    const { isUserLogged } = useAuth()
    const navigate = useNavigate()

    

    type Props = {
        [key: string]: any;
    };

    const privateRoute = (component: ComponentType<Props>) => {
        return function(props: Props){
            if (!isUserLogged) {
                return <SignIn />
            }
            return <Component {...props} />
        }
    }

    return (
        <Routes>
            <Route path='/' element={isUserLogged ? <Navigate to='/workspace' /> : <Navigate to='/signin' />} />
            <Route path='/signin' element={<SignIn></SignIn>}></Route>
            <Route path='/registration' element={<Registration></Registration>}></Route>
            <Route path='/workspace' element={<PrivateUser><Layout></Layout></PrivateUser>}>
                <Route path='messages' element={<></>}></Route>
                <Route path='users' element={<UsersPending></UsersPending>}></Route>
                <Route path='users/:id' element={<UserProfile></UserProfile>}></Route>
                
            </Route>
        </Routes>
    )
}