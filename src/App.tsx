import React, { useState } from 'react';
import {
  LayoutGrid, Calendar, UserPlus, BarChart2, Search, List, Layout, Filter, MoreVertical,
  X, Activity, Wind, Thermometer, Heart, AlertTriangle, CheckCircle2, Edit2, PlusCircle, FileText,
  ChevronLeft, ChevronRight, ChevronDown, User, Droplet, HeartPulse, ArrowLeft, TrendingUp, Clock, File, Download, Stethoscope, RefreshCw
} from 'lucide-react';

import { DetailedOTPage } from './DetailedOTPage';

type Status = 'In Surgery' | 'Preparation' | 'Cleaning' | 'On Hold';
type ASA = 'I' | 'II' | 'III' | 'IV' | '-';

interface OTRecord {
  id: string;
  status: Status;
  patient: { name: string; crn: string; age: number; gender: 'M' | 'F' } | null;
  procedure: { short: string; full: string } | null;
  asa: ASA;
  vitals: { hr?: number | string; spo2?: number | string; rr?: number | string; temp?: number | string; nibp?: string };
  ventilator: { ppeak?: number | string; peep?: number | string; vti?: number | string; pmean?: number | string; mv?: string; etco2?: string };
  alarm: { type: 'Critical' | 'Warning' | 'None'; count: number; message?: string };
}

