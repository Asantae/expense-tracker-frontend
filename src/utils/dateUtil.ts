import dayjs, { Dayjs } from "dayjs"

export const formattedDate = (date: Dayjs) => {
    return String(date.format('MM/DD/YYYY'));
}