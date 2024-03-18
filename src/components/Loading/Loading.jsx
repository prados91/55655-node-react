import React from 'react'
import './Loading.css'

const Loading = () => {
    return (
        <div className='loading__body'>
            <div className="ball">
                <div className="inner">
                    <div className="line"></div>
                    <div className="line line--two"></div>
                    <div className="oval"></div>
                    <div className="oval oval--two"></div>
                </div>
            </div>
            <div className="shadow">

            </div>
        </div>
    )
}

export default Loading