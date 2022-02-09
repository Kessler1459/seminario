import { useState } from "react";
import Degree from "../../models/degree";
import DegreeModal from "../degree-modal/degree-modal";

const Card = ({ degree }: { degree: Degree }) => {
	const [modalShowing, setShowing] = useState(false);

	const hideModal = () => setShowing(false);

	const onClick = () => setShowing(true);

	return (
		<>
			<div onClick={onClick}>
				<strong>{degree.title}</strong>
				{degree.courses.length == 1 ? (
					<p>{degree.courses.length} course completed</p>
				) : (
					<p>{degree.courses.length} courses completed</p>
				)}
				<p>Average score {degree.courses.reduce((sum, c) => sum + c.score, 0) / degree.courses.length}</p>
			</div>
			<DegreeModal degree={degree} hide={hideModal} isShowing={modalShowing} />
		</>
	);
};

export default Card;