const MOCK_DATA: OTRecord[] = [
  {
    id: 'OT-01', status: 'In Surgery',
    patient: { name: 'James', crn: 'CRN3185', age: 54, gender: 'M' },
    procedure: { short: 'CABG', full: 'Blocked Coronary Arteries' },
    asa: 'I',
    vitals: { hr: 92, spo2: 98, rr: 16, temp: 25.8, nibp: '120/80' },
    ventilator: { ppeak: 16.1, peep: 1.7, vti: 374, pmean: 2.9, mv: '5.07', etco2: '35' },
    alarm: { type: 'Critical', count: 1, message: 'PenlonPrima320 NO ABSORBER?!' }
  },
  {
    id: 'OT-02', status: 'In Surgery',
    patient: { name: 'Ashok', crn: '2024555646', age: 60, gender: 'M' },
    procedure: { short: 'CABG', full: 'Coronary Angiography' },
    asa: 'II',
    vitals: { hr: 94, spo2: 96, rr: 15, temp: '--', nibp: '--' },
    ventilator: { ppeak: 1.9, peep: 58, vti: 508, pmean: '--', mv: '--', etco2: '--' },
    alarm: { type: 'Critical', count: 1, message: 'High Airway Pressure' }
  },
  {
    id: 'OT-03', status: 'In Surgery',
    patient: { name: 'Arjun', crn: '202455878', age: 45, gender: 'M' },
    procedure: { short: 'Lap Chole', full: 'Laparoscopic Cholecystectomy' },
    asa: 'I',
    vitals: { hr: 91, spo2: 92, rr: 11, temp: '--', nibp: '-- / --' },
    ventilator: { ppeak: 2.4, peep: 51, vti: 523, pmean: '--', mv: '5.07', etco2: '--' },
    alarm: { type: 'Critical', count: 1, message: 'Low SpO₂ Level dropped below 90%' }
  },
  {
    id: 'OT-04', status: 'In Surgery',
    patient: { name: 'Priya N.', crn: '202455890', age: 38, gender: 'F' },
    procedure: { short: 'THR', full: 'Total Hip Replacement' },
    asa: 'II',
    vitals: { hr: 78, spo2: 99, rr: 14, temp: 36.4, nibp: '110/70' },
    ventilator: { ppeak: 18.2, peep: 5.1, vti: 410, pmean: '--', mv: '4.8', etco2: '32' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-05', status: 'Preparation',
    patient: { name: 'Ramesh', crn: '202456001', age: 66, gender: 'M' },
    procedure: { short: 'TURP', full: 'Transurethral Resection' },
    asa: 'III',
    vitals: { hr: '--', spo2: '--', rr: '--', temp: '--', nibp: '--' },
    ventilator: { ppeak: '--', peep: '--', vti: '--', pmean: '--', mv: '--', etco2: '--' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-06', status: 'In Surgery',
    patient: { name: 'Sneha', crn: '202456112', age: 29, gender: 'F' },
    procedure: { short: 'LSCS', full: 'Lower Segment C-Section' },
    asa: 'II',
    vitals: { hr: 88, spo2: 99, rr: 18, temp: 36.7, nibp: '115/75' },
    ventilator: { ppeak: 14.3, peep: 2.1, vti: 320, pmean: 4.1, mv: '4.5', etco2: '36' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-07', status: 'Cleaning',
    patient: null,
    procedure: null,
    asa: '-',
    vitals: { hr: '--', spo2: '--', rr: '--', temp: '--', nibp: '--' },
    ventilator: { ppeak: '--', peep: '--', vti: '--', pmean: '--', mv: '--', etco2: '--' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-08', status: 'In Surgery',
    patient: { name: 'Vikram', crn: '202456221', age: 52, gender: 'M' },
    procedure: { short: 'Craniotomy', full: 'Brain Tumor Excision' },
    asa: 'III',
    vitals: { hr: 82, spo2: 97, rr: 12, temp: 36.1, nibp: '130/85' },
    ventilator: { ppeak: 20.1, peep: 5.4, vti: 450, pmean: 6.2, mv: '5.5', etco2: '34' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-09', status: 'On Hold',
    patient: { name: 'Lakshmi', crn: '202456332', age: 47, gender: 'F' },
    procedure: { short: 'Mastectomy', full: 'Breast Cancer' },
    asa: 'II',
    vitals: { hr: '--', spo2: '--', rr: '--', temp: '--', nibp: '--' },
    ventilator: { ppeak: '--', peep: '--', vti: '--', pmean: '--', mv: '--', etco2: '--' },
    alarm: { type: 'None', count: 0 }
  },
  {
    id: 'OT-10', status: 'In Surgery',
    patient: { name: 'Suresh', crn: '202456445', age: 61, gender: 'M' },
    procedure: { short: 'Valve Replacement', full: 'Aortic Valve' },
    asa: 'IV',
    vitals: { hr: 102, spo2: 94, rr: 20, temp: 36.9, nibp: '145/95' },
    ventilator: { ppeak: 22.0, peep: 8.1, vti: 510, pmean: 7.4, mv: '6.1', etco2: '38' },
    alarm: { type: 'Warning', count: 1, message: 'Elevated Heart Rate' }
  }
];

const VitalValue = ({ value, type }: { value: any, type?: 'red' | 'yellow' }) => {
  if (value === '--' || !value) return <span className="text-slate-400 font-bold">--</span>;
  if (type === 'red') {
    return <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-600 font-bold">{value}</span>;
  }
  if (type === 'yellow') {
    return <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-bold">{value}</span>;
  }
  return <span className="font-semibold text-slate-800">{value}</span>;
};

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    'In Surgery': 'bg-emerald-500 text-white',
    'Preparation': 'bg-blue-500 text-white',
    'Cleaning': 'bg-slate-400 text-white',
    'On Hold': 'bg-amber-500 text-white'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

const ASABadge = ({ asa }: { asa: ASA }) => {
  if (asa === '-') return <span className="text-slate-400 font-bold">--</span>;
  const styles: Record<string, string> = {
    'I': 'bg-[#e6f4ea] text-[#137333] border-[#e6f4ea]',
    'II': 'bg-[#e8f0fe] text-[#1967d2] border-[#e8f0fe]',
    'III': 'bg-[#d2e3fc] text-[#1967d2] border-[#d2e3fc]',
    'IV': 'bg-[#fce8e6] text-[#c5221f] border-[#fce8e6]'
  };
  return (
    <span className={`inline-flex justify-center w-8 py-1 rounded text-xs font-bold border ${styles[asa] || 'bg-slate-100 text-slate-700'}`}>
      {asa}
    </span>
  );
};

const Header = () => (
  <header className="bg-[#009ada] text-white flex items-center justify-between px-6 py-3 shadow-md z-10 relative">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="font-bold text-2xl tracking-tight text-white flex items-center gap-2">
          <span className="text-white italic font-serif tracking-wider text-3xl mr-1">BPL</span>
          <span>Cortex<br/><span className="text-sm">OT</span></span>
        </div>
      </div>
      <nav className="hidden md:flex bg-white/10 rounded-lg p-1 border border-white/20">
        <button className="flex items-center gap-2 px-5 py-2 bg-white text-[#009ada] rounded-md text-sm font-bold transition-colors shadow-sm">
          <LayoutGrid size={18} /> Board View
        </button>
        <button className="flex items-center gap-2 px-5 py-2 text-white hover:bg-white/20 rounded-md text-sm font-medium transition-colors">
          <UserPlus size={18} /> Admit / Discharge Patient
        </button>
        <button className="flex items-center gap-2 px-5 py-2 text-white hover:bg-white/20 rounded-md text-sm font-medium transition-colors">
          <Calendar size={18} /> Scheduler
        </button>
      </nav>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full ml-2 border border-white/30">
          <User size={20} className="text-white" />
        </div>
        <div className="hidden md:block">
          <div className="text-sm font-medium">Dr Jacob Jenner</div>
        </div>
      </div>
    </div>
  </header>
);

const SummaryCards = () => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {[
      { label: 'In Surgery', count: 18, color: 'bg-emerald-500' },
      { label: 'In Preparation', count: 3, color: 'bg-blue-500' },
      { label: 'Cleaning', count: 2, color: 'bg-slate-400' },
      { label: 'On Hold', count: 1, color: 'bg-amber-500' },
      { label: 'Critical', count: 2, color: 'bg-red-500' },
    ].map((stat, i) => (
      <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
        <div className={`w-5 h-5 rounded-full ${stat.color} shadow-sm border-2 border-white ring-1 ring-slate-100`}></div>
        <div className="flex gap-2 items-baseline">
          <div className="text-3xl font-bold text-slate-800 leading-none">{stat.count}</div>
          <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
        </div>
      </div>
    ))}
  </div>
);

const Sparkline = ({ color }: { color: string }) => (
  <svg width="48" height="16" viewBox="0 0 48 16" className="mt-2 opacity-80" preserveAspectRatio="none">
    {color === 'emerald' && <path d="M0 12 L10 12 L15 4 L20 16 L25 8 L30 14 L35 10 L48 2" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
    {color === 'blue' && <path d="M0 14 Q 10 14, 15 10 T 30 10 T 48 6" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
    {color === 'red' && <path d="M0 14 L10 14 L12 2 L16 16 L18 10 L22 14 L48 10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
    {color === 'orange' && <path d="M0 8 Q 12 8, 24 12 T 48 6" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
  </svg>
);

const AlarmModal = ({ ot, onClose }: { ot: OTRecord, onClose: () => void }) => {
  const mockAlarmHistory = [
    { date: '10/09/2026', time: '16:03', device: 'PenlonPrima320', alarm: 'NO ABSORBER?!' },
    { date: '10/09/2026', time: '16:03', device: 'PenlonPrima320', alarm: 'MV HIGH !!!' },
    { date: '10/09/2026', time: '16:03', device: 'PenlonPrima320', alarm: 'NO ABSORBER?!' },
    { date: '10/09/2026', time: '16:03', device: 'PenlonPrima320', alarm: 'MV HIGH !!!' },
    { date: '10/09/2026', time: '16:03', device: 'PenlonPrima320', alarm: 'NO ABSORBER?!' },
    { date: '10/09/2026', time: '16:04', device: 'BplUltimaPrime', alarm: 'Temp2 Sensor Fall Off' },
    { date: '10/09/2026', time: '16:04', device: 'BplUltimaPrime', alarm: 'Exceeds Alarm Low Limit Bit Of Temp1' },
    { date: '10/09/2026', time: '16:04', device: 'BplUltimaPrime', alarm: 'Temp2 Sensor Fall Off' },
    { date: '10/09/2026', time: '16:04', device: 'BplUltimaPrime', alarm: 'Exceeds Alarm Low Limit Bit Of Temp1' },
    { date: '10/09/2026', time: '16:04', device: 'BplUltimaPrime', alarm: 'Temp2 Sensor Fall Off' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden animate-slide-in">
         {/* Header */}
         <div className="flex justify-between items-start p-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
               <AlertTriangle className="text-red-500 mt-1 shrink-0" size={28} />
               <div>
                 <h2 className="text-2xl font-bold text-[#1e3a8a]">Alarm Details</h2>
                 <p className="text-slate-500 mt-1">Complete list of alarms for {ot.id} ({ot.patient?.name || 'Unknown'})</p>
               </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
               <button className="hover:text-[#1e3a8a] transition-colors"><RefreshCw size={24} /></button>
               <button onClick={onClose} className="hover:text-slate-700 transition-colors"><X size={28} /></button>
            </div>
         </div>

         {/* Table */}
         <div className="p-6">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-[#f0f7ff] text-[#1e3a8a] border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold">Time</th>
                        <th className="px-6 py-4 font-bold">Device Name</th>
                        <th className="px-6 py-4 font-bold">Alarms</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {mockAlarmHistory.map((a, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 text-slate-500 font-medium">{a.date}</td>
                           <td className="px-6 py-4 text-slate-500 font-medium">{a.time}</td>
                           <td className="px-6 py-4 text-slate-600 font-medium">{a.device}</td>
                           <td className="px-6 py-4 text-red-500 font-medium">{a.alarm}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 text-sm text-slate-500">
               <div>Showing 1 – {mockAlarmHistory.length} of {mockAlarmHistory.length} alarms</div>
               <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 bg-white hover:bg-slate-50"><ChevronLeft size={16} /></button>
                  <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded font-bold shadow-sm">1</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 bg-white hover:bg-slate-50"><ChevronRight size={16} /></button>
               </div>
            </div>
         </div>

         {/* Footer Actions */}
         <div className="p-6 border-t border-slate-100 flex justify-end">
            <button onClick={onClose} className="px-8 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition-colors shadow-sm">Close</button>
         </div>
      </div>
    </div>
  );
};

const ExpandedRowContent = ({ ot }: { ot: OTRecord }) => {
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);

  return (
    <div className="bg-slate-50/50 p-6 flex flex-col gap-6 relative shadow-inner">
      {/* Active Alarms */}
      {ot.alarm.count > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-600" />
            <h3 className="text-xl font-bold text-red-900">Active Alarms ({ot.alarm.count})</h3>
            <span className="bg-red-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase">Critical</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 p-4 rounded-lg border border-red-100">
            <div className="flex items-start gap-4">
               <AlertTriangle size={20} className="text-red-500 mt-0.5 shrink-0" />
               <div>
                  <div className="flex items-center gap-3">
                     <span className="font-bold text-red-700">15:26</span>
                     <span className="font-bold text-slate-800 text-lg">{ot.alarm.message?.split(' dropped ')[0] || 'Unknown Alarm'}</span>
                  </div>
                  <div className="text-slate-600 text-sm mt-0.5">{ot.alarm.message}</div>
               </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
               <button className="px-5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition-colors">Acknowledge</button>
               <button onClick={() => setIsAlarmModalOpen(true)} className="px-5 py-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors shadow-sm">View All Alarms ({ot.alarm.count})</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex xl:flex-row flex-col gap-4">
        {/* Live Monitoring */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 xl:w-[28%] flex flex-col">
           <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                 <div className="text-blue-600">
                   <Activity size={18} />
                 </div>
                 <h3 className="text-base font-bold text-slate-800">Live Monitoring</h3>
                 <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
                 </span>
              </div>
           </div>
           
           <div className="flex items-center text-[10px] text-slate-400 font-medium mb-3">
              Last updated 15:26:31
           </div>

           <div className="grid grid-cols-4 gap-2 flex-1">
              {[
                { l: 'Heart Rate', v: ot.vitals.hr, u: 'bpm', i: Heart, c: 'text-red-500', t: 'red' },
                { l: 'SpO₂', v: ot.vitals.spo2, u: '%', i: Droplet, c: 'text-blue-500', t: 'red' },
                { l: 'Resp. Rate', v: ot.vitals.rr, u: '/min', i: Wind, c: 'text-emerald-500', t: 'emerald' },
                { l: 'Temp', v: ot.vitals.temp, u: '°C', i: Thermometer, c: 'text-orange-500', t: null },
              ].map((vital, idx) => (
                 <div key={idx} className="border border-slate-200 rounded-lg p-2 flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors bg-white shadow-sm hover:shadow-md h-full">
                    <div className="flex flex-col items-center gap-1 text-slate-500 mb-1 z-10 text-center">
                       <vital.i size={14} className={vital.c} />
                       <span className="text-[9px] font-semibold leading-tight">{vital.l}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 z-10 mt-1">
                       <span className={`text-xl font-black tracking-tight ${vital.v === '--' || vital.v === '-- / --' ? 'text-slate-300' : 'text-slate-800'}`}>{vital.v}</span>
                       <span className="text-[9px] font-medium text-slate-400">{vital.u}</span>
                    </div>
                    {vital.t && vital.v !== '--' && (
                       <div className="absolute bottom-1 right-1 opacity-60 group-hover:opacity-100 transition-opacity">
                         <Sparkline color={vital.t} />
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>

        {/* Ventilator Parameters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 xl:w-[28%] flex flex-col">
           <div className="flex items-center gap-2 mb-6">
               <div className="text-blue-600">
                 <Wind size={18} />
               </div>
               <h3 className="text-base font-bold text-slate-800">Ventilator Parameters</h3>
               <div className="ml-auto">
                 <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline transition-all">More Parameters <ArrowLeft size={14} className="rotate-180"/></span>
               </div>
           </div>
           
           <div className="grid grid-cols-4 gap-2 flex-1">
              {[
                { l: 'Ppeak', v: ot.ventilator.ppeak, u: 'cmH₂O' },
                { l: 'PEEP', v: ot.ventilator.peep, u: 'cmH₂O' },
                { l: 'MV', v: ot.ventilator.mv, u: 'L/min' },
                { l: 'VTi', v: ot.ventilator.vti, u: 'mL' },
              ].map((param, idx) => (
                 <div key={idx} className="border border-slate-200 rounded-lg p-2 flex flex-col bg-slate-50/50 h-full">
                    <span className="text-[10px] text-slate-500 font-semibold mb-1 text-center">{param.l}</span>
                    <div className="flex flex-col flex-1 items-center justify-center mt-2">
                       <span className={`text-xl font-bold ${param.v === '--' ? 'text-slate-300' : 'text-slate-800'}`}>{param.v}</span>
                       <span className="text-[9px] font-medium text-slate-400">{param.u}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

         {/* Patient Information */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden xl:w-[22%] flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
               <div className="flex items-center gap-2">
                 <User size={18} className="text-blue-600" />
                 <h3 className="font-bold text-slate-800 text-base">Patient Information</h3>
               </div>
               <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline"><Edit2 size={12}/> Edit</button>
            </div>
            <div className="p-4 flex flex-col gap-y-3 text-[11px] flex-1">
               {[
                 { l: 'Name', v: ot.patient?.name || '--' },
                 { l: 'CRN', v: ot.patient?.crn || '--' },
                 { l: 'Age / Gender', v: ot.patient ? `${ot.patient.age} Years / ${ot.patient.gender === 'M' ? 'Male' : 'Female'}` : '--' },
                 { l: 'Blood Group', v: 'O+' },
               ].map((row, i) => (
                  <div key={i} className="flex">
                     <span className="w-1/3 text-slate-500">{row.l}</span>
                     <span className="w-2/3 font-semibold text-slate-800">{row.v}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Surgical Information */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden xl:w-[22%] flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
               <div className="flex items-center gap-2">
                 <Activity size={18} className="text-blue-600" />
                 <h3 className="font-bold text-slate-800 text-base">Surgical Information</h3>
               </div>
               <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline"><Edit2 size={12}/> Edit</button>
            </div>
            <div className="p-4 flex flex-col gap-y-3 text-[11px] flex-1">
               {[
                 { l: 'Procedure', v: ot.procedure?.short || '--' },
                 { l: 'Diagnosis', v: ot.procedure?.full || '--' },
                 { l: 'Surgeon', v: 'Dr. R. Verma' },
                 { l: 'Anaesthetist', v: 'Dr. Jacob Jenner' },
                 { l: 'Position', v: 'Supine' },
               ].map((row, i) => (
                  <div key={i} className="flex">
                     <span className="w-1/3 text-slate-500">{row.l}</span>
                     <span className="w-2/3 font-semibold text-slate-800 line-clamp-1" title={row.v}>{row.v}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {isAlarmModalOpen && <AlarmModal ot={ot} onClose={() => setIsAlarmModalOpen(false)} />}
    </div>
  )
}

const OTGridView = ({ data, onSelect, onDetailClick }: { data: OTRecord[], onSelect: (ot: OTRecord) => void, onDetailClick: (ot: OTRecord) => void }) => {
  const statusBorder = {
    'In Surgery': 'border-t-emerald-500',
    'Preparation': 'border-t-blue-500',
    'Cleaning': 'border-t-slate-400',
    'On Hold': 'border-t-amber-500'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-slide-in">
      {data.map(ot => (
        <div key={ot.id} className={`bg-white rounded-xl shadow-sm border border-slate-200/80 border-t-4 ${statusBorder[ot.status]} p-5 flex flex-col hover:shadow-md transition-all cursor-default`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full shadow-sm ${ot.status === 'In Surgery' ? 'bg-emerald-500' : ot.status === 'Preparation' ? 'bg-blue-500' : ot.status === 'Cleaning' ? 'bg-slate-400' : 'bg-amber-500'}`} />
              <span 
                className="font-bold text-blue-600 hover:underline text-xl tracking-tight cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onDetailClick(ot); }}
                title={`Click to open ${ot.id}`}
              >
                {ot.id}
              </span>
              <div className="ml-1"><StatusBadge status={ot.status} /></div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50"><MoreVertical size={18} /></button>
          </div>

          {/* Patient Info */}
          {ot.patient ? (
            <div className="mb-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-800 text-lg">{ot.patient.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{ot.patient.age}{ot.patient.gender} <span className="mx-1.5 text-slate-300">|</span> {ot.patient.crn}</div>
                </div>
                <ASABadge asa={ot.asa} />
              </div>
              <div className="mt-3 text-sm text-slate-800 font-bold tracking-tight flex flex-wrap items-center">
                {ot.procedure?.short} 
                <span className="text-slate-400 mx-2 text-[10px]">•</span> 
                <span className="text-slate-500 font-medium text-xs line-clamp-1 flex-1" title={ot.procedure?.full}>{ot.procedure?.full}</span>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex-1">
               <div className="font-bold text-slate-300 text-lg">--</div>
               <div className="text-xs text-slate-300 mt-0.5">-- <span className="mx-1.5">|</span> --</div>
               <div className="mt-3 text-sm text-slate-300">-- <span className="mx-2 text-[10px]">•</span> --</div>
            </div>
          )}

          {/* Vitals Grid */}
          <div className="flex justify-between items-center mb-5 mt-2">
            <div className="flex flex-col items-center">
              <Heart size={18} className="text-red-500 mb-1" />
              <div className="font-black text-slate-800 text-lg leading-none">{ot.vitals.hr}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-1">bpm</div>
            </div>
            <div className="flex flex-col items-center">
              <Droplet size={18} className="text-blue-500 mb-1" />
              <div className="font-black text-slate-800 text-lg leading-none">{ot.vitals.spo2}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-1">%</div>
            </div>
            <div className="flex flex-col items-center">
              <Wind size={18} className="text-emerald-500 mb-1" />
              <div className="font-black text-slate-800 text-lg leading-none">{ot.vitals.rr}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-1">/min</div>
            </div>
            <div className="flex flex-col items-center">
              <Thermometer size={18} className="text-orange-500 mb-1" />
              <div className="font-black text-slate-800 text-lg leading-none">{ot.vitals.temp}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-1">°C</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2">
            {ot.alarm.type === 'Critical' ? (
              <span className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2.5 py-1.5 rounded-md font-bold text-xs border border-red-100 shadow-sm">
                <AlertTriangle size={14} className="text-red-600" /> {ot.alarm.count} Critical Alarm
              </span>
            ) : ot.alarm.type === 'Warning' ? (
              <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-md font-bold text-xs border border-amber-100 shadow-sm">
                <AlertTriangle size={14} className="text-amber-600" /> {ot.alarm.count} Warning
              </span>
            ) : ot.status === 'In Surgery' || ot.status === 'Preparation' ? (
               <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md font-bold text-xs border border-emerald-100 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-600" /> No Alarms
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-md font-bold text-xs border border-slate-200 shadow-sm">
                <Activity size={14} className="text-slate-400" /> No Data
              </span>
            )}
            <button 
              onClick={() => onSelect(ot)}
              className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


export default function App() {
  const [selectedOT, setSelectedOT] = useState<OTRecord | null>(null);
  const [selectedGridOT, setSelectedGridOT] = useState<OTRecord | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [detailedPageOT, setDetailedPageOT] = useState<OTRecord | null>(null);

  if (detailedPageOT) {
    return <DetailedOTPage ot={detailedPageOT} onBack={() => setDetailedPageOT(null)} />;
  }

  return (
    <div className="min-h-screen bg-medical-pattern flex flex-col font-sans text-slate-800 relative">
      <Header />
      
      {selectedGridOT && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-in">
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                   <h2 className="text-2xl font-bold text-slate-800">OT Details: {selectedGridOT.id}</h2>
                   <StatusBadge status={selectedGridOT.status} />
                </div>
                <button onClick={() => setSelectedGridOT(null)} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-200">
                   <X size={24} />
                </button>
             </div>
             <div className="overflow-y-auto flex-1">
                <ExpandedRowContent ot={selectedGridOT} />
             </div>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full animate-slide-in">
        <SummaryCards />
        
        {/* Controls Section updated to match image 2 top bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <div className="flex bg-slate-100/50 p-1 rounded-lg w-full md:w-auto overflow-x-auto hide-scrollbar">
              {[
                { label: 'All OTs', count: 26, active: true },
                { label: 'In Surgery', count: 18, active: false },
                { label: 'In Preparation', count: 3, active: false },
                { label: 'Cleaning', count: 2, active: false },
                { label: 'On Hold', count: 1, active: false },
                { label: 'Critical', count: 2, active: false },
              ].map((tab, i) => (
                <button 
                  key={tab.label} 
                  className={`px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-all ${tab.active ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                  {tab.label} <span className={`ml-1 text-xs ${tab.active ? 'text-slate-300' : 'text-slate-400'}`}>({tab.count})</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto px-2">
               <div className="flex items-center gap-2 text-sm text-slate-600 mr-2">
                  <span>Sort by</span>
                  <div className="flex items-center gap-1 border border-slate-200 rounded-md px-3 py-1.5 bg-white cursor-pointer hover:bg-slate-50">
                    <span className="font-medium">OT Number (Low to High)</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
               </div>
               
               <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <LayoutGrid size={18}/>
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <List size={18}/>
                 </button>
               </div>
               
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-semibold transition-colors shadow-sm ml-2">
                 <Filter size={16} /> Filters
               </button>
            </div>
        </div>

        {/* Content area based on toggle */}
        {viewMode === 'grid' ? (
           <OTGridView data={MOCK_DATA} onSelect={setSelectedGridOT} onDetailClick={setDetailedPageOT} />
        ) : (
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-slide-in">
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#f3f8fc] text-[#4a6b8c] border-b border-[#e1eef8]">
                    <tr>
                      <th className="px-4 py-4 font-semibold whitespace-nowrap">OT</th>
                      <th className="px-4 py-4 font-semibold whitespace-nowrap">Status</th>
                      <th className="px-4 py-4 font-semibold">Patient Details</th>
                      <th className="px-4 py-4 font-semibold">Procedure</th>
                      <th className="px-4 py-4 font-semibold text-center whitespace-nowrap">ASA</th>
                      <th className="px-2 py-4 font-semibold text-center text-xs">HR</th>
                      <th className="px-2 py-4 font-semibold text-center text-xs">SpO₂</th>
                      <th className="px-2 py-4 font-semibold text-center text-xs">RR</th>
                      <th className="px-2 py-4 font-semibold text-center text-xs">Temp</th>
                      <th className="px-4 py-4 font-semibold">Alarm</th>
                      <th className="px-4 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_DATA.map((ot) => {
                      const isExpanded = selectedOT?.id === ot.id;
                      return (
                        <React.Fragment key={ot.id}>
                          <tr 
                            className={`transition-colors group cursor-pointer ${isExpanded ? 'bg-blue-50/30' : 'bg-white hover:bg-slate-50'}`} 
                            onClick={() => setSelectedOT(isExpanded ? null : ot)}
                          >
                            <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-blue-600' : '-rotate-90'}`} />
                                <span 
                                  className="text-blue-600 hover:underline cursor-pointer group-hover:text-blue-700"
                                  onClick={(e) => { e.stopPropagation(); setDetailedPageOT(ot); }}
                                  title={`Click to open ${ot.id}`}
                                >
                                  {ot.id}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                               <StatusBadge status={ot.status} />
                            </td>
                            <td className="px-4 py-4">
                              {ot.patient ? (
                                <div>
                                  <div className={`font-bold transition-colors ${isExpanded ? 'text-blue-600' : 'text-slate-800 group-hover:text-[#009ada]'}`}>{ot.patient.name}</div>
                                  <div className="text-xs text-slate-500">{ot.patient.crn} <span className="mx-1">|</span> {ot.patient.age}{ot.patient.gender}</div>
                                </div>
                              ) : <span className="text-slate-400 font-bold">--</span>}
                            </td>
                            <td className="px-4 py-4">
                               {ot.procedure ? (
                                <div>
                                  <div className="font-bold text-slate-800">{ot.procedure.short}</div>
                                  <div className="text-xs text-slate-500 line-clamp-1">{ot.procedure.full}</div>
                                </div>
                              ) : <span className="text-slate-400 font-bold">--</span>}
                            </td>
                            <td className="px-4 py-4 text-center whitespace-nowrap"><ASABadge asa={ot.asa} /></td>
                            
                            <td className="px-2 py-4 text-center whitespace-nowrap"><VitalValue value={ot.vitals.hr} type={Number(ot.vitals.hr) > 100 ? 'red' : undefined} /></td>
                            <td className="px-2 py-4 text-center whitespace-nowrap"><VitalValue value={ot.vitals.spo2} type={Number(ot.vitals.spo2) < 94 ? 'red' : undefined} /></td>
                            <td className="px-2 py-4 text-center whitespace-nowrap"><VitalValue value={ot.vitals.rr} type={Number(ot.vitals.rr) >= 20 ? 'yellow' : undefined} /></td>
                            <td className="px-2 py-4 text-center whitespace-nowrap"><VitalValue value={ot.vitals.temp} /></td>

                            {/* Alarm */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              {ot.alarm.type === 'Critical' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-md text-xs font-bold shadow-sm border border-red-100">
                                  <AlertTriangle size={14} /> {ot.alarm.count} Critical
                                </span>
                              ) : ot.alarm.type === 'Warning' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-bold shadow-sm border border-orange-100">
                                  <AlertTriangle size={14} /> {ot.alarm.count} Warning
                                </span>
                              ) : ot.status === 'In Surgery' || ot.status === 'Preparation' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-bold shadow-sm border border-emerald-100">
                                  <CheckCircle2 size={14} /> No Alarm
                                </span>
                              ) : <span className="text-slate-400 font-bold text-center block w-[80px]">--</span>}
                            </td>
                            
                            {/* Actions */}
                            <td className="px-4 py-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  className={`flex items-center gap-1 px-4 py-1.5 rounded-md font-bold text-sm transition-colors shadow-sm border ${isExpanded ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' : 'bg-white text-blue-500 border-blue-100 hover:bg-blue-50 hover:text-blue-600'}`}
                                  onClick={(e) => { e.stopPropagation(); setSelectedOT(isExpanded ? null : ot); }}
                                >
                                  {isExpanded ? <><ChevronDown size={16} className="rotate-180"/> View Less</> : 'View'}
                                </button>
                                <button className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                              </div>
                            </td>
                          </tr>
                          
                          {/* Expanded Content Area */}
                          {isExpanded && (
                             <tr className="bg-[#f8fbfe]">
                                <td colSpan={11} className="p-0 border-b-2 border-blue-100">
                                   <div className="animate-in slide-in-from-top-2 fade-in duration-200 border-l-4 border-blue-500 m-2 ml-4 p-4 bg-white rounded-xl shadow-sm">
                                      <ExpandedRowContent ot={ot} />
                                   </div>
                                </td>
                             </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
             </div>
           </div>
        )}

      </main>
    </div>
  );
}
