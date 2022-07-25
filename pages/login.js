import {useState, useEffect} from 'react';

import {authentication} from '../firebase-config';
import {RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


export default function login() {
    const [dataLogin, setDataLogin] = useState(initialForm);
    const [isDis, setisDis] = useState(false);
    const [SendSms, setSendSms] = useState(false);



    const handleChange = (e) => {
        setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
    };

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              console.log("Captcha Resolved");
            }
          }, authentication
        );
      };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!SendSms) {
            setisDis(true);
            setUpRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            let phoneNumber = '+972546541545';
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                setSendSms(true);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(Number(dataLogin.code)).then((result) => {
                const user = result.user;
                console.log(user);
              }).catch((error) => {
                console.log(error);
              });
        }
        
    }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <div className='w-[350px]'>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4 bg-blue-100 p-5 rounded-lg'>
                <div id='recaptcha-container'></div>
                <input type='text' name='full_name' placeholder='Full Name' className='border' onChange={handleChange} />
                <input disabled={isDis} type='number' name='phone' placeholder='Phone Number' className='border' onChange={handleChange} />
                {SendSms && <input type='number' name='code' placeholder='Code' className='border' onChange={handleChange} />}
                <button type='submit' className='bg-blue-500'>
                    submit
                </button>
            </form>
        </div>
    </div>
  )
}


const initialForm = {
    full_name: '',
    phone: 0,
    code: ''
}