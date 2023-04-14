import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PostsProps } from "../pages/Posts";
import { SPACES_IMAGE_URL } from "../constants";

const Menu: React.FC<{category: string | undefined}> = ({category}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ posts, setPosts ] = useState<PostsProps[] | []>([]);

    useEffect(() => {
        const currentPageId = location.pathname.split(/\/post\//i)[1];
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts?cate=${category}`) as {data: PostsProps[]};
                const filteredList = res.data.filter(item => item.id.toString() !== currentPageId);
                setPosts(filteredList);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [category, location.pathname]);

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={`${SPACES_IMAGE_URL}/${post.img}`} alt={post.title} />
                    <h2>{post.title}</h2>
                    <button onClick={() => navigate(`/post/${post.id}`)}>Read more</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;