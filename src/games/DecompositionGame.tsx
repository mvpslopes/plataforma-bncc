import React, { useMemo, useState } from 'react';

interface DecompositionGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Decomposição - Quebrar um problema grande em partes menores
export function DecompositionGame({ userId, onCompleted }: DecompositionGameProps) {
  const problems = useMemo(
    () => [
      {
        title: 'Organizar uma festa de aniversário',
        parts: [
          'Fazer lista de convidados',
          'Escolher data e local',
          'Comprar decorações',
          'Preparar comida',
          'Enviar convites',
        ],
      },
      {
        title: 'Fazer um projeto escolar',
        parts: [
          'Escolher o tema',
          'Pesquisar informações',
          'Fazer o rascunho',
          'Revisar e corrigir',
          'Apresentar o trabalho',
        ],
      },
      {
        title: 'Limpar o quarto',
        parts: [
          'Organizar brinquedos',
          'Colocar roupas no lugar',
          'Varrer o chão',
          'Arrumar a cama',
          'Organizar a mesa',
        ],
      },
    ],
    []
  );

  const [selectedProblem, setSelectedProblem] = useState(0);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<null | 'ok' | 'no'>(null);

  const current = problems[selectedProblem];
  const allParts = [
    ...current.parts,
    'Fazer uma viagem',
    'Assistir TV',
    'Jogar video game',
    'Comprar um carro',
  ].sort(() => Math.random() - 0.5);

  const verify = () => {
    const selectedSet = new Set(selectedParts);
    const correctSet = new Set(current.parts);
    const isCorrect =
      selectedParts.length === current.parts.length &&
      current.parts.every((p) => selectedSet.has(p));

    setFeedback(isCorrect ? 'ok' : 'no');

    const key = `plataforma-bncc-game-progress-${userId}`;
    const now = new Date().toISOString();
    const prev = JSON.parse(localStorage.getItem(key) || '{}');
    const updated = {
      ...prev,
      decomposition_v1: {
        completed: isCorrect && selectedProblem === problems.length - 1,
        last_attempt_at: now,
        attempts: (prev.decomposition_v1?.attempts || 0) + 1,
        last_problem: current.title,
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));

    if (isCorrect && selectedProblem < problems.length - 1) {
      setTimeout(() => {
        setSelectedProblem(selectedProblem + 1);
        setSelectedParts([]);
        setFeedback(null);
      }, 800);
    } else if (isCorrect && onCompleted) {
      onCompleted();
    }
  };

  const togglePart = (part: string) => {
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter((p) => p !== part));
    } else {
      setSelectedParts([...selectedParts, part]);
    }
  };

  const reset = () => {
    setSelectedParts([]);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Decomponha o problema</h3>
      <p className="text-gray-600 mb-6">
        Quebre o problema em partes menores. Selecione as tarefas que fazem parte da solução.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">
          Problema: {current.title}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Problema {selectedProblem + 1} de {problems.length}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {allParts.map((part, idx) => {
            const isSelected = selectedParts.includes(part);
            const isCorrect = current.parts.includes(part);
            return (
              <button
                key={idx}
                onClick={() => togglePart(part)}
                className={`text-left px-4 py-3 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-purple-100 border-purple-400 text-purple-900'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {part}
              </button>
            );
          })}
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
              ? 'Perfeito! Você decompôs o problema corretamente.'
              : 'Ainda não está completo. Tente selecionar todas as partes necessárias.'}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Decomposição - Quebrar problemas complexos em partes menores.
      </div>
    </div>
  );
}

