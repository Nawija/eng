"use client";

import { NAV_LINKS } from "@/constants/NavLinks";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [showNav, setShowNav] = useState(false);

    function handleShowNav() {
        setShowNav(!showNav);
    }
    function closeNav() {
        setShowNav(false);
    }
    return (
        <header className="w-full bg-emerald-600 shadow-xl text-white relative">
            <nav className="max-w-screen-lg mx-auto p-4 flex items-center justify-between">
                <Link
                    href="/"
                    onClick={closeNav}
                    className="font-medium text-xl"
                >
                    Binang
                </Link>
                <BurgerMenu handleShowNav={handleShowNav} />
                <NavLinks showNav={showNav} closeNav={closeNav} />
            </nav>
        </header>
    );
}

function BurgerMenu({ handleShowNav }: { handleShowNav: () => void }) {
    return (
        <button onClick={handleShowNav} className="space-y-1.5 lg:hidden">
            <div className="w-5 h-[2px] rounded-xl bg-white" />
            <div className="w-3 h-[2px] rounded-xl bg-white" />
            <div className="w-5 h-[2px] rounded-xl bg-white" />
        </button>
    );
}

function NavLinks({
    showNav,
    closeNav,
}: {
    showNav: boolean;
    closeNav: () => void;
}) {
    return (
        <ul
            className={`${
                showNav ? "left-0" : "-left-full"
            } flex items-center justify-center transition-all lg:space-x-5 absolute lg:static lg:py-0 top-full space-y-5 lg:space-y-0 flex-col lg:flex-row w-full lg:w-auto bg-emerald-600 lg:bg-transparent py-12`}
        >
            {NAV_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                    <li key={index}>
                        <Link
                            href={link.href}
                            onClick={closeNav}
                            className="capitalize text-sm flex items-center space-x-2"
                        >
                            <Icon />
                            <p>{link.title}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
