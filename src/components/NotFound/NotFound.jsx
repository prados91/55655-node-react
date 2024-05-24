import { Link } from 'react-router-dom'
import './NotFound.css'
const NotFound = () => {
    return (
        <div className='container '>
            <div className='notFound_container'>
                <h1> 404: NOT FOUND</h1>
                <p>Please, return to the main page</p>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default NotFound