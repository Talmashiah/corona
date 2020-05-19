import React from 'react';
import { Link } from 'react-router-dom';

export default function NavUser({ loggedInUser, logout }) {

    return (
        <div className='link-container'>
            <div className="nav-user">
                <Link to={loggedInUser ? "/account" : "/auth/login"}> <i className="fas fa-user"></i></Link>
                <div className="modal">
                    {!loggedInUser ?
                        <React.Fragment>
                            <Link to="/auth/register"><button className="main-btn primary">הרשם</button></Link>
                            <div className="login">כבר רשום? <Link to="/auth/login">התחבר עכשיו</Link></div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className="userName">שלום <span>{loggedInUser.fullName}</span></div>
                            <div className="email">{loggedInUser.email}</div>
                            <button className="main-btn secondary" onClick={() => logout()}>התנתק</button>
                        </React.Fragment>}
                </div>
            </div >
        </div >
    )
}