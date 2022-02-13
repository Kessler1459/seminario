import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../components/rank-table/table";
import { Entry } from "../hooks/useUsers";

describe("degree-card", () => {
	let entries: Entry[];
	beforeEach(() => {
		entries = [];
	});

	it("should render 2 rows", () => {
		entries.push({ address: "address1", tokens: 2, totalScore: 20 });
		entries.push({ address: "address2", tokens: 1, totalScore: 6 });
		render(<Table leaderboard={entries}></Table>);

		const rows = screen.getAllByRole("checkbox", { hidden: true });

		expect(rows.length).toEqual(2);
	});

	it("should filter 1 row", () => {
		entries.push({ address: "address1", tokens: 2, totalScore: 20 });
		entries.push({ address: "address2", tokens: 1, totalScore: 6 });
		
        render(<Table leaderboard={entries}></Table>);
		fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "address1" } });
		const rows = screen.getAllByRole("checkbox", { hidden: true });

		expect(rows.length).toEqual(1);
	});
});
