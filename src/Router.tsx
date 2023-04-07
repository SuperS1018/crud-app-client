import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Route
} from 'react-router-dom';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Info from './pages/Info';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Posts />
            },
            {
                path: 'post/:id',
                element: <SinglePost />
            },
            {
                path: '/createPost',
                element: <CreatePost />
            },
            {
                path: '/myInfo',
                element: <Info />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: 'signup',
        element: <Signup />
    }
]);

const Router = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default Router;