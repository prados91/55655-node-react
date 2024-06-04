import React from 'react'
import './Footer.css'

const Footer = () => {

    const date = new Date().getFullYear()
    return (
        <div className='footer__container'>
            <p className='footer_text'>Copyright {date} - All right reserved.</p>
        </div>
    )
}

export default Footer

