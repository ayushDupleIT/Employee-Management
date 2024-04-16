

import {FC} from 'react'
import {useLayout} from '../../core'
import {KTIcon} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {AsideToolbar} from './AsideToolbar'
import { useAuth } from '../../../../app/modules/auth'

const AsideDefault: FC = () => {
  const {classes} = useLayout()
  const {currentUser, logout} = useAuth()

  return (
    <div
      id='kt_aside'
      className='aside'
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
 
      <div style={{ backgroundColor: 'rgb(33 56 79)' }} className='aside-menu flex-column-fluid' >
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/**style={{ backgroundColor: '#3380BA' }} */}
      {/* end::Aside menu */}

      {/* begin::Footer */}
      {/* <div className='py-5 aside-footer flex-column-auto' id='kt_aside_footer'>
        <a
          className='btn btn-custom btn-primary w-100'
          onClick={logout}
        >
          <span className='btn-label'>Log Out</span>
          <span className='btn-icon fs-2'>
            <KTIcon iconName='document' />
          </span>
        </a>
      </div> */}
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
