'use client';

import React, { useState } from 'react';

interface StaffMember {
  name: string;
  role: string;
  coordinates: string;
  status: 'ACTIVE FIELD' | 'OFF DUTY';
  lastCheckIn: string;
  avatar: string;
}

export default function TimeTrack() {
  const [staffList, setStaffList] = useState<StaffMember[]>([
    { name: 'Juan Dela Cruz', role: 'Senior Field Research Scientist', coordinates: '📍 18.2045° N, 120.5923° E', status: 'ACTIVE FIELD', lastCheckIn: '08:14 AM', avatar: '👨‍💻' },
    { name: 'Maria Clara', role: 'Crop Modeling Specialist', coordinates: '📍 Stationed @ Ilocos Sur Office', status: 'OFF DUTY', lastCheckIn: 'Yesterday', avatar: '👩‍🔬' }
  ]);

  const toggleStaffStatus = (index: number) => {
    setStaffList(staffList.map((staff, idx) => {
      if (idx === index) {
        return {
          ...staff,
          status: staff.status === 'ACTIVE FIELD' ? 'OFF DUTY' : 'ACTIVE FIELD',
          lastCheckIn: staff.status === 'OFF DUTY' ? 'Just Now' : staff.lastCheckIn
        };
      }
      return staff;
    }));
  };

  const toggleAll = (clockIn: boolean) => {
    setStaffList(staffList.map(staff => ({
      ...staff,
      status: clockIn ? 'ACTIVE FIELD' : 'OFF DUTY',
      lastCheckIn: clockIn ? 'Just Now' : staff.lastCheckIn
    })));
  };

  return (
    <div className="view-panel active space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">ETS</span>
          <div>
            <h2 className="text-sm font-bold text-white">Personnel Registry & Attendance</h2>
            <p className="text-[10px] text-slate-400">Track active field coordinates, check-ins, and task assignments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toggleAll(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all">
            Clock All In
          </button>
          <button onClick={() => toggleAll(false)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs px-3.5 py-2 rounded-lg transition-all">
            Clock All Out
          </button>
        </div>
      </div>

      {/* STAFF CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffList.map((staff, index) => (
          <div key={staff.name} className="bg-slate-900/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-base">{staff.avatar}</div>
                <div>
                  <h4 className="text-xs font-bold text-white">{staff.name}</h4>
                  <p className="text-[9px] text-slate-400">{staff.role}</p>
                  <p className={`text-[10px] font-mono mt-1 ${staff.status === 'ACTIVE FIELD' ? 'text-emerald-400' : 'text-slate-500'}`}>{staff.coordinates}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border uppercase ${
                staff.status === 'ACTIVE FIELD' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-400 border-white/5'
              }`}>
                {staff.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <span className="text-[9px] text-slate-500 uppercase">LAST CHECK-IN: {staff.lastCheckIn}</span>
              <button onClick={() => toggleStaffStatus(index)} className="text-[10px] font-bold text-blue-400 hover:underline">
                {staff.status === 'ACTIVE FIELD' ? 'Toggle Out' : 'Toggle In'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}