import React from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import Employee_1 from "../../../public/imgs/employee_1.jpg"
import Employee_2 from "../../../public/imgs/employee_2.jpg"
import Employee_3 from "../../../public/imgs/employee_3.jpg"

export default function ProfilePage() {
  return (
    <>
    <Header />
    <h1 className='text-teams'>Il Nostro Team</h1>
  <div class="team-container">
    <div class="profile-card">
      <img src={Employee_1} alt="Anna" class="profile-image" />
      <div class="profile-info">
        <h2>Anna Rossi</h2>
        <p>Fashion Designer</p>
        <button>Contattami</button>
      </div>
    </div>
    <div class="profile-card">
      <img src={Employee_2} alt="Marco" class="profile-image" />
      <div class="profile-info">
        <h2>Marco Bianchi</h2>
        <p>Stylist</p>
        <button>Contattami</button>
      </div>
    </div>
    <div class="profile-card">
      <img src={Employee_3} alt="Laura" class="profile-image" />
      <div class="profile-info">
        <h2>Laura Verdi</h2>
        <p>Influencer</p>
        <button>Contattami</button>
      </div>
    </div>
  </div>
  <FooterSections />
    </>
  )
}
