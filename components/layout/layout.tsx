import Nav from "../nav/nav";

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Nav></Nav>
			{children}
		</>
	);
};

export default Layout;
