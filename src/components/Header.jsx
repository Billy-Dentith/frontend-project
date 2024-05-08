import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header id='header'>
            <Link className="link" to="/articles">Home</Link>
            <Link className="link" to="/topics">Topics</Link>
            <Link className="link" to="/users">Users</Link>
        </header>
    )
}

export default Header;