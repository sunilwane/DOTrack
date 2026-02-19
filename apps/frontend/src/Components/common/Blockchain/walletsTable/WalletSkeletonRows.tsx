import { Skeleton } from '../../../Skeleton';

interface WalletSkeletonRowsProps {
  count: number;
}

export const WalletSkeletonRows = ({ count }: WalletSkeletonRowsProps) =>
  Array.from({ length: count }).map((_, index) => (
    <tr key={`wallet-skeleton-${index}`} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
      <td className="whitespace-nowrap px-6 py-4">
        <Skeleton isLoaded={false} width="120px" height="20px" className="rounded" />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-2">
          <Skeleton isLoaded={false} width="24px" height="24px" className="rounded-full" />
          <Skeleton isLoaded={false} width="80px" height="16px" />
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <Skeleton isLoaded={false} width="60px" height="24px" className="rounded-full" />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <Skeleton isLoaded={false} width="60px" height="32px" className="rounded-lg" />
        </div>
      </td>
    </tr>
  ));
