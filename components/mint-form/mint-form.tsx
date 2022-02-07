import { isAddress } from "ethers/lib/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FocusEventHandler, useState } from "react";
import useUsers from "../../hooks/useUsers";
import User from "../../models/user";
import { BigNumber } from "ethers";
import styles from "./Mint-form.module.scss";
import { useEthersContext } from "../../ethers-context";

const MintForm = () => {
	const { contract } = useEthersContext();
	const { loading, getFullUser, mintTokenToAddress } = useUsers(contract);
	const [user, setUser] = useState<User | null>(null);
	const validationSchema = Yup.object().shape({
		address: Yup.string()
			.trim()
			.required("Address is required")
			.test("address", "Address is invalid", (add) => isAddress(add ?? "")),
		score: Yup.number().required("Score is required").min(1, "Minimum score is 1").max(10, "Maximum score is 1"),
		degree: Yup.string()
			.trim()
			.required("Degree is required")
			.min(3, "Degree must be at least 3 characters")
			.max(25, "Degree must not exceed 25 characters"),
		course: Yup.string()
			.trim()
			.required("Course is required")
			.min(3, "Course must be at least 3 characters")
			.max(25, "Course must not exceed 25 characters")
			.test("course", "Course already exists", (val) => !courseExists(val ?? "")),
		firstName: Yup.string()
			.trim()
			.required("First name is required")
			.min(3, "First name must be at least 3 characters")
			.max(25, "First name must not exceed 25 characters"),
		lastName: Yup.string()
			.trim()
			.required("Last name is required")
			.min(3, "Last name must be at least 3 characters")
			.max(25, "Last name must not exceed 25 characters"),
	});
	const formik = useFormik({
		initialValues: {
			address: "",
			score: "",
			degree: "",
			course: "",
			firstName: "",
			lastName: "",
		},
		validationSchema,
		onSubmit: async ({ firstName, lastName, degree, address, course, score }) => {
			mintTokenToAddress(firstName, lastName, degree, address, course, BigNumber.from(score));
		},
	});

	const handleAddressBlur: FocusEventHandler<HTMLInputElement> = async (e: any) => {
		setUser(null);
		const address = formik.values.address.trim();
		if (address && isAddress(address)) {
			const us = await getFullUser(address);
			if (user == null || !user.firstName) {
				formik.setFieldValue("firstName", us.firstName);
				formik.setFieldValue("lastName", us.lastName);
			}
			setUser(us);
		}
		formik.handleBlur(e);
	};

	const courseExists = (course: string): boolean =>
		user?.degrees.find((deg) => deg.title == formik.values.degree)?.courses.find((cou) => cou == course) !== undefined;

	return (
		<form className={styles.columnsForm} onSubmit={formik.handleSubmit}>
			{loading ? <h2>CARGANDO</h2> : null}
			<section className={styles.sectionInput}>
				<input
					className={`${styles.address} ${styles.form__input}`}
					id="address"
					name="address"
					type="text"
					autoComplete="off"
					minLength={42}
					maxLength={42}
					onChange={formik.handleChange}
					onBlur={handleAddressBlur}
					value={formik.values.address}
					placeholder="Address"
					required
				/>
				{formik.touched.address ? (
					<>
						<div className={styles.error}>{formik.errors.address}</div>
						{user?.firstName == "" ? <div>This is a new address</div> : null}
					</>
				) : null}
			</section>

			<div className={styles.row}>
				<div>
					<input
						className={styles.form__input}
						id="firstName"
						name="firstName"
						type="text"
						autoComplete="given-name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.firstName}
						placeholder="First name"
						required
					/>
					{formik.touched.firstName && formik.errors.firstName ? (
						<div className={styles.error}>{formik.errors.firstName}</div>
					) : null}
				</div>

				<div>
					<input
						className={styles.form__input}
						placeholder="Last name"
						id="lastName"
						name="lastName"
						type="text"
						autoComplete="family-name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.lastName}
						required
					/>

					{formik.touched.lastName && formik.errors.lastName ? (
						<div className={styles.error}>{formik.errors.lastName}</div>
					) : null}
				</div>
			</div>
			<div className={styles.row}>
				<div>
					<input
						className={styles.form__input}
						placeholder="Degree"
						id="degree"
						name="degree"
						type="text"
						autoComplete="organization-title"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.degree}
						required
					/>

					{formik.touched.degree && formik.errors.degree ? (
						<div className={styles.error}>{formik.errors.degree}</div>
					) : null}
				</div>
				<div>
					<input
						className={styles.form__input}
						placeholder="Course"
						id="course"
						name="course"
						type="text"
						autoComplete="off"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.course}
						required
					/>

					{formik.touched.course && formik.errors.course ? (
						<div className={styles.error}>{formik.errors.course}</div>
					) : null}
				</div>
			</div>

			<section className={styles.sectionInput}>
				<select
					className={styles.form__input}
					name="score"
					id="score"
					placeholder="Score"
					autoComplete="off"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.score}
					required
				>
					<option value="">Score</option>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, i) => (
						<option key={i} value={val}>
							{val}
						</option>
					))}
				</select>
				{formik.touched.score && formik.errors.score ? <div className={styles.error}>{formik.errors.score}</div> : null}
			</section>

			<button className={styles.btn} disabled={!formik.isValid} type="submit">
				Mint
			</button>
		</form>
	);
};

export default MintForm;
