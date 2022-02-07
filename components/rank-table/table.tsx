import { Entry } from "../../hooks/useUsers";
import styles from "./table.module.scss";
import Paper from "@mui/material/Paper";
import { Table as MTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const columns = [
	{ field: "address", headerName: "Address", width: 70 },
	{ field: "tokens", headerName: "Tokens", width: 130 },
	{ field: "totalScore", headerName: "Total score", width: 130 },
];

const Table = ({ leaderboard }: { leaderboard: Entry[] }) => {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [showedList, setShowedList] = useState(leaderboard);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		setShowedList(leaderboard);
	}, [leaderboard]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
		setShowedList(leaderboard.filter((entry) => entry.address.includes(e.target.value)));
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<input type="text" value={filter} onChange={onChangeFilter} />
			<TableContainer sx={{ maxHeight: 440 }}>
				<MTable stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell key={-1}>#</TableCell>
							{columns.map((column, colKey) => (
								<TableCell key={colKey}>
									<strong>{column.headerName}</strong>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{showedList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowKey) => {
							return (
								<TableRow
									onClick={() => router.push("/profile/" + row.address)}
									hover
									role="checkbox"
									tabIndex={-1}
									key={rowKey}
								>
									<TableCell key={-1}>{rowKey + 1}</TableCell>
									{columns.map((column, k) => {
										const value = (row as any)[column.field];
										return <TableCell key={k}>{value}</TableCell>;
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</MTable>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={showedList.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Table;
