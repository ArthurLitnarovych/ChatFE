import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useAuth } from "../../services/authContext"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
}

export const Registration = () => {
    const { isUserLogged, Register, Logout } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = () => {
        Register({ email, firstname, lastname, password})
    }

    const onExit = () => {
        Logout()
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
                <Typography style={{ textAlign: 'left' }} variant="h5">Registration</Typography>
                <Typography style={{ textAlign: 'left' }} variant="subtitle1">Get in touch with new people</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextField disabled={isUserLogged} required value={firstname} onChange={e => setFirstname(e.target.value)} style={{ marginTop: 20, width: '48%' }} placeholder="Firstname" fullWidth></TextField>
                    <TextField disabled={isUserLogged} required value={lastname} onChange={e => setLastname(e.target.value)} style={{ marginTop: 20, width: '48%' }} placeholder="Lastname" fullWidth></TextField>
                </Box>
                <TextField disabled={isUserLogged} required value={email} onChange={e => setEmail(e.target.value)} style={{ marginTop: 20 }} placeholder="Email" fullWidth></TextField>
                <TextField disabled={isUserLogged} required value={password} onChange={e => setPassword(e.target.value)} type="password" style={{ marginTop: 20 }} placeholder="Password" fullWidth></TextField>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
                    <Button disabled={isUserLogged} onClick={onSubmit} size="large" style={{ marginTop: 20, borderRadius: 100, justifyContent: 'center', width: '50%' }} variant="contained">Register</Button>
                    {isUserLogged && 
                    <>
                        <Button variant="outlined" color="error" onClick={handleClickOpen} size="large" style={{ marginTop: 20, borderRadius: 100, justifyContent: 'center', width: '5px' }} ><ExitToAppOutlinedIcon /></Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Logout
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure you want to sign out of the account?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={onExit}>Logout</Button>
                        </DialogActions>
                    </Dialog>
                    </>}
                </Box>
                {!isUserLogged &&<Link href="signin" style={{ marginTop: 20, justifyContent: 'center', alignSelf: 'center' }}>I'm already registered</Link>}
            </Box>
        </Box>
    )
}