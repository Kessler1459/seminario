import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useEthersContext } from "../../ethers-context";
import useUsers from "../../hooks/useUsers";
import { isAddress } from "ethers/lib/utils";
import User from "../../models/user";
import Degree from "../../models/degree";
import Course from "../../models/course";
import Card from "../../components/degree-card/card";

const Profile = () => {
	const router = useRouter();
	const { contract } = useEthersContext();
	const { getFullUser, loading } = useUsers(contract);
	const [user, setUser] = useState<User | null>(null);
	const [latestCourse, setLatestCourse] = useState<Course | null>(null);

	useEffect(() => {
		const add = router.query.address;
		if (!user && typeof add === "string" && isAddress(add)) {
			getFullUser(add).then((us) => {
				setUser(us);
				getLatestCourse(us);
			});
		}
	}, [router.query.address]);

	const getLatestCourse = (user: User) => {
		let latest: Course | null = null;
		if (user?.degrees) {
			for (const degree of user.degrees) {
				const max = degree.courses.reduce((prev, cur) => (prev.date < cur.date ? cur : prev));
				if (!latest || max.date > latest.date) {
					latest = max;
				}
			}
		}
		setLatestCourse(latest);
	};

	const getTotalAverage = () => {
        const sum=user?.degrees.reduce((s, c) => s + c.courses.reduce((sum, val) => sum + val.score, 0) / c.courses.length, 0)
        if(sum && user?.degrees)
            return (sum/user?.degrees.length).toFixed(2);
	};
	
	return (
		<>
			<h1>{user?.address}</h1>
			<h3>{user?.firstName + " " + user?.lastName}</h3>
			{user?.degrees.length == 0 ? (
				<div>No tokens found</div>
			) : (
				<>
					<div>
						<i>Latest token</i>
						<p>
							#{latestCourse?.tokenId.toString()} Earned {latestCourse?.name} on{" "}
							{latestCourse?.date.toLocaleDateString()}
						</p>
					</div>
					<ul>
						<li>Tokens: {user?.degrees.reduce<number>((acum, cur) => acum + cur.courses.length, 0)}</li>
						<li>
							Total score:{" "}
							{user?.degrees.reduce<number>((sum, cur) => sum + cur.courses.reduce((s, c) => s + c.score, 0), 0)}
						</li>
                        <li>Average: {getTotalAverage()}</li>
					</ul>
					{user?.degrees.map((deg, i) => (
						<Card key={i} degree={deg} />
					))}
				</>
			)}
		</>
	);
};
export default Profile;
