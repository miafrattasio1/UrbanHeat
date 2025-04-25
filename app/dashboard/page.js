"use client"; // Mark this as a Client Component

import { useState } from 'react';
import Posts from "../components/posts"; // Import the Posts component

export default function DashboardPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <Posts searchTerm={searchTerm} /> {/* Pass the search term to Posts component */}

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
