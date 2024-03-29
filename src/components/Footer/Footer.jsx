import React from 'react'
import { format } from "@formkit/tempo"
import './Footer.css'

const Footer = () => {

    const date = new Date()
    const now = format(date, { date: "medium", time: "short" })
    return (
        <div className='footer__container'>
            <p className='footer_text'>Copyright {now} - All right reserved.</p>
        </div>
    )
}

export default Footer

