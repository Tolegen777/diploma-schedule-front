import moment from "moment";

export const formatDateWithTime = (date: Date | string | number | null, utcOn = true, format = 'HH:mm') => {
    if (!date) {
        return undefined;
    }
    if (!utcOn) {
        return moment(date).format(format);
    }
    return moment.utc(date).format(format);
};