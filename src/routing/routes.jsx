import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { Dashboard } from '../Website/pages/Dashboard/dashboard'
// import { ManageUser } from '../Website/pages/Users/manageUser'
// import { ManageReportedUser } from '../Website/pages/ReportedUser/manageReportedUser'
// import { AddTopics } from '../Website/pages/Topics/addTopics'
// import { ManageTopics } from '../Website/pages/Topics/manageTopics'
import { Profile } from '../Website/pages/UserProfile.jsx/profile'
import { Faqs } from '../Website/pages/Polices/faqs'
import { Layout } from '../Website/layout'
import { AddReception } from '../Website/pages/Receptionist/addReceptionist'
import { ReceptionManage } from '../Website/pages/Receptionist/receptionistManage'
import { UpdateReception } from '../Website/pages/Receptionist/updateReceptionist'
import { UserManage } from '../Website/pages/User/userManage'
import TokenService from '../services/tokenService'
import { AdminService } from '../services/admin'
// import { Receptionist } from '../Website/pages/receptionist/receptionist'
import { AddDoctor } from '../Website/pages/Doctor/addDoctor'
import { DoctorManage } from '../Website/pages/Doctor/manageDoctor'
import { UpdateDoctor } from '../Website/pages/Doctor/updateDoctor'
import { PatientsManage } from '../Website/pages/Patients/patient'
// import { Login } from '../Website/pages/registration/login'

export const ExternalRoutes = () => {

    const { getUserCookie } = TokenService();
    const { getSingleAdmin } = AdminService();
    let userId = getUserCookie()
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        if (userId) {
            getSingleAdmin(userId).then((res) => {
                // console.log(res.data.data, 'response routeesss');
                setUserObject(res?.data?.hospital)
            }).catch((err) => {
                console.log(err, 'err');
            })
        }
    }, [userId])

    return (
        <Routes>
            <Route element={<Layout />}>

                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

                <Route path={ROUTES.ADD_RECEPTION} element={<AddReception />} />
                {
                    userObject.add_recption &&
                    <Route path={ROUTES.MANAGE_RECEPTION} element={<ReceptionManage />} />
                }
                {
                    userObject.manage_recption &&
                    <React.Fragment>
                        <Route path={`${ROUTES.UPDATE_RECEPTION}/:receptionistId`} element={<UpdateReception />} />
                        <Route path={ROUTES.MANAGE_USER} element={<UserManage />} />
                    </React.Fragment>
                }
                {
                    userObject.add_doctor &&
                    <Route path={ROUTES.ADD_DOCTOR} element={<AddDoctor />} />
                }
                {
                    userObject.manage_doctor &&
                    <React.Fragment>
                        <Route path={ROUTES.MANAGE_DOCTOR} element={<DoctorManage />} />
                        <Route path={`${ROUTES.UPDATE_DOCTOR}/:doctorId`} element={<UpdateDoctor />} />
                    </React.Fragment>
                }
                <Route path={ROUTES.ALL_PATIENTS} element={<PatientsManage />} />
                <Route path={ROUTES.FAQS} element={<Faqs />} />
                <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Route>



        </Routes>
    )
}
