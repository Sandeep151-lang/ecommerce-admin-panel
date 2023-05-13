import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Axios } from './commonApi/commonApi';


const Product = () => {
    const history = useHistory()
   
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [product_name, setproduct_name] = useState();
    const [product_price, setproduct_price] = useState();
    const [product_description, setproduct_description] = useState();


    const handleSubmit = async (event) => {
        
        event.preventDefault()
       
        const payload={
            product_name,
            product_price,
            product_description,
            product_image:selectedFile
        }
       
     
        try {
            const res = await Axios.post('/product/create', payload)
            
            if (res) { 
                window.alert(res?.data?.message);
                setproduct_name("");
                setproduct_price("");
                setproduct_description("");
                setSelectedFile("")
            }
        } catch (err) {

             window.alert(err?.response?.data?.message)

        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event?.target?.value)
    }

    return (
        <div className="container">
            <h1 className="text-center">Create Product</h1>
            <Form inline className="mt-5 ml-5" onSubmit={handleSubmit}>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">choose image</Label>
                    <Input type="text" placeholder='Enter Image Link' name="images" onChange={handleFileSelect} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Product Name</Label>
                    <Input type="text" name="product_name" onChange={(e) => setproduct_name(e?.target?.value)} value={product_name} placeholder="product name" />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Product Price</Label>
                    <Input type="number" name="product_price" onChange={(e) => setproduct_price(e?.target?.value.trim())} value={product_price} placeholder="product price" />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Product description</Label>
                    <Input type="text" name="product_description" onChange={(e) => setproduct_description(e?.target?.value)} value={product_description} placeholder="product description" />
                </FormGroup>

                <Input type="submit" className="btn btn-primary mt-3" />
            </Form >
        </div>
    )
}

export default Product

