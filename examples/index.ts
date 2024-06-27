import Auth from "@Services/Steam/Auth";
import Nadja from "@Services/ERBS/Nadja";

const auth = new Auth({ login: Bun.env.LOGIN!, password: Bun.env.PASSWORD! })
const token = await auth.start();

const nadja = new Nadja(token)

await nadja.changeNickname('nica')
await nadja.searchUser('nica')
await nadja.myAccount()