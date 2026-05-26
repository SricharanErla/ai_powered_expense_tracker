import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import ChartBlock from '../components/ChartBlock';
import { useApp } from '../context/AppContext';

export default function AnalyticsPage() {
  const { expenses } = useApp();

  return (
    <div className="space-y-8 pb-10">
      <GlassCard>
        <SectionHeading eyebrow="Analytics" title="Visualize spending patterns" description="Category breakdowns, monthly trends, and spend concentration are grouped here for quick review." />
      </GlassCard>
      <ChartBlock expenses={expenses} />
    </div>
  );
}