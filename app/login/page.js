"use client";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <style jsx>{`
                .login-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start; /* Changed from center to flex-start */
                    min-height: calc(100vh - 80px);
                    background-color: #f3f4f6;
                    padding-top: 5rem; /* Increased top padding */
                    padding-bottom: 2rem;
                }

                .login-title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    color: #1f2937;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 340px;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    margin-top: 2rem; /* Added margin to push form down from title */
                }

                .login-input {
                    width: 100%;
                    max-width: 300px;
                    padding: 0.75rem;
                    margin-bottom: 1.25rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                .login-input:focus {
                    border-color: #3b82f6;
                    outline: none;
                }

                .login-button {
                    width: 100%;
                    max-width: 300px;
                    padding: 0.75rem;
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    font-weight: 600;
                    transition: background-color 0.2s;
                }

                .login-button:hover {
                    background-color: #2563eb;
                }

                .login-error {
                    color: #ef4444;
                    margin-top: 1.5rem;
                    font-size: 1rem;
                    text-align: center;
                }

                .login-text {
                    margin-top: 1.5rem;
                    font-size: 1rem;
                    text-align: center;
                    color: #4b5563;
                }

                .login-link {
                    color: #3b82f6;
                    text-decoration: none;
                    font-weight: 600;
                }

                .login-link:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>
                </form>
                {error && <p className="login-error">{error}</p>}
                <p className="login-text">
                    Don't have an account? <a href="/register" className="login-link">Create one</a>
                </p>
            </div>
        </>
    );
}