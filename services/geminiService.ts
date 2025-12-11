import { GoogleGenAI } from "@google/genai";
import { Project } from "../types";

// Helper to get the AI client. 
// Note: In a real app, you might want to handle the missing key more gracefully in the UI.
const getAIClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProjectSummary = async (project: Project): Promise<string> => {
  const ai = getAIClient();
  
  const prompt = `
    You are an intelligent project management assistant. 
    Summarize the status of the following project for a stakeholder update.
    Be professional, concise, and highlight risks if the progress is low relative to status.
    
    Project Name: ${project.name}
    Description: ${project.description}
    Status: ${project.status}
    Progress: ${project.progress}%
    Due Date: ${project.dueDate}
    Team Size: ${project.members.length} members
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No summary could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate summary due to an error.";
  }
};

export const streamChatResponse = async function* (
  history: { role: string; content: string }[],
  newMessage: string
) {
  const ai = getAIClient();
  
  // Convert history to format expected by chat (if needed, though here we just use sendMessageStream directly on a chat instance)
  // For simplicity in this demo, we'll just start a new chat with context.
  // In a full app, you'd maintain the chat history object.
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: "You are WorkspaceHQ Assistant, a helpful AI inside a project management tool. You help users organize tasks, write emails, and explain project concepts. Keep answers short and professional."
    }
  });

  // Replay history (simplified for this demo, ideally use the history prop in create)
  // We will just send the new message for this isolated interaction pattern or assume stateless for the very first message.
  // To make it better, let's just send the message.
  
  try {
    const result = await chat.sendMessageStream({ message: newMessage });
    
    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Stream Error:", error);
    yield "I'm having trouble connecting to Workspace Intelligence right now.";
  }
};

export const generateSmartBrief = async (topic: string): Promise<string> => {
    const ai = getAIClient();
    const prompt = `Create a structured project brief for: "${topic}". Include sections: Goal, Key Stakeholders, and High-level Timeline. Return as Markdown.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Could not generate brief.";
    } catch (e) {
        console.error(e);
        return "Error generating brief.";
    }
}