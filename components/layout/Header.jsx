"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Composant Header de l'application.
 * Affiche le logo et la navigation principale.
 * @module Header
 * @returns {JSX.Element} Le composant Header.
 */
export default function Header() {
    return (
        <header className="bg-black h-20 flex items-center justify-between px-10">
            <div className="header__logo">
                <Image src="/logo.png" alt="SportSee" width={160} height={40} />
            </div>
            <nav className="text-white flex gap-25 text-xl">
                <Link href="/">Accueil</Link>
                <Link href="#">Profil</Link>
                <Link href="#">Réglage</Link>
                <Link href="#">Communauté</Link>
            </nav>
        </header>
    );
}
