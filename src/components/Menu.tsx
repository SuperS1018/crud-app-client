import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostsProps } from "../pages/Posts";

const Menu: React.FC<{category: string | undefined}> = ({category}) => {
    // const posts = [
    //     { id: 1, title: 'Post 1', content: 'This is the content 1', img: 'https://images.pexels.com/photos/14306688/pexels-photo-14306688.jpeg'},
    //     { id: 2, title: 'Post 2', content: 'This is the content 2', img: 'https://images.pexels.com/photos/16090220/pexels-photo-16090220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    //     { id: 3, title: 'Post 3', content: 'This is the content 3', img: 'https://images.pexels.com/photos/4041125/pexels-photo-4041125.jpeg'},
    //     { id: 4, title: 'Post 4', content: 'This is the content 4', img: 'https://images.pexels.com/photos/15225983/pexels-photo-15225983.jpeg'},
    //     { id: 5, title: 'Post 5', content: 'This is the content 5', img: 'https://images.pexels.com/photos/14668663/pexels-photo-14668663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    // ]

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