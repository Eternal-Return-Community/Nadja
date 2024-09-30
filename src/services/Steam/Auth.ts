import SteamUser from 'steam-user';
import { GAME_ID } from '@Utils/constants';
import Auth from '@Services/ERBS/Auth';

export type Account = {
    login: string;
    password: string
}

export default class Client extends SteamUser {

    constructor(private readonly account: Account) {
        super({ autoRelogin: true })
        this.login()
    }

    private login(): void {
        this.logOn({ accountName: this.account.login, password: this.account.password })
    }

    public async start(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.once('loggedOn', async () => {
                await this.createAuthSessionTicket(GAME_ID, async (err: Error, sessionTicket: Buffer) => {
                    if (err) reject(new Error(err.message));
                    const sessionKey = await new Auth(this.getSessionTicket(sessionTicket)).authenticate();
                    resolve(sessionKey)
                })
            })
        })
    }

    private getSessionTicket(sessionTicket: Buffer): string {
        return sessionTicket.toString('hex').toUpperCase()
    }
}