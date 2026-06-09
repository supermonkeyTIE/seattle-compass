'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Resource } from '@/lib/types';

interface Props {
  resource: Resource;
  accentColor?: string;
}

const TAG_STYLES: Record<string, string> = {
  'No ID Required': 'bg-forest-100 text-forest-700 border-forest-400',
  'No se requiere identificación': 'bg-forest-100 text-forest-700 border-forest-400',
  'Walk-Ins Welcome': 'bg-cream-200 text-warm-700 border-warm-600',
  'Sin cita previa': 'bg-cream-200 text-warm-700 border-warm-600',
  'Spanish Services': 'bg-yellow-100 text-yellow-800 border-yellow-400',
  'Multilingual': 'bg-yellow-100 text-yellow-800 border-yellow-400',
  'Hot Meals': 'bg-terra-100 text-terra-700 border-terra-400',
  'Free': 'bg-forest-100 text-forest-700 border-forest-400',
  'Free Training': 'bg-forest-100 text-forest-700 border-forest-400',
  '24/7': 'bg-purple-100 text-purple-700 border-purple-400',
  'Daily': 'bg-terra-100 text-terra-700 border-terra-400',
};

function getTagStyle(tag: string) {
  return TAG_STYLES[tag] ?? 'bg-warm-100 text-warm-700 border-warm-400';
}

export default function ResourceCard({ resource, accentColor = 'border-terra-500' }: Props) {
  const { lang, tr } = useLanguage();
  const desc = lang === 'es' && resource.description_es ? resource.description_es : resource.description;
  const intake = lang === 'es' && resource.intakeProcess_es ? resource.intakeProcess_es : resource.intakeProcess;

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(resource.address)}`;

  return (
    <article className={`bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden hover:shadow-md transition-shadow border-l-4 ${accentColor}`}>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-heading text-xl font-bold text-warm-900 leading-tight">{resource.name}</h3>
        </div>
        <p className="text-warm-600 text-sm font-medium">{resource.neighborhood}</p>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.map(tag => (
              <span
                key={tag}
                className={`inline-block px-2.5 py-0.5 rounded-full text-sm font-semibold border ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-warm-700 text-base leading-relaxed">{desc}</p>

        {/* Contact info */}
        <dl className="space-y-2 text-base">
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-tight mt-0.5" aria-hidden="true">📍</span>
            <dd className="text-warm-800">{resource.address}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-tight mt-0.5" aria-hidden="true">📞</span>
            <dd>
              <a href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`} className="text-terra-600 hover:text-terra-800 hover:underline font-semibold">
                {resource.phone}
              </a>
            </dd>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-tight mt-0.5" aria-hidden="true">🕐</span>
            <dd className="text-warm-800">{resource.hours}</dd>
          </div>
        </dl>

        {/* Services */}
        {resource.services && resource.services.length > 0 && (
          <div>
            <p className="font-semibold text-warm-600 text-sm mb-1.5">{tr.resource.services}</p>
            <ul className="flex flex-wrap gap-1.5">
              {resource.services.map(s => (
                <li key={s} className="text-sm bg-cream-100 text-warm-700 border border-cream-200 px-2.5 py-0.5 rounded-full">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Intake process */}
        {intake && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-4 py-3">
            <p className="text-sm font-bold text-amber-800 mb-0.5">{tr.resource.intake}</p>
            <p className="text-sm text-amber-700 leading-snug">{intake}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`}
            className="flex-1 min-w-[120px] bg-terra-600 hover:bg-terra-700 text-white text-center font-bold py-2.5 px-4 rounded-xl transition-colors text-base"
          >
            {tr.resource.callNow}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[120px] bg-warm-100 hover:bg-warm-200 text-warm-800 text-center font-semibold py-2.5 px-4 rounded-xl transition-colors text-base border border-warm-300"
          >
            {tr.resource.getDirections}
          </a>
        </div>

        {/* Website */}
        {resource.website && (
          <a
            href={`https://${resource.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-terra-600 hover:text-terra-800 hover:underline text-sm"
          >
            {resource.website} ↗
          </a>
        )}
      </div>
    </article>
  );
}
