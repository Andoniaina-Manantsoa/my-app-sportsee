// models.js

// ---------- 1) USER MODEL ----------
export function UserModel(data) {
    if (!data) return null;

    return {
        id: data.id,
        firstName: data.userInfos?.firstName || "",
        lastName: data.userInfos?.lastName || "",
        age: data.userInfos?.age || "",
        score: data.todayScore ?? data.score ?? 0,
        keyData: data.keyData || {},
    };
}



// ---------- 2) ACTIVITY MODEL ----------
export function ActivityModel(data) {
    if (!data || !data.sessions) return [];

    return data.sessions.map((session, index) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories,
    }));
}

// ---------- 3) AVERAGE SESSIONS MODEL ----------
export function AverageSessionsModel(data) {
    if (!data || !data.sessions) return [];

    return data.sessions.map((session) => ({
        day: session.day,              // ✔ garder un numéro 1–7
        sessionLength: session.sessionLength,
    }));
}

// ---------- 4) PERFORMANCE MODEL ----------
export function PerformanceModel(data) {
    if (!data || !data.data || !data.kind) return [];

    // ORDRE EXACT MAQUETTE
    const ORDER = [
        "Intensité",
        "Vitesse",
        "Force",
        "Endurance",
        "Énergie",
        "Cardio"
    ];

    const LABELS = {
        1: "Cardio",
        2: "Énergie",
        3: "Endurance",
        4: "Force",
        5: "Vitesse",
        6: "Intensité",
    };

    // On garde "kind" + "kindLabel" car TON CHART EN A BESOIN
    const converted = data.data.map(item => ({
        kind: item.kind,                             // ✔ indispensable
        kindLabel: LABELS[item.kind],               // label
        value: item.value,
    }));

    // Tri selon la maquette
    return ORDER.map(label =>
        converted.find(item => item.kindLabel === label) || {
            kind: null,
            kindLabel: label,
            value: 0
        }
    );
}
