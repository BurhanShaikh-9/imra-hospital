import React, { useState, useEffect } from 'react'
import profilePic from '../../../assets/images/guy.png'
// import { HospitalService } from '../../../services/hospital';
import { useParams } from 'react-router-dom';
import { DoctorService } from '../../../services/doctor';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { ReceptionService } from '../../../services/receptionist';


export const UpdateDoctor = () => {
    const { doctorId } = useParams();
    const { getSingleDoctor, patchUpdateDoctor } = DoctorService();
    const { getSingleReceptionist, patchReceptionist } = ReceptionService();



    const [hospitalData, setHospitalData] = useState({})
    const [localImage, setLocalImage] = useState({
        Image: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const onChangeDoctor = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.value })
    }
    const onChangeImage = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.files[0] })
        setLocalImage({ ...localImage, [e.target.name]: e.target.files[0] })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.set('Image', hospitalData.Image);
        formData.set('name', hospitalData.name);
        formData.set('email', hospitalData.email);
        formData.set('phonenumber', hospitalData.phonenumber);
        formData.set('qualification', hospitalData.qualification);
        formData.set('experience', hospitalData.experience);
        formData.set('pdmaid', hospitalData.pdmaid);

        // console.log(formData, 'hosss');

        patchReceptionist(doctorId, formData).then((res) => {
            console.log(res, 'response');
        }).catch((res) => {
            console.log(res, 'error');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getSingleReceptionist(doctorId).then((res) => {
            const { __v, _id, ...newgetData } = res?.data?.doctor
            setHospitalData(newgetData)
            console.log(newgetData)
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
                            <p>Update Doctor</p>
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
                                                            <img src={localImage.Image ? URL.createObjectURL(localImage.Image) : (hospitalData.Image ? hospitalData.Image : profilePic)} alt="" />
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
                                                            name="Image"
                                                            onChange={onChangeImage}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" id="doctorName" name="name" placeholder={hospitalData.name}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Email</label>
                                                        <input type="email" id="doctorName" name="email" placeholder={hospitalData.email}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Experience</label>
                                                        <input type="number" id="doctorName" name="experience" placeholder={hospitalData.experience}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Phone</label>
                                                        <input type="text" id="doctorName" name="phonenumber" placeholder={hospitalData.phonenumber}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Qualification</label>
                                                        <input type="text" id="doctorName" name="qualification" placeholder={hospitalData.qualification}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">PDMA ID</label>
                                                        <input type="text" id="doctorName" name="pdmaid" placeholder={hospitalData.pdmaid}
                                                            onChange={onChangeDoctor}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type="Submit" >
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
