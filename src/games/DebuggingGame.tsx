import React, { useMemo, useState } from 'react';

interface DebuggingGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Encontre o bug (depuração lógica em passos de algoritmo)
export function DebuggingGame({ userId, onCompleted }: DebuggingGameProps) {
  const challenges = useMemo(
    () => [
      {
        title: 'Fazer suco',
        steps: [
          '1) Pegar copo',
          '2) Colocar gelo',
          '3) Descascar a laranja',
          '4) Espremer a laranja no copo',
          '5) Adicionar açúcar',
        ],
        bugIndex: 4,
        hint: 'O açúcar não deveria vir antes de algo?'
      },
      {
        title: 'Ir à escola',
        steps: [
          '1) Acordar',
          '2) Colocar a mochila',
          '3) Tomar banho',
          '4) Tomar café da manhã',
          '5) Sair de casa',
        ],
        bugIndex: 2,
        hint: 'A ordem de higiene e mochila faz sentido?'
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<null | 'ok' | 'no'>(null);

  const current = challenges[index];

  const verify = () => {
    if (selected === null) return;
    const isCorrect = selected === current.bugIndex;
    setFeedback(isCorrect ? 'ok' : 'no');

    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      debugging_v1: {
        completed: isCorrect && index === challenges.length - 1,
        last_attempt_at: now,
        attempts: (prev.debugging_v1?.attempts || 0) + 1,
        last_title: current.title,
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (isCorrect) {
      if (index < challenges.length - 1) {
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
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Encontre o bug</h3>
      <p className="text-gray-600 mb-6">Qual passo está na ordem errada?</p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Cenário: {current.title}</div>
        <ol className="space-y-2 mb-4">
          {current.steps.map((s, i) => (
            <li key={i}>
              <button
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                  selected === i
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-900'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ol>

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
          <div className={`mt-4 p-3 rounded-lg border ${feedback === 'ok' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-yellow-50 border-yellow-500 text-yellow-800'}`}>
            {feedback === 'ok' ? 'Boa! Você encontrou o bug.' : `Ainda não. Dica: ${current.hint}`}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Depuração e pensamento lógico.
      </div>
    </div>
  );
}


