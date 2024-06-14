import { Menu, MenuItem, Box, Tooltip, IconButton, Avatar, Divider, Modal, InputLabel, TextField, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Colors } from "../../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./index.scss"
import { useAuth } from "../../services/authContext"

type Props = {
    collapsed: boolean
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ collapsed, setShowSidebar}: Props) => {
    const { me, Logout } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        if (anchorEl) setAnchorEl(null);
    }
    
    const onToggleSidebar = () => {
        setShowSidebar((prev) => {
            localStorage.setItem('sidebar', String(!prev))
            return !prev
        })
        document.body.className = 'body_overflow'
    }
    
    const handleLogout = () => {
        Logout()
        navigate('/signin')
    }

    return (
        <div style={{ backgroundColor: Colors.MAIN_WHITE }} className="admin_header">
            <div className="admin_header_logo_wraper">
            <div
                style={{ cursor: "pointer", marginLeft: 10 }}
                onClick={onToggleSidebar}
            >
                <FontAwesomeIcon
                // color={theme === 'dark' ? Colors.MAIN_WHITE : Colors.MAIN_BLACK}
                icon={"fa-solid fa-bars".split(" ") as any}
                size="lg"
                ></FontAwesomeIcon>
            </div>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            
            <Tooltip title="Account settings">
                <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
                <FontAwesomeIcon
                    size="lg"
                    color={Colors.MAIN_BLACK}
                    icon={"fa-solid fa-user".split(" ") as any}
                ></FontAwesomeIcon>
                </IconButton>
            </Tooltip>
            </Box>

            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            style={{ width: 300 }}
            PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <div style={{ marginLeft: 16, marginTop: 10, height: 20, fontWeight: 'bolder', minWidth: 300 }}>
                { me?.firstname + ' ' + me?.lastname }
            </div>
            <div style={{ marginLeft: 16, marginTop: 4, marginBottom: 10 }}>{me?.role}</div>
            <Divider />
            
            <MenuItem>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                Logout
            </MenuItem>
            </Menu>
        </div>
    )
}

