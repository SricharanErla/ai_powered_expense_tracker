import { Lightbulb, ShieldAlert, WandSparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { useApp } from '../context/AppContext';

export default function InsightsPage() {
  const { insights, metrics } = useApp();

  const insightCards = [
    { icon: WandSparkles, title: 'Spending summary', text: insights[0] },
    { icon: ShieldAlert, title: 'Overspending watch', text: insights[1] },
    { icon: Lightbulb, title: 'Smart suggestion', text: insights[2] }
  ];

  return (
    <div className="space-y-8 pb-10">
      <GlassCard>
        <SectionHeading eyebrow="AI Insights" title="Heuristic financial intelligence" description="These recommendations are generated from your transaction patterns and task data." />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {insightCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-white/8 bg-white/5 p-5">
              <Icon className="h-6 w-6 text-sky-300" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading eyebrow="Budget planning" title="Actionable guardrails" description="Use these numbers to guide budget caps and savings goals." />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm text-slate-400">Monthly spend</p>
            <p className="mt-2 text-3xl font-semibold text-white">${metrics.monthlyExpenses.toFixed(0)}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm text-slate-400">Recommended cap</p>
            <p className="mt-2 text-3xl font-semibold text-white">${Math.round(metrics.monthlyExpenses * 0.9).toFixed(0)}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm text-slate-400">Savings target</p>
            <p className="mt-2 text-3xl font-semibold text-white">${Math.round(metrics.income * 0.2).toFixed(0)}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}