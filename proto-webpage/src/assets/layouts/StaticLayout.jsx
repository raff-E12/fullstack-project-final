import React from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import { Outlet } from 'react-router'

export default function StaticLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <FooterSections />
    </>
  )
}
