'use client';

import Link from 'next/link';

interface Props {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color?: string;
}

const STYLES: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  food:       { bg: 'bg-terra-100',  border: 'border-terra-400',  text: 'text-terra-800',  hover: 'hover:bg-terra-200' },
  shelter:    { bg: 'bg-sky-100',    border: 'border-sky-400',    text: 'text-sky-900',    hover: 'hover:bg-sky-200' },
  education:  { bg: 'bg-amber-100',  border: 'border-amber-400',  text: 'text-amber-900',  hover: 'hover:bg-amber-200' },
  jobs:       { bg: 'bg-forest-100', border: 'border-forest-400', text: 'text-forest-800', hover: 'hover:bg-green-100' },
  healthcare: { bg: 'bg-rose-100',   border: 'border-rose-400',   text: 'text-rose-900',   hover: 'hover:bg-rose-200' },
};

export default function CategoryCard({ href, emoji, title, desc, color = 'food' }: Props) {
  const style = STYLES[color] ?? STYLES.food;

  return (
    <Link
      href={href}
      className={`block ${style.bg} ${style.hover} border-2 ${style.border} ${style.text} rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
    >
      <div className="text-4xl mb-3" aria-hidden="true">{emoji}</div>
      <h3 className="font-heading text-xl font-bold mb-1.5 leading-tight">{title}</h3>
      <p className="text-sm leading-snug opacity-80">{desc}</p>
      <div className="mt-3 text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">
        See resources →
      </div>
    </Link>
  );
}
