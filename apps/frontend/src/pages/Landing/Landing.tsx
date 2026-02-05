import * as React from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "../../Components/layout/PublicHeader";
import { FeatureCard } from "../../Components/common/FeatureCard";
import { Button } from "../../Components/common/Button";
import { Logo } from "../../Components/common/Logo";
import { SmoothScrollProvider } from "../../Components/layout/SmoothScrollProvider";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
        <PublicHeader />

        <main className="flex-1 flex flex-col items-center">
          <section className="w-full relative py-16 sm:py-24 lg:py-32 overflow-hidden node-bg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/50 dark:via-background-dark/50 to-background-light dark:to-background-dark pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v2.0 Beta Now Live
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight max-w-[900px]">
                Trustless CI/CD for the <span className="text-primary">Open Source</span> Future
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-[700px] font-normal leading-relaxed">
                Automate your workflows with blockchain-verified approvals and
                IPFS-stored templates. Secure. Transparent. Immutable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:min-w-[200px] hover:scale-105"
                  onClick={() => navigate("/connect")}
                >
                  Connect Wallet
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:min-w-[200px] backdrop-blur-md"
                >
                  Explore Marketplace
                </Button>
              </div>

              <Card className="mt-12 sm:mt-16 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 dark:border-[#3b4354] overflow-hidden shadow-2xl bg-transparent" shadow="none" radius="none">
                <div className="bg-slate-100 dark:bg-[#1b1f27] border-b border-slate-200 dark:border-[#3b4354] px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="mx-auto text-[10px] uppercase tracking-widest opacity-50 font-bold truncate">
                    Mainnet Deployment Pipeline
                  </div>
                </div>
                <CardBody className="aspect-video bg-[#101622] p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden flex flex-col gap-2 text-left">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <span className="material-symbols-outlined text-sm sm:text-base">check_circle</span>
                    <span>[SUCCESS] IPFS Hash Resolved: QmXoyp...</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-400">
                    <span className="material-symbols-outlined text-sm sm:text-base">shield</span>
                    <span className="truncate">
                      [VERIFYING] Multi-sig approval from Node Operator...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-sm sm:text-base">hourglass_empty</span>
                    <span>
                      [PENDING] Committing transaction to Ethereum L2...
                    </span>
                  </div>
                  <div className="mt-4 p-4 rounded bg-white/5 border border-white/10 overflow-hidden">
                    <p className="text-primary truncate font-semibold text-xs sm:text-sm">
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </p>
                    <p className="text-emerald-500 mt-2 font-bold text-left text-xs sm:text-sm">
                      VERIFIED_IMMUTABLE
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>

          <section className="w-full bg-slate-50 dark:bg-[#111318] border-y border-slate-200 dark:border-[#282e39] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8">
                <StatItem label="Active Pipelines" value="1,240+" />
                <StatItem label="Nodes Online" value="850" border />
                <StatItem label="Deployments" value="45.2k" border />
                <StatItem label="TVL in Templates" value="$2.4M" border />
              </div>
            </div>
          </section>

          <section className="w-full py-20 sm:py-24 lg:py-32 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                  Traditional vs. Decentralized DevOps
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                  Moving away from centralized bottlenecks towards a
                  transparent and immutable future where code is law.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <ComparisonCard
                  variant="centralized"
                  title="The Centralized Risk"
                  items={[
                    { icon: "lock", title: "Opaque Scripts", desc: "Traditional CI/CD hidden runners can be compromised without notice." },
                    { icon: "cloud_off", title: "Single Point of Failure", desc: "Platform outages halt your entire development lifecycle." },
                    { icon: "gavel", title: "Centralized Censorship", desc: "Service providers can block your builds based on arbitrary policy." }
                  ]}
                />
                <ComparisonCard
                  variant="nexus"
                  title="The Nexus Advantage"
                  items={[
                    { icon: "hub", title: "Decentralized Verification", desc: "Multi-node consensus ensures every build step is audited." },
                    { icon: "storage", title: "Immutable IPFS Storage", desc: "Templates are stored on a permanent web with verifiable hashes." },
                    { icon: "public", title: "Censorship Resistant", desc: "Distributed runner network ensures your builds never stop." }
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="w-full py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
                <div className="max-w-[600px] text-left">
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-slate-900 dark:text-white">
                    Core Ecosystem Features
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
                    Everything you need to ship secure, decentralised software
                    at scale without the friction of traditional web2 gates.
                  </p>
                </div>
                <a className="text-primary font-bold flex items-center gap-2 group w-fit" href="#">
                  Explore full docs
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-6 lg:gap-8">
                <FeatureCard icon="shield" title="On-Chain Governance" description="Pipeline changes must be approved by DAO participants or automated smart contract conditions." />
                <FeatureCard icon="find_in_page" title="Public Audit Trails" description="Every log, build artifact, and deployment signature is stored with a permanent on-chain hash." />
                <FeatureCard icon="shopping_cart" title="Template Marketplace" description="Buy and sell pre-verified, secure pipeline components created by the community." />
                <FeatureCard icon="account_balance_wallet" title="Gasless Deployments" description="Leverage meta-transactions and L2 rollup technology for fast, low-cost CI/CD execution." />
                <FeatureCard icon="api" title="Cross-Chain Ready" description="Deploy to EVM, Solana, Cosmos, and traditional cloud providers using the same trustless core." />
                <FeatureCard icon="token" title="Contributor Incentives" description="Earn protocol tokens for running nodes or creating high-quality open source templates." />
              </div>
            </div>
          </section>

          <section className="w-full py-16 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <Card className="relative w-full rounded-3xl overflow-hidden p-6 sm:p-12 lg:p-24 text-center bg-primary flex flex-col items-center gap-6 sm:gap-8 shadow-2xl shadow-primary/20" shadow="none" radius="none">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>
                <CardBody className="p-0 flex flex-col items-center gap-4 sm:gap-8 relative z-10">
                  <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white relative z-10 leading-tight">
                    Ready to secure your software?
                  </h2>
                  <p className="text-white/80 max-w-xl text-sm sm:text-lg lg:text-xl relative z-10 font-medium px-4">
                    Join 1,000+ developers building the next generation of
                    decentralized infrastructure.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 relative z-10 w-full sm:w-auto px-4 mt-2">
                    <Button
                      variant="outline"
                      size="xl"
                      className="bg-white text-primary border-white hover:bg-slate-100"
                      onClick={() => navigate("/connect")}
                    >
                      Connect Wallet
                    </Button>
                    <Button
                      variant="outline"
                      size="xl"
                      className="bg-primary-dark/20 border-white/30 text-white hover:bg-white/10"
                    >
                      View Marketplace
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>
        </main>

        <footer className="w-full border-t border-slate-200 dark:border-[#282e39] pt-16 pb-12 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
              <div className="md:col-span-5 flex flex-col gap-6 text-left">
                <div className="flex items-center gap-3 text-primary">
                  <Logo />
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus CI/CD</h2>
                </div>
                <div className="flex gap-5">
                  <SocialLink icon="hub" />
                  <SocialLink icon="groups" />
                  <SocialLink icon="article" />
                </div>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-left">
                <FooterColumn title="Platform" links={["Features", "Marketplace", "Node Status"]} />
                <FooterColumn title="Resources" links={["Documentation", "API Ref", "Whitepaper"]} />
                <FooterColumn title="Legal" links={["Privacy", "Terms", "Security"]} />
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                © 2024 Nexus CI/CD Protocol. All rights reserved. Secured by Ethereum.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
};

// Internal Components
const StatItem: React.FC<{ label: string; value: string; border?: boolean }> = ({ label, value, border }) => (
  <div className={`flex flex-col items-center md:items-start text-left ${border ? 'border-l-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-8' : ''}`}>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
    <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
  </div>
);

const ComparisonCard: React.FC<{ variant: "centralized" | "nexus"; title: string; items: any[] }> = ({ variant, title, items }) => {
  const isNexus = variant === "nexus";
  const baseCardClass = "flex flex-col gap-6 p-5 sm:p-8 rounded-2xl shadow-none";
  const cardStyles = isNexus
    ? "border-2 border-primary/50 bg-primary/5 relative overflow-hidden group"
    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b25]";

  return (
    <Card className={`${baseCardClass} ${cardStyles} text-left`} shadow="none" radius="none">
      {isNexus && (
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-primary">
          <span className="material-symbols-outlined text-7xl sm:text-8xl lg:text-9xl font-light">verified</span>
        </div>
      )}
      <CardBody className="p-0 flex flex-col gap-6 relative z-10">
        <div className={`flex items-center gap-3 mb-2 sm:mb-4 ${isNexus ? 'text-primary' : 'text-red-500'}`}>
          <span className="material-symbols-outlined">{isNexus ? 'task_alt' : 'warning'}</span>
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        </div>
        <div className="space-y-6 sm:space-y-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${isNexus ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                <span className="material-symbols-outlined text-xs sm:text-sm">{item.icon}</span>
              </div>
              <div>
                <h4 className="font-bold mb-1 text-sm sm:text-base text-slate-900 dark:text-white">{item.title}</h4>
                <p className={`text-[13px] sm:text-sm leading-relaxed ${isNexus ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const SocialLink: React.FC<{ icon: string }> = ({ icon }) => (
  <a className="text-slate-400 hover:text-primary transition-all hover:scale-110" href="#">
    <span className="material-symbols-outlined">{icon}</span>
  </a>
);

const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">{title}</h4>
    <ul className="flex flex-col gap-2.5">
      {links.map((link, idx) => (
        <li key={idx}>
          <a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Landing;
