export function convertTimeToDateTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const dateTimeStr = `${year}-${month}-${day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00.000Z`;
    return dateTimeStr;
}

export function convertReverseDateTimeToTime(dateTimeStr) {
    // Create a new Date object from the date-time string
    const dateObj = new Date(dateTimeStr);

    // Extract the hours and minutes components from the Date object
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Format the time string in the required format
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')}`;

    return timeStr;
}


export function convertTime(time) {
    const [hours, minutes, seconds] = time.split(':');
    return `${Number(hours)}:${Number(minutes)}`;
}
