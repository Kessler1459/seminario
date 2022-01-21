import { NextPage } from "next";
import Guard from "../components/guard/guard";

const Mint: NextPage<{owner:boolean|null}> = ({owner}) => {
	return (
		<Guard isOwner={owner}>
            <div>MINT</div>
        </Guard>		
	);
};

export default Mint;
