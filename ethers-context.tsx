import { ethers } from "ethers";
import { createContext, useContext } from "react";

export interface EtherContextType{ 
    contract: null|ethers.Contract; 
    provider: null|ethers.providers.Web3Provider; 
}
	

export const EthersContext = createContext<EtherContextType>({ contract: null, provider: null });

export const useEthersContext = () => useContext(EthersContext);
