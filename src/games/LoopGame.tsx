import React, { useMemo, useState } from 'react';

interface LoopGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Loops - Repetição de ações
export function LoopGame({ userId, onCompleted }: LoopGameProps) {
  const challenges = useMemo(
    () => [
      {
        task: 'Encher 5 copos com água',
        actions: ['Pegar copo', 'Encher com água', 'Colocar na mesa'],
        repetitions: 5,
      },
      {
        task: 'Plantar 3 mudas',
        actions: ['Cavar buraco', 'Colocar muda', 'Regar'],
        repetitions: 3,
      },
      {
        task: 'Lavar 4 pratos',
        actions: ['Pegar prato', 'Esfregar', 'Enxaguar', 'Secar'],
        repetitions: 4,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<null | 'ok' | 'no'>(null);

  const current = challenges[index];

  const addAction = (action: string) => {
    setSequence([...sequence, action]);
  };

  const removeAction = (idx: number) => {
    setSequence(sequence.filter((_, i) => idx !== i));
  };

  const verify = () => {
    const expected = [];
    for (let i = 0; i < current.repetitions; i++) {
      expected.push(...current.actions);
    }

    const isCorrect =
      sequence.length === expected.length &&
      sequence.every((a, i) => a === expected[i]);

    setFeedback(isCorrect ? 'ok' : 'no');

    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      loop_v1: {
        completed: isCorrect && index === challenges.length - 1,
        last_attempt_at: now,
        attempts: (prev.loop_v1?.attempts || 0) + 1,
        last_task: current.task,
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (isCorrect) {
      if (index < challenges.length - 1) {
        setTimeout(() => {
          setIndex(index + 1);
          setSequence([]);
          setFeedback(null);
        }, 600);
      } else if (onCompleted) {
        onCompleted();
      }
    }
  };

  const reset = () => {
    setSequence([]);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Criar loops</h3>
      <p className="text-gray-600 mb-6">
        Monte a sequência repetindo as ações necessárias para completar a tarefa.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-2">
          Tarefa: {current.task}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Tarefa {index + 1} de {challenges.length} - Repetir {current.repetitions} vezes
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Ações disponíveis:</div>
          <div className="flex flex-wrap gap-2">
            {current.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => addAction(action)}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
              >
                + {action}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Sua sequência:</div>
          <div className="min-h-[100px] p-3 bg-gray-50 rounded-lg border border-gray-200">
            {sequence.length === 0 ? (
              <p className="text-gray-400 text-sm">Clique nas ações acima para montar a sequência</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {sequence.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeAction(idx)}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    {idx + 1}. {action} ×
                  </button>
                ))}
              </div>
            )}
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
            Limpar sequência
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
              ? 'Excelente! Você criou o loop corretamente.'
              : 'Ainda não está completo. Lembre-se de repetir as ações o número correto de vezes.'}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Loops/Repetição - Repetir ações de forma eficiente.
      </div>
    </div>
  );
}

