"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white text-center py-4">
            <p>
                © {new Date().getFullYear()} English Learning Platform. All
                rights reserved.
            </p>
        </footer>
    );
}
