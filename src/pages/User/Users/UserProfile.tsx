import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "../../../redux/store"
import { useEffect, useState } from "react"
import { clearAutocomplete, clearId, clearPages, clearUser, clearUsers, getUser, getUsers, setId } from "../../../redux/slices/user"
import { Box, Button, Grid, IconButton, InputBase, Skeleton, alpha, styled } from "@mui/material"
import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import { SearchBox } from "./Search"


export const UserProfile = () => {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    
    const { id } = useParams()

    function colorF(role: string | null | undefined) {
        switch (role){
            case "user":
                return "blue"
                break
            default:
                return "yellow"
        }
    }

    const color: string = colorF(user?.role)

    useEffect(() => {
        return () => { 
            dispatch(clearUsers()) 
            dispatch(clearUser())
            dispatch(clearId())
            dispatch(clearAutocomplete())
            dispatch(clearPages())
        }
    }, [])

    useEffect(() => {
        
        dispatch(setId(id))
        dispatch(getUser())
    }, [id])

    return (
        <Grid container spacing={2} >
            <Grid lg={2} md={1} sm={1} xs={0}>
            </Grid>
            <Grid lg={6} md={8} sm={8} xs={8}>
                <div style={{ alignItems: "center" }}>
                <Box sx={{ background: "white", marginTop: 5, width: "100%" , paddingBottom: 5, boxShadow: 1 }}>
                        <div style={{position: "relative"}}>
                            <IconButton id="reference-element" sx={{position: "absolute", right: 10, top: 5}} aria-label="delete"><CloseIcon sx={{ fontSize: 35 }}></CloseIcon></IconButton>
                        </div>
                        <div className="responsive-button2">
                            <Button  sx={{position: "absolute", marginTop: 15, marginLeft: 25 }} variant="contained">Send message</Button> 
                        </div>
                        <div>
                            <Grid container spacing={2}>
                                <div style={{display: "flex"}}>
                                    
                                        <div style={{position: "relative"}}>
                                            <span className="responsive-role" style={{WebkitTextStrokeColor: color}}>{user?.role}</span>
                                            <img src="/image.png" className="responsive-image"></img>
                                        </div>

                                        <div style={{marginTop: 30, marginLeft: 20}}>
                                            <span style={{fontSize: 25, marginRight: 45}}>{user?.firstname} {user?.lastname}</span>
                                        </div>
                                        
                                </div>
                                
                                
                                

                                <Grid md={12} sm={12} xs={12} className="responsive-button">
                                    <Button variant="contained">Send message</Button>
                                    {/* <IconButton color="error" aria-label="delete"><BlockIcon sx={{ fontSize: 30 }}></BlockIcon></IconButton> */}
                                </Grid>

                                <Grid md={12} sm={12} xs={12} className="responsive-description">
                                    <Grid md={12} sm={11} xs={10}>
                                    <div style={{ position: "relative", width: "90.2%", marginLeft: 40 }}>
                                    <div style={{ background: "linear-gradient(to right, purple, cyan)", opacity: 0.6, height: 40 }}>
                                        
                                    </div>
                                    <span style={{ position: "absolute", left: 40, top: "50%", transform: "translateY(-50%)", fontSize: 25 }}>
                                        Description
                                    </span>
                                    </div>
                                        
                                    </Grid>
                                    <Grid md={12} sm={11} xs={10}>
                                        <Box sx={{width: "90%", marginLeft: 5, height: "200px", boxShadow: 1 }}>

                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            
                        </div>
                </Box>
                </div>
            </Grid>
            <Grid lg={2} md={1} sm={1} xs={1}>
            </Grid>
            <Grid lg={2} md={2} sm={2} xs={3}>
                <SearchBox></SearchBox>
            </Grid>
        
        </Grid>
    )
}