export const defaultDays = {
    Mon: 'Понидельник',
    Tue: 'Вторник',
    Wed: 'Среда',
    Thu: 'Четверг',
    Fri: 'Пятница',
    Sat: 'Суббота',
    Sun: 'Воскресенье',
}

export const defaultDaysFull = {
    MONDAY: 'Понидельник',
    TUESDAY: 'Вторник',
    WEDNESDAY: 'Среда',
    THURSDAY: 'Четверг',
    FRIDAY: 'Пятница',
    SATURDAY: 'Суббота',
    SUNDAY: 'Воскресенье',
}
export const dayParser = (dayEng) => {
    // console.log(dayEng, 'ENG')
    const [day, time] = dayEng.split(' ')
        return `${defaultDays[day]} ${time}`

}