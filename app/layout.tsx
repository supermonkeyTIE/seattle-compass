import type { Metadata } from 'next';
import { Lora, Nunito } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import EmergencyBanner from '@/components/EmergencyBanner';
import Navigation from '@/components/Navigation';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Seattle Compass',
    default: 'Seattle Compass — Help & Community in Seattle',
  },
  description: 'A free guide to food, shelter, healthcare, jobs, and volunteering in Seattle — made by neighbors, for neighbors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50">
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div className="emergency-banner sticky top-0 z-40">
            <EmergencyBanner />
          </div>
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>

          <footer className="bg-warm-900 text-warm-100 py-12 px-4 mt-auto">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl" aria-hidden="true">🧭</span>
                  <span className="font-heading text-xl font-bold text-white">Seattle Compass</span>
                </div>
                <p className="text-warm-200 text-base leading-relaxed">
                  A community-made guide to help and opportunity in Seattle. Free to use, always.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-3">If you need help now</h3>
                <ul className="space-y-2 text-warm-200 text-base">
                  <li><a href="tel:911" className="hover:text-white transition-colors">🚨 Emergency — call 911</a></li>
                  <li><a href="tel:211" className="hover:text-white transition-colors">📞 Food, shelter, crisis — call 211</a></li>
                  <li><a href="tel:988" className="hover:text-white transition-colors">💙 Mental health crisis — call 988</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-3">Explore</h3>
                <ul className="space-y-2 text-warm-200 text-base">
                  <li><a href="/find-help" className="hover:text-white transition-colors">Find help near you</a></li>
                  <li><a href="/volunteer" className="hover:text-white transition-colors">Volunteer in Seattle</a></li>
                  <li><a href="/volunteer/hours" className="hover:text-white transition-colors">Log volunteer hours</a></li>
                  <li><a href="/volunteer/organizations" className="hover:text-white transition-colors">Meet our partners</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-5xl mx-auto border-t border-warm-700 mt-10 pt-5 text-warm-500 text-sm text-center">
              Made with care in Seattle · Free to use · Resources verified to the best of our ability
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
