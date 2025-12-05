// api.js

var isDataMocked = false;
const BASE_URL = "http://localhost:3000/user";

import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
} from "@/mocks/userData";

import {
    UserModel,
    ActivityModel,
    AverageSessionsModel,
    PerformanceModel
} from "./models";

// Helpers
const findById = (list, key, userId) =>
    list.find(item => item[key] == userId);

// Mock functions
const getMockUser = (id) => UserModel(findById(USER_MAIN_DATA, "id", id));
const getMockUserActivity = (id) =>
    ActivityModel(findById(USER_ACTIVITY, "userId", id));
const getMockUserAverageSessions = (id) =>
    AverageSessionsModel(findById(USER_AVERAGE_SESSIONS, "userId", id));
const getMockUserPerformance = (id) =>
    PerformanceModel(findById(USER_PERFORMANCE, "userId", id));

// ------------------- API OFFICIELLE -------------------

export async function getUser(userId) {
    if (isDataMocked) return getMockUser(userId);

    try {
        const json = await fetch(`${BASE_URL}/${userId}`).then(r => r.json());
        return UserModel(json.data);
    } catch (e) {
        console.error("Erreur réseau user → fallback mock", e);
        return getMockUser(userId);
    }
}

export async function getUserActivity(userId) {
    if (isDataMocked) return getMockUserActivity(userId);

    try {
        const json = await fetch(`${BASE_URL}/${userId}/activity`).then(r => r.json());
        return ActivityModel(json.data);
    } catch (e) {
        console.error("Erreur réseau activity → fallback mock", e);
        return getMockUserActivity(userId);
    }
}

export async function getUserAverageSessions(userId) {
    if (isDataMocked) return getMockUserAverageSessions(userId);

    try {
        const json = await fetch(`${BASE_URL}/${userId}/average-sessions`).then(r => r.json());
        return AverageSessionsModel(json.data);
    } catch (e) {
        console.error("Erreur réseau average sessions → fallback mock", e);
        return getMockUserAverageSessions(userId);
    }
}

export async function getUserPerformance(userId) {
    if (isDataMocked) return getMockUserPerformance(userId);

    try {
        const json = await fetch(`${BASE_URL}/${userId}/performance`).then(r => r.json());
        return PerformanceModel(json.data);
    } catch (e) {
        console.error("Erreur réseau performance → fallback mock", e);
        return getMockUserPerformance(userId);
    }
}
