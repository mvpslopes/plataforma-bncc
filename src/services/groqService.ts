interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GroqService {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private model = 'llama-3.1-70b-versatile'; // Modelo rápido e eficiente do Groq

  constructor() {
    // Usar variável de ambiente (obrigatória)
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('VITE_GROQ_API_KEY não configurada. Configure a variável de ambiente.');
    }
  }

  async chat(messages: GroqMessage[]): Promise<string> {
    try {
      const systemPrompt = `Você é um assistente especializado em BNCC Computacional e Pensamento Computacional para educação básica. 
      
Sua função é ajudar professores e educadores com:
- Dúvidas sobre pensamento computacional e seus pilares (decomposição, padrões, abstração, algoritmos)
- Orientações sobre atividades plugadas e desplugadas
- Explicações sobre eixos da BNCC Computacional
- Dicas pedagógicas para implementação em sala de aula
- Recursos educacionais disponíveis na plataforma

Seja claro, didático e sempre forneça exemplos práticos quando possível. Se não souber algo específico, seja honesto e sugira onde o usuário pode encontrar a informação.`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
    } catch (error) {
      console.error('Erro ao chamar API do Groq:', error);
      if (!this.apiKey) {
        throw new Error('API Key do Groq não configurada. Configure VITE_GROQ_API_KEY no arquivo .env');
      }
      throw error;
    }
  }

  async generateResponse(userMessage: string, conversationHistory: GroqMessage[] = []): Promise<string> {
    const messages: GroqMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    return await this.chat(messages);
  }
}

export const groqService = new GroqService();

