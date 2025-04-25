// edit this to be the users' data only though

"use client"; // Mark this as a Client Component

import Posts from "../components/posts"; // Import the Posts component

export default function DashboardPage() {
    return (
        <div>

            <Posts /> {/* Render the Posts component here! also edit to just be the current user's */}
        </div>
    );
}
