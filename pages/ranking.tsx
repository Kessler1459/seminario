import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useEthersContext } from "../ethers-context";

const Home: NextPage = () => {
	const {contract} = useEthersContext();
	const [leaderboard, setLeaderboard] = useState<{ address: string; tokens: number; score: number }[]>([]);

	useEffect(() => {
		const getEntries = async () => {
			if (contract) {                                
				const [addresses] = await contract?.functions.getAllAddresses();
				addresses.map(async (address: string) => {
					const [entryList] = await contract?.functions.getAllTokens(address);
					const scores: number[] = entryList.map((entry: [tokenId: BigNumber, score: number]) => entry[1]);
					setLeaderboard((leaderboard) => [
						...leaderboard,
						{ address: address, tokens: scores.length, score: scores.reduce((prev, curr) => prev + curr) },
					]);
				});
			}
		};
		getEntries();
	}, [contract]);

	return (
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Address</th>
					<th>Tokens</th>
					<th>Total score</th>
				</tr>
			</thead>
			<tbody>
				{leaderboard?.map((scoreEntry, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>{scoreEntry.address}</td>
						<td>{scoreEntry.tokens}</td>
						<td>{scoreEntry.score}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Home;
