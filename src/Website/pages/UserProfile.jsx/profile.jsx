import React, { useEffect, useState } from 'react'
import profilePic from '../../../assets/images/guy.png'
import { AdminService } from '../../../services/admin'
import TokenService from '../../../services/tokenService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';

export const Profile = () => {

    const { getSingleAdmin, patchAdmin } = AdminService();
    const { getUserCookie } = TokenService();
    const [isLoading, setIsLoading] = useState(false);

    let userId = getUserCookie()
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        if (userId) {
            getSingleAdmin(userId).then((res) => {
                console.log(res.data, 'adminss');
                const { addAdmin, addHospital, manageAdmin, manageHospital, services, ...filteredAdminData } = res?.data?.admin;
                setUserObject(filteredAdminData)
                console.log(filteredAdminData, 'res');
            }).catch((err) => {
                console.log(err, 'err');
            })
        }
    }, [userId])



    const getInput = (e) => {
        const fieldValue = e.target.value;
        const fieldName = e.target.name;
        setUserObject({ ...userObject, [fieldName]: fieldValue });
    };

    const getImageInput = (e) => {
        const fileValue = e.target.files[0];
        const fileName = e.target.name;
        const imageUrl = URL.createObjectURL(fileValue);

        setUserObject({
            ...userObject,
            [fileName]: fileValue,
            localmage: imageUrl,
        })
    }


    const formSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        // console.log(adminModel, 'admin');
        const formData = new FormData();
        formData.set('avatar', userObject.avatar);
        formData.set('fullname', userObject.fullname);
        formData.set('email', userObject.email);
        formData.set('phonenumber', userObject.phonenumber);
        // formData.set('password', adminModel.password);
        // formData.set('title', adminModel.title);
        // formData.set('type', adminModel.type);
        // formData.set('addHospital', adminModel.addHospital);
        // formData.set('manageHospital', adminModel.manageHospital);
        // formData.set('addAdmin', adminModel.addAdmin);
        // formData.set('manageAdmin', adminModel.manageAdmin);
        // formData.set('services', adminModel.services);
        // formData.set('is_active', adminModel.is_active);

        console.log(formData, 'formDataa');
        patchAdmin(formData, userId).then((res) => {
            console.log(res, 'formData Succ')
            toast.success('Profile Updated')
        }).catch((err) => {
            toast.error('Profile Failed to Update')
            console.log(err, 'formData Succ')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <React.Fragment>

            <section className="mainSection">
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>PROFILE</p>
                        </div>
                        {
                            isLoading
                                ?
                                <Loader />
                                :
                                <div className="card cardForm">
                                    <div className="card-body">

                                        <form className="additionForm" onSubmit={formSubmit}>
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img src={userObject?.localmage || userObject?.avatar || profilePic} alt="" className="profileImage" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorImage">Image</label>
                                                        <input
                                                            type="file"
                                                            onChange={getImageInput}
                                                            className="form-control"
                                                            id="doctorImage"
                                                            name="avatar"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" onChange={getInput} id="doctorName" name="fullname" placeholder={userObject.fullname}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Email</label>
                                                        <input type="email" onChange={getInput} id="doctorName" name="email" placeholder={userObject.email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Phone</label>
                                                        <input type="number" onChange={getInput} id="doctorName" name="phonenumber" placeholder={userObject.phonenumber}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">CNIC</label>
                                                <input type="text" id="doctorName" name="fullname" placeholder="Enter CNIC..." required
                                                />
                                            </div>
                                        </div> */}


                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type="Submit" >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
