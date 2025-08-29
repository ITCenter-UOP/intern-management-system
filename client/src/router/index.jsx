import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Login from '../pages/AuthPages/Login'
import Dashboard from '../layouts/Dashboard'
import DashHome from '../pages/Dashboard/DashHome'
import Notifications from '../pages/Dashboard/Notifications'
import DashError from '../component/Errors/DashError'
import ForgetPass from '../pages/AuthPages/ForgetPass'
import VerfiyOTP from '../pages/AuthPages/VerfiyOTP'
import UpdatePassword from '../pages/AuthPages/UpdatePassword'
import PrivateRoute from './PrivateRoute'
import CreateNewRole from '../pages/Dashboard/Roles/CreateNewRole'
import ManageRoles from '../pages/Dashboard/Roles/ManageRoles'
import Permissions from '../pages/Dashboard/Roles/Permissions'
import SystemUsers from '../pages/Dashboard/Roles/SystemUsers'
import CreateUser from '../pages/Dashboard/Roles/CreateUser'
import Unauthorized from './Unauthorized'
import CreatePermissions from '../pages/Dashboard/Roles/CreatePermissions'
import ViewPermission from '../pages/Dashboard/Roles/VIewPermission'
import Profile from '../pages/Dashboard/Profile/Profile'
import Activities from '../pages/Dashboard/UserActivities/Activities'
import ViewActivity from '../pages/Dashboard/UserActivities/ViewActivity'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />}>
                    <Route index element={<Login />} />
                    <Route path='/forget-password' element={<ForgetPass />} />
                    <Route path='/verify-otp' element={<VerfiyOTP />} />
                    <Route path='/update-password' element={<UpdatePassword />} />
                    <Route path='/unauthorized' element={<Unauthorized />} />
                </Route>

                <Route path='/Dashboard/' element={<PrivateRoute roles={['admin', 'supervisor', 'staff', 'intern']}><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['admin', 'supervisor', 'staff', 'intern']}><DashError /></PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['admin', 'supervisor', 'staff', 'intern']}><DashHome /></PrivateRoute>} />
                    <Route path='Notifications' element={<PrivateRoute roles={['admin', 'supervisor', 'staff', 'intern']}><Notifications /> </PrivateRoute>} />
                    <Route path='profile' element={<PrivateRoute roles={['admin', 'supervisor', 'staff', 'intern']}><Profile /> </PrivateRoute>} />


                    <Route path='manage-roles' element={<PrivateRoute roles={['admin']}><ManageRoles /></PrivateRoute>} />
                    <Route path='create-role' element={<PrivateRoute roles={['admin']}><CreateNewRole /></PrivateRoute>} />
                    <Route path='permissions' element={<PrivateRoute roles={['admin']}><Permissions /></PrivateRoute>} />
                    <Route path='system-users' element={<PrivateRoute roles={['admin']}><SystemUsers /></PrivateRoute>} />
                    <Route path='create-system-users' element={<PrivateRoute roles={['admin']}><CreateUser /></PrivateRoute>} />
                    <Route path='create-permissions' element={<PrivateRoute roles={['admin']}><CreatePermissions /></PrivateRoute>} />
                    <Route path='view-permissions/:id' element={<PrivateRoute roles={['admin']}><ViewPermission /></PrivateRoute>} />
                    <Route path='create-newrole' element={<PrivateRoute roles={['admin']}><CreateNewRole /></PrivateRoute>} />
                    <Route path='activities' element={<PrivateRoute roles={['admin']}><Activities /></PrivateRoute>} />
                    <Route path='view-activity/:id' element={<PrivateRoute roles={['admin']}><ViewActivity /></PrivateRoute>} />


                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
