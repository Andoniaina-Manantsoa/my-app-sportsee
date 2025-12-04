"use client";

import { ImFire } from "react-icons/im";
import { FaDrumstickBite } from "react-icons/fa";
import { FaAppleWhole, FaBurger } from "react-icons/fa6";

// Composant pour une seule carte d'information
function InfoCard({ icon, label, value, unit, bgIcon }) {
    return (
        // Conteneur principal de la carte
        <div className="flex items-center bg-gray-50 p-8 w-60 h-27 shadow-sm">
            <div className={`flex items-center justify-center rounded-lg w-12 h-12 mr-4 ${bgIcon}`}>
                {icon}
            </div>
            <div className="flex flex-col font-bold">
                <p className="text-lg">
                    {value}
                    {unit && <span className="text-m ml-1">{unit}</span>}
                </p>
                <p className="text-sm text-gray-500 font-semibold">{label}</p>
            </div>
        </div>
    );
}

/**
 * Composant affichant les informations clés de l'utilisateur (calories, protéines, etc.).
 *
 * @module InfoCards
 * @param {Object} props - Props du composant
 * @param {Object} props.keyData - Objet contenant les données clés de l'utilisateur
 * @param {number} props.keyData.calorieCount - Nombre de calories
 * @param {number} props.keyData.proteinCount - Quantité de protéines
 * @param {number} props.keyData.carbohydrateCount - Quantité de glucides
 * @param {number} props.keyData.lipidCount - Quantité de lipides
 * @returns {JSX.Element|null} Composant JSX des cartes d'information ou null si pas de données
 *
 * @example
 * <InfoCards keyData={userData.keyData} />
 */
export default function InfoCards({ keyData }) {
    if (!keyData) return null; // Rend null si les données ne sont pas disponibles

    // Destructuration des données clés
    const {
        calorieCount,
        proteinCount,
        carbohydrateCount,
        lipidCount,
    } = keyData;

    return (
        <div className="flex flex-col gap-12 ml-8">
            <InfoCard
                label="Calories"
                value={calorieCount}
                unit="kCal"
                bgIcon="bg-red-100"
                icon={<ImFire className="fill-red-600" />}
            />
            <InfoCard
                label="Protéines"
                value={proteinCount}
                unit="g"
                bgIcon="bg-blue-100"
                icon={<FaDrumstickBite className="fill-blue-600"/>}
            />
            <InfoCard
                label="Glucides"
                value={carbohydrateCount}
                unit="g"
                bgIcon="bg-yellow-100"
                icon={<FaAppleWhole className="fill-yellow-600" />}
            />
            <InfoCard
                label="Lipides"
                value={lipidCount}
                unit="g"
                bgIcon="bg-pink-100"
                icon={<FaBurger className="fill-pink-600" />}
            />
        </div>
    );
}
