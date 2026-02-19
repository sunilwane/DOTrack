import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from '@heroui/react';
import type { AuditEntry } from 'types';
import AuditTableDataRow from './tableComp/AuditTableDataRow';
import AuditTableSkeletonRows from './tableComp/AuditTableSkeletonRows';

interface AuditTableProps {
  title: string;
  data: AuditEntry[];
  isLoading?: boolean;
}

const TableComp = ({ title, data, isLoading }: AuditTableProps) => {
  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text);
  };

  return (
    <Card className="bg-nexus-card border border-nexus-border shadow-none" radius="none">
      <CardBody>
        <h3 className="font-bold mb-4 text-lg">{title}</h3>

        <Table
          aria-label="Audit Table"
          removeWrapper
          classNames={{
            th: 'bg-nexus-bg text-gray-400 font-bold border-b border-nexus-border text-xs',
            td: 'text-sm text-white py-4',
          }}
        >
          <TableHeader>
            <TableColumn>TIME / BLOCK</TableColumn>
            <TableColumn>EVENT</TableColumn>
            <TableColumn>WALLET</TableColumn>
            <TableColumn>IPFS</TableColumn>
            <TableColumn>PROOF</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <AuditTableSkeletonRows />
            ) : (
              data.map((row) => (
                <AuditTableDataRow key={row.id} row={row} onCopyToClipboard={copyToClipboard} />
              ))
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TableComp;
