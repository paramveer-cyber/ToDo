import React, { useState, useEffect } from 'react';
import Loader from './Loading_Bar';
import { useAuthFunctions } from '../server/auth';
import '../App.css';


const UserProfile = () => {
    const { handleLogout, isAuthenticated, user } = useAuthFunctions();
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(30);

    useEffect(() => {
        if (isAuthenticated) {
            setProgress(100);
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }, [isAuthenticated]);

    const handlingLogout = () => {
        setLoading(true);
        setProgress(75);
        handleLogout();
    };
    return (
        <>
            {loading && <Loader progress={progress} progressfunc={setProgress} />}
            {!loading && (
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-body">
                            <img src={user.picture} alt="User Profile" className="img-fluid rounded-circle mb-3" />
                            <h3>{user.nickname || user.name}</h3>
                            <p>Email: {user.email || 'Not provided'}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger w-100 my-2" onClick={handlingLogout}>
                                Logout
                            </button>
                            <button className="btn btn-danger w-100 my-2" >
                                Fetch Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
