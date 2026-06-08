import { Chip, TableCell, TableRow } from '@heroui/react';
import { Copy, ExternalLink } from 'lucide-react';
import type { AuditEntry } from 'types';
import { getEventChipClass } from './tableUtils';

interface AuditTableDataRowProps {
  row: AuditEntry;
  onCopyToClipboard: (text: string) => void;
}

const AuditTableDataRow = ({ row, onCopyToClipboard }: AuditTableDataRowProps) => (
  <TableRow key={row.id}>
    <TableCell>
      <div>
        <p>{row.timestamp}</p>
        <p className="text-xs text-gray-500">{row.block}</p>
      </div>
    </TableCell>

    <TableCell>
      <Chip
        size="sm"
        variant="flat"
        className={`${getEventChipClass(row.event)} font-bold text-[10px] uppercase h-7`}
      >
        {row.event}
      </Chip>
    </TableCell>

    <TableCell>
      <div className="flex items-center gap-2 group">
        <span className="font-mono">{row.wallet}</span>
        <button
          onClick={() => onCopyToClipboard(row.wallet)}
          className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center"
        >
          <Copy size={14} />
        </button>
      </div>
    </TableCell>

    <TableCell className="font-mono text-purple-400">{row.ipfs}</TableCell>

    <TableCell>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-blue-400 font-bold hover:text-blue-300 cursor-pointer transition-colors group/link">
          <span>{row.proof}</span>
          <ExternalLink size={12} className="opacity-70 group-hover/link:opacity-100" />
        </div>
        {row.proofHash && <span className="text-[10px] text-slate-500 font-mono">{row.proofHash}</span>}
      </div>
    </TableCell>

    <TableCell>
      <Chip
        size="sm"
        variant="flat"
        className="bg-nexus-success/20 text-nexus-success border border-nexus-success/30 font-bold text-[10px] uppercase h-7"
      >
        <div className="flex items-center gap-1 px-1">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          {row.status}
        </div>
      </Chip>
    </TableCell>
  </TableRow>
);

export default AuditTableDataRow;
