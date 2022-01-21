import { ChangeEvent, FormEvent, useState } from "react";
import { useEthersContext } from "../../ethers-context";

const MintForm = () => {
    const contract = useEthersContext();
    const [form,setForm]=useState({
        address:"",
        score:""
    });

    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event:FormEvent)=>{
        event.preventDefault();
        console.log(form);
    }

	return (
		<>
			<h1>Mint</h1>
			<form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInputChange} name="address" placeholder="address" />
                <input type="number" min={1} max={10} onChange={handleInputChange} name="score" placeholder="score"/>
                <button type="submit">Send</button>
            </form>
		</>
	);
};

export default MintForm;
