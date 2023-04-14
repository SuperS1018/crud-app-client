import axios from 'axios';
import React, { Context, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext, AuthContextProps, CurrentUserProps } from '../context/authContext';
import { SPACES_IMAGE_URL } from '../constants';
import DefaultAvatar from '../images/default.jpg';

const Info: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [file, setFile] = useState<string | Blob>('');
    const [userData, setUserData] = useState<CurrentUserProps>({
        id: 1,
        username: '',
        email: '',
        img: null
    });

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

    const submit = async () => {
        const imgUrl = await uploadFile();

        const payload: CurrentUserProps = {
            username: userData?.username ?? '',
            email: userData?.email ?? '',
            img: file ? imgUrl : userData?.img,
            id: userData?.id ?? 1
        }

        try {
            await axios.put(`/api/users/${currentUser?.id}`, payload);
            setCurrentUser(payload);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (currentUser) {
            setUserData(currentUser);
        } else {
            navigate('/');
        }
    }, [currentUser, navigate])

    useEffect(() => {
        if (!!file) {
            submit();
        }
    // eslint-disable-next-line
    }, [file]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData(prev => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        console.log(userData)
        submit();
    }
    
    return (
        <div className="info-page">
            <div className="section">
                <div className="avatar">
                    <input style={{display: 'none'}} type='file' id='file' name='file' accept="image/jpeg, image/png" onChange={e => setFile(e?.target?.files?.[0] || '')} />
                    <label className='file' htmlFor="file">
                        <div className="upload-icon" />
                        <img src={`${SPACES_IMAGE_URL}/${currentUser?.img}` || DefaultAvatar} alt={currentUser?.username} />
                    </label>
                </div>
                <div className="content">
                    <h1>{currentUser?.username}</h1>
                    <p>{currentUser?.email}</p>
                </div>
            </div>
            
            <div className="section">
                <form action="">
                    <label htmlFor="">Username: 
                        <input type="text" name="username" value={userData?.username} onChange={handleChange} />
                    </label>
                    <label htmlFor="">Email: 
                        <input type="email" name="email" value={userData?.email} onChange={handleChange} />
                    </label>
                    <button onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Info;