import React, { Context, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Delete from '../images/del-icon.svg';
import Edit from '../images/edit-icon.svg';
import { PostsProps } from "./Posts";
import axios from "axios";
import moment from 'moment';
import { AuthContext, AuthContextProps } from "../context/authContext";
import DOMPurify from "isomorphic-dompurify";
import DefaultAvatar from '../images/default.jpg';

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
                const res = await axios.get(`/api/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${id}`);
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
                    <img src={post.userImg ? `../uploads/${post.userImg}` : DefaultAvatar} alt="" />
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
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} />
            </div>

            <Menu category={post.cate} />
        </div>
    );
};

export default SinglePost;