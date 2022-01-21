import Nav from "../nav/nav";

const Layout: React.FC<{ children: JSX.Element; address: string; owner: boolean|null; openMetamaskModal: () => void }> = ({
	children,
	address,
	owner,
	openMetamaskModal,
}) => {
	return (
		<>
			<Nav address={address} owner={owner} openMetamaskModal={openMetamaskModal}></Nav>
			{children}
		</>
	);
};

export default Layout;
