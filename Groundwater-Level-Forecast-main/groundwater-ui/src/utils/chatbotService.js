// src/utils/chatbotService.js
/* global puter */

export async function getGroundwaterAdvice(mbglRange) {
    const prompt = `You are a groundwater conservation assistant.
Provide full, elaborative suggestions on groundwater conservation based on the following MBGL range and which type of crops can grow based on that mbl range
Criteria:
  - <2 MBGL: Critical (urgent conservation needed)
  - 2-5 MBGL: Moderate (sustainable usage needed)
  - >5 MBGL: Sustainable (maintain current practices with conservation efforts)
MBGL Range: ${mbglRange}.
Advice:`;

    try {
        if (!window.puter?.ai?.chat) {
            throw new Error("puter.ai.chat is not available. Ensure it's initialized correctly.");
        }

        const response = await window.puter.ai.chat(prompt);
        return response;
    } catch (error) {
        console.error("Error fetching advice:", error);
        throw error;
    }
}
