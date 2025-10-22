import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface HomeProps {
  onLoginClick: () => void;
  onNavigateToAbout: () => void;
}

export const Home = ({ onLoginClick, onNavigateToAbout }: HomeProps) => {
  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-inscricao');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToContactForm = () => {
    const contactFormElement = document.getElementById('formulario-contato');
    console.log('Procurando formulário de contato:', contactFormElement);
    if (contactFormElement) {
      console.log('Formulário encontrado, fazendo scroll...');
      contactFormElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.log('Formulário não encontrado!');
    }
  };

  // Verificar se há hash na URL e fazer scroll para o formulário de contato
  React.useEffect(() => {
    const handleScrollToContact = () => {
      if (window.location.hash === '#formulario-contato') {
        console.log('Hash detectado: #formulario-contato');
        // Tentar múltiplas vezes com intervalos diferentes
        const tryScroll = (attempts = 0) => {
          const contactFormElement = document.getElementById('formulario-contato');
          console.log(`Tentativa ${attempts + 1}:`, contactFormElement);
          
          if (contactFormElement) {
            console.log('Formulário encontrado, fazendo scroll...');
            contactFormElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          } else if (attempts < 10) {
            console.log('Formulário não encontrado, tentando novamente...');
            setTimeout(() => tryScroll(attempts + 1), 500);
          } else {
            console.log('Formulário não encontrado após 10 tentativas');
          }
        };
        
        setTimeout(() => tryScroll(), 1000);
      }
    };

    // Verificar hash inicial
    handleScrollToContact();

    // Escutar mudanças no hash
    window.addEventListener('hashchange', handleScrollToContact);

    return () => {
      window.removeEventListener('hashchange', handleScrollToContact);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header onLoginClick={onLoginClick} onNavigateToAbout={onNavigateToAbout} />
      <div id="inicio">
        <Hero onGetStarted={onLoginClick} onTestNow={scrollToForm} />
      </div>
      <div id="cursos">
        <Features />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
