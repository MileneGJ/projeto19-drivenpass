import { TWifiBody } from "../typeModels/wifiTypes";
import * as userService from '../services/authServices';
import * as wifiRepository from '../repositories/wifiRepository'
import cryptrUtils from "../utils/cryptrUtils";

export async function addNewWifi (wifi:TWifiBody, userId: number) {
    await userService.verifyUserExists(userId)
    const treatedWifi = {...wifi, userId}
    treatedWifi.password = cryptrUtils.encryptString(treatedWifi.password)
    await wifiRepository.insert(treatedWifi)
}

export async function getAllWifis(userId:number) {
    const wifis = await wifiRepository.findByUserId(userId)
    const treatedWifis = wifis.map(w=>{
        w.password = cryptrUtils.decryptString(w.password)
        return w
    })
    return treatedWifis
}

export async function getOneWifi(wifiId:number, userId:number) {
    const wifi = await userWifiExists(wifiId,userId)
    wifi.password = cryptrUtils.decryptString(wifi.password)
    return wifi
}

async function userWifiExists (wifiId:number, userId:number) {
    const wifi = await wifiRepository.findByIdAndUserId(wifiId,userId)
    if(!wifi){
        throw {code:'NotFound', message:'No wifi networks were found with given id'}
    }
    return wifi
}

export async function deleteWifi (wifiId:number, userId:number) {
    await userWifiExists(wifiId,userId)
    await wifiRepository.deleteOne(wifiId)
}