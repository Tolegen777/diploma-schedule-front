export const defaultDays = {
    Sun: 'Сб',
    Mon: 'Пон',
    Tue: 'Вт',
    Wed: 'ср',
    Thu: 'Чт',
    Fri: 'Пт',
    Sat: 'Вс',
}
export const dayParser = (dayEng) => {
    const [day, time] = dayEng.split(' ')
 return `${defaultDays[day]} ${time}`
}