import { useEffect, useState } from "react";
import axiosContext from "../axios-context.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextSource.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm('Are you sure you want to delete?')) {
            return
        }
        axiosContext.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User successfully deleted.')
                getUsers();
            })
    }
    const getUsers = () => {
        setLoading(true);
        axiosContext.get('/users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data.data);
        })
        .catch(() => {
            setLoading(false);
        })
    }

    return(
        <div>
            <div>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">...Loading</td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                    <tbody>
                        {users.map(user =>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td><Link className="btn-edit" to={'/users/' + user.id}>Edit</Link>
                                &nbsp;
                                <button className="btn-delete" onClick={e => onDeleteClick(user)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    )
}