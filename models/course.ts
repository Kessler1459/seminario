import { BigNumberish } from 'ethers';
export default class Course{
    tokenId:BigNumberish;
    name:string;
    score:number;
    date:Date;

    constructor(tokenId:BigNumberish,name:string,score:number,date:Date){
        this.tokenId=tokenId;
        this.name=name;
        this.score=score;
        this.date=date;
    }
}