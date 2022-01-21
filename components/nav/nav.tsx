import metamaskLogo from "/public/metamask.svg";
import Image from "next/image";
import styles from "./nav.module.scss";

const Nav: React.FC<{ address: string; owner: boolean|null; openMetamaskModal: () => void }> = ({
	address,
	owner,
	openMetamaskModal,
}) => {
	return (
		<nav className={styles.nav}>
            <a href="/">Home</a>
			<a href="/ranking">Ranking</a>
			{owner ? <a href="/mint">Mint token</a> : null}
			<a>{address}</a>
			{!address ? (
				<Image className={styles.icon} src={metamaskLogo.src} width={25} height={25} onClick={openMetamaskModal} />
			) : null}
		</nav>
	);
};

export default Nav;
