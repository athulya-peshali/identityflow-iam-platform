export default function Skeleton({ className = '' }) {
    return (
        <div
            className={`bg-slate-300/40 animate-pulse rounded-[10px] ${className}`}
            aria-hidden="true"
        />
    );
}