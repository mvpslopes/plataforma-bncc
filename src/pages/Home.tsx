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
