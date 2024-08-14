import {useUserContext} from "../context/UserContext.jsx";


function Dashboard() {
    const { user, authenticated } = useUserContext();

    return (
        <div>
            {JSON.stringify(authenticated)}
            <br />
            {JSON.stringify(user)}
        </div>
    );
}

export default Dashboard;
