import React from 'react'
import { SubMenu } from 'react-pro-sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from './User'

type User = {
    id: string;
    role: string; 
    email: string; 
    firstname: string; 
    lastname: string;
}

type Props = {
    users: User[];
}

export const UserGroup = ({ users }: Props) => {

    return (
        <div style={{}}>{users.map(user => <User key={user.email} user={user} />)}</div>
    )
} 