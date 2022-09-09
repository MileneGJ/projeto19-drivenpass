import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

function validateExpirationDate(date: string,format:string) {
    dayjs.extend(customParseFormat)
    const givenDate = dayjs(date, format)
    const now = dayjs()
    if (givenDate < now) {
        throw { code: 'InvalidInput', message: 'Expiration date can not be a date in the past' }
    }
}

function validateEmissionDate(date: string,format:string) {
    dayjs.extend(customParseFormat)
    const givenDate = dayjs(date, format)
    const now = dayjs()
    if (givenDate > now) {
        throw { code: 'InvalidInput', message: 'Emission date can not be a date in the future' }
    }
}

export default {
    validateEmissionDate,
    validateExpirationDate
}