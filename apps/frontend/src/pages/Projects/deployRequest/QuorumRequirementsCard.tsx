import { DashboardCard } from '../../../Components/common/DashboardCard';
import { Divider } from '../../../Components/common/Divider';
import { StatusBadge } from '../../../Components/common/StatusBadge';
import { signers } from '../../../mock/PagesMockData/deploymentRequest';
import SignerCard from './SignerCard';

const QuorumRequirementsCard = () => (
  <DashboardCard
    title="Quorum Requirements"
    icon="verified_user"
    extra={<StatusBadge status="info">2 of 3 Signatures Required</StatusBadge>}
    bodyClassName="!p-0"
  >
    <Divider />
    <div className="grid md:grid-cols-3 gap-4 p-6">
      {signers.map((signer) => (
        <SignerCard key={`${signer.name}-${signer.role}`} {...signer} />
      ))}
    </div>
  </DashboardCard>
);

export default QuorumRequirementsCard;
