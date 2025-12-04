import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";
import PerformanceChart from "@/components/user/PerformanceChart";
import ScoreChart from "@/components/user/ScoreChart";
import InfoCards from "@/components/user/InfoCards";
import { getUser, getUserAverageSessions, getUserActivity, getUserPerformance } from "@/actions/api";

/**
 * Page principale du dashboard utilisateur
 * Récupère les données de l'utilisateur et affiche :
 * - Graphiques d'activité, durée de session, performance et score
 * - Cartes d'information clés
 *
 * @param props - Props de la page
 * @param props.params - Paramètres de la route
 * @param props.params.userId - ID de l'utilisateur
 * @returns Composant de la page Dashboard
 *
 * @example
 * // Exemple d'utilisation dans Next.js
 * <DashboardPage params={{ userId: 12 }} />
 */
export default async function DashboardPage({ params }) {
    const { userId } = await params;   

    /// Récupération des données utilisateur
    const userData = await getUser(userId);
    const sessions = await getUserAverageSessions(userId);
    const activitySessions = await getUserActivity(userId);
    const performanceData = await getUserPerformance(userId);

    // Si l'utilisateur n'existe pas, afficher un message d'erreur
    if (!userData) {
        return (
            <main>
                <h1>Utilisateur introuvable</h1>
                <p>Vérifie l’URL (ex : /12 ou /18).</p>
            </main>
        );
    }

    // Score utilisateur (todayScore ou score par défaut)
    const userScore = userData.todayScore ?? userData.score ?? 0;

    return (
        <main className="mt-2 max-w-6xl ">
            {/* Header : Bonjour {Prénom} */}
            <h1 className="text-5xl font-semibold pb-6 max-lg:text-3xl">
                Bonjour <span className="text-red-600">
                    {userData.userInfos?.firstName || "Sportif"}
                </span>

            </h1>
            <p className="max-lg:text-sm">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Layout 2 colonnes : graphes + cards info */}
            <section className="grid grid-cols-[2fr_0.8fr] gap-8 lg:mt-10 max-lg:grid-cols-1">
                {/* Colonne gauche : graphiques */}
                {/* COLONNE GAUCHE */}
                <div>
                    {/* DailyActivity GRAND */}
                    <DailyActivityChart sessions={activitySessions} />

                    {/* Grille des 3 petits charts */}
                    <div className="grid grid-cols-3 gap-6 max-xl:grid-cols-2 max-lg:grid-cols-1">
                        <SessionDurationChart sessions={sessions} />
                        <PerformanceChart data={performanceData} />
                        <ScoreChart score={userScore} />
                    </div>
                </div>

                {/* Colonne droite : cards */}
                <aside className="flex flex-col gap-6">
                    <InfoCards keyData={userData.keyData} />
                </aside>
            </section>
        </main>
    );
}
