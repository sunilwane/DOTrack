const DeploymentNotice = () => (
  <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl flex gap-4 items-start">
    <span className="material-symbols-outlined text-primary mt-1">shield</span>
    <div>
      <h4 className="font-bold">Trustless Deployment Execution</h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
        Once initiated, this request creates a pending transaction on the blockchain. The CI/CD
        runner triggers only after receiving the required signatures.
      </p>
    </div>
  </div>
);

export default DeploymentNotice;
