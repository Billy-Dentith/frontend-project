import { Link } from 'react-router-dom'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

const Header = () => {
    return (
        <header id='header'>
            <Link className="link" to="/articles">Home</Link>
            <Link className="link" to="/topics">Topics</Link>
            <Link className="link" to="/users">Users</Link>
            <Link className="link" to="/submit"><IoMdAddCircleOutline  className='react-icons'/>
            </Link> 
        </header>
    )
} 

export default Header;