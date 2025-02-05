import moment from "moment"

export const formatDate = (date: Date, format = 'YYYY/MM/DD hh:mm a') => moment(date).local().format(format)

export const fromNow = (date: Date, format = 'YYYY/MM/DD hh:mm a') => moment(date).local().fromNow()