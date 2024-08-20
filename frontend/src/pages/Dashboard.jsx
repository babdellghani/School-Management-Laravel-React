import { Briefcase, Mail, Users } from "lucide-react";
import { useUserContext } from "../context/UserContext.jsx";

function Dashboard() {
    const { user, authenticated } = useUserContext();

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: "Total Users",
                        value: "1,234",
                        icon: Users,
                    },
                    {
                        title: "Active Projects",
                        value: "42",
                        icon: Briefcase,
                    },
                    { title: "Messages", value: "15", icon: Mail },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center"
                    >
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
                            <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-2xl font-bold dark:text-gray-200">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                {JSON.stringify(authenticated)}
                <br />
                {JSON.stringify(user)}
            </div>
        </div>
    );
}

export default Dashboard;
