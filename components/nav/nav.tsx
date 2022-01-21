import { useEffect, useState } from "react";
import metamaskLogo from "/public/metamask.svg";
import Image from "next/image";
import styles from "./nav.module.scss";
import { useEthersContext } from "../../ethers-context";
import Modal from "../modal";

const Nav = () => {
	const { provider, contract } = useEthersContext();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [address, setAddress] = useState<string>("");
	const [isOwner, setOwner] = useState<boolean>(false);

	useEffect(() => {  
		(provider?.provider as any)?.on("accountsChanged", ([account]: [string]) => {
			if (account) {
				setAddress(account);
				updateOwner(account);
			} else {
				setAddress("");
				setOwner(false);
			}
		});
		getActualAccount()?.then(([account]: string[]) => {
			if (account) {
				setAddress(account);
				updateOwner(account);
			} else {
				setAddress("");
				setOwner(false);
			}
		});
		return () => {
			(provider?.provider as any)?.removeAllListeners("accountsChanged");
		};
	});

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

	const getActualAccount = (): Promise<string[]> | undefined => provider?.listAccounts(); 

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
		<>
			<nav className={styles.nav}>
				<a href="/ranking">Ranking</a>
				{isOwner ? <a href="/mint">Mint token</a> : null}
				<a>{address}</a>
				{!address ? (
					<Image className={styles.icon} src={metamaskLogo.src} width={25} height={25} onClick={onClickMetamask} />
				) : null}
			</nav>
			<button onClick={openModal}>abr</button>
			<Modal isShowing={modalIsOpen} hide={closeModal} title={<h2>Metamask not installed</h2>}>
				<div>
					<div>
						<a className="link" href="https://metamask.io/download/" target="_blank">
							<Image className={styles.icon} src={metamaskLogo.src} width={40} height={40} />
							<div>Download Metamask</div>
						</a>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Nav;
