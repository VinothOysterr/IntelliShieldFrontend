import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GodMode() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:6547/godmode/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    username: username,
                    password: password,
                    scope: "",
                    client_id: "string",
                    client_secret: "string",
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("Login successful:", data);
            setMessage("Login successful!");
            // Navigate to the License route
            navigate("/license");
        } catch (error) {
            console.error("Error:", error);
            setMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h1>Super Admin</h1>

            <div className="super-user-container">
                <input
                    name="superuser"
                    id="superuser"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name="superpass"
                    id="superpass"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default GodMode;
