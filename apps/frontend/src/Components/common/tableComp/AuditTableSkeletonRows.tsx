import { TableCell, TableRow } from '@heroui/react';
import { Skeleton } from '../../Skeleton';

const AuditTableSkeletonRows = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="space-y-1">
            <Skeleton isLoaded={false} width="140px" height="16px" />
            <Skeleton isLoaded={false} width="80px" height="12px" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton isLoaded={false} width="100px" height="28px" className="rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton isLoaded={false} width="120px" height="16px" />
        </TableCell>
        <TableCell>
          <Skeleton isLoaded={false} width="100px" height="16px" />
        </TableCell>
        <TableCell>
          <div className="space-y-1">
            <Skeleton isLoaded={false} width="80px" height="16px" />
            <Skeleton isLoaded={false} width="100px" height="10px" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton isLoaded={false} width="80px" height="28px" className="rounded-full" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default AuditTableSkeletonRows;
