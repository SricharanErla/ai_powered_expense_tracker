import GlassCard from './GlassCard';

export default function StatCard({ label, value, description, icon: Icon, accent = 'from-blue-500 to-cyan-400' }) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${accent} p-3 text-slate-950 shadow-lg`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </GlassCard>
  );
}