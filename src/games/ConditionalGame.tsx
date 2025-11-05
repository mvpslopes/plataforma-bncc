import React, { useMemo, useState } from 'react';

interface ConditionalGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Lógica Condicional - Se/Então (If/Else)
export function ConditionalGame({ userId, onCompleted }: ConditionalGameProps) {
  const scenarios = useMemo(
    () => [
      {
        condition: 'Se está chovendo',
        options: [
          { text: 'Então usar guarda-chuva', correct: true },
          { text: 'Então ir à praia', correct: false },
          { text: 'Então fazer piquenique', correct: false },
        ],
      },
      {
        condition: 'Se está com fome',
        options: [
          { text: 'Então comer algo', correct: true },
          { text: 'Então pular refeição', correct: false },
          { text: 'Então dormir', correct: false },
        ],
      },
      {
        condition: 'Se o semáforo está vermelho',
        options: [
          { text: 'Então parar o carro', correct: true },
          { text: 'Então acelerar', correct: false },
          { text: 'Então buzinar', correct: false },
        ],
      },
      {
        condition: 'Se está com sono',
        options: [
          { text: 'Então descansar', correct: true },
          { text: 'Então correr', correct: false },
          { text: 'Então estudar mais', correct: false },
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<null | 'ok' | 'no'>(null);

  const current = scenarios[index];

  const verify = () => {
    if (selected === null) return;
    const isCorrect = current.options[selected].correct;
    setFeedback(isCorrect ? 'ok' : 'no');

    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      conditional_v1: {
        completed: isCorrect && index === scenarios.length - 1,
        last_attempt_at: now,
        attempts: (prev.conditional_v1?.attempts || 0) + 1,
        last_condition: current.condition,
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (isCorrect) {
      if (index < scenarios.length - 1) {
        setTimeout(() => {
          setIndex(index + 1);
          setSelected(null);
          setFeedback(null);
        }, 600);
      } else if (onCompleted) {
        onCompleted();
      }
    }
  };

  const reset = () => {
    setSelected(null);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Lógica condicional</h3>
      <p className="text-gray-600 mb-6">
        Complete a condição "Se/Então". Escolha a ação correta para cada situação.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="text-sm text-gray-600 mb-4">
          Cenário {index + 1} de {scenarios.length}
        </div>

        <div className="mb-6">
          <div className="text-lg font-semibold text-purple-700 mb-4">
            {current.condition}
          </div>
          <div className="space-y-3">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  selected === idx
                    ? 'bg-purple-100 border-purple-400 text-purple-900'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={verify}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Verificar
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Limpar seleção
          </button>
        </div>

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-lg border ${
              feedback === 'ok'
                ? 'bg-green-50 border-green-500 text-green-800'
                : 'bg-yellow-50 border-yellow-500 text-yellow-800'
            }`}
          >
            {feedback === 'ok'
              ? 'Correto! Você entendeu a lógica condicional.'
              : 'Ainda não. Pense na consequência lógica dessa condição.'}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Lógica Condicional (Se/Então) - Tomar decisões baseadas em condições.
      </div>
    </div>
  );
}

