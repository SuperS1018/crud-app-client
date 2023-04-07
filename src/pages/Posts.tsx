import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "isomorphic-dompurify";

export interface PostsProps {
    id: number;
    title: string;
    desc: string;
    date?: string;
    img: string;
    cate?: string;
}

const Posts: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = location.search;
    const [ posts, setPosts ] = useState<PostsProps[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${params}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [params]);

    return (
        <div className="posts">
            <div className="list">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`/uploads/${post.img}`} alt={post.title} />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc, { USE_PROFILES: { html: true }}) }} />
                            <button onClick={() => navigate(`/post/${post.id}`)}>Read more</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;