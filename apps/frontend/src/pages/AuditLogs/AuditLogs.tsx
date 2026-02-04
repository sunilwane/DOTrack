import * as React from "react";
import {
    Card,
    CardBody,
    Button,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";
import Pagination from "../../Components/common/Pagination";
import StatsGrid, { StatItem } from "../../Components/common/StatsGrid";
import AuditTable, { AuditEntry } from "../../Components/common/TableComp";

import { Rocket, Shield, Database } from "lucide-react";

const AuditDashboard: React.FC = () => {
    const stats: StatItem[] = [
        {
            label: "Project Deployments",
            value: "1,248",
            chipText: "+12%",
            chipType: "success",
            icon: <Rocket size={60} strokeWidth={1.5} />
        },
        {
            label: "On-Chain Proofs",
            value: "1,246",
            chipText: "100% Valid",
            chipType: "slate",
            icon: <Shield size={60} strokeWidth={1.5} />
        },
        {
            label: "IPFS Data Anchored",
            value: "70.2 GB",
            chipText: "Encrypted",
            chipType: "purple",
            icon: <Database size={60} strokeWidth={1.5} />
        },
    ];

    const auditData: AuditEntry[] = [
        {
            id: "1",
            timestamp: "Oct 24, 2023 · 14:20",
            block: "#18234901",
            event: "DEPLOYMENT TRIGGERED",
            wallet: "0x71C...a29",
            ipfs: "QmXoyp...",
            proof: "Etherscan",
            proofHash: "0x4a92...11e9",
            status: "VERIFIED"
        },
        {
            id: "2",
            timestamp: "Oct 24, 2023 · 12:45",
            block: "#18234885",
            event: "APPROVAL SIGNED",
            wallet: "0x483...f1b",
            ipfs: "QmZ4tk...",
            proof: "Etherscan",
            proofHash: "0x9d21...fa02",
            status: "VERIFIED"
        },
        {
            id: "3",
            timestamp: "Oct 23, 2023 · 21:05",
            block: "#18234720",
            event: "REGISTRY LINKED",
            wallet: "0x123...bc4",
            ipfs: "QmWvba...",
            proof: "Polkascan",
            proofHash: "0xcc41...82b3",
            status: "VERIFIED"
        },
    ];

    return (
        <div className="p-2 sm:p-3 lg:p-4 space-y-8 bg-nexus-bg text-white min-h-screen">
            <div className="max-w-[1400px] mx-auto space-y-5">
                <div>
                    <h1 className="text-3xl font-bold mb-1">
                        Deployment Audit History
                    </h1>
                    <p className="text-xs text-gray-400">
                        Comprehensive project-specific audit view with immutable blockchain evidence.
                    </p>
                </div>

                <StatsGrid stats={stats} />

                <div className="flex justify-end">
                    <Button color="success" variant="flat">
                        Verify All Records
                    </Button>
                </div>

                <AuditTable title="On-Chain Deployment Proofs" data={auditData} />

                <Pagination
                    totalItems={1248}
                    itemsPerPage={25}
                    currentPage={1}
                />
            </div>
        </div>
    );
};

export default AuditDashboard;
