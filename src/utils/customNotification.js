import { notification } from 'antd';

export const customNotification = ({ type, message }) => {
  notification[type]({
    message,
  });
};
