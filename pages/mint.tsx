import { NextPage } from "next";
import Guard from "../components/guard/guard";
import MintForm from "../components/mint-form/mint-form";

const Mint: NextPage<{owner:boolean|null}> = ({owner}) => {
	return (
		<Guard isOwner={owner}>
            <MintForm/>
        </Guard>		
	);
};

export default Mint;
