import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Guard from "../components/guard/guard";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("guard", () => {
	it("should render children", () => {
		render(
			<Guard isOwner={true}>
				<div>testdiv</div>
			</Guard>
		);

		const children = screen.getByText("testdiv");

		expect(children).toBeInTheDocument();
	});

	it("should redirect to root", () => {
		const push = jest.fn();

		useRouter.mockImplementation(() => ({
			push: push,
		}));
		render(
			<Guard isOwner={false}>
				<div>testdiv</div>
			</Guard>
		);

		expect(push).toBeCalledTimes(1);
	});

    it("should render a load component", () => {
		render(
			<Guard isOwner={null}>
				<div>testdiv</div>
			</Guard>
		);

		const children = screen.getByText("LOAD");

		expect(children).toBeInTheDocument();
	});
});
