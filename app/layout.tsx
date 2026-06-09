import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import EmergencyBanner from '@/components/EmergencyBanner';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | Seattle Compass',
    default: 'Seattle Compass — Help & Volunteering in Seattle',
  },
  description: 'Seattle Compass connects people in need with free local resources — food, shelter, healthcare, education, and jobs — and connects volunteers with community organizations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
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
          <footer className="bg-blue-950 text-white py-10 px-4 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🧭</span>
                  <span className="text-xl font-bold">Seattle Compass</span>
                </div>
                <p className="text-blue-300 text-sm leading-relaxed">
                  Connecting people in need with free local resources, and connecting volunteers with community organizations.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Emergency</h3>
                <ul className="space-y-1 text-blue-300 text-base">
                  <li><a href="tel:911" className="hover:text-white">🚨 Emergency: 911</a></li>
                  <li><a href="tel:211" className="hover:text-white">📞 Crisis & Resources: 211</a></li>
                  <li><a href="tel:988" className="hover:text-white">💙 Mental Health Crisis: 988</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-1 text-blue-300 text-base">
                  <li><a href="/find-help" className="hover:text-white">Find Help</a></li>
                  <li><a href="/volunteer" className="hover:text-white">Volunteer</a></li>
                  <li><a href="/volunteer/hours" className="hover:text-white">Log Hours</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-6xl mx-auto border-t border-blue-800 mt-8 pt-4 text-blue-400 text-sm text-center">
              © 2024 Seattle Compass · Free to use · All resources verified to the best of our ability
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
