import { toast } from 'react-toastify'

//success
export const successToast = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
    })
}

//error
export const errorToast = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
    })
}