import { useRouter } from "next/router"
import { useEffect } from "react";
import { useEthersContext } from "../../ethers-context";

const Profile = () => {
    const router=useRouter();
    const {provider}=useEthersContext()

    useEffect(()=>{
        provider?.getSigner().getAddress().then(add=>router.push('profile/'+add))
    })
    return null
};

export default Profile;
