import Degree from "./degree";

export default class User {
    address: string;
    firstName: string;
    lastName: string;
    degrees: Degree[];

    public constructor();
    public constructor(address: string, firstName: string, lastName: string, degrees: Degree[]);
    public constructor(...array: any[]) {
        this.address = array[0] ?? "";
        this.firstName = array[1] ?? "";
        this.lastName = array[2] ?? "";
        this.degrees = array[3] ?? [];
    }

}