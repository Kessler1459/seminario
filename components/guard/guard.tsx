import { useEffect, useState } from "react";
import { useEthersContext } from "../../ethers-context";
import { useRouter } from "next/router";

const Guard = ({ children }: { children: JSX.Element }) => {
	const router = useRouter();
	const { provider, contract } = useEthersContext();
	const [isOwner, setOwner] = useState(false);

	useEffect(() => {
		if (provider) {
			checkOwner().then((owner) => {
				if (!owner) {
					router.push("/");
				} else {
					setOwner(true);
				}
			});
		}
	});

	const checkOwner = async () => {
		if (provider) {
			const [actualAccount] = await provider.listAccounts();
			const [ownerAccount] = await contract?.functions.owner();
			return actualAccount !== undefined && actualAccount.toLowerCase() == ownerAccount.toLowerCase();
		}
	};

	return !isOwner ? <div>LOAD</div> : children;
};

export default Guard;
