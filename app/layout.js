import { AuthProvider } from "./components/AuthProvider";
import "../globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="m-0 p-0 min-h-screen flex flex-col">
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}