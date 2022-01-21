import "../styles/globals.css";
import { ethers } from "ethers";
import type { AppProps } from "next/app";
import { EthersContext,EtherContextType } from "../ethers-context";
import abiJson from "../hardhat/artifacts/contracts/UniversidadTecnologicaNacional.sol/UniversidadTecnologicaNacional.json";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
	const [ethersContext, setEthersContext] = useState<EtherContextType>({ contract: null, provider: null });
	useEffect(() => {
        const eth=(window as any).ethereum;
        if(eth){
            const provider = new ethers.providers.Web3Provider(eth);        
		    setEthersContext({
                contract: new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", abiJson.abi, provider),
                provider: provider,
		    });
        }
		
	}, []);

	return (
		<EthersContext.Provider value={ethersContext}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</EthersContext.Provider>
	);
}

export default MyApp;
