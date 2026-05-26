import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, LineChart, CalendarCheck2 } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'AI insights', text: 'Automated financial summaries and actionable guidance.' },
  { icon: ShieldCheck, title: 'Serverless ready', text: 'Deploy cleanly to Vercel with Neon PostgreSQL.' },
  { icon: LineChart, title: 'Analytics first', text: 'Track expenses, trends, and category behavior.' },
  { icon: CalendarCheck2, title: 'Task tracking', text: 'Manage todos alongside spending in one workspace.' }
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-200">
            Modern fintech dashboard
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Expense tracking with AI clarity and premium dashboard design.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Manage expenses, todos, analytics, and insights in a polished serverless app built for quick deployment and real-world scalability.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.01]">
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/expenses" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
              Explore CRUD
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-strong rounded-3xl p-6 shadow-glow"
            >
              <Icon className="h-6 w-6 text-sky-300" />
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}