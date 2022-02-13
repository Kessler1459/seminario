import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../components/degree-card/card";
import Degree from "../models/degree";
import Course from "../models/course";

describe('degree-card',()=>{
    let degree:Degree;
    beforeEach(()=>{
        degree=new Degree("degree",[]);
    })

    it('renders with one course',()=>{
        degree.courses.push(new Course(1,"course1",5,new Date()))
        render(<Card degree={degree}></Card>)

        const title = screen.getByText(degree.title);
        const courses = screen.queryByText('1 course completed');

        expect(title).toBeInTheDocument();
        expect(courses).toBeInTheDocument();
    })

    it('renders with multiple courses',()=>{
        degree.courses.push(new Course(1,"course1",5,new Date()))
        degree.courses.push(new Course(2,"course1",5,new Date()))
        render(<Card degree={degree}></Card>)

        const title = screen.getByText(degree.title);
        const courses = screen.queryByText('2 courses completed');

        expect(title).toBeInTheDocument();
        expect(courses).toBeInTheDocument();
    })

    it('calculate the average from courses',()=>{
        degree.courses.push(new Course(1,"course1",5,new Date()))
        degree.courses.push(new Course(2,"course1",5,new Date()))
        render(<Card degree={degree}></Card>)

        const average = screen.queryByText('Average score '+5);

        expect(average).toBeInTheDocument();
    })


})





