import { Skeleton } from '../../../Components/Skeleton';

const MainDashboardSkeletonPanels = () => (
  <>
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width="22px" height="22px" />
          <Skeleton width="200px" height="16px" />
        </div>
        <Skeleton variant="button" width="60px" height="28px" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#161d2b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width="40px" height="40px" />
              <div className="flex-1 space-y-2">
                <Skeleton width="200px" height="16px" />
                <Skeleton width="100%" height="12px" />
              </div>
            </div>
            <div className="text-right space-y-1">
              <Skeleton width="60px" height="10px" />
              <Skeleton variant="button" width="80px" height="20px" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width="22px" height="22px" />
          <Skeleton width="120px" height="16px" />
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="button"
              width="100%"
              height="60px"
              className="rounded-xl"
            />
          ))}
        </div>
        <Skeleton variant="rectangular" width="100%" height="180px" className="rounded-xl" />
        <Skeleton variant="rectangular" width="100%" height="120px" className="rounded-xl" />
      </div>
    </div>
  </>
);

export default MainDashboardSkeletonPanels;
