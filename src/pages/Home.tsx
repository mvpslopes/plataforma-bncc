import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ClassroomGallery } from '../components/ClassroomGallery';
import { Footer } from '../components/Footer';

interface HomeProps {
  onLoginClick: () => void;
}

export const Home = ({ onLoginClick }: HomeProps) => {
  return (
    <div className="min-h-screen">
      <Header onLoginClick={onLoginClick} />
      <Hero onGetStarted={onLoginClick} />
      <Features />
      <ClassroomGallery />
      <Footer />
    </div>
  );
};
