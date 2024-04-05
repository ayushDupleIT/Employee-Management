
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {HeaderToolbar} from './HeaderToolbar'
import { TitleProvider } from '../../../../app/routing/TitleProvider'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {aside} = config

  return (
   <div className='bg-[red]'>
     <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch ')}
      {...attributes.headerMenu}
    >
      {/* begin::Brand */}
      <div   className={clsx('header-brand bg-[red]')}>
        {/* begin::Logo */}
        <Link to='/'>
          {/* <img
            alt='Logo'
            src='https://img.freepik.com/premium-vector/job-search-information-illustartion_588233-440.jpg?w=900'
            className='h-250px h-lg-25px'
          /> */}
          <h1 className='text-white fs-3'>Admin Dashboard</h1>
        </Link>
        {/* end::Logo */}

        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='px-0 w-auto btn btn-icon btn-active-color-primary aside-minimize'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTIcon iconName='exit-left' className='fs-1 me-n1 minimize-default' />
            <KTIcon iconName='entrance-left' className='fs-1 minimize-active' />
          </div>
        )}

        {/* begin::Aside toggle */}
        <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-30px h-30px'
            id='kt_aside_mobile_toggle'
          >
            <KTIcon iconName='abstract-14' className='fs-1' />
          </div>
        </div>
        {/* end::Aside toggle */}
      </div>
      {/* end::Brand */}
      <HeaderToolbar />

    </div>
   </div>
  )
}
