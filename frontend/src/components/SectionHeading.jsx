export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}