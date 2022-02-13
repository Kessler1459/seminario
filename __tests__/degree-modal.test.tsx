import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Degree from "../models/degree";
import Course from "../models/course";
import DegreeModal from "../components/degree-modal/degree-modal";

describe("degree-modal", () => {
	let degree: Degree;
	beforeEach(() => {
		degree = new Degree("degree", []);
	});

	it("should not render", () => {
		const comp=render(<DegreeModal degree={degree} hide={() => {}} isShowing={false}></DegreeModal>);
        
		expect(comp.container).toBeEmptyDOMElement();
	});

    it("should render 1 course row", () => {
		degree.courses.push(new Course(1, "course1", 5, new Date()));
		render(<DegreeModal degree={degree} hide={() => {}} isShowing={true}></DegreeModal>);
       
        const rows=screen.getAllByRole('checkbox',{hidden:true});
		
        expect(rows.length).toEqual(1)
	});
});
