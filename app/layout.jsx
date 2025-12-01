// app/layout.jsx
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "../styles/globals.css";

//fonction de layout englobant l'application avec header et sidebar
export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>
                <Header />
                <div className="flex">
                    <Sidebar />
                    <main className="p-20">{children}</main>
                </div>
            </body>
        </html>
    );
}
