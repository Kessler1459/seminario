import Degree from "../../models/degree";

const Card = ({ degree }: { degree: Degree }) => (
	<div>
		<strong>{degree.title}</strong>
		{degree.courses.length == 1 ? (
			<p>{degree.courses.length} course completed</p>
		) : (
			<p>{degree.courses.length} courses completed</p>
		)}
		<p>Average score {degree.courses.reduce((sum, c) => sum + c.score, 0) / degree.courses.length}</p>
	</div>
);

export default Card;
