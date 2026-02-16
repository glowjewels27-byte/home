export default function SkeletonCard() {
  return (
    <div className="space-y-3">
      <div className="h-64 w-full rounded-xl skeleton"></div>
      <div className="h-4 w-24 skeleton rounded"></div>
      <div className="h-5 w-3/4 skeleton rounded"></div>
      <div className="h-4 w-20 skeleton rounded"></div>
    </div>
  );
}
