import Client from '@Services/ERBS/Client'
import { DEVICE, GAME_VERSION } from '@Utils/constants';

type SteamAuth = {
    showGrade: boolean;
    tutorialProgress: number;
    sessionKey: string;
    newUser: boolean;
    keySettings: string;
    ip: string;
    gaap: boolean;
    currency: string;
    todaysFirstLogin: boolean
}

export default class Auth extends Client {

    constructor(private readonly _TOKEN?: string) {
        super()
    }

    private _BODY = {
        "alc": "en",
        "ap": 'STEAM',
        "dlc": "pt",
        "glc": "ko",
        "idt": "",
        "la": 2,
        "prm": {
            "authorizationCode": ""
        },
        "ver": GAME_VERSION
    }

    private updateBody(): void {
        this._BODY.idt = this._TOKEN!;
        this._BODY.prm.authorizationCode = this._TOKEN!;
    }

    public async authenticate(): Promise<string> {
        this.updateBody()

        const response: SteamAuth = await this.instance({ method: 'POST', endpoint: '/users/authenticate', body: this._BODY });
        this.updateHeader(response.sessionKey)

        setInterval(() => this.renewalSession(), 10000)
        return response.sessionKey;
    }

    private renewalSession(): void {
        this.instance({ method: 'POST', endpoint: '/external/renewalSession' });
    }
}