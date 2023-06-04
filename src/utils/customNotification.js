import {toast} from "react-toastify";


export const customNotification = ({ type, message }) => {
  toast[type](message === 'Schedule does not fit' ? 'С этими параметрами уже есть расписание!' : message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
