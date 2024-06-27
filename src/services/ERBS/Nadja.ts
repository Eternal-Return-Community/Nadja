import Client from "@Services/ERBS/Client"
import type { PlayerInfo } from "./types/ERBS";

export default class Nadja extends Client {

    public async searchUser(userName: string): Promise<PlayerInfo> {
        const response = await this.instance({ method: 'POST', endpoint: '/friends/search', body: userName })
        return response?.friends[0]
    }

    public async changeNickname(userName: string): Promise<any> {
        return await this.instance({
            method: 'POST',
            endpoint: '/users/purchase/changeNickname',
            body: { "productId": "ACCOUNT_Change_Nickname", "salePurchase": false, "newNickname": userName }
        })
    }

    public async myAccount(): Promise<any> {
        return await this.instance({
            method: 'GET',
            endpoint: '/lobby/enterRepeat/?searchTime=0',
        })
    }
}