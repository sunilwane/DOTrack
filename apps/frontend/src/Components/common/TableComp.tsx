import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Card,
    CardBody
} from "@heroui/react";

import type { AuditEntry } from "types";

interface AuditTableProps {
    title: string;
    data: AuditEntry[];
}

import { Copy, ExternalLink } from "lucide-react";

const TableComp = ({ title, data }: AuditTableProps) => {
    const getEventChipClass = (event: string) => {
        const e = event.toUpperCase();
        if (/DEPLOYMENT/.test(e)) return "bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30";
        if (/APPROVAL/.test(e)) return "bg-nexus-purple/20 text-nexus-purple border border-nexus-purple/30";
        return "bg-slate-700/30 text-slate-400 border border-slate-700/40";
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Card className="bg-nexus-card border border-nexus-border shadow-none" radius="none">
            <CardBody>
                <h3 className="font-bold mb-4 text-lg">
                    {title}
                </h3>

                <Table
                    aria-label="Audit Table"
                    removeWrapper
                    classNames={{
                        th: "bg-nexus-bg text-gray-400 font-bold border-b border-nexus-border text-xs",
                        td: "text-sm text-white py-4",
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
                        {data.map((row) => (
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
                                            onClick={() => copyToClipboard(row.wallet)}
                                            className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center"
                                        >
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </TableCell>

                                <TableCell className="font-mono text-purple-400">
                                    {row.ipfs}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5 text-blue-400 font-bold hover:text-blue-300 cursor-pointer transition-colors group/link">
                                            <span>{row.proof}</span>
                                            <ExternalLink size={12} className="opacity-70 group-hover/link:opacity-100" />
                                        </div>
                                        {row.proofHash && (
                                            <span className="text-[10px] text-slate-500 font-mono">
                                                {row.proofHash}
                                            </span>
                                        )}
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
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default TableComp;
