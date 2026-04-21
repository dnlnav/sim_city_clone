import { useActions } from "../../state/useActions";

const InfoOverlay = () => {
  const { selectedTile } = useActions();
  if (!selectedTile) return null;

  return (
    <div
      id="info-overlay"
      className="absolute top-20 right-6 z-10 min-w-48 border-4 border-slate-900 bg-slate-100/85 px-5 py-3 shadow-inner backdrop-blur-sm"
    >
      <dl className="space-y-2 text-sm font-bold tracking-wide text-slate-900">
        <div className="flex justify-between gap-6">
          <dt className="text-slate-600">Type</dt>
          <dd className="uppercase">{selectedTile.type}</dd>
        </div>
        {selectedTile.height && (
          <div className="flex justify-between gap-6">
            <dt className="text-slate-600">Height</dt>
            <dd>{selectedTile.height}</dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default InfoOverlay;
