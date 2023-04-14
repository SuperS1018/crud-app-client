import React, { Context, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";
import Logo from '../images/sam-logo.svg';
import { CATEGORIES_LIST, AVATAR_SPACES_URL } from "../constants";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
                <div className="links">
                    {CATEGORIES_LIST.map(category => (
                        <Link className="link" key={category.title} to={`/?cate=${category.value}`}><h6>{category.title.toUpperCase()}</h6></Link>
                    ))}

                    {currentUser && <span className="write">
                        <button onClick={() => navigate('/createPost')}>Write a Blog</button>
                    </span>}

                    {currentUser ? <button className="logout-btn" onClick={logout}>Logout</button> : <button className="login-btn" onClick={() => navigate('/login')}>Login</button>}

                    {currentUser && <Link to='/myInfo'>
                        <div className="avatar">
                            <img src={`${AVATAR_SPACES_URL}/${currentUser?.img}`} alt={currentUser?.username} />
                        </div>
                    </Link>}
                </div>

                
            </div>
        </div>
    );
};

export default Navbar;