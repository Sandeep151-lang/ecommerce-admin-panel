import React from 'react'
import { Route,Redirect } from 'react-router-dom'

const Private = ({component,...rest}) => {
    const token = localStorage.getItem('jwt')
 return token ? <Route {...rest}/> : <Redirect to={"/"}/>
}

export default Private