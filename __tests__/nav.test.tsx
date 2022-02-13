import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/nav/nav";

describe("Nav", () => {
	const addr = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";

	/*it("renders a nav from non connected user", () => {
		render(<Nav address={""} owner={false} openMetamaskModal={() => {}} />);

		const mintFormAnchor = screen.queryByText("Mint token");
		const metamaskButton = screen.queryByAltText("metamask_logo");
		const homeAnchor=screen.queryByText("Home")
		const RankAnchor = screen.queryByText("Ranking");

		expect(homeAnchor).toBeInTheDocument();
		expect(RankAnchor).toBeInTheDocument();
		expect(mintFormAnchor).not.toBeInTheDocument();
		expect(metamaskButton).toBeInTheDocument();
	});*/

	it("renders a nav from non owner", () => {
		render(<Nav address={addr} owner={false} openMetamaskModal={() => {}} />);

		const addrAnchor = screen.getByText(addr);
		const mintFormAnchor = screen.queryByText("Mint token");
		const metamaskButton = screen.queryByAltText("metamask_logo");
		const homeAnchor = screen.queryByText("Home");
		const RankAnchor = screen.queryByText("Ranking");

		expect(addrAnchor).toBeInTheDocument();
		expect(addrAnchor.getAttribute("href")).toEqual("/profile/" + addr);
		expect(homeAnchor).toBeInTheDocument();
		expect(RankAnchor).toBeInTheDocument();
		expect(mintFormAnchor).not.toBeInTheDocument();
		expect(metamaskButton).not.toBeInTheDocument();
	});

	it("renders a nav from owner", () => {
		render(<Nav address={addr} owner={true} openMetamaskModal={() => {}} />);

		const addrAnchor = screen.getByText(addr);
		const mintFormAnchor = screen.queryByText("Mint token");
		const metamaskButton = screen.queryByAltText("metamask_logo");
		const homeAnchor = screen.queryByText("Home");
		const RankAnchor = screen.queryByText("Ranking");

		expect(addrAnchor).toBeInTheDocument();
		expect(addrAnchor.getAttribute("href")).toEqual("/profile/" + addr);
		expect(homeAnchor).toBeInTheDocument();
		expect(RankAnchor).toBeInTheDocument();
		expect(mintFormAnchor).toBeInTheDocument();
		expect(metamaskButton).not.toBeInTheDocument();
	});
});
