import React, { useState, useEffect } from 'react'
import profilePic from '../../../assets/images/guy.png'
// import { HospitalService } from '../../../services/hospital';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { ReceptionService } from '../../../services/receptionist';
import { phoneValidation } from '../../../services/regex';

export const UpdateReception = () => {
    const { receptionistId } = useParams();
    const { getSingleReceptionist, patchReceptionist } = ReceptionService();
    const [isValidPhone, setIsValidPhone] = useState(true);

    // const { patchUpdateHospital, getSingleHospital } = HospitalService();
    const [isLoading, setIsLoading] = useState(false)

    const [hospitalData, setHospitalData] = useState({})
    const [localImage, setLocalImage] = useState({
        avatar: ''
    })

   
    const validatePhone = (phone) => {
        return phoneValidation.test(phone);
    };
    
    const onChangeHospital = (e) => {
        const fieldValue =  e.target.value;
        const fieldName = e.target.name;
        if (fieldName === 'phonenumber') {
            const isValid = validatePhone(fieldValue);
            setIsValidPhone(isValid);
            if (isValid) {
                setHospitalData({ ...hospitalData, [fieldName]: fieldValue });
            }
        } else {
            setHospitalData({ ...hospitalData, [fieldName]: fieldValue });
        }
    };
    const onChangeImage = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.files[0] })
        setLocalImage({ ...localImage, [e.target.name]: e.target.files[0] })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.set('avatar', hospitalData.avatar);
        formData.set('name', hospitalData.name);
        formData.set('email', hospitalData.email);
        formData.set('phonenumber', hospitalData.phonenumber);
        formData.set('address', hospitalData.address);

        // console.log(formData, 'hosss');

        patchReceptionist(receptionistId, formData).then((res) => {
            toast.success('Receptionist Updated')
        }).catch((res) => {
            toast.error('Receptionist Failed to Update')
            console.log(res, 'error');
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getSingleReceptionist(receptionistId).then((res) => {
            console.log(res, 'response Receptionist');
            const { __v, _id, ...newgetData } = res?.data?.reception
            setHospitalData(newgetData)
            const isValidDefaultPhone = validatePhone(newgetData.phonenumber);
            setIsValidPhone(isValidDefaultPhone);
            // console.log(res)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])
    return (
        <React.Fragment>

            <section className="mainSection">
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>UPDATE RECEPTIONIST</p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">

                                {
                                    isLoading ?
                                        <Loader />
                                        :
                                        <form className="additionForm"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img src={localImage.avatar ? URL.createObjectURL(localImage.avatar) : (hospitalData.avatar ? hospitalData.avatar : profilePic)} alt="" />
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

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" id="doctorName" name="name" placeholder={hospitalData.name}
                                                            onChange={onChangeHospital}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Email</label>
                                                        <input type="email" id="doctorName" name="email" placeholder={hospitalData.email}
                                                            onChange={onChangeHospital}
                                                        />
                                                    </div>
                                                </div>
                                            
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields fieldErrorRelative">
                                                        <label htmlFor="doctorName">Phone</label>
                                                        <input className={!isValidPhone && 'errorValidation'} type="number" id="doctorName" name="phonenumber" placeholder={hospitalData.phonenumber}
                                                            onChange={onChangeHospital}
                                                        />
                                                        {!isValidPhone && <p className='erroValidationText'>Invalid Phone Number</p>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Address</label>
                                                        <input type="text" id="doctorName" name="address" placeholder={hospitalData.address}
                                                            onChange={onChangeHospital}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Branch</label>
                                                        <input type="text" id="doctorName" name="branch" placeholder={hospitalData.branch}
                                                            onChange={onChangeHospital}
                                                        />
                                                    </div>
                                                </div> */}

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type="Submit" disabled={!isValidPhone} >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
