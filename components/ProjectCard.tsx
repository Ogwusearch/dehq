import React, { useState } from 'react';
import { Project } from '../types';
import { Calendar, Users, BarChart3, MoreHorizontal, Wand2, Loader2 } from 'lucide-react';
import { generateProjectSummary } from '../services/geminiService';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const result = await generateProjectSummary(project);
    setSummary(result);
    setIsGenerating(false);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'on-hold': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)} uppercase tracking-wider`}>
          {project.status.replace('-', ' ')}
        </span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{project.name}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">{project.description}</p>
      
      {summary && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-900 border border-indigo-100 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-1 font-semibold mb-1 text-indigo-700">
            <Wand2 className="w-3 h-3" /> AI Summary
          </div>
          {summary}
        </div>
      )}

      <div className="space-y-4 mt-auto">
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex -space-x-2">
            {project.members.map((member) => (
              <img 
                key={member.id}
                src={member.avatar} 
                alt={member.name}
                className="w-7 h-7 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          <button className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Details
          </button>
          <button 
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50"
            title="Generate status report"
          >
             {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
             {isGenerating ? 'Thinking...' : 'Summarize'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;