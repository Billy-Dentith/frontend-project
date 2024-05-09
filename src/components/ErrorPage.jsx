import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className="error-page">
            <h1 className="error-header">404</h1>  
            <h2>Oops! The page you were looking for doesn't exist.</h2>
            <h2>Click the button below to view all of our articles:</h2>
            <Link to={'/articles'}>
                <div id="redirect-button">
                    <h2>View All Articles</h2>
                </div>
            </Link>
        </div>
    )
}

export default ErrorPage;