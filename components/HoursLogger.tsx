'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LoggedHours } from '@/lib/types';
import partnerOrgs from '@/data/partner-organizations.json';

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function HoursLogger() {
  const { tr } = useLanguage();
  const [logs, setLogs] = useState<LoggedHours[]>([]);
  const [org, setOrg] = useState('');
  const [customOrg, setCustomOrg] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [creditType, setCreditType] = useState<'general' | 'high-school'>('general');
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem('sc-hours');
    if (stored) setLogs(JSON.parse(stored));
  }, []);

  function saveLogs(next: LoggedHours[]) {
    setLogs(next);
    localStorage.setItem('sc-hours', JSON.stringify(next));
  }

  function validate() {
    const e: Record<string, string> = {};
    const orgValue = org === '__custom__' ? customOrg : org;
    if (!orgValue.trim()) e.org = 'Required';
    if (!hours || isNaN(Number(hours)) || Number(hours) <= 0) e.hours = 'Enter a valid number of hours';
    if (!description.trim()) e.description = 'Required';
    if (!date) e.date = 'Required';
    if (creditType === 'high-school' && !supervisorName.trim()) e.supervisorName = 'Required for high school credit';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const orgValue = org === '__custom__' ? customOrg.trim() : org;
    const entry: LoggedHours = {
      id: genId(),
      organization: orgValue,
      date,
      hours: Number(hours),
      description: description.trim(),
      supervisorName: supervisorName.trim() || undefined,
      supervisorEmail: supervisorEmail.trim() || undefined,
      creditType,
      loggedAt: new Date().toISOString(),
    };

    saveLogs([...logs, entry]);
    setOrg('');
    setCustomOrg('');
    setHours('');
    setDescription('');
    setSupervisorName('');
    setSupervisorEmail('');
    setCreditType('general');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function deleteLog(id: string) {
    saveLogs(logs.filter(l => l.id !== id));
  }

  function handlePrint() {
    window.print();
  }

  const totalHours = logs.reduce((s, l) => s + l.hours, 0);
  const hsHours = logs.filter(l => l.creditType === 'high-school').reduce((s, l) => s + l.hours, 0);

  const inputClass = (field: string) =>
    `w-full border-2 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field] ? 'border-red-500' : 'border-slate-300'}`;

  return (
    <div className="space-y-10">
      {/* Form */}
      <section aria-labelledby="log-form-title">
        <h2 id="log-form-title" className="text-2xl font-bold text-slate-900 mb-6">{tr.hours.form.title}</h2>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-5">
          {/* Credit type */}
          <div>
            <p className="text-base font-semibold text-slate-700 mb-2">{tr.hours.form.creditType}</p>
            <div className="flex gap-4">
              {(['general', 'high-school'] as const).map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="creditType"
                    value={type}
                    checked={creditType === type}
                    onChange={() => setCreditType(type)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-base font-medium text-slate-800">
                    {type === 'high-school' ? `🎓 ${tr.hours.form.highSchool}` : `📋 ${tr.hours.form.general}`}
                  </span>
                </label>
              ))}
            </div>
            {creditType === 'high-school' && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                ℹ️ {tr.hours.form.creditNote}
              </p>
            )}
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="log-org" className="block text-base font-semibold text-slate-700 mb-1">
              {tr.hours.form.org} <span className="text-red-600">*</span>
            </label>
            <select
              id="log-org"
              value={org}
              onChange={e => setOrg(e.target.value)}
              className={inputClass('org')}
            >
              <option value="">{tr.hours.form.orgPlaceholder}</option>
              {partnerOrgs.map(o => (
                <option key={o.id} value={o.name}>{o.name}</option>
              ))}
              <option value="__custom__">Other organization...</option>
            </select>
            {org === '__custom__' && (
              <input
                type="text"
                value={customOrg}
                onChange={e => setCustomOrg(e.target.value)}
                placeholder="Enter organization name"
                className={`mt-2 ${inputClass('org')}`}
              />
            )}
            {errors.org && <p className="text-red-600 text-sm mt-1">{errors.org}</p>}
          </div>

          {/* Date and Hours (side by side on larger screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="log-date" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.hours.form.date} <span className="text-red-600">*</span>
              </label>
              <input
                id="log-date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className={inputClass('date')}
              />
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="log-hours" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.hours.form.hours} <span className="text-red-600">*</span>
              </label>
              <input
                id="log-hours"
                type="number"
                value={hours}
                onChange={e => setHours(e.target.value)}
                placeholder={tr.hours.form.hoursPlaceholder}
                min="0.25"
                max="24"
                step="0.25"
                className={inputClass('hours')}
              />
              {errors.hours && <p className="text-red-600 text-sm mt-1">{errors.hours}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="log-desc" className="block text-base font-semibold text-slate-700 mb-1">
              {tr.hours.form.description} <span className="text-red-600">*</span>
            </label>
            <textarea
              id="log-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={tr.hours.form.descPlaceholder}
              rows={3}
              className={`${inputClass('description')} resize-none`}
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Supervisor (for HS credit) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity ${creditType === 'high-school' ? 'opacity-100' : 'opacity-50'}`}>
            <div>
              <label htmlFor="log-sup-name" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.hours.form.supervisorName}{creditType === 'high-school' && <span className="text-red-600"> *</span>}
              </label>
              <input
                id="log-sup-name"
                type="text"
                value={supervisorName}
                onChange={e => setSupervisorName(e.target.value)}
                placeholder={tr.hours.form.supervisorNamePlaceholder}
                className={inputClass('supervisorName')}
              />
              {errors.supervisorName && <p className="text-red-600 text-sm mt-1">{errors.supervisorName}</p>}
            </div>
            <div>
              <label htmlFor="log-sup-email" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.hours.form.supervisorEmail}
              </label>
              <input
                id="log-sup-email"
                type="email"
                value={supervisorEmail}
                onChange={e => setSupervisorEmail(e.target.value)}
                placeholder={tr.hours.form.supervisorEmailPlaceholder}
                className={inputClass('supervisorEmail')}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 px-6 rounded-xl text-lg transition-colors"
          >
            ✅ {tr.hours.form.submit}
          </button>

          {saved && (
            <p className="text-center text-green-700 font-semibold text-base animate-pulse">
              Hours saved successfully!
            </p>
          )}
        </form>
      </section>

      {/* History */}
      <section aria-labelledby="log-history-title" className="print-section">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2 id="log-history-title" className="text-2xl font-bold text-slate-900">{tr.hours.history.title}</h2>
          {logs.length > 0 && (
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-xl text-base transition-colors print:hidden"
            >
              🖨️ {tr.hours.history.print}
            </button>
          )}
        </div>

        {/* Totals */}
        {logs.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-700 text-white rounded-2xl p-5 text-center">
              <div className="text-4xl font-extrabold">{totalHours}</div>
              <div className="text-green-200 text-sm mt-1">{tr.hours.history.total}</div>
            </div>
            <div className="bg-indigo-700 text-white rounded-2xl p-5 text-center">
              <div className="text-4xl font-extrabold">{hsHours}</div>
              <div className="text-indigo-200 text-sm mt-1">{tr.hours.history.hsTotal}</div>
            </div>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-lg">
            {tr.hours.history.noHours}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-left">
                    <th className="px-4 py-3 font-semibold">{tr.hours.history.date}</th>
                    <th className="px-4 py-3 font-semibold">{tr.hours.history.org}</th>
                    <th className="px-4 py-3 font-semibold">{tr.hours.history.hrs}</th>
                    <th className="px-4 py-3 font-semibold">{tr.hours.history.activity}</th>
                    <th className="px-4 py-3 font-semibold print:hidden">Type</th>
                    <th className="px-4 py-3 font-semibold print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...logs].reverse().map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-800">{log.date}</td>
                      <td className="px-4 py-3 text-slate-800 font-medium">{log.organization}</td>
                      <td className="px-4 py-3 text-center font-bold text-green-700">{log.hours}</td>
                      <td className="px-4 py-3 text-slate-700 max-w-[200px]">
                        <div>{log.description}</div>
                        {log.supervisorName && (
                          <div className="text-xs text-slate-500 mt-0.5">Supervisor: {log.supervisorName}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 print:hidden">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${log.creditType === 'high-school' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                          {log.creditType === 'high-school' ? '🎓 HS' : '📋'}
                        </span>
                      </td>
                      <td className="px-4 py-3 print:hidden">
                        <button
                          onClick={() => deleteLog(log.id)}
                          aria-label={`Delete entry for ${log.date}`}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          {tr.hours.history.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Print-only header */}
        <div className="hidden print:block mt-6 text-center text-slate-500 text-sm">
          <p>{tr.hours.history.printNote} · {new Date().toLocaleDateString()}</p>
        </div>
      </section>
    </div>
  );
}
