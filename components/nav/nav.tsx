import metamaskLogo from "/public/metamask.svg";
import Image from "next/image";
import styles from "./nav.module.scss";
import Link from "next/link";

const Nav: React.FC<{ address: string; owner: boolean | null; openMetamaskModal: () => void }> = ({
	address,
	owner,
	openMetamaskModal,
}) => {
	return (
		<nav className={styles.nav}>
			<Link href="/">Home</Link>
			<Link href="/ranking">Ranking</Link>
			{owner ? <Link href="/mint">Mint token</Link> : null}
			<Link href={"/profile/" + address}>{address}</Link>
			{!address ? (
				<Image className={styles.icon} src={metamaskLogo.src} width={25} height={25} onClick={openMetamaskModal} alt='metamask_logo'/>
			) : null}
		</nav>
	);
};

export default Nav;
