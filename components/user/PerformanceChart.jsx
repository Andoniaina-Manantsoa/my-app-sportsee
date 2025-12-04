"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

// Mapping des types de performance avec leurs labels lisibles
const kindLabels = {
    1: "Cardio",
    2: "Énergie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
};

/**
 * Composant affichant les performances de l'utilisateur sur différents axes.
 *
 * @module PerformanceChart
 * @param {Object} props - Props du composant
 * @param {Array<{value: number, kind: number}>} props.data - Données de performance (tableau)
 * @returns {JSX.Element} Composant JSX du graphique de performance
 *
 * @example
 * <PerformanceChart data={performanceData} />
 */
export default function PerformanceChart({ data }) {

    // Transformation des données pour ajouter des labels lisibles pour chaque type
    const formattedData = (data || []).map((item) => ({
        ...item,
        kindLabel: kindLabels[item.kind] || item.kind, // utilise le label correspondant ou la valeur brute
    }));

    return (
        // Conteneur principal avec fond gris foncé et coins arrondis
        <div className="bg-[#282D30] rounded-lg aspect-square w-[250px] h-[250px] p-4 mx-auto text-xs">

            {/* Conteneur responsive pour adapter le graphique à la taille du parent */}
            <ResponsiveContainer width="100%" height="100%">

                {/* RadarChart affichant les performances */}
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={formattedData}
                >

                    {/* Grille du radar sans lignes radiales */}
                    <PolarGrid radialLines={false} />

                    {/* Axe polaire avec labels pour chaque performance */}
                    <PolarAngleAxis
                        dataKey="kindLabel"
                        tick={{ fill: "#FFFFFF", fontSize: 12 }}
                    />

                    {/* Radar représentant les valeurs de performance */}
                    <Radar
                        name="Performance"
                        dataKey="value"
                        fill="#FF0101B2"
                        fillOpacity={0.7}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
