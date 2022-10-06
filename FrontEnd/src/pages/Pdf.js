import React, { Component } from 'react';
import './Pdf.css';

const Pdf = () => {

    return(
        <div className='pdf'>
            <object
            data={require('../files/pdf_text.pdf')}
            type="application/pdf"
            width="100%"
            height="100%"
            >

            </object>
        </div>
    )
}

export default Pdf;