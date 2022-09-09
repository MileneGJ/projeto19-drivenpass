import { TCardBody } from "../typeModels/cardTypes";
import * as cardRepository from '../repositories/cardRepository'
import * as userService from '../services/authServices'
import cryptrUtils from '../utils/cryptrUtils'
import dayjsUtils from "../utils/dayjsUtils";

export async function addNewCard(card: TCardBody, userId: number) {
    await userService.verifyUserExists(userId)
    await verifyTitleInUse(card.title, userId)

    validateCardNumber(card.number)
    dayjsUtils.validateExpirationDate(card.expirationDate,'MM/YY')
    validateSecurityCode(card.securityCode)

    const treatedCard = { ...card, userId }
    treatedCard.cardholderName = formatCardholderName(card.cardholderName)
    treatedCard.password = cryptrUtils.encryptString(treatedCard.password)
    treatedCard.securityCode = cryptrUtils.encryptString(treatedCard.securityCode)

    await cardRepository.insert(treatedCard)
}

async function verifyTitleInUse(title: string, userId: number) {
    const userCardMatch = await cardRepository.findByTitleAndUserId(title, userId)
    if (userCardMatch) {
        throw { code: 'Conflict', message: 'A card with the given title already exists for this user' }
    }
}

function validateCardNumber(number: string) {
    const regex = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/
    if (!regex.test(number)) {
        throw { code: 'InvalidInput', message: 'Card number must contain "-" separators' }
    }
}

function validateSecurityCode(secCode: string) {
    const regex = /^[0-9]{3}$/
    if (!regex.test(secCode)) {
        throw { code: 'InvalidInput', message: 'Invalid card security code' }
    }
}

function formatCardholderName(name: string) {
    const separateNames = name.split(" ")
    const regex = /^d[aeiou]{1}s?$/
    let formattedName = []
    for (let i = 0; i < separateNames.length; i++) {
        if (i === 0 || i === separateNames.length - 1) {
            formattedName.push(separateNames[i].toUpperCase())
        } else if (!regex.test(separateNames[i].toLowerCase()) && separateNames[i] !== "e") {
            formattedName.push(separateNames[i][0].toUpperCase())
        }
    }
    return formattedName.join(" ")
}

export async function getAllCards(userId: number) {
    const cards = await cardRepository.findByUserId(userId)
    const treatedCards = cards.map(c => {
        c.password = cryptrUtils.decryptString(c.password);
        c.securityCode = cryptrUtils.decryptString(c.securityCode);
        return c
    })
    return treatedCards
}

export async function getOneCard(cardId: number, userId: number) {
    const card = await userCardExists(cardId, userId)
    card.password = cryptrUtils.decryptString(card.password);
    card.securityCode = cryptrUtils.decryptString(card.securityCode);
    return card
}

async function userCardExists(cardId: number, userId: number) {
    const card = await cardRepository.findByIdAndUserId(cardId,userId)
    if(!card){
        throw {code:'NotFound', message:'No cards were found with given id'}
    }
    return card
}

export async function deleteCard(cardId: number, userId: number) {
    await userCardExists(cardId, userId)
    await cardRepository.deleteOne(cardId)
}