import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ChangePassword} from './components/ChangePassword'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='update-password' element={<ChangePassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
