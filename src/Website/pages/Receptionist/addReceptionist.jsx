import React, { useState, useEffect } from 'react'
import profilePic from '../../../assets/images/guy.png'
// import { HospitalService } from '../../../services/hospital';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { ReceptionService } from '../../../services/receptionist';
import TokenService from '../../../services/tokenService';
import { phoneValidation } from '../../../services/regex';


export const AddReception = () => {
    const { postAddReceptionist } = ReceptionService();
    const { getUserCookie } = TokenService()
    const [isLoading, setIsLoading] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const hospitalId = getUserCookie();


    const [receptionData, setReceptionData] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
        address: '',
        avatar: '',
    })
    const validatePhone = (phone) => {
        return phoneValidation.test(phone);
    };

    const onChangeHospital = (e) => {
        const fieldValue = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        const fieldName = e.target.name;
        if (fieldName === 'phonenumber') {
            const isValid = validatePhone(fieldValue);
            // console.log(fieldValue,isValidPhone,'vallll');
            setIsValidPhone(isValid);
            if (isValid) {
                setReceptionData({ ...receptionData, [fieldName]: fieldValue });
            }
        } else {
            setReceptionData({ ...receptionData, [fieldName]: fieldValue });
        }
    };
   
    const onChangeImage = (e) => {
        setReceptionData({ ...receptionData, [e.target.name]: e.target.files[0] })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.set('avatar', receptionData.avatar);
        formData.set('name', receptionData.name);
        formData.set('email', receptionData.email);
        formData.set('phonenumber', receptionData.phonenumber);
        formData.set('password', receptionData.password);
        formData.set('address', receptionData.address);
        formData.set('hospitalId', hospitalId);

        console.log(formData, 'hosss');

        postAddReceptionist(formData).then((res) => {
            console.log(res, 'response');
            toast.success('Receptionist Added')
        }).catch((res) => {
            console.log(res, 'error');
            toast.error('Receptionist Failed to Add')
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
                            <p>ADD RECEPTIONIST</p>
                        </div>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className="card cardForm">
                                    <div className="card-body">

                                        <form className="additionForm"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img src={receptionData.avatar ? URL.createObjectURL(receptionData.avatar) : profilePic} alt="" />
                                                            {/* <img src={adminModel?.image ? URL.createObjectURL(adminModel.image) : profilePic} alt="" className="profileImage" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorImage">Image</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            name="avatar"
                                                            onChange={onChangeImage}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" id="doctorName" name="name" placeholder="Enter Name..."
                                                            onChange={onChangeHospital} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Email</label>
                                                        <input type="email" id="doctorName" name="email" placeholder="Enter Email..."
                                                            onChange={onChangeHospital} required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields fieldErrorRelative">
                                                        <label htmlFor="doctorName">Phone</label>
                                                        <input className={!isValidPhone && 'errorValidation'} type="number" id="doctorName" name="phonenumber" placeholder="Enter Phone..."
                                                            onChange={onChangeHospital} required
                                                        />
                                                        {!isValidPhone && <p className='erroValidationText'>Invalid Phone Number</p>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Address</label>
                                                        <input type="text" id="doctorName" name="address" placeholder="Enter Address..."
                                                            onChange={onChangeHospital} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Password</label>
                                                        <input type="text" id="doctorName" name="password" placeholder="Enter Password..."
                                                            onChange={onChangeHospital} required
                                                        />
                                                    </div>
                                                </div>


                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type="Submit" disabled={!isValidPhone}>
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
