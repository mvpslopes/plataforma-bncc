import React, { useMemo, useState } from 'react';

interface PatternGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Complete o padrão (reconhecimento de padrões e generalização)
export function PatternGame({ userId, onCompleted }: PatternGameProps) {
  const sequences = useMemo(
    () => [
      { pattern: [2, 4, 6, 8], answer: 10, rule: 'Somar 2' },
      { pattern: [1, 1, 2, 3, 5], answer: 8, rule: 'Fibonacci' },
      { pattern: [3, 6, 9, 12], answer: 15, rule: 'Somar 3' },
      { pattern: [5, 10, 20, 40], answer: 80, rule: 'Dobro' },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<null | 'ok' | 'no'>(null);

  const current = sequences[index];

  const submit = () => {
    const isCorrect = Number(input) === current.answer;
    setFeedback(isCorrect ? 'ok' : 'no');

    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      pattern_v1: {
        completed: isCorrect && index === sequences.length - 1,
        last_attempt_at: now,
        attempts: (prev.pattern_v1?.attempts || 0) + 1,
        last_rule: current.rule,
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (isCorrect) {
      if (index < sequences.length - 1) {
        setTimeout(() => {
          setIndex(index + 1);
          setInput('');
          setFeedback(null);
        }, 600);
      } else if (onCompleted) {
        onCompleted();
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setInput('');
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete o padrão</h3>
      <p className="text-gray-600 mb-6">Reconheça a regra e informe o próximo número.</p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-2">Sequência {index + 1} de {sequences.length}</div>
        <div className="flex items-center flex-wrap gap-2 text-gray-900 mb-4">
          {current.pattern.map((n, i) => (
            <span key={i} className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200">
              {n}
            </span>
          ))}
          <span className="mx-2 text-gray-400">→</span>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="?"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={submit}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Verificar
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Reiniciar
          </button>
        </div>

        {feedback && (
          <div className={`mt-4 p-3 rounded-lg border ${feedback === 'ok' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-yellow-50 border-yellow-500 text-yellow-800'}`}>
            {feedback === 'ok' ? 'Correto! Vamos para a próxima.' : 'Ainda não. Reveja o padrão e tente de novo.'}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Reconhecimento de Padrões e Generalização.
      </div>
    </div>
  );
}


