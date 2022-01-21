import "../styles/globals.css";
import { ethers } from "ethers";
import type { AppProps } from "next/app";
import { EthersContext } from "../ethers-context";
import abiJson from "../hardhat/artifacts/contracts/UniversidadTecnologicaNacional.sol/UniversidadTecnologicaNacional.json";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Modal from "../components/modal";
import metamaskLogo from "/public/metamask.svg";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
	const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [address, setAddress] = useState<string>("");
	const [isOwner, setOwner] = useState<boolean | null>(null);
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const eth = (window as any).ethereum;
		if (eth) {
			const ethersProvider = new ethers.providers.Web3Provider(eth);
			setProvider(ethersProvider);
			setContract(new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", abiJson.abi, ethersProvider));
			eth.on("accountsChanged", ([account]: [string]) => setAccount(account));
			const selected = eth.selectedAddress;
            setAccount(selected)
		}
		return () => {
			eth.removeAllListeners("accountsChanged");
		};
	}, [address, isOwner]);

	const onClickMetamask = () => {
		if (!provider || !provider.provider.isMetaMask) {
			openModal();
		} else {
			provider?.send("eth_requestAccounts", []).then(([account]: any) => {
				setAddress(account);
				updateOwner(account);
			});
		}
	};

	const setAccount = (address: string) => {
		if (address) {
			setAddress(address);
			updateOwner(address);
		} else {
			setAddress("");
			setOwner(false);
		}
	};

	const getOwner = () => contract?.functions.owner();

	const updateOwner = (address: string) =>
		getOwner()?.then(([ownerAddress]) => setOwner(ownerAddress.toLowerCase() == address.toLowerCase()));

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<EthersContext.Provider value={{ contract: contract, provider: provider }}>
			<Layout address={address} owner={isOwner} openMetamaskModal={onClickMetamask}>
				<>
					<Modal isShowing={modalIsOpen} hide={closeModal} title={<h2>Metamask not installed</h2>}>
						<div>
							<div>
								<a href="https://metamask.io/download/" target="_blank">
									<Image src={metamaskLogo.src} width={40} height={40} />
									<div>Download Metamask</div>
								</a>
							</div>
						</div>
					</Modal>
					<Component {...Object.assign(pageProps, { owner: isOwner })} />
				</>
			</Layout>
		</EthersContext.Provider>
	);
}

export default MyApp;
