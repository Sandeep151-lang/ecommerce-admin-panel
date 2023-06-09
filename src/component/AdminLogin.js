import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router'

import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../App';

const AdminLogin = () => {
    const { dispatch } = useContext(MyContext)
    const history = useHistory();
    const [register, setregister] = useState({
        email: '',
        password: ''
    })

    const onchange = (e) => {
        const name = e.target.id;
        setregister({ ...register, [name]: e.target.value });
    }

    const onclick = async (e) => {
        e.preventDefault();
        try {
         const res =await axios.post('https://ecommerce-node-sooty.vercel.app/admin/login', register )
            setregister(res?.data)
            const  jwt = res?.data?.token;
            
            if (res) {
                console.log(res)
                localStorage.setItem('jwt', jwt)
                sessionStorage.setItem('email',res?.data?.email)
                sessionStorage.setItem('name',res?.data?.name)
                dispatch({ type: 'USER', payload: true })
                window.alert('login successfull')
                 history.push('/products')
            }
        } catch (error) {
            console.log(error)
            alert(error?.response?.data?.message)
        }
    }


    return (
        <div className="container">
            <h2 className="text-center mt-5">Admin Login</h2>
        <hr/>
            <Form inline className="mt-5 ml-5">
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter email</Label>
                    <Input type="email" id="email" placeholder="Enter email" value={register.email} onChange={onchange} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Enter Password</Label>
                    <Input type="password" id="password" placeholder="Enter password" value={register.password} onChange={onchange} />
                </FormGroup>
                <Button className='btn my-3  btn-success login-button' style={{'width':'100%'}} onClick={onclick}>submit</Button>

            </Form >
        </div>
    )
}

export default AdminLogin;
