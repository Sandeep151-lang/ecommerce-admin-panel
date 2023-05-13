import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import LoadingSpinners from './LoadingSpinners';
import { Axios } from './commonApi/commonApi';

const Products = () => {
    const history = useHistory()

    const [data, setdata] = useState([]);
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
    
    const url = `product/getproduct?page=${pageNumbers}`;
    const list = async () => {
        setloading(true)
        try {
            const res = await Axios.post(url)
            if (res.status === 200) {
                setloading(false)
                setdata(res.data.message);
                setnumberofPages(res.data.totalPages);
            }
        } catch (err) {
            setloading(false)
            window.alert(`error`)
        }
    }
    const remove = async (_id) => {
        try {
            await Axios.delete(`/product/item/${_id}`)
            list()
        } catch {
            console.log('error')
        }

    }



    useEffect(() => {
      
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumbers])

    // if (loading) {
    //     return <LoadingSpinners />
    // } else {
        return (
            <>


                <div className='container mt-5 '>
                    
                    <table className="table caption-top">
                        <caption>Product List</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className='table_header'>
                            {loading && <LoadingSpinners/>}
                            {
                                !loading &&  data.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            
                                            <td>{item?.product_name}</td>
                                            <td>{`Rs ${item?.product_price}`}</td>

                                            <td><Button className='btn btn-danger' onClick={(e) => remove(item._id)}><i className="fas fa-trash-alt"></i></Button></td>
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
    // }
}

export default Products
