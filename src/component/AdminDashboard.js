import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import LoadingSpinners from './LoadingSpinners';
import { Axios } from './commonApi/commonApi';

const AdminDashboard = () => {
    const history = useHistory()
    const [lis, setlist] = useState([])
    const [loading, setloading] = useState(true);
    const [pageNumbers, setPageNumber] = useState(0);
    const [numberofPages, setnumberofPages] = useState(0)
    const pages = new Array(pageNumbers + 1).fill(null).map((v, i) => i)

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumbers - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberofPages - 1, pageNumbers + 1));
    };


    const list = async () => {
        setloading(true)
        try {
            const res = await Axios.post(`/admin/list?page=${pageNumbers}`);
            if(res){
                setloading(false)
                setlist(res.data.item)
                setnumberofPages(res.data.totalPages);
            }
        } catch {
            setloading(false)
        }
    }
    const remove = async (_id) => {
        try {
            await Axios.delete(`/admin/list/${_id}`)
            list()
        } catch {
            console.log('error')
        }

    }

    const edit = async (_id) => {
        try {
            await Axios.post(`/admin/product/${_id}`)
            history.push(`/products/${_id}`)
        } catch {
            console.log('error')
        }

    }

    useEffect(() => {
   
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumbers])


 

        return (
            <>
                <div className='container mt-5'>
                    <table className="table caption-top">
                        <caption>List of Orders</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">View</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <LoadingSpinners/>}
                            {
                              !loading &&  lis.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item?.cartItems?.[0]?.product_name}</td>
                                            <td>{item?.shippingAddress?.name?.toUpperCase()}</td>
                                            <td style={{ 'fontWeight': 'bold', 'color': '#a9559b' }}>{item?.status}</td>
                                            <td><Button className='btn btn-success' onClick={(e) => { edit(item?._id) }}><i className="fal fa-edit"></i></Button></td>
                                            <td><Button className='btn btn-danger' onClick={(e) => remove(item?._id)}><i className="fas fa-trash-alt"></i></Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                    <div className='container pagination'>

                        <button onClick={gotoPrevious} className='prv-button btn-primary btn mx-2'>Previous</button>
                        {pages.map((index, key) => (

                            <button key={key} onClick={() => setPageNumber(index)} className='btn-button btn-success btn mx-2'>{index + 1}</button>
                        ))}
                        <button onClick={gotoNext} className='next-button btn-primary btn mx-2'>Next</button>
                    </div>

                

            </>
        )
    
}

export default AdminDashboard
