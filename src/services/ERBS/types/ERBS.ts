export type Friend = {
    friends: Array<PlayerInfo>
}

export type PlayerInfo = {
    emblem: number;
    friendNickname: string;
    friendUserCode: string;
    friendUserNum: number;
}