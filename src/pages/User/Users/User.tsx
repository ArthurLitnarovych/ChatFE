import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from "@mui/material";
import "../index.scss"
import { store, useDispatch, useSelector } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
    user: {
        id: string;
        role: string; 
        email: string; 
        firstname: string; 
        lastname: string;
    };
}

export const User = ({ user }: Props) => {
    const { firstname, lastname } = user;
    const navigate = useNavigate()
    const { id } = useSelector(store => store.user)
    const [disabled, setDisabled] = useState(false)

    const onClick = () => {
        navigate(`/workspace/users/${user.id}`)
    }

    useEffect(() => {
        if (id == user.id) setDisabled(true)
            else setDisabled(false)
    }, [id])

    return (
        <button onClick={onClick} disabled={disabled} style={{background: "none", border: "none", paddingLeft: 20, paddingTop: 25, paddingBottom: 10, width: "100%"}} className="user">
            <Grid container spacing={2}>
            <Grid lg={4} md={4} sm={12} xs={12}>
                <AccountCircleIcon fontSize="large"></AccountCircleIcon>
            </Grid>
            <Grid lg={8} md={8} sm={12} xs={12}>
                <div style={{fontSize: 16}} className="spUs">{firstname} {lastname}</div>
            </Grid>
            
            </Grid>
        </button>
    );
}
