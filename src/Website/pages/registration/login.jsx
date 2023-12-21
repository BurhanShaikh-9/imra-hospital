import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo/Logo.png'
import Cookies from 'js-cookie';
import AuthService from '../../../services/auth.service';
import { UserService } from '../../../services/user';
import { AdminService } from '../../../services/admin';
import { ROUTES } from '../../../../utils/routes';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";


export const Login = () => {
    const [isPass, setIsPass] = useState(false)
    const { getSingleAdmin } = AdminService()
    const { postAdminLogin, successLogin } = AuthService();
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value })
    }

    const formSubmit = e => {
        e.preventDefault();
        const loginData = { ...login }

        postAdminLogin(loginData).then((res) => {
            console.log(res.data.Hospital, 'resssss');
            const loginResponse = res
            // console.log(loginResponse, 'reqqqqqqq');
            toast.success('Successfully Logged In')
            getSingleAdmin(res?.data.Hospital?._id).then((res) => {
                // console.log(res?.data,'ggggggg');
                const response = res?.data?.hospital
                const { avatar, email, fullname, is_active, phonenumber, title, type, __v, _id, ...routesPerm } = response;

                // console.log(routesPerm, 'ressss');
                let otherRoutes;
                const routeMapping = {
                    add_recption: ROUTES.ADD_RECEPTION,
                    manage_recption: ROUTES.MANAGE_RECEPTION,
                    add_doctor: ROUTES.ADD_DOCTOR,
                    manage_doctor: ROUTES.MANAGE_DOCTOR,
                };
                if (routesPerm.dashboard === 0) {

                    for (const key in routesPerm) {
                        if (routesPerm[key] === 1 && routeMapping[key]) {
                            successLogin(loginResponse?.data, routeMapping[key], otherRoutes = 1)
                            return;
                        }
                    }

                } else {
                    // navigate(ROUTES.DASHBOARD);
                    console.log(routeMapping.dashboard, 'dashhh');
                    successLogin(loginResponse?.data, null, otherRoutes = 0)

                }

            })
        }).catch((err) => {
            console.log(err, 'error');
            toast.error('Invalid Credentials')
        })

    }
    return (
        <React.Fragment>
            <div className="login">
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
                <div className='bg_element_1'></div>
                <div className='bg_element_2'></div>
                <div className="card cardBodyRelative">
                    <div className="cardBodyAbsolute"></div>
                    <div className='loginLogoOuter'><img src={logo} className='loginLogo' alt="" /></div>
                    <div className="card-body ">
                        <div className="loginOuter">
                            <div className="loginHeader">
                                Sign in your account
                            </div>
                            <form className="loginBody" onSubmit={formSubmit} >
                                <div className="fields">
                                    <label htmlFor="emailLogin">Email</label>
                                    <input type="email" name='email'
                                        onChange={getInput}
                                    />
                                </div>
                                <div className="fields fieldButtonRelative">
                                    <label htmlFor="passwordLogin">Password</label>
                                    <input type={isPass ? 'text' : 'password'} name='password'
                                        onChange={getInput}
                                    />
                                    <div className='fieldButtonAbsolute' onClick={(e) => { setIsPass(!isPass); e.preventDefault() }}>
                                        {
                                            isPass ?
                                                <FaRegEye />
                                                :
                                                <FaRegEyeSlash />
                                        }

                                    </div>
                                </div>
                                {/* <div className="fields fields1">
                                    <div className='loginCheckBox'>
                                        <input type="checkbox" id='rememberMe' />
                                        <label htmlFor='rememberMe'>Remember me</label>
                                    </div>
                                    <Link>
                                        Forgot Password?
                                    </Link>
                                </div> */}
                                <div className="fields">
                                    {/* <button onClick={(e)=>{e.preventDefault(), getCookie()}}>cookie</button> */}
                                    <button  >
                                        Sign In
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
