const BASE_URL = "http://127.0.0.1:8001/api";

/**
 * Upload SRS document
 */
export async function uploadDocument(formData) {

    const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("File upload failed");
    }

    return await response.json();
}

/**
 * Analyze uploaded SRS
 */
export async function analyzeRequirement(filename) {

    const response = await fetch(

        `${BASE_URL}/analyze?filename=${encodeURIComponent(filename)}`,

        {
            method: "POST",
        }

    );

    if (!response.ok) {
        throw new Error("Analysis failed");
    }

    return await response.json();
}

/**
 * Analyze raw SRS text entered directly
 */
export async function analyzeText(text) {
    const response = await fetch(`${BASE_URL}/analyze_text`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error("Direct text analysis failed");
    }

    return await response.json();
}

/**
 * Health Check
 */
export async function checkServer() {

    const response = await fetch("http://127.0.0.1:8001/health");

    return await response.json();

}

/**
 * Download AI Report
 */
export function downloadReport() {

    window.open(`${BASE_URL}/download_report`);

}

/**
 * Save an analysis run
 */
export async function saveAnalysis(payload) {
    const response = await fetch(`${BASE_URL}/save_analysis`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to save analysis");
    }

    return await response.json();
}

/**
 * Get all saved analyses
 */
export async function getSavedAnalyses() {
    const response = await fetch(`${BASE_URL}/saved_analyses`);

    if (!response.ok) {
        throw new Error("Failed to load saved analyses");
    }

    return await response.json();
}

/**
 * Compare two SRS documents
 */
export async function compareSRS(oldFilename, newFilename) {
    const response = await fetch(
        `${BASE_URL}/compare_srs?old_filename=${encodeURIComponent(oldFilename)}&new_filename=${encodeURIComponent(newFilename)}`,
        {
            method: "POST",
        }
    );

    if (!response.ok) {
        throw new Error("SRS comparison failed");
    }

    return await response.json();
}