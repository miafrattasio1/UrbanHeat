"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useState, useEffect } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1024); // Changed from 768 to 1024
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const getTitle = () => {
        if (pathname === "/about") return "About";
        if (pathname === "/myData") return "My Data";
        if (pathname === "/awareness") return "UHI Awareness";
        if (pathname === "/dashboard") return "Urban Environmental Monitoring";
        return "Urban Environmental Monitoring";
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={styles.nav}>
            {/* Mobile menu button (only visible on small screens) */}
            {isMobileView && (
                <button
                    onClick={toggleMobileMenu}
                    style={styles.mobileMenuButton}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            )}

            {/* Left section with logo and links */}
            <div style={{
                ...styles.leftSection,
                display: isMobileView ? (isMobileMenuOpen ? 'flex' : 'none') : 'flex'
            }}>
                <img src="/logo.png" alt="Logo" style={styles.logo}/>
                <div style={styles.leftLinks}>
                    <Link href="/dashboard" style={styles.link}>
                        Home
                    </Link>
                    <Link href="/about" style={styles.link}>
                        About
                    </Link>
                    <Link href="/awareness" style={styles.link}>
                        Awareness
                    </Link>
                </div>
            </div>

            {/* Centered title */}
            <div style={{
                ...styles.centerTitle,
                display: isMobileView ? (isMobileMenuOpen ? 'none' : 'block') : 'block',
                marginLeft: isMobileView ? '0' : 'auto',
                marginRight: isMobileView ? '0' : 'auto',
            }}>
                {getTitle()}
            </div>

            {/* Right links section */}
            <div style={{
                ...styles.rightLinks,
                display: isMobileView ? (isMobileMenuOpen ? 'flex' : 'none') : 'flex',
                marginLeft: 'auto'
            }}>
                {user && (
                    <Link href="/myData" style={styles.link}>
                        My Data
                    </Link>
                )}
                {user ? (
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
                    </button>
                ) : (
                    <Link href="/login" style={styles.link}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#9ebbd8",
        position: "relative",
        flexWrap: "wrap",
    },
    leftSection: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    leftLinks: {
        display: "flex",
        gap: "1rem",
        flexDirection: "row",
    },
    rightLinks: {
        display: "flex",
        gap: "1rem",
    },
    centerTitle: {
        fontWeight: "bold",
        fontSize: "clamp(1rem, 4vw, 1.8rem)",
        textAlign: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        width: "fit-content",
    },
    link: {
        textDecoration: "none",
        background: "#c4e1fd",
        color: "#333",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "500",
        whiteSpace: "nowrap",
    },
    button: {
        background: "#c4e1fd",
        color: "#333",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "500",
        border: "none",
        whiteSpace: "nowrap",
    },
    logo: {
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #b8dafa",
    },
    mobileMenuButton: {
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        zIndex: 100,
    },
};