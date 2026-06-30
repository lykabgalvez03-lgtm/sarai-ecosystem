'use client';

import React, { useState } from 'react';
import type { DocumentData } from '../page';

const initialDocuments: DocumentData[] = [
  { id: 'DOST1-2026-X11', title: 'Agriculture Telemetry Calibration Checklist', origin: 'PSTC - Ilocos Norte', status: 'PENDING REVIEW' },
  { id: 'DOST1-2026-F42', title: 'Crop Modeling Infographics Guidelines v3', origin: 'R&D Office', status: 'APPROVED' },
  { id: 'DOST1-2026-G09', title: 'Personnel Field Operations Mobilization Log', origin: 'Administration', status: 'ARCHIVED' }
];

interface DocTrackProps {
  documents?: DocumentData[];
  setDocuments?: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  onSelectRow?: (id: string) => void;
}

export default function DocTrack({ documents: propDocuments, setDocuments: propSetDocuments, onSelectRow: propOnSelectRow }: DocTrackProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>(propDocuments ?? initialDocuments);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formStatus, setFormStatus] = useState<'DRAFT' | 'PENDING REVIEW' | 'APPROVED'>('PENDING REVIEW');
  const [generatedId, setGeneratedId] = useState('');

  const openAddDocModal = () => {
    const randomID = 'DOST1-2026-' + Math.floor(Math.random() * 900 + 100);
    setGeneratedId(randomID);
    setIsModalOpen(true);
  };

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocumentData = {
      id: generatedId,
      title: formTitle,
      origin: formOrigin,
      status: formStatus as any
    };
    setDocuments((previous) => [newDoc, ...previous]);
    setIsModalOpen(false);
    setFormTitle('');
    setFormOrigin('');
  };

  const openDrawer = (doc: DocumentData) => {
    setSelectedDoc(doc);
    propOnSelectRow?.(doc.id);
    setIsDrawerOpen(true);
  };

  const approveDocument = () => {
    if (!selectedDoc) return;
    setDocuments((previous) => previous.map((d) => d.id === selectedDoc.id ? { ...d, status: 'APPROVED' } : d));
    setIsDrawerOpen(false);
  };

  const filteredDocs = documents.filter(doc => 
    doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-panel active space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">DTS</span>
          <div>
            <h2 className="text-sm font-bold text-white">Document Tracking Hub</h2>
            <p className="text-[10px] text-slate-400">Manage, route, and authenticate regional correspondence</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by ID, Sender, Title..." 
            className="flex-1 sm:w-64 bg-slate-950/60 border border-white/10 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          />
          <button onClick={openAddDocModal} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-all">
            + New Document
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Subject Title</th>
                <th className="py-3 px-4">Origin / Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium text-slate-300">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-emerald-400">{doc.id}</td>
                  <td className="py-3.5 px-4 text-white">{doc.title}</td>
                  <td className="py-3.5 px-4">{doc.origin}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase ${
                      doc.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      doc.status === 'PENDING REVIEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => openDrawer(doc)} className="text-emerald-400 hover:underline">Track Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIMULATED KANBAN SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Drafts</span>
            <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded text-slate-300">
              {documents.filter(d => d.status === 'DRAFT').length}
            </span>
          </div>
          {documents.filter(d => d.status === 'DRAFT').map(doc => (
            <div key={doc.id} className="bg-[#111827] border border-white/5 rounded-xl p-3 shadow-md">
              <span className="text-[9px] font-mono text-slate-400">{doc.id}</span>
              <p className="text-xs font-bold text-white mt-1">{doc.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Processing</span>
            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
              {documents.filter(d => d.status === 'PENDING REVIEW').length}
            </span>
          </div>
          {documents.filter(d => d.status === 'PENDING REVIEW').map(doc => (
            <div key={doc.id} className="bg-[#111827] border border-white/10 rounded-xl p-3 shadow-md">
              <span className="text-[9px] font-mono text-amber-400">{doc.id}</span>
              <p className="text-xs font-bold text-white mt-1">{doc.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</span>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">
              {documents.filter(d => d.status === 'APPROVED').length}
            </span>
          </div>
          {documents.filter(d => d.status === 'APPROVED').map(doc => (
            <div key={doc.id} className="bg-[#111827] border border-white/10 rounded-xl p-3 shadow-md">
              <span className="text-[9px] font-mono text-emerald-400">{doc.id}</span>
              <p className="text-xs font-bold text-white mt-1">{doc.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT MODAL CONTAINER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-2">Create Document Tracking Record</h3>
            <form onSubmit={handleDocSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Subject Title</label>
                <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full bg-slate-950 border border-white/10 text-xs text-white rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Origin Unit</label>
                <input type="text" required value={formOrigin} onChange={(e) => setFormOrigin(e.target.value)} className="w-full bg-slate-950 border border-white/10 text-xs text-white rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status Step</label>
                  <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)} className="w-full bg-slate-950 border border-white/10 text-xs text-white rounded-lg p-2.5">
                    <option value="DRAFT">DRAFT</option>
                    <option value="PENDING REVIEW">PENDING REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Code</label>
                  <input type="text" readOnly value={generatedId} className="w-full bg-slate-950/50 border border-white/5 text-xs text-slate-500 rounded-lg p-2.5 font-mono" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER SHEET VIEW */}
      {isDrawerOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex justify-end">
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="bg-slate-900/90 border-l border-white/10 w-full max-w-lg h-full p-6 relative z-10 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-extrabold text-emerald-400">DTS SECURE AUDIT</span>
                <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 text-sm font-bold">✕ Close</button>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{selectedDoc.title}</h3>
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 mb-6">
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold">Tracking ID</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{selectedDoc.id}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold">Origin Office</span>
                  <span className="text-xs font-medium text-slate-200">{selectedDoc.origin}</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-white/5">
              <button onClick={approveDocument} className="w-full bg-emerald-500 text-slate-950 font-bold text-xs py-3 rounded-xl">
                Approve & Authenticate Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}