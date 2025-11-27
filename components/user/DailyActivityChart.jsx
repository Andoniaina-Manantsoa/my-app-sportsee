"use client";
//importer graphique Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * Composant affichant l'activité quotidienne de l'utilisateur sous forme de graphique.
 *
 * @module DailyActivityChart
 * @param {Object} props - Props du composant
 * @param {Array<{day: string, kilogram: number, calories: number}>} props.sessions - Tableau des sessions d'activité quotidienne
 * @returns {JSX.Element} Composant JSX du graphique d'activité
 *
 * @example
 * <DailyActivityChart sessions={activitySessions} />
 */
export default function DailyActivityChart({ sessions }) {
    // S'assure que sessions est un tableau valide
    const data = sessions || [];

    /**
 * Tooltip personnalisé pour le graphique
 * @param payload - Données de la barre survolée
 * @param active - Booléen indiquant si le tooltip doit être affiché
 */
    function CustomTooltip({ payload, active }) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#e60000] text-white text-xs px-1 py-1">
                    <p>{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null; // Ne rien afficher si le tooltip n'est pas actif
    }

    return (
        // Conteneur principal du graphique avec style Tailwind
        <div className="w-full h-[330px] bg-gray-50 rounded-2xl p-7">
            <div className="flex justify-between items-center text-sm">
                <h2 className="font-medium">Activité quotidienne</h2>
                <ul className="activityList flex space-x-4 gap-8 list-disc">
                    <li>Poids (kg)</li>
                    <li>Calories brûlées (kCal)</li>
                </ul>

            </div>

            {/* Composant Legend de Recharts */}
            {/*<Legend
                verticalAlign="top"
                align="right"
                payload={[
                    { value: "Poids (kg)", type: "circle", color: "#282D30" },
                    { value: "Calories brûlées (kCal)", type: "circle", color: "#E60000" },
                ]}
            />*/}

            {/* Conteneur responsive pour que le graphique s'adapte */}
            <ResponsiveContainer width="100%" height={230}>
                <BarChart
                    data={data}
                    margin={{ top: 40, right: 0, left: 0, bottom: 0 }} // marge interne du graph
                >

                    {/* Grille horizontale uniquement (vertical=false) */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} yAxisId="cal"/>

                    {/* Axe des abscisses (jours) */}
                    <XAxis
                        dataKey="day"
                        tickFormatter={(d, i) => i + 1}
                        tickLine={false} 
                        tick={{ dy: 10 }} // décale les ticks vers la gauche
                        fontSize={12}
                    />

                    {/* Axe des ordonnées pour le poids */}
                    <YAxis
                        yAxisId="kg"
                        orientation="right"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                        tick={{ dx: 10 }} // décale les ticks vers la droite
                        fontSize={12}

                    />
                    {/* Axe des ordonnées pour les calories (caché) */}
                    <YAxis yAxisId="cal" hide dataKey="calories"
                    />

                    {/* Tooltip personnalisé */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Barre représentant le poids */}
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={6}
                        radius={[3, 3, 0, 0]}
                    />

                    {/* Barre représentant les calories */}
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={6}
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
