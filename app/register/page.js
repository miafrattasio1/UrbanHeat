"use client";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <style jsx>{`
                .register-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    min-height: calc(100vh - 80px);
                    background-color: #f3f4f6;
                    padding-top: 5rem;
                    padding-bottom: 2rem;
                }

                .register-title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    color: #1f2937;
                }

                .register-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 340px;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    margin-top: 2rem;
                }

                .register-input {
                    width: 100%;
                    max-width: 300px;
                    padding: 0.75rem;
                    margin-bottom: 1.25rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                .register-input:focus {
                    border-color: #3b82f6;
                    outline: none;
                }

                .register-button {
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

                .register-button:hover {
                    background-color: #2563eb;
                }

                .register-error {
                    color: #ef4444;
                    margin-top: 1.5rem;
                    font-size: 1rem;
                    text-align: center;
                }

                .register-text {
                    margin-top: 1.5rem;
                    font-size: 1rem;
                    text-align: center;
                    color: #4b5563;
                }

                .register-link {
                    color: #3b82f6;
                    text-decoration: none;
                    font-weight: 600;
                }

                .register-link:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">
                        Create Account
                    </button>
                </form>
                {error && <p className="register-error">{error}</p>}
                <p className="register-text">
                    Already have an account?{" "}
                    <a href="/login" className="register-link">Login here</a>
                </p>
            </div>
        </>
    );
}
