import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router";
import { CATEGORIES_LIST } from "../constants";

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [description, setDescription] = useState<string>(state?.desc || '');
    const [title, setTitle] = useState<string>(state?.title || '');
    const [file, setFile] = useState<File | null>(null);
    const [cate, setCate] = useState<string>(state?.cate || '');

    useEffect(() => {
        console.log('file: ', file);
    }, [file]);

    const uploadFile = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                const res = await axios.post('/api/upload', formData);
                return res.data;
            }
        } catch (err) {
            console.log(err);
        };
    };

    const handlePublish = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const imgUrl = await uploadFile();
        const status = 'publish';
        try {
            state ? 
            await axios.put(`/api/posts/${state.id}`, {
                title,
                desc: description,
                img: file ? imgUrl : state?.img,
                cate,
                status
            }):
            await axios.post('/api/posts', {
                title,
                desc: description,
                img: file ? imgUrl : state?.img,
                cate,
                date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                status
            })
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

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
                    <h2>Status: {state ? state.status : 'draft'}</h2>

                    {file && file.name && <img className="preview" src={URL.createObjectURL(file)} alt="preview" />}

                    <input style={{display: 'none'}} type='file' id='file' name='file' accept="image/jpeg, image/png" onChange={e => setFile(e?.target?.files?.[0] || null)} />
                    <label className='file' htmlFor="file">Upload Image</label>

                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    {CATEGORIES_LIST.map(category => (
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