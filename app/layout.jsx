// app/layout.jsx
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "../styles/globals.css";

//fonction de layout englobant l'application avec header et sidebar
export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className="bg-[#FBFBFB]">
                <Header />
                <div className="flex">
                    <Sidebar />

                    {/* Wrapper principal EXACT maquette → centré, largeur contrôlée */}
                    <main className="flex-1 px-10 pt-10 max-w-[1200px] mx-auto">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
