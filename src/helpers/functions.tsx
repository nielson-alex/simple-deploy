import { toast } from 'react-toastify';

export const generateMessage: (messageType: string, message: string) => void = (messageType: string, message: string) => {
    switch (messageType) {
        case 'error':
            toast.error(message, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        case 'success':
            toast.success(message, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        default:
            break;
    }
}