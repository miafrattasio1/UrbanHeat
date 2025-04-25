// components/Button.js
import Link from 'next/link';

export default function Button({ href, children }) {
    if (!href) {
        console.error("The 'href' prop is required for the Button component.");
        return null; // Or render a fallback UI
    }

    return (
        <Link href={href}>
            <button style={styles.button}>
                {children}
            </button>
        </Link>
    );
}

const styles = {
    button: {
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
};