import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Table from "../components/rank-table/table";
import { useEthersContext } from "../ethers-context";
import { useUsers, Entry } from "../hooks/useUsers";


const Home: NextPage = () => {
	const { contract } = useEthersContext();
	const { getAllEntries } = useUsers(contract);
	const [leaderboard, setLeaderboard] = useState<Entry[]>([]);

	useEffect(() => {
		getAllEntries().then((rank) => setLeaderboard(rank.sort(compareRank)));
	}, [contract]);

	const compareRank = (a: Entry, b: Entry) => {
		if (a.totalScore < b.totalScore) return 1;
		else if (a.totalScore > b.totalScore) return -1;
		return 0;
	};

	return <Table leaderboard={leaderboard} />

	/*
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
				{leaderboard.map((scoreEntry, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						<td><a href={"/profile/"+scoreEntry.address}>{scoreEntry.address}</a></td>
						<td>{scoreEntry.tokens}</td>
						<td>{scoreEntry.totalScore}</td>
					</tr>
				))}
			</tbody>
		</table>
	);*/
};

export default Home;
