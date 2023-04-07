import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router";

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [description, setDescription] = useState<string>(state?.desc || '');
    const [title, setTitle] = useState<string>(state?.title || '');
    const [file, setFile] = useState<string | Blob>('');
    const [cate, setCate] = useState<string>(state?.cate || '');

    const uploadFile = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                const res = await axios.post('/upload', formData);
                return res.data;
            }
        } catch (err) {
            console.log(err);
        };
    };

    const handlePublish = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const imgUrl = await uploadFile();

        try {
            state ? 
            await axios.put(`/posts/${state.id}`, {
                title,
                desc: description,
                img: file ? imgUrl : '',
                cate
            }):
            await axios.post('/posts', {
                title,
                desc: description,
                img: file ? imgUrl : '',
                cate,
                date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            })
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const categories = [
        {
            title: 'Art',
            value: 'art'
        },
        {
            title: 'Science',
            value: 'science'
        },
        {
            title: 'Technology',
            value: 'technology'
        },
        {
            title: 'Cinema',
            value: 'cinema'
        },
        {
            title: 'Design',
            value: 'design'
        },
        {
            title: 'Food',
            value: 'food'
        }
    ]

    return (
        <div className="createPost">
            <div className="content">
                <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                <div className="editorContainer">
                    <ReactQuill className="editor" theme='snow' value={description} onChange={setDescription} />
                </div>
            </div>

            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>

                    <input style={{display: 'none'}} type='file' id='file' name='file' accept="image/jpeg, image/png" onChange={e => setFile(e?.target?.files?.[0] || '')} />
                    <label className='file' htmlFor="file">Upload Image</label>

                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    {categories.map(category => (
                        <label className="category" htmlFor={category.value} key={category.title}>
                            <input type="radio" checked={cate === category.value} name='category' value={category.value} id={category.value} onChange={e => setCate(e.target.value)} />
                            {category.title}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatePost;