import { Link } from 'react-router-dom';
import './Thanks.css'

const Thanks = () => {
    return (
        <div className='container'>
            <div className='checkout_container'>
                <h1>Thanks for your purchase!</h1>
                <p>Please, return to the main page</p>
                <Link to="/" className='btn btn-dark'>Home</Link>
            </div>
        </div>
    )
}

export default Thanks