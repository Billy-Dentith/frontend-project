import { useEffect, useState } from "react";
import { getUsers } from "../api";
// import { Link } from "react-router-dom";
import LottieLoading from "./LottieLoading";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.users)
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true)
        })
    }, [])

    if (isError) {
        return <h1 className="error-header">Server Error!</h1>
    }

    if (isLoading) {
        return (
            <LottieLoading />
        )
    }

    return (
        <>
            <h1 className="page-header">Users</h1>
            {/* <h2>Click to see their articles!</h2> */}
            <ul className="user-list">
                {users.map((user) => {
                    return (
                        // <Link to={`/article?author=${user.username}`}>
                        <li key={user.username} className="user-card">
                            <img src={user.avatar_url}/>
                            <h3>{user.username}</h3>
                            <h3>{user.name}</h3>
                        </li>
                        // </Link>
                        // Add filter by author functionality in backend
                    )
                })}
            </ul>
        </>

    )
}

export default Users;