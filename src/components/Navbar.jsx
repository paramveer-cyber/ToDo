import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuthFunctions } from '../server/auth';
import '../App.css';

export default function Navbar() {
    const { handleLogin, isAuthenticated, user } = useAuthFunctions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [isAuthenticated]);

    return (
        <nav className="navbar bg-dark navbar-dark border-bottom border-body navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <img className="rounded" src={logo} alt="" width="50" height="50" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                    </ul>
                    {!loading && isAuthenticated && (
                        <div className='d-flex'>
                            <div className="container-fluid">
                                <Link to={'user'}>
                                    <span className='nickname'>{user.nickname}</span>
                                    <img className='img-fluid rounded-circle user_icon rounded mx-2' src={user.picture} alt="User Icon" width={50} height={50} />
                                </Link>
                            </div>
                        </div>
                    )}
                    {!loading && !isAuthenticated && (
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-primary bold" type="button" onClick={handleLogin}>Login</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}
