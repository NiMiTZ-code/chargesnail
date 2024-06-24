import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

//-------------------DO ZROBIENIA NA TEJ STRONIE:
//-można ją trochę uładnić
const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        localStorage.clear();
        //sessionStorage.clear();
        navigate("/", { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    },  3 * 1000);

    return <>You have been logged out. Redirecting to main page.</>;
};

export default Logout;