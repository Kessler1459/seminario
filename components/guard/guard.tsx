import { useEffect } from "react";
import { useRouter } from "next/router";

const Guard = ({ children,isOwner }: { children: JSX.Element,isOwner:boolean|null }) => {
	const router = useRouter();

	useEffect(() => {
		if (isOwner==false) {
			router.push("/");
		}
	});

	return isOwner==null ? <div>LOAD</div> : children;
};

export default Guard;
