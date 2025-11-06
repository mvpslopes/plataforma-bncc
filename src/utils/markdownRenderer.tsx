import React from 'react';

// Renderizador simples de Markdown para as respostas da IA
export const renderMarkdown = (text: string): React.ReactNode => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let inList = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Lista numerada
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList) {
        inList = true;
        currentList = [];
      }
      currentList.push(trimmed.replace(/^\d+\.\s/, ''));
    }
    // Lista com bullet
    else if (/^[-•*]\s/.test(trimmed)) {
      if (!inList) {
        inList = true;
        currentList = [];
      }
      currentList.push(trimmed.replace(/^[-•*]\s/, ''));
    }
    // Texto em negrito
    else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (inList) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      const boldText = trimmed.replace(/\*\*/g, '');
      elements.push(
        <p key={index} className="font-semibold text-gray-900 my-2">{boldText}</p>
      );
    }
    // Linha vazia
    else if (trimmed === '') {
      if (inList) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(<br key={index} />);
    }
    // Texto normal
    else {
      if (inList) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      // Processar negrito dentro do texto
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.replace(/\*\*/g, '')}</strong>;
        }
        return part;
      });
      
      elements.push(
        <p key={index} className="text-sm leading-relaxed my-1">
          {formattedParts}
        </p>
      );
    }
  });

  // Renderizar lista pendente
  if (inList && currentList.length > 0) {
    elements.push(
      <ul key="list-final" className="list-disc list-inside space-y-1 my-2">
        {currentList.map((item, i) => (
          <li key={i} className="text-sm">{item}</li>
        ))}
      </ul>
    );
  }

  return <div className="markdown-content">{elements}</div>;
};

