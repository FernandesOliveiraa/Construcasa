import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenAI, Type } from "@google/genai";

// --- Types (mirrored from client types.ts) ---

type Trade =
  | "Pedreiro"
  | "Eletricista"
  | "Encanador"
  | "Pintor"
  | "Arquiteto"
  | "Marceneiro"
  | "Geral";

interface SearchIntent {
  trade: Trade | null;
  location: string | null;
  keywords: string[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ReputationAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

// --- Cloud Functions ---

export const parseSearchQuery = onCall(
  { secrets: ["GEMINI_API_KEY"] },
  async (request): Promise<SearchIntent> => {
    const query = request.data?.query;

    if (!query || typeof query !== "string") {
      throw new HttpsError("invalid-argument", "O campo 'query' é obrigatório e deve ser uma string.");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new HttpsError("internal", "GEMINI_API_KEY não configurada no servidor.");
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analise a seguinte busca de um usuário procurando um profissional da construção civil: "${query}".
      Identifique a profissão mais provável (Trade), a localização (se houver) e palavras-chave.
      As profissões válidas são: Pedreiro, Eletricista, Encanador, Pintor, Arquiteto, Marceneiro. Se não for claro, use Geral.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trade: {
                type: Type.STRING,
                enum: [
                  "Pedreiro", "Eletricista", "Encanador", "Pintor",
                  "Arquiteto", "Marceneiro", "Geral"
                ]
              },
              location: { type: Type.STRING, nullable: true },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["trade", "keywords"]
          }
        }
      });

      const text = response.text;
      if (!text) return { trade: null, location: null, keywords: [] };

      const data = JSON.parse(text);
      return {
        trade: (data.trade as Trade) || null,
        location: data.location || null,
        keywords: data.keywords || []
      };

    } catch (error) {
      console.error("Gemini Search Error:", error);
      throw new HttpsError("internal", "Erro ao processar a busca com Gemini.");
    }
  }
);

export const generateReputationSummary = onCall(
  { secrets: ["GEMINI_API_KEY"] },
  async (request): Promise<ReputationAnalysis | null> => {
    const reviews: Review[] = request.data?.reviews;

    if (!reviews || !Array.isArray(reviews)) {
      throw new HttpsError("invalid-argument", "O campo 'reviews' é obrigatório e deve ser um array.");
    }

    if (reviews.length === 0) {
      return null;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new HttpsError("internal", "GEMINI_API_KEY não configurada no servidor.");
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const reviewsText = reviews
        .map((r: Review) => `"${r.text}" - Nota: ${r.rating}`)
        .join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analise as seguintes avaliações de um profissional da construção civil.
      Gere um resumo executivo de 2-3 frases sobre a reputação dele, falando diretamente com o potencial cliente.
      Liste também até 3 pontos fortes e até 3 pontos de atenção (fracos), se houverem.
      
      Avaliações:
      ${reviewsText}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING, description: "Resumo executivo da reputação" },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de pontos fortes" },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de pontos de atenção/fracos" }
            },
            required: ["summary", "strengths", "weaknesses"]
          }
        }
      });

      const text = response.text;
      if (!text) return null;
      return JSON.parse(text) as ReputationAnalysis;

    } catch (error) {
      console.error("Gemini Summary Error:", error);
      throw new HttpsError("internal", "Erro ao gerar resumo de reputação com Gemini.");
    }
  }
);
