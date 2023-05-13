import React from 'react'
import Loader from "react-loader-spinner";

const LoadingSpinners = () => {
    return (
        <div className="container  text-center">
            <div className="loading" style={{ 'margin': '20%' }}>
                <Loader
                className="loader_head"
                    type="Bars"
                    color="black"
                    height={50}
                    width={50}
                />
             </div>
         </div>
    )
}

export default LoadingSpinners
