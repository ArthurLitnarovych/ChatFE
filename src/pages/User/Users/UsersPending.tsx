import { Box, Grid, InputBase, Skeleton, alpha, styled } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { UserGroup } from "./UserGroup";
import { useDispatch, useSelector } from "../../../redux/store";
import { useEffect } from "react";
import { clearUsers, getUsers } from "../../../redux/slices/user";
import "./UsersPending.scss"
import { useNavigate } from "react-router-dom";
import { SearchBox } from "./Search";


type d = {
    user: {
        role: string, 
        email: string, 
        firstname: string, 
        lastname: string,
    },
}

export const UsersPending = () => {

    const { users } = useSelector(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        return () => { 
            dispatch(clearUsers())
        }
    }, [])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '0',
            '&:focus': {
              width: '17ch',
            },
          },
        },
      }));

    return (
        <Grid container spacing={2}>
            <Grid lg={2} md={1} sm={1} xs={0}>
            </Grid>
            <Grid lg={6} md={8} sm={8} xs={8}>
                <div style={{ alignItems: "center" }}>
                <Box sx={{ background: "white", marginTop: 5, width: "100%" , paddingBottom: 5, boxShadow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid md={4} sm={4} xs={4}>
                                <Skeleton sx={{width: "90%", height: 150, marginLeft: 4, marginTop: 2}} variant="circular"/>
                            </Grid>
                            <Grid md={8} sm={7} xs={7}>
                            <Skeleton sx={{width: "40%", height: 20, marginLeft: 4, marginTop: 2}}/>
                            <Skeleton sx={{width: "50%", height: 20, marginLeft: 4, marginTop: 2}}/>
                            <Skeleton sx={{width: "90%", height: 20, marginLeft: 4, marginTop: 2}}/>
                            <Skeleton sx={{width: "90%", height: 20, marginLeft: 4, marginTop: 2}}/>
                            </Grid>
                            <Skeleton sx={{width: "100%", height: "300px", marginLeft: 4, marginTop: 2, marginRight: 2, marginBottom: 2}} variant="rectangular"/>
                            
                        </Grid>
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