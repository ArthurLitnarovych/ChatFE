import React, { useEffect, useState } from "react"
import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { Colors } from "../../types"
import { useAuth } from "../../services/authContext"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { SignIn, isUserLogged } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        document.body.className = 'body_overflow_hidden'
        return () => { document.body.className = document.body.className.replace("body_overflow_hidden","") }
    }, [])

    const onSubmit = () => {
        SignIn({ email, password })
    }

    return (
        <Box sx={{ height: '100vh', 
        backgroundColor: 'white',
        color: 'black',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <Box sx={{ 
            backgroundColor: 'rgba(221, 231, 235, 0.4)',
            display: 'flex', justifyContent: 'center', flexDirection: 'column', 
            marginTop: 10, width: '50%', minWidth: '150px', padding: 5,
            borderRadius: 3, boxShadow: 4
            }}>
                <Typography style={{ textAlign: 'left' }} variant="h5">Sign In</Typography>
                <Typography style={{ textAlign: 'left' }} variant="subtitle1">Get in touch with new people</Typography>
                <TextField required value={email} onChange={e => setEmail(e.target.value)} style={{ marginTop: 20 }} placeholder="Email" fullWidth></TextField>
                <TextField required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginTop: 20 }} placeholder="Password" fullWidth></TextField>
                <Button disabled={isUserLogged} onClick={onSubmit} size="large" style={{ marginTop: 20, borderRadius: 100, justifyContent: 'center', width: '50%',  alignSelf: 'center' }} variant="contained">Sign In</Button>
                <Link href="registration" style={{ marginTop: 20, justifyContent: 'center', alignSelf: 'center' }}>Create account</Link>
            </Box>
        </Box>
    )
}