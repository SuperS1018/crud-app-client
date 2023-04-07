import React, { Context, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";
import Logo from '../images/sam-logo.svg'

const Navbar: React.FC = () => {

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
                    <Link className="link" to='/?cate=art'><h6>ART</h6></Link>
                    <Link className="link" to='/?cate=science'><h6>SCIENCE</h6></Link>
                    <Link className="link" to='/?cate=technology'><h6>TECHNOLOGY</h6></Link>
                    <Link className="link" to='/?cate=cinema'><h6>CINEMA</h6></Link>
                    <Link className="link" to='/?cate=design'><h6>DESIGN</h6></Link>
                    <Link className="link" to='/?cate=food'><h6>FOOD</h6></Link>

                    {currentUser && <Link to='/myInfo'>
                        <div className="avatar">
                            <img src={`../uploads/${currentUser?.img}`} alt={currentUser?.username} />
                        </div>
                    </Link>}
                    {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to='/login'>Login</Link>}
                    <span className="write">
                        <Link className="link" to='/createPost'>
                            <button>Write a Blog</button>
                        </Link>
                    </span>
                </div>

                
            </div>
        </div>
    );
};

export default Navbar;