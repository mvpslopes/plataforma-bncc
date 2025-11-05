import React, { useMemo, useState } from 'react';

interface SequencingGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Primeiro mini‑jogo: ordenar passos de um algoritmo simples (fazer sanduíche)
// Habilidade: Sequenciamento e algoritmos (Pensamento Computacional)
export function SequencingGame({ userId, onCompleted }: SequencingGameProps) {
  const correctOrder = useMemo(
    () => [
      '1) Pegar duas fatias de pão',
      '2) Passar manteiga nas fatias',
      '3) Colocar o queijo entre as fatias',
      '4) Fechar o sanduíche',
      '5) Cortar ao meio',
    ],
    []
  );

  const shuffled = useMemo(() => {
    const items = [...correctOrder];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, [correctOrder]);

  const [steps, setSteps] = useState<string[]>(shuffled);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const move = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[newIndex];
    newSteps[newIndex] = temp;
    setSteps(newSteps);
  };

  const checkAnswer = () => {
    const ok = steps.every((s, i) => s === correctOrder[i]);
    setIsCorrect(ok);
    setChecked(true);

    // Progresso simples em localStorage
    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      sequencing_v1: { completed: ok, last_attempt_at: now, attempts: (prev.sequencing_v1?.attempts || 0) + 1 },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (ok && onCompleted) onCompleted();
  };

  const reset = () => {
    setSteps(shuffled);
    setChecked(false);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Ordene os passos</h3>
      <p className="text-gray-600 mb-6">
        Monte o algoritmo para fazer um sanduíche. Use as setas para reordenar os passos.
      </p>

      <ol className="space-y-3 mb-6">
        {steps.map((step, idx) => (
          <li
            key={`${step}-${idx}`}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:translate-x-1 transition-all"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-semibold text-sm flex-shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-medium">
              {step}
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className={`w-9 h-8 flex items-center justify-center rounded-md font-bold text-lg transition-colors ${
                  idx === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                ↑
              </button>
              <button
                onClick={() => move(idx, 1)}
                disabled={idx === steps.length - 1}
                className={`w-9 h-8 flex items-center justify-center rounded-md font-bold text-lg transition-colors ${
                  idx === steps.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex gap-3 mb-4">
        <button
          onClick={checkAnswer}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
        >
          <span>✓</span>
          Verificar
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          <span>🔄</span>
          Embaralhar novamente
        </button>
      </div>

      {checked && (
        <div
          className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
            isCorrect
              ? 'bg-green-50 border-green-500 text-green-800'
              : 'bg-yellow-50 border-yellow-500 text-yellow-800'
          }`}
        >
          <span className="text-2xl">{isCorrect ? '✅' : '⚠️'}</span>
          <span className="font-medium">
            {isCorrect
              ? 'Parabéns! Sequência correta. Você domina o sequenciamento!'
              : 'Ainda não está correto. Ajuste a ordem e tente de novo!'}
          </span>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p className="mb-1">
          <strong className="text-purple-600">Habilidade trabalhada:</strong> Sequenciamento e Algoritmos (Pensamento Computacional)
        </p>
        <p>
          <strong className="text-purple-600">Dica:</strong> Pense nos passos do começo ao fim, como se estivesse realmente fazendo o sanduíche!
        </p>
      </div>
    </div>
  );
}
