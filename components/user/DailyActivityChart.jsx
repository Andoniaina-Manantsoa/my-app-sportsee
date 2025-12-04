"use client";
//importer graphique Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
                <div className="bg-[#e60000] text-white text-xs px-2 py-2 text-center">
                    <p className="mb-1">{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null; // Ne rien afficher si le tooltip n'est pas actif
    }

    return (
        // Conteneur principal du graphique avec style Tailwind
        <div className="w-full h-[330px] bg-[#fbfbfb] rounded-md p-0">
            <div className="flex justify-between items-start mb-6">
                <h2 className="font-medium text-[15px]">Activité quotidienne</h2>
                <div className="flex items-center gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#282D30]"></span>
                        <span>Poids (kg)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E60000]"></span>
                        <span>Calories brûlées (kCal)</span>
                    </div>
                </div>
            </div>

            {/* Conteneur responsive pour que le graphique s'adapte */}
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 15, left: 0, bottom: 20 }} // marge interne du graph
                    barGap={5}
                >

                    {/* Grille horizontale uniquement (vertical=false) */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        yAxisId="cal"
                        stroke="#dedede"/>

                    {/* Axe des abscisses (jours) */}
                    <XAxis
                        dataKey="day"
                        tickFormatter={(d, i) => i + 1}
                        tickLine={false}
                        axisLine={{ stroke: '#dedede' }}
                        tick={{ fill: '#9B9EAC', fontSize: 14 }} // décale les ticks vers la gauche
                        dy={10}
                        padding={{ left: -20, right: -45 }}
                    />

                    {/* Axe des ordonnées pour le poids */}
                    <YAxis
                        yAxisId="kg"
                        orientation="right"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9B9EAC', fontSize: 14 }}
                        dx={40}

                    />
                    {/* Axe des ordonnées pour les calories (caché) */}
                    <YAxis
                        yAxisId="cal"
                        hide
                        dataKey="calories"
                    />

                    {/* Tooltip personnalisé */}
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} />

                    {/* Barre représentant le poids */}
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={7}
                        radius={[3, 3, 0, 0]}
                    />

                    {/* Barre représentant les calories */}
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={7}
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
