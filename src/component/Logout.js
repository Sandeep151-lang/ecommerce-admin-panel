import React, { useEffect, useContext } from 'react'
// import axios from 'axios'
import { useHistory } from 'react-router'
import { MyContext } from '../App';
import { Axios } from './commonApi/commonApi';

const Logout = () => {
    const { dispatch } = useContext(MyContext)
    const history = useHistory();
    useEffect(() => {
        localStorage.removeItem('jwt')
       Axios.post('/user/logout').then((res) => {
            dispatch({ type: 'USER', payload: false })
            if(res){

                history.push('/admin/login', { replace: true })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1 className='text-center'>Logout page</h1>
        </div>
    )
}

export default Logout
