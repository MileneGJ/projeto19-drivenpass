import { TCardBody } from "../typeModels/cardInterfaces";
import * as cardRepository from '../repositories/cardRepository'
import * as userService from '../services/authServices'
import Cryptr from "cryptr";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export async function addCard(card: TCardBody, userId: number) {
    await userService.verifyUserExists(userId)
    await verifyTitleInUse(card.title, userId)

    validateCardNumber(card.number)
    validateExpirationDate(card.expirationDate)
    validateSecurityCode(card.securityCode)

    const treatedCard = { ...card, userId }
    treatedCard.cardholderName = formatCardholderName(card.cardholderName)
    treatedCard.password = encryptString(treatedCard.password)
    treatedCard.securityCode = encryptString(treatedCard.securityCode)

    await cardRepository.insert(treatedCard)
}

async function verifyTitleInUse(title: string, userId: number) {
    const userCardMatch = await cardRepository.findByTitleAndUserId(title, userId)
    if (userCardMatch) {
        throw { code: 'Conflict', message: 'A card with the given title already exists for this user' }
    }
}

function encryptString(password: string): string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}

function validateCardNumber(number: string) {
    const regex = /^[0-9]{16}$/
    if (!regex.test(number)) {
        throw { code: 'InvalidInput', message: 'Card number can not contain separators' }
    }
}

function validateSecurityCode(secCode: string) {
    const regex = /^[0-9]{3}$/
    if (!regex.test(secCode)) {
        throw { code: 'InvalidInput', message: 'Invalid card security code' }
    }
}

function validateExpirationDate(date:string){
    dayjs.extend(customParseFormat)
    const givenDate = dayjs(date,'MM/YY')
    const now = dayjs()
    console.log([now,date,givenDate])
    if(givenDate<now) {
        throw {code: 'InvalidInput', message: 'Expiration date can not be a date in the past'}
    }
}

function formatCardholderName(name:string) {
    const separateNames = name.split(" ")
    const regex = /^d?[aeiou]{1}s?$/
    let formattedName = []
    for (let i = 0; i < separateNames.length; i++) {
        if (i === 0 || i === separateNames.length - 1) {
            formattedName.push(separateNames[i].toUpperCase())
        } else if (!regex.test(separateNames[i])) {
            formattedName.push(separateNames[i][0].toUpperCase())
        }
    }
    return formattedName.join(" ")
}

function decryptString(password: string): string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}