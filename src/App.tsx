import React, { useState } from 'react';
import { Project } from './types';
import { ProjectModal } from './components/common/ProjectModal';
import { ContactModal } from './components/common/ContactModal';
import { IterationOne } from './components/iterations/IterationOne';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#111827]">
      {/* Main Portfolio */}
      <IterationOne
        onOpenProject={(proj) => setSelectedProject(proj)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Shared Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
