import { Radio, RadioGroup, Select, SelectItem, Textarea } from '@nextui-org/react';
import { pipelineVersions } from '../../../mock/PagesMockData/deploymentRequest';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
    {children}
  </label>
);

const DeploymentConfigForm = () => (
  <>
    <div>
      <FieldLabel>Pipeline Version (IPFS Hash)</FieldLabel>
      <Select
        className="mt-3"
        defaultSelectedKeys={['v2.1.0']}
        variant="bordered"
        classNames={{
          trigger: 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800',
        }}
      >
        {pipelineVersions.map((version) => (
          <SelectItem key={version.key}>{version.label}</SelectItem>
        ))}
      </Select>
    </div>

    <div>
      <FieldLabel>Target Environment</FieldLabel>
      <RadioGroup orientation="horizontal" defaultValue="staging" className="mt-3">
        <Radio value="staging">Staging</Radio>
        <Radio value="production">Production</Radio>
      </RadioGroup>
    </div>

    <div>
      <FieldLabel>Rationale / Deployment Notes</FieldLabel>
      <Textarea
        className="mt-3"
        minRows={4}
        placeholder="Explain why this deployment is necessary..."
        variant="bordered"
        classNames={{
          inputWrapper: 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800',
        }}
      />
    </div>
  </>
);

export default DeploymentConfigForm;
