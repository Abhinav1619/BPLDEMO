import React, { useState } from 'react';
import { LayoutGrid, Calendar, LogOut, Search, Bell, User, ChevronDown, CheckCircle, Info, FileText, Download, Clock, Zap, ArrowLeft, Triangle } from 'lucide-react';

export const DetailedOTPage = ({ ot, onBack }: { ot: any, onBack: () => void }) => {
  const tabs = ['Flowsheet', 'Fluids', 'Medications', 'Staffing', 'Scoring', 'Forms', 'Final Report'];
  const [activeTab, setActiveTab] = useState('Flowsheet');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header specific to detailed view */}
      <header className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold text-xl italic tracking-wider">BPL <span className="font-medium text-sm">Cortex OT</span></span>
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
               <LayoutGrid size={18} /> Board View
            </button>
            <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
               <LogOut size={18} /> Admit / Discharge Patient
            </button>
            <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
               <Calendar size={18} /> Scheduler
            </button>
          </div>
          <div className="flex items-center gap-3 bg-blue-700/50 pl-3 pr-4 py-1.5 rounded-full border border-blue-500/30">
            <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
               <User size={18} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="font-semibold text-sm">Dr Jacob Jenner</span>
              <ChevronDown size={16} className="opacity-80" />
            </div>
          </div>
        </div>
      </header>

      {/* Patient Header Summary */}
      <div className="bg-[#f0f7fb] border-b border-blue-100 px-6 py-3">
         <div className="grid grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Patient Name :</span> {ot.patient?.name || 'James'}</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">UHID/CRN :</span> {ot.patient?.crn || 'CRN3185'}</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">DOB :</span> 03/06/1964</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Gender :</span> Male</div>
            </div>
            <div className="space-y-1">
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Admit Date & Time :</span> 02/09/2026 (10:06)</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Care Unit & Bed :</span> OT ({ot.id})</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Consulting Doctors :</span> Ajay Tiwari, Ms She...</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Case Type :</span> General Anaesthesia</div>
            </div>
            <div className="space-y-1">
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">ASA :</span> {ot.asa || 'I'}</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Allergies :</span> Latex</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Diagnosis :</span> {ot.procedure?.full || 'Blocked Coronary Arteries'}</div>
               <div className="text-slate-800"><span className="text-[#0d649d] font-semibold w-24 inline-block">Procedures :</span> {ot.procedure?.short || 'CABG'}</div>
            </div>
            <div className="flex items-start justify-end gap-2 text-xs">
               <div className="flex flex-col items-start gap-1">
                  <span className="text-[#0d649d] font-semibold">Comorbidities :</span> <span className="text-slate-800">DM, HTN</span>
                  <span className="text-[#0d649d] font-semibold">Other Comorbidities :</span> <span className="text-slate-800">Skin Eczema</span>
               </div>
               <div className="flex items-center gap-1.5 ml-4">
                  {[
                    { label: 'More Info', icon: Info },
                    { label: 'OR Events', icon: Calendar },
                    { label: 'Quick Note', icon: FileText },
                    { label: 'View Quick...', icon: FileText },
                    { label: 'Print PDF', icon: Download },
                    { label: 'Time Interval', icon: Clock }
                  ].map(btn => (
                     <button key={btn.label} className="flex flex-col items-center justify-center p-1 border border-blue-200 bg-white rounded text-[#0d649d] hover:bg-blue-50 transition-colors shadow-sm w-16 h-14">
                        <btn.icon size={16} className="mb-1" />
                        <span className="text-[9px] text-center leading-tight">{btn.label}</span>
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-24 bg-[#0d649d] text-white flex flex-col border-r border-blue-900 shadow-xl z-10">
          {tabs.map((tab, idx) => (
             <button 
               key={idx}
               onClick={() => setActiveTab(tab)}
               className={`flex flex-col items-center justify-center h-20 transition-all border-b border-blue-800/50 ${activeTab === tab ? 'bg-white text-[#0d649d] shadow-inner font-bold' : 'hover:bg-blue-800 text-blue-100 font-medium'}`}
             >
               {idx === 0 && <Zap size={24} className="mb-1.5" />}
               {idx === 1 && <div className="w-5 h-6 border-2 rounded-full mb-1.5 flex items-center justify-center">O</div>}
               {idx === 2 && <div className="w-6 h-3 rounded-full bg-current mb-1.5"></div>}
               {idx === 3 && <User size={24} className="mb-1.5" />}
               {idx === 4 && <div className="text-xl font-black mb-1 leading-none">*</div>}
               {idx === 5 && <FileText size={24} className="mb-1.5" />}
               {idx === 6 && <FileText size={24} className="mb-1.5 opacity-80" />}
               <span className="text-[10px] uppercase tracking-wider">{tab}</span>
             </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
           {/* Top Phase Action Buttons */}
           <div className="flex items-center gap-2 p-2 border-b border-slate-200 overflow-x-auto">
              {[
                { label: 'Positionin...' },
                { label: 'OR' },
                { label: 'Anes Ready' },
                { label: 'Catheter I...' },
                { label: 'Anaesthesi...' },
                { label: 'Wound Dres...' },
                { label: 'Surgery' },
                { label: 'Incision' },
                { label: 'Hand To Su...' },
              ].map((phase, i) => (
                 <button key={i} className="flex flex-col items-center justify-center w-20 h-16 border border-slate-300 rounded text-slate-700 bg-slate-50 hover:bg-blue-50 transition-colors flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-slate-400 rounded-full mb-1 flex items-center justify-center">
                       <span className="text-[8px] font-bold">Icon</span>
                    </div>
                    <span className="text-[10px] leading-tight">{phase.label}</span>
                 </button>
              ))}
              <div className="ml-auto pr-4">
                 <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 text-sm shadow-sm transition-colors">
                    <CheckCircle size={16} /> Validate Parameter
                 </button>
              </div>
           </div>

           {/* Content Canvas */}
           <div className="flex-1 flex flex-col p-4 bg-slate-50/50 overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col w-full h-[600px]">
                 {/* Panel Header */}
                 <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                    <ChevronDown size={18} className="text-[#0d649d] mr-2" />
                    <span className="font-bold text-slate-700 text-sm">Patient Monitor</span>
                 </div>
                 
                 {/* Chart Area */}
                 <div className="flex flex-1 overflow-hidden relative">
                    {/* Y-Axis Label Area */}
                    <div className="w-48 bg-[#f8fafc] border-r border-slate-200 flex flex-col z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                       <div className="h-8 bg-[#0da1ca] text-white flex items-center justify-center text-xs font-bold border-b border-blue-300/20 shadow-sm">
                          Parameters
                       </div>
                       {[
                         { icon: Triangle, color: 'text-green-500', rotate: 'rotate-180', label: 'Heart Rate', unit: 'bpm' },
                         { icon: Triangle, color: 'text-blue-500', rotate: '-rotate-90', label: 'Resp.Rate', unit: 'bpm' },
                         { icon: 'circle', color: 'bg-yellow-400', label: 'SpO2', unit: '%' },
                         { icon: 'circle', color: 'bg-red-500', label: 'Temp1', unit: '°C' },
                         { icon: 'circle', color: 'bg-green-500', label: 'Pulse', unit: 'bpm' },
                         { icon: Triangle, color: 'text-red-500', rotate: 'rotate-180', label: 'Validation', unit: 'Parameter' },
                         { icon: Triangle, color: 'text-red-500', rotate: 'rotate-180', label: 'Validation', unit: 'Parameter' },
                       ].map((param, i) => (
                          <div key={i} className="flex-1 flex items-center justify-between px-3 border-b border-slate-200/50 hover:bg-blue-50/30 transition-colors">
                             <div className="flex items-center gap-2">
                                {param.icon === 'circle' ? (
                                   <div className={`w-2.5 h-2.5 rounded-full ${param.color}`}></div>
                                ) : (
                                   <param.icon size={12} className={`${param.color} fill-current ${param.rotate}`} />
                                )}
                                <span className="text-xs font-medium text-slate-700">{param.label}</span>
                             </div>
                             <span className="text-[10px] text-slate-400 font-medium">{param.unit}</span>
                          </div>
                       ))}
                    </div>

                    {/* Chart Grid */}
                    <div className="flex-1 relative bg-white overflow-hidden flex flex-col">
                       {/* Time Header */}
                       <div className="h-8 bg-[#0d649d] text-white flex items-center z-10 w-full shadow-sm sticky top-0">
                          {['16:53', '16:54', '16:55', '16:56', '16:57', '16:58', '16:59', '17:00', '17:01', '17:02', '17:03', '17:04', '17:05', '17:06', '17:07', '17:08', '17:09', '17:10', '17:11', '17:12'].map((time, i) => (
                             <div key={i} className="flex-1 text-center text-[11px] font-medium border-l border-white/20 h-full flex items-center justify-center">
                                {time}
                             </div>
                          ))}
                       </div>
                       
                       {/* Grid Background */}
                       <div className="flex-1 relative">
                          <div className="absolute inset-0 flex flex-col">
                             {[300, 250, 200, 150, 100, 50, 0].map((val, i) => (
                                <div key={i} className="flex-1 border-b border-slate-200 w-full relative group">
                                   <span className="absolute -left-6 -top-2 text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors">{val}</span>
                                </div>
                             ))}
                          </div>
                          
                          <div className="absolute inset-0 flex h-full">
                             {Array.from({length: 20}).map((_, i) => (
                                <div key={i} className="flex-1 border-l border-slate-200 h-full relative">
                                   <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-green-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                                   <div className="absolute top-[20%] left-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2"></div>
                                   <div className="absolute bottom-[10%] left-1/2 w-1.5 h-1.5 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                             ))}
                          </div>
                          
                          {/* Fake lines drawing over the grid */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                             <polyline points="20,150 70,160 120,140 170,155 220,130 270,145" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                             <polyline points="20,80 70,82 120,81 170,83 220,80 270,85" fill="none" stroke="#eab308" strokeWidth="1.5" />
                             <polyline points="20,250 70,250 120,250 170,250 220,250 270,250" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                             <polyline points="20,280 70,285 120,275 170,280 220,290 270,270" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                          </svg>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
