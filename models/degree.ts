import Course from "./course";

export default class Degree{
    title:string;
    courses:Course[]

    constructor(title:string,courses:Course[]){
        this.title=title;
        this.courses=courses;
    }
}