import React, { useEffect, useState } from "react";
import '../styles/license.css';

function License() {
    const [licenses, setLicenses] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10); // Default value for limit
    const [showAddCard, setShowAddCard] = useState(false); // Card visibility
    const [newLicense, setNewLicense] = useState({
        username: "",
        email: "",
        full_name: "",
        is_active: true,
        location: "",
        number_of_licenses: 0,
        password: "",
    });

    const fetchLicenses = async (limitValue) => {
        try {
            const response = await fetch(
                `http://localhost:6547/admins/admin_list?skip=0&limit=${limitValue}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setLicenses(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const addNewLicense = async () => {
        try {
            const response = await fetch("http://localhost:6547/admins/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(newLicense),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("New License Added:", data);
            setShowAddCard(false); // Hide the card
            fetchLicenses(limit); // Refresh the license list
        } catch (err) {
            console.error("Error adding license:", err);
            setError("Failed to add license.");
        }
    };

    useEffect(() => {
        fetchLicenses(limit);
    }, [limit]);

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewLicense({ ...newLicense, [name]: value });
    };

    return (
        <div>
            <h1>License</h1>
            <label htmlFor="limit-select">Select Limit:</label>
            <select id="limit-select" value={limit} onChange={handleLimitChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <button onClick={() => setShowAddCard(true)}>Add License</button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Location</th>
                        <th>License Count</th>
                    </tr>
                </thead>
                <tbody>
                    {licenses.map((license, index) => (
                        <tr key={index}>
                            <td>{license.username}</td>
                            <td>{license.location}</td>
                            <td>{license.license_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddCard && (
                <div className="license-card">
                    <h2>Add New License</h2>
                    <form>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={newLicense.username}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={newLicense.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="full_name"
                                value={newLicense.full_name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={newLicense.location}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={newLicense.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="button" onClick={addNewLicense}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowAddCard(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default License;
