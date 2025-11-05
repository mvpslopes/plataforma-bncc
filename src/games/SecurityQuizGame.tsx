import React, { useState, useMemo } from 'react';

interface SecurityQuizGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Quiz de Segurança Digital
export function SecurityQuizGame({ userId, onCompleted }: SecurityQuizGameProps) {
  const questions = useMemo(
    () => [
      {
        question: 'Qual é a melhor prática para criar uma senha?',
        options: [
          'Usar seu nome de aniversário',
          'Usar uma combinação de letras, números e símbolos',
          'Usar a mesma senha em todos os sites',
        ],
        correct: 1,
      },
      {
        question: 'O que você deve fazer se receber um email suspeito?',
        options: [
          'Abrir os anexos para ver o que é',
          'Clicar em links estranhos',
          'Não abrir e deletar o email',
        ],
        correct: 2,
      },
      {
        question: 'É seguro compartilhar sua senha com amigos?',
        options: [
          'Sim, se forem seus melhores amigos',
          'Não, nunca compartilhe sua senha',
          'Depende do site',
        ],
        correct: 1,
      },
      {
        question: 'O que significa "phishing"?',
        options: [
          'Um tipo de pescaria',
          'Tentativa de roubar informações pessoais',
          'Um jogo online',
        ],
        correct: 1,
      },
      {
        question: 'Quando você deve atualizar seus aplicativos?',
        options: [
          'Nunca, funciona melhor assim',
          'Sempre que houver atualizações disponíveis',
          'Apenas uma vez por ano',
        ],
        correct: 1,
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [gameOver, setGameOver] = useState(false);

  const current = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (feedback !== null) return;
    setSelected(index);
    const isCorrect = index === current.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setFeedback(null);
      } else {
        setGameOver(true);
        const key = `plataforma-bncc-game-progress-${userId}`;
        const now = new Date().toISOString();
        const prev = JSON.parse(localStorage.getItem(key) || '{}');
        const updated = {
          ...prev,
          security_quiz_v1: {
            completed: true,
            last_attempt_at: now,
            attempts: (prev.security_quiz_v1?.attempts || 0) + 1,
            score: score + (isCorrect ? 1 : 0),
            total_questions: questions.length,
          },
        };
        localStorage.setItem(key, JSON.stringify(updated));
        
        if (onCompleted) onCompleted();
      }
    }, 1500);
  };

  const reset = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Quiz de Segurança Digital</h3>
      <p className="text-gray-600 mb-6">
        Teste seus conhecimentos sobre segurança online! Pergunta {currentIndex + 1} de {questions.length}
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        {!gameOver ? (
          <>
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Pontuação: <strong className="text-purple-600">{score}/{currentIndex + (feedback ? 1 : 0)}</strong>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentIndex + (feedback ? 1 : 0)) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{current.question}</h4>
              <div className="space-y-3">
                {current.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={feedback !== null}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      selected === idx
                        ? feedback === 'correct'
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                        : idx === current.correct && feedback !== null
                        ? 'bg-green-50 border-green-300 text-green-700'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } ${feedback !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option}
                    {selected === idx && feedback === 'correct' && <span className="ml-2">✓</span>}
                    {selected === idx && feedback === 'wrong' && <span className="ml-2">✗</span>}
                    {idx === current.correct && feedback !== null && selected !== idx && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">
              {score === questions.length ? '🎉' : score >= questions.length * 0.7 ? '👍' : '📚'}
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              Você acertou {score} de {questions.length}!
            </h4>
            <p className="text-gray-600 mb-6">
              {score === questions.length
                ? 'Perfeito! Você é um expert em segurança digital!'
                : score >= questions.length * 0.7
                ? 'Muito bom! Continue aprendendo sobre segurança!'
                : 'Bom começo! Pratique mais sobre segurança digital.'}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              🔄 Jogar Novamente
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> EF08CI01 - Aplicar princípios de segurança digital.
      </div>
    </div>
  );
}

