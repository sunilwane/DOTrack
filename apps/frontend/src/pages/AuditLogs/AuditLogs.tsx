import * as React from "react";
import { Button } from "../../Components/common/Button";
import Pagination from "../../Components/common/Pagination";
import StatsGrid from "../../Components/common/StatsGrid";
import AuditTable from "../../Components/common/TableComp";
import { AuditStats, AuditLogsData } from "../../mock/PagesMockData/AuditData";

import { Rocket, Shield, Database } from "lucide-react";

const iconMap = {
    deployments: <Rocket size={60} strokeWidth={1.5} />,
    proofs: <Shield size={60} strokeWidth={1.5} />,
    data: <Database size={60} strokeWidth={1.5} />
};

const AuditDashboard: React.FC = () => {
    const statsWithIcons = AuditStats.map(stat => ({
        ...stat,
        icon: iconMap[stat.category]
    }));

    return (
        <div className="p-2 sm:p-3 lg:p-4 space-y-8 bg-nexus-bg text-white min-h-screen">
            <div className="max-w-[1400px] mx-auto space-y-5">
                <div>
                    <h1 className="text-lg font-bold mb-1">
                        Deployment Audit History
                    </h1>
                    <p className="text-xs text-gray-400">
                        Comprehensive project-specific audit view with immutable blockchain evidence.
                    </p>
                </div>

                <StatsGrid stats={statsWithIcons} />

                <div className="flex justify-end">
                    <Button variant="primary">
                        Verify All Records
                    </Button>
                </div>

                <AuditTable title="On-Chain Deployment Proofs" data={AuditLogsData} />

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
