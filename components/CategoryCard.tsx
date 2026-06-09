'use client';

import Link from 'next/link';

interface Props {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color?: string;
}

const COLOR_MAP: Record<string, string> = {
  food: 'from-orange-500 to-red-600',
  shelter: 'from-blue-600 to-blue-800',
  education: 'from-violet-600 to-purple-800',
  jobs: 'from-emerald-600 to-green-800',
  healthcare: 'from-rose-500 to-pink-700',
};

export default function CategoryCard({ href, emoji, title, desc, color = 'food' }: Props) {
  const gradient = COLOR_MAP[color] ?? 'from-slate-600 to-slate-800';

  return (
    <Link
      href={href}
      className={`block bg-gradient-to-br ${gradient} text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group`}
    >
      <div className="text-5xl mb-3" aria-hidden="true">{emoji}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-white/85 text-base leading-snug">{desc}</p>
      <div className="mt-4 text-white/70 group-hover:text-white font-semibold text-sm transition-colors">
        View resources →
      </div>
    </Link>
  );
}
