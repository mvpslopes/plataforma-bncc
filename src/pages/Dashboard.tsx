import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { VideoCourses } from './VideoCourses';
import { Documents } from './Documents';
import { Profile } from './Profile';
import { Activities } from './Activities';

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<'activities' | 'videos' | 'documents' | 'profile'>('activities');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="ml-64 flex-1 p-8">
        {currentPage === 'activities' && <Activities />}
        {currentPage === 'videos' && <VideoCourses />}
        {currentPage === 'documents' && <Documents />}
        {currentPage === 'profile' && <Profile />}
      </main>
    </div>
  );
};
