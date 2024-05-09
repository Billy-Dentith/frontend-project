import { Link } from "react-router-dom";

const ErrorPage = ({ children }) => {
    return(
        <div className="error-page">
            {children || 
                <>
                    <h1 className="error-header">404</h1>  
                    <h2>Oops! The page you were looking for doesn't exist.</h2>
                </>
            }
            <h2>Click a button below to view all of our articles or topics:</h2>
            <Link className="link" to="/articles">
                <div id="redirect-button">
                    <h2>View All Articles</h2>
                </div>
            </Link>
            <Link to="/topics">
                <div id="redirect-button">
                    <h2>View All Topics</h2>
                </div>
            </Link> 
        </div>
    )
}

export default ErrorPage;