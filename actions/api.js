var isDataMocked = false;

// URL de base pour les requêtes vers l'API utilisateur
const BASE_URL = "http://localhost:3000/user";

import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE, } from "@/mocks/userData";

// helpers génériques.
//Fonction utilitaire qui fait la même opération partout :👉 chercher dans une liste l’objet correspondant à un userId.
const findById = (list, key, userId) =>
    list.find((item) => item[key] == userId);

//Retourne les infos principales de l’utilisateur, ou null si introuvable.
function getMockUser(userId) {
    return findById(USER_MAIN_DATA, "id", userId) || null;
}

//Retourne les sessions d’activité sportives.
function getMockUserActivity(userId) {
    return findById(USER_ACTIVITY, "userId", userId)?.sessions || [];
}

//Retourne la durée moyenne des sessions.
function getMockUserAverageSessions(userId) {
    return (
        findById(USER_AVERAGE_SESSIONS, "userId", userId)?.sessions || []
    );
}

//Retourne les performances sportives.
function getMockUserPerformance(userId) {
    return findById(USER_PERFORMANCE, "userId", userId)?.data || [];
}

/**
 * USER
 */

/**
 * Récupère les informations d'un utilisateur via son ID.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|null>} Une promesse qui résout avec les données utilisateur ou null en cas d'erreur.
 */

export async function getUser(userId) {
    if (isDataMocked) return getMockUser(userId);

    try {
        const res = await fetch(`${BASE_URL}/${userId}`);
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Erreur réseau user → fallback mock :", error);
        return getMockUser(userId);
    }
}

//Appelle les données de l’API pour récupérer la durée moyenne des sessions d’un utilisateur.

/**
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions moyennes ou un tableau vide en cas d'erreur.
 */
export async function getUserAverageSessions(userId) {
    if (isDataMocked) return getMockUserAverageSessions(userId);

    try {
        const res = await fetch(`${BASE_URL}/${userId}/average-sessions`);
        const json = await res.json();
        return json?.data?.sessions || [];
    } catch (error) {
        console.error("Erreur réseau average-sessions → fallback mock :", error);
        return getMockUserAverageSessions(userId);
    }
}

//Appelle les données de l’API pour récupérer l’activité quotidienne d’un utilisateur.
/**
 * Récupère l'activité quotidienne d'un utilisateur (poids, calories).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions d'activité ou un tableau vide en cas d'erreur.
 */
export async function getUserActivity(userId) {
    if (isDataMocked) return getMockUserActivity(userId);

    try {
        const res = await fetch(`${BASE_URL}/${userId}/activity`);
        const json = await res.json();
        return json?.data?.sessions || [];
    } catch (error) {
        console.error("Erreur réseau activity → fallback mock :", error);
        return getMockUserActivity(userId);
    }
}

//Appelle les données de l’API pour récupérer les performances d’un utilisateur.
/**
 * Récupère les performances d'un utilisateur (énergie, endurance, etc.).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|Array>} Une promesse qui résout avec les données de performance ou un tableau vide en cas d'erreur.
 */
export async function getUserPerformance(userId) {
    if (isDataMocked) return getMockUserPerformance(userId);

    try {
        const res = await fetch(`${BASE_URL}/${userId}/performance`, { cache: "no-store" });
        const json = await res.json();
        return json?.data?.data || [];
    } catch (error) {
        console.error("Erreur réseau performance → fallback mock :", error);
        return getMockUserPerformance(userId);
    }
}
