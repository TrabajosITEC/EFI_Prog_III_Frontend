// import { MainLayOut } from "../layouts/Mainlayout"
import { useState } from "react";

import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";

import mainImage from '../assets/cyberpunk-2077_1220x2160_xtrafondos.com.jpg';
import horizontalLogo from '../../public/HorizontalLogo.png'

import '../styles/LoginPage.css';

export default function LoginPage() {
  const [renderForm, setRenderForm] = useState(true);

  const handleClick = () => {
    setRenderForm(!renderForm);

  };

  return (
    <div className='container-fluid vh-100 d-flex p-0'>
      <div className='d-flex px-4 justify-content-center custom-login-bg-color'>
        <img src={horizontalLogo} className='me-1 pb-2' style={{height: '180px', width: '200px', objectFit: "contain"}} />
      </div>
      <div className='flex-grow-1 custom-bg d-flex align-items-center justify-content-center'>
        {renderForm ? (
            <FormLogin isVisible={handleClick} />

          ) : (
            <FormRegister isVisible={handleClick} />
        
          )
        
        }
      </div>
      <div className='bg-danger col-lg-4 d-flex align-items-center justify-content-center'>
        <img 
          src={mainImage} 
          className='img-fluid h-100 w-100' 
        />
      </div>
    </div>
  )
}
