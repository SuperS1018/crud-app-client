import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface PostsProps {
    id: number;
    title: string;
    desc: string;
    date?: string;
    img: string;
    cate?: string;
}

const Posts: React.FC = () => {
    // const posts = [
    //     { id: 1, title: 'Post 1', content: 'This is the content 1', img: 'https://images.pexels.com/photos/14306688/pexels-photo-14306688.jpeg'},
    //     { id: 2, title: 'Post 2', content: 'This is the content 2', img: 'https://images.pexels.com/photos/16090220/pexels-photo-16090220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    //     { id: 3, title: 'Post 3', content: 'This is the content 3', img: 'https://images.pexels.com/photos/4041125/pexels-photo-4041125.jpeg'},
    //     { id: 4, title: 'Post 4', content: 'This is the content 4', img: 'https://images.pexels.com/photos/15225983/pexels-photo-15225983.jpeg'},
    //     { id: 5, title: 'Post 5', content: 'This is the content 5', img: 'https://images.pexels.com/photos/14668663/pexels-photo-14668663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    // ]

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
                            <p dangerouslySetInnerHTML={{ __html: post.desc }} />
                            <button>Read more</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;