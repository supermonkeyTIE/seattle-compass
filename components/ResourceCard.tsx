'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Resource } from '@/lib/types';

interface Props {
  resource: Resource;
}

const TAG_COLORS: Record<string, string> = {
  'No ID Required': 'bg-green-100 text-green-800 border-green-300',
  'No se requiere identificación': 'bg-green-100 text-green-800 border-green-300',
  'Walk-Ins Welcome': 'bg-blue-100 text-blue-800 border-blue-300',
  'Sin cita previa': 'bg-blue-100 text-blue-800 border-blue-300',
  'Spanish Services': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Multilingual': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Hot Meals': 'bg-orange-100 text-orange-800 border-orange-300',
  'Free': 'bg-green-100 text-green-800 border-green-300',
  'Free Training': 'bg-green-100 text-green-800 border-green-300',
  '24/7': 'bg-purple-100 text-purple-800 border-purple-300',
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-slate-100 text-slate-700 border-slate-300';
}

export default function ResourceCard({ resource }: Props) {
  const { lang, tr } = useLanguage();
  const desc = lang === 'es' && resource.description_es ? resource.description_es : resource.description;
  const intake = lang === 'es' && resource.intakeProcess_es ? resource.intakeProcess_es : resource.intakeProcess;

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(resource.address)}`;

  return (
    <article className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header band */}
      <div className="bg-blue-950 px-5 py-4">
        <h3 className="text-white text-xl font-bold leading-tight">{resource.name}</h3>
        <p className="text-blue-300 text-sm mt-0.5">{resource.neighborhood}</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span
                key={tag}
                className={`inline-block px-2.5 py-0.5 rounded-full text-sm font-medium border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-slate-700 text-base leading-relaxed">{desc}</p>

        {/* Contact info */}
        <dl className="space-y-2 text-base">
          <div className="flex items-start gap-2">
            <dt className="font-semibold text-slate-500 w-20 shrink-0">{tr.resource.address}</dt>
            <dd className="text-slate-800">{resource.address}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="font-semibold text-slate-500 w-20 shrink-0">{tr.resource.phone}</dt>
            <dd>
              <a href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`} className="text-blue-700 hover:underline font-semibold">
                {resource.phone}
              </a>
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="font-semibold text-slate-500 w-20 shrink-0">{tr.resource.hours}</dt>
            <dd className="text-slate-800">{resource.hours}</dd>
          </div>
        </dl>

        {/* Services */}
        {resource.services && resource.services.length > 0 && (
          <div>
            <p className="font-semibold text-slate-600 text-sm mb-1.5">{tr.resource.services}</p>
            <ul className="flex flex-wrap gap-1.5">
              {resource.services.map(s => (
                <li key={s} className="text-sm bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Intake process */}
        {intake && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-amber-800 mb-0.5">{tr.resource.intake}</p>
            <p className="text-sm text-amber-700">{intake}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`}
            className="flex-1 min-w-[120px] bg-blue-700 hover:bg-blue-800 text-white text-center font-semibold py-2.5 px-4 rounded-xl transition-colors text-base"
          >
            📞 {tr.resource.callNow}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[120px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-semibold py-2.5 px-4 rounded-xl transition-colors text-base border border-slate-300"
          >
            📍 {tr.resource.getDirections}
          </a>
        </div>

        {/* Website */}
        {resource.website && (
          <a
            href={`https://${resource.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-blue-600 hover:underline text-sm"
          >
            {resource.website} ↗
          </a>
        )}
      </div>
    </article>
  );
}
