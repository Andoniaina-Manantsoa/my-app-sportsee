"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";

/**
 * Composant personnalisé pour dessiner un curseur semi-transparent à droite du point survolé.
 * @param {Object} props - Props du composant
 * @param {Array} props.points - Points survolés
 * @param {number} props.width - Largeur totale du graphique
 * @param {number} props.height - Hauteur totale du graphique
 * @returns {JSX.Element|null} Composant SVG du curseur
 */
function RightSideCursor(props) {
    const { points, width, height} = props;
    if (!points || !points[0]) return null;

    const x = points[0].x;

    return (
        // Dessine un rectangle semi-transparent à droite du point survolé
        <g>
            <rect
                x={x}
                y={0}            // on part du y réel de la zone du chart
                width={width - x}
                height={height + 50}   // et on utilise la height de cette zone
                fill="rgba(0,0,0,0.25)"
            />
        </g>
    );
}

/**
 * Composant affichant la durée moyenne des sessions de l'utilisateur.
 *
 * @module SessionDurationChart
 * @param {Object} props - Props du composant
 * @param {Array<{day: number, sessionLength: number}>} props.sessions - Tableau des sessions moyennes
 * @returns {JSX.Element} Composant JSX du graphique de durée des sessions
 *
 * @example
 * <SessionDurationChart sessions={sessions} />
 */
export default function SessionDurationChart({ sessions }) {

    // Assure que sessions est un tableau
    const data = Array.isArray(sessions) ? sessions : [];

    // Ajouter points fictifs aux extrémités pour que la courbe touche les bords
    const extendedData = [
        { day: 0, sessionLength: data[0]?.sessionLength ?? 0 },// point initial fictif
        ...data,   // données réelles 1...7
        { day: 8, sessionLength: data[data.length - 1]?.sessionLength ?? 0 }, // point final fictif
    ];

    // Labels des jours de la semaine en français (abréviations)
    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

    /**
* Formate le jour pour l'axe X en utilisant les abréviations
* @param day - valeur du jour dans les données
* @returns abréviation du jour
*/
    function formatDay(day) {
        // on ne veut pas de label pour 0 et 8
        if (day < 1 || day > 7) return "";
        return dayLabels[day - 1] ?? "";
    }

    /**
    * Tooltip minimaliste affichant la durée en minutes
    */
    function CustomTooltip({ active, payload }) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white text-black text-xs px-2 py-1 rounded shadow-md">
                    <p>{payload[0].value} min</p>
                </div>
            );
        }
        return null;// Ne rien afficher si inactive
    }

    return (
        <div className="bg-[#FF0000] bg-opacity-80 rounded-2xl w-[270px] h-[270px] relative overflow-hidden text-xs">
            <h2 className="text-white/60 text-xs mb-4 mt-5 ml-4 w-[120px] absolute top-1 left-1">Durée moyenne des sessions</h2>

            <div className="w-full h-[180px] mt-2">
                {/* Conteneur responsive pour que le graphique s'adapte */}
                <ResponsiveContainer width="100%" height="100%" className="absolute inset-0">
                    <LineChart
                        data={extendedData}
                        margin={{ top: 0, right: 0, left: 0, bottom: -5 }} // Dépassement des bords
                    >
                        <defs>
                            {/* dégradé de la ligne */}
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                            </linearGradient>

                            {/* dégradé de la zone sous la courbe (optionnel) */}
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                            </linearGradient>
                        </defs>

                        {/* Axe X (jours) */}
                        <XAxis
                            dataKey="day"
                            type="category"
                            scale="point"
                            tickFormatter={formatDay}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                            interval={0}
                            padding={{ left: 0, right: 0 }}
                            tickMargin={-20}
                        />

                        {/* Axe Y caché (durée des sessions) */}
                        <YAxis
                            dataKey="sessionLength"
                            hide
                            domain={['dataMin -15', 'dataMax + 30']}/>

                        {/* Tooltip personnalisé */}
                        <Tooltip content={<CustomTooltip />}
                            cursor={<RightSideCursor />} />

                        {/* Ligne représentant la durée moyenne */}
                        <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="url(#lineGradient)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 5,
                                stroke: "rgba(255,255,255,0.3)",
                                strokeWidth: 5,
                                fill: "#fff",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
