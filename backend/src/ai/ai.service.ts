import { Injectable } from '@nestjs/common';

export interface SearchIntent {
  trade: string | null;
  location: string | null;
  keywords: string[];
}

export interface Review {
  rating: number;
  text: string;
  author: string;
}

export interface ReputationAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

@Injectable()
export class AiService {
  private readonly TRADES = ['Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 'Arquiteto', 'Marceneiro', 'Geral'];

  async parseSearchQuery(queryText: string): Promise<SearchIntent> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return this.fallbackParseSearch(queryText);

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Analise a seguinte busca por profissional de construção e retorne um JSON com:
- trade: uma das opções [${this.TRADES.join(', ')}] ou null
- location: cidade/estado encontrado ou null
- keywords: array de palavras-chave relevantes

Busca: "${queryText}"

Retorne APENAS o JSON, sem markdown ou explicações.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return JSON.parse(text) as SearchIntent;
    } catch {
      return this.fallbackParseSearch(queryText);
    }
  }

  async generateReputationSummary(reviews: Review[]): Promise<ReputationAnalysis | null> {
    if (reviews.length === 0) return null;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return this.fallbackReputation(reviews);

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const reviewsText = reviews.map((r) => `- ${r.author} (${r.rating}/5): "${r.text}"`).join('\n');
      const prompt = `Analise as avaliações deste profissional e retorne um JSON com:
- summary: resumo geral em 1-2 frases
- strengths: array com até 3 pontos fortes
- weaknesses: array com até 2 pontos fracos (pode ser vazio)

Avaliações:
${reviewsText}

Retorne APENAS o JSON, sem markdown ou explicações.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return JSON.parse(text) as ReputationAnalysis;
    } catch {
      return this.fallbackReputation(reviews);
    }
  }

  private fallbackParseSearch(queryText: string): SearchIntent {
    const lower = queryText.toLowerCase();
    const trade = this.TRADES.find((t) => lower.includes(t.toLowerCase())) ?? null;
    return { trade, location: null, keywords: queryText.split(' ').filter((w) => w.length > 3) };
  }

  private fallbackReputation(reviews: Review[]): ReputationAnalysis {
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    return {
      summary: `Profissional com nota média ${avg.toFixed(1)} baseada em ${reviews.length} avaliações.`,
      strengths: ['Boa avaliação geral'],
      weaknesses: [],
    };
  }
}
