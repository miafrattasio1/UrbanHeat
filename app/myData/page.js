"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import UserPosts from "../components/userPosts";

export default function DashboardPage2() {
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!userEmail) {
        return <p>Please log in to view your data.</p>;
    }

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for your posts..."
                    value={userEmail}
                    disabled
                    className="search-input"
                />
            </div>

            <UserPosts userEmail={userEmail} />

            <style jsx>{`
                .search-container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .search-input {
                    width: 100%;
                    padding: 12px 20px;
                    border: 2px solid #ddd;
                    border-radius: 25px;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.3s;
                    max-width: 500px;
                    display: block;
                    margin: 0 auto;
                }

                .search-input:focus {
                    border-color: #0066cc;
                }
            `}</style>
        </div>
    );
}
