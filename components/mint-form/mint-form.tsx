import { useEthersContext } from "../../ethers-context";
import { useFormik } from "formik";
import { File, NFTStorage } from "nft.storage";
import { UniversidadTecnologicaNacional } from "../../hardhat/typechain";
const apiKey = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY ?? "";

const MintForm = () => {
	const { contract } = useEthersContext();

	const formik = useFormik({
		initialValues: {
			address: "",
			score: "",
			degree: "",
			course: "",
			firstName: "",
			lastName: "",
		},
		onSubmit: async ({ firstName, lastName, degree, address, course, score }) => {
			const client = new NFTStorage({ token: apiKey });
			const cid = await client.storeDirectory([
				new File(
					[
						JSON.stringify(
							{
								name: firstName,
								lastName: lastName,
								degree: degree,
								course: course,
								date: new Date(),
							},
							null,
							2
						),
					],
					"metadata.json"
				),
			]);
			(contract as UniversidadTecnologicaNacional)?.safeMint(address, score, cid).catch(() => client.delete(cid)); //si cancela transaccion o hay revert se borra tambien del ipfs
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="address">Address</label>
			<input
				id="address"
				name="address"
				type="text"
				autoComplete="off"
				minLength={42}
				maxLength={42}
				onChange={formik.handleChange}
				value={formik.values.address}
				required
			/>
			<label htmlFor="score">Score</label>
			<input
				id="score"
				name="score"
				type="number"
				min={1}
				max={10}
				onChange={formik.handleChange}
				value={formik.values.score}
				required
			/>
			<label htmlFor="degree">Degree</label>
			<input
				id="degree"
				name="degree"
				type="text"
				autoComplete="organization-title"
				onChange={formik.handleChange}
				value={formik.values.degree}
				required
			/>
			<label htmlFor="course">Course</label>
			<input
				id="course"
				name="course"
				type="text"
				autoComplete="off"
				onChange={formik.handleChange}
				value={formik.values.course}
				required
			/>
			<label htmlFor="firstName">First name</label>
			<input
				id="firstName"
				name="firstName"
				type="text"
				autoComplete="given-name"
				onChange={formik.handleChange}
				value={formik.values.firstName}
				required
			/>
			<label htmlFor="lastName">Last name</label>
			<input
				id="lastName"
				name="lastName"
				type="text"
				autoComplete="family-name"
				onChange={formik.handleChange}
				value={formik.values.lastName}
				required
			/>

			<button type="submit">Submit</button>
		</form>
	);

	/*
	const [form, setForm] = useState({
		address: "",
		score: "",
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.log(form);
	};

	return (
		<>
			<h1>Mint</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" onChange={handleInputChange} name="address" placeholder="address" />
				<input type="number" min={1} max={10} onChange={handleInputChange} name="score" placeholder="score" />
				<button type="submit">Send</button>
			</form>
		</>
	);*/
};

export default MintForm;
