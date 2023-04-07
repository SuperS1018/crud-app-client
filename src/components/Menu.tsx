import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostsProps } from "../pages/Posts";

const Menu: React.FC<{category: string | undefined}> = ({category}) => {
    const [ posts, setPosts ] = useState<PostsProps[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts?cate=${category}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [category]);

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={`/uploads/${post.img}`} alt={post.title} />
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;