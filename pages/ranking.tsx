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
};

export default Home;
