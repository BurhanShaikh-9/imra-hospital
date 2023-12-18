import React from 'react'
import { Outlet } from 'react-router'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { ToastContainer, toast } from 'react-toastify';


export const Layout = () => {
    return (
        <React.Fragment>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}
