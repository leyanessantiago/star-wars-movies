import { FC } from "react";

interface SkeletonLoadingProps {
  grids?: number
}

export const SkeletonLoading: FC<SkeletonLoadingProps> = ({ grids = 2 }) => {
  const renderGrids = () => {
    const elements = [];
    for (let i = 0; i < grids; i++) {
      elements.push((
        <div key={`skeleton-grid-${i}`} className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      ));
    }

    return elements;
  }

  return (
    <div className="animate-pulse flex space-x-4 w-72">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        {renderGrids()}
      </div>
    </div>
  );
};
