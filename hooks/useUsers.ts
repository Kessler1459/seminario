import { useState } from 'react';
import { BigNumberish } from "ethers";
import { NFTStorage } from "nft.storage";
import { useEthersContext } from "../ethers-context";
import { UniversidadTecnologicaNacional } from "../hardhat/typechain";
import Degree from "../models/degree";
import User from "../models/user";
const apiKey = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY ?? "";

const useUsers = () => {
    const { contract } = useEthersContext();
    const [loading, setLoading] = useState(false);

    const mintTokenToAddress = async (firstName: string, lastName: string, degree: string, address: string, course: string, score: BigNumberish) => {
        setLoading(true);
        const client = new NFTStorage({ token: apiKey });
        const cid = await client.storeDirectory([
            new File(
                [
                    JSON.stringify(
                        {
                            name: firstName,
                            lastName: lastName,
                            degree: degree,
                            course: course,
                            date: new Date(),
                        },
                        null,
                        2
                    ),
                ],
                "metadata.json"
            ),
        ]);
        (contract as UniversidadTecnologicaNacional)?.safeMint(address, score, cid).catch(() => client.delete(cid)); //si cancela transaccion o hay revert se borra tambien del ipfs
        setLoading(false);
    }

    const getFullUser = async (address: string) => {
        setLoading(true);
        const tokenList = await (contract as UniversidadTecnologicaNacional).getAllTokens(address);
        const us = new User();
        us.address = address;
        if (tokenList.length !== 0) {
            const degrees: Degree[] = [];
            await Promise.all(
                tokenList.map(async (entry) => {
                    const url = (await contract?.tokenURI(entry.tokenId)).replace("ipfs://", "");
                    const response = await fetch("https://ipfs.io/ipfs/" + url + "/metadata.json");
                    const tokenJson: { name: string; lastName: string; degree: string; course: string; date: Date } =
                        JSON.parse(await response.text());
                    let degree = degrees.find((degree) => degree.title == tokenJson.degree);
                    if (!degree) {
                        degree = new Degree(tokenJson.degree, []);
                        degrees.push(degree);
                    }
                    if (!us.firstName || !us.lastName) {
                        us.firstName = tokenJson.name;
                        us.lastName = tokenJson.lastName;
                    }
                    degree.courses.push(tokenJson.course)
                })
            );
            us.degrees = degrees;
        }
        setLoading(false);
        return us;
    }

    return { loading, getFullUser, mintTokenToAddress }
}

export default useUsers;