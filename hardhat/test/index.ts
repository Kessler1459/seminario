import { BigNumber } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { UniversidadTecnologicaNacional } from "../typechain";

describe("UTN Token", function () {
    let Token;
    let UTN: UniversidadTecnologicaNacional;
    let owner: SignerWithAddress;

    this.beforeEach(async () => {
        Token = await ethers.getContractFactory("UniversidadTecnologicaNacional");
        [owner] = await ethers.getSigners();
        UTN = await Token.deploy();
    })

    describe("minting", () => {
        let account:SignerWithAddress;
        let address:string;
        
        this.beforeAll(async () => {
            account = (await ethers.getSigners())[1];
            address = await account.getAddress();
        })

        it("Should mint new token to new account", async () => {
            const tx = UTN.safeMint(address, 10)
            
            expect( await UTN.totalSupply()).equal(1);
            expect(await UTN.scores(0)).equal(10);
            expect((await UTN.getAllAddresses()).length).equal(1);
            expect(tx).to.not.be.reverted
        });

        it("Should mint new token to existing account", async () => {
            const tx = UTN.safeMint(address, 10)
            const tx2 = UTN.safeMint(address, 4)

            expect( await UTN.totalSupply()).equal(2);
            expect(await UTN.scores(0)).equal(10);
            expect((await UTN.getAllAddresses()).length).equal(1);
            expect(tx).to.not.be.reverted
        });

        it("Should revert the minting, score out of range", async () => {
            const tx = UTN.safeMint(address, 100);
            expect(tx).to.be.reverted
        });


    })

    describe("get scores", () => {
        it("Should return an array of ScoreEntry of an address", async () => {
            const address = await owner.getAddress();
            const tx = UTN.safeMint(address, 10);
            const tx2 = UTN.safeMint(address, 5);
            const entryArray=await UTN.getAllTokens(address)
            expect(entryArray.length).equal(2);
            expect(entryArray[0]["tokenId"]).equal(BigNumber.from(0));
            expect(entryArray[0]["score"]).equal(10);
            expect(tx).to.not.be.reverted
        });
    })
});
