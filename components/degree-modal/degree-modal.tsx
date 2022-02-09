import { Paper, TableContainer,Table, TableBody, TableRow, TableCell, TableHead } from "@mui/material";
import Degree from "../../models/degree";
import Modal from "../modal";
import styles from "./table.module.scss";

const columns = [
	{ field: "tokenId", headerName: "ID", width: 60 },
	{ field: "name", headerName: "Course", width: 120 },
	{ field: "date", headerName: "Mint date", width: 70 },
    { field: "score", headerName: "Score", width: 70 }
];

const DegreeModal = ({ degree, hide, isShowing }: { degree: Degree; hide: () => void; isShowing: boolean }) => {
	
	return (
		<Modal hide={hide} isShowing={isShowing} title={<h2>{degree.title}</h2>}>
			<Paper className={styles.paper} sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer className={styles.table} sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column, colKey) => (
								<TableCell className={styles.th} key={colKey}>
									<strong>{column.headerName}</strong>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{degree.courses.map((row, rowKey) => {
							return (
								<TableRow
									hover
                                    className={styles.row}
									role="checkbox"
									tabIndex={-1}
									key={rowKey}
								>
									{columns.map((column, k) => {
										const value = (row as any)[column.field];
										return <TableCell className={styles.cell} key={k}>{value instanceof Date?value.toLocaleDateString() :value.toString() }</TableCell>;
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
		</Modal>
	);
};

export default DegreeModal;
