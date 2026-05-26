import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('Midnight');

  return (
    <div className="space-y-8 pb-10">
      <GlassCard>
        <SectionHeading eyebrow="Settings" title="Workspace preferences" description="Adjust local presentation settings and keep the experience personal without authentication." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-slate-400">Currency</span>
            <select value={currency} onChange={(event) => setCurrency(event.target.value)} className="w-full rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-400">Theme</span>
            <select value={theme} onChange={(event) => setTheme(event.target.value)} className="w-full rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white">
              <option>Midnight</option>
              <option>Ocean</option>
              <option>Forest</option>
            </select>
          </label>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading eyebrow="Deployment" title="Vercel and Neon configuration" description="Use the root .env file for local development and Vercel environment variables for production." />
        <div className="mt-6 rounded-3xl bg-white/5 p-5 text-sm leading-7 text-slate-300">
          <p>Database: Neon PostgreSQL</p>
          <p>Frontend build output: frontend/dist</p>
          <p>Serverless functions: api/*</p>
          <p>API base URL: /api</p>
          <p>Currency preference: {currency}</p>
          <p>Theme: {theme}</p>
        </div>
      </GlassCard>
    </div>
  );
}