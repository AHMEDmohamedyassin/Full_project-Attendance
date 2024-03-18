import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const notify = (msg) => {
    toast(msg);
}


export const NotifyContainer = () => {
    return <ToastContainer />
}