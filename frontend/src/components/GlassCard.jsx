import { classNames } from '../utils/format';

export default function GlassCard({ className = '', children }) {
  return <div className={classNames('glass-strong rounded-3xl p-5 shadow-glow', className)}>{children}</div>;
}