import { ethers } from "ethers";
import { createContext, useContext } from "react";

export type EtherContextType =
	| { contract: null; provider: null }
	| { contract: ethers.Contract; provider: ethers.providers.Web3Provider };

export const EthersContext = createContext<EtherContextType>({ contract: null, provider: null });

export const useEthersContext = () => useContext(EthersContext);
