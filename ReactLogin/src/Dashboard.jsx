import React, {useState} from 'react';

function Dashboard() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the user dashboard, you are logged in!</p>
        </div>
    )
}

export default Dashboard;