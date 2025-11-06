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
    // Usar variável de ambiente (obrigatória para produção)
    // Para desenvolvimento local, crie um arquivo .env na raiz com: VITE_GROQ_API_KEY=sua_chave
    let envKey = import.meta.env.VITE_GROQ_API_KEY;
    
    // Debug: verificar o que está sendo lido
    console.log('🔍 Debug - Verificando variável de ambiente:');
    console.log('  - import.meta.env.VITE_GROQ_API_KEY existe?', !!envKey);
    console.log('  - Tipo:', typeof envKey);
    console.log('  - Valor (primeiros 10 chars):', envKey ? envKey.substring(0, 10) + '...' : 'undefined');
    console.log('  - Todos os env vars VITE_*:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
    
    this.apiKey = envKey || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ VITE_GROQ_API_KEY não configurada. O assistente usará respostas locais.');
      console.warn('📝 Para ativar a IA:');
      console.warn('   1. Crie um arquivo .env na raiz do projeto');
      console.warn('   2. Adicione: VITE_GROQ_API_KEY=sua_chave_groq_aqui');
      console.warn('   3. REINICIE o servidor (npm run dev)');
      console.warn('📝 Ou configure a variável no Vercel: Settings → Environment Variables');
    } else {
      console.log('✅ Groq API configurada e pronta para uso.');
      console.log('🔑 Chave detectada:', this.apiKey.substring(0, 15) + '...');
      console.log('📏 Tamanho da chave:', this.apiKey.length, 'caracteres');
    }
  }

  // Método para verificar se a API está disponível
  isAvailable(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
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
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `Erro ${response.status}: ${response.statusText}`;
        console.error('Groq API Error:', errorMessage);
        throw new Error(`API Error: ${errorMessage}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
    } catch (error) {
      console.error('Erro ao chamar API do Groq:', error);
      if (!this.apiKey) {
        throw new Error('API Key do Groq não configurada. Configure VITE_GROQ_API_KEY no arquivo .env');
      }
      // Re-throw com mensagem mais amigável
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao conectar com a API do Groq. Verifique sua conexão com a internet.');
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

