import React, { Context, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Sam from '../images/sam_avatar.png';
import Delete from '../images/delete.png';
import Edit from '../images/edit.png';
import { PostsProps } from "./Posts";
import axios from "axios";
import moment from 'moment';
import { AuthContext, AuthContextProps } from "../context/authContext";

interface SinglePostProps extends PostsProps {
    username: string;
    userImg: string;
}

const SinglePost: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const id = location.pathname.split(/\/post\//i)[1];
    const [ post, setPost ] = useState<SinglePostProps>({
        id: 1,
        title: '',
        desc: '',
        img: '',
        userImg: '',
        date: '',
        cate: '',
        username: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/posts/${id}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="singlePost">
            <div className="content">
                <img src={`/uploads/${post.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.username && <div className="edit">
                        <Link to={`/createPost?edit=${id}`} state={post}>
                            <img src={Edit} alt="edit" />
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt="delete" />
                    </div>}
                </div>

                <h1>{post.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>
            </div>

            <Menu category={post.cate} />
        </div>
    );
};

export default SinglePost;