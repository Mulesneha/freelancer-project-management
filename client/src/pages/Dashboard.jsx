function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-2 text-3xl font-bold">
                Freelancer Dashboard
            </h1>

            <p className="mb-8 text-gray-600">
                Welcome back! Here's your project overview.
            </p>

            <div className="grid gap-6 md:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">Total Projects</p>
                    <h2 className="mt-2 text-3xl font-bold">12</h2>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">Active Projects</p>
                    <h2 className="mt-2 text-3xl font-bold">5</h2>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">Completed</p>
                    <h2 className="mt-2 text-3xl font-bold">7</h2>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">Total Earnings</p>
                    <h2 className="mt-2 text-3xl font-bold">
                        ₹85,000
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;