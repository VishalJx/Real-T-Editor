"use client";

import Form from '@/pages/Form';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  return (
    <main className='flex w-full h-[90vh] gap-5 justify-center items-center'>
      <ToastContainer />
      <Form />
    </main>
  )
}
