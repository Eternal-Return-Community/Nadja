import { BASE_URL, GAME_VERSION } from "@Utils/constants";

type Headers = {
    'User-Agent': string;
    'Content-Type': string;
    'X-BSER-SessionKey'?: string;
    'X-BSER-Version': string;
    'X-BSER-Replay-Version': string;
    'X-BSER-AuthProvider': 'STEAM' | 'KAKAO' | 'CHINA' //(?)
}

export type InstanceParams = {
    method: 'GET' | 'POST' | 'PUT';
    endpoint: string;
    body?: any
}

export default abstract class Client {

    constructor(private readonly _token?: string) {
        this.updateHeader(_token!);
    }

    protected readonly _HEADERS: Headers = {
        "User-Agent": "BestHTTP/2 v2.4.0",
        "Content-Type": "application/json",
        "X-BSER-Version": GAME_VERSION,
        "X-BSER-Replay-Version": GAME_VERSION,
        "X-BSER-AuthProvider": "STEAM"
    }

    protected updateHeader(value: string) {
        return this._HEADERS['X-BSER-SessionKey'] = value;
    };

    private listExceptions(code: number): string {
        const errors: Record<number, string> = {
            1000: 'unknown',
            1004: 'session.header.required',
            1007: 'invalid.version',
            1102: 'expired.token',
            1111: 'name.is.already.in.use',
        }
        return errors[code] || 'internal.server.error';
    }

    private handleExceptions(code: number): void {
        if (code < 1000) return;
        throw new Error(this.listExceptions(code))
    }

    protected async instance(params: InstanceParams): Promise<any> {
        const response = await fetch(BASE_URL + params.endpoint, { method: params.method, headers: this._HEADERS, body: this.body(params?.body) });
        const data = await response.json();

        if (!data?.rst) this.handleExceptions(data.cod);

        return data?.rst ?? data
    }

    private body(payload?: any): any {
        if (!payload) return;
        return typeof payload === 'string' ? payload : JSON.stringify(payload)
    }
}