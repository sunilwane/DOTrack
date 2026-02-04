import * as React from "react";
import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { SmoothScrollProvider } from "../../Components/layout/SmoothScrollProvider";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 dark:border-[#282e39] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 sm:px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="md:hidden flex items-center shrink-0">
                <Dropdown placement="bottom-start" className="dark:bg-[#1b1f27] border border-slate-200 dark:border-slate-800">
                  <DropdownTrigger>
                    <button className="flex items-center justify-center size-9 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">more_vert</span>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Mobile Navigation"
                    variant="flat"
                    className="p-2"
                    itemClasses={{
                      base: [
                        "rounded-xl",
                        "transition-opacity",
                        "data-[hover=true]:bg-primary/10",
                        "data-[hover=true]:text-primary",
                        "py-3",
                        "px-4",
                      ],
                    }}
                  >
                    <DropdownItem
                      key="connect"
                      textValue="Connect Wallet"
                      className="text-primary font-bold mb-1"
                      showDivider
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </div>
                        <span className="text-sm font-bold">Connect Wallet</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="features" textValue="Features">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] opacity-60">layers</span>
                        <span className="text-sm">Features</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="marketplace" textValue="Marketplace">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] opacity-60">storefront</span>
                        <span className="text-sm">Marketplace</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="docs" textValue="Docs">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] opacity-60">description</span>
                        <span className="text-sm">Documentation</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="size-7 sm:size-8 text-primary shrink-0">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                  Nexus CI/CD
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <nav className="hidden lg:flex items-center gap-6 lg:gap-8 mr-4">
                <a
                  className="text-sm font-medium hover:text-primary transition-colors shrink-0"
                  href="#"
                >
                  Features
                </a>
                <a
                  className="text-sm font-medium hover:text-primary transition-colors shrink-0"
                  href="#"
                >
                  Marketplace
                </a>
                <a
                  className="text-sm font-medium hover:text-primary transition-colors shrink-0"
                  href="#"
                >
                  Docs
                </a>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button className="hidden md:flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  <span>Connect Wallet</span>
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex min-w-[90px] sm:min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 sm:px-5 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-sm font-bold tracking-wide hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>

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
                <button className="flex w-full sm:min-w-[200px] items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30">
                  Connect Wallet
                </button>
                <button className="flex w-full sm:min-w-[200px] items-center justify-center rounded-lg h-14 px-8 border border-slate-300 dark:border-slate-700 bg-white/5 dark:bg-white/5 backdrop-blur-md text-lg font-bold hover:bg-white/10 transition-colors">
                  Explore Marketplace
                </button>
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
                    <span className="material-symbols-outlined text-sm sm:text-base">
                      check_circle
                    </span>
                    <span>[SUCCESS] IPFS Hash Resolved: QmXoyp...</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-400">
                    <span className="material-symbols-outlined text-sm sm:text-base">
                      shield
                    </span>
                    <span className="truncate">
                      [VERIFYING] Multi-sig approval from Node Operator...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-sm sm:text-base">
                      hourglass_empty
                    </span>
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
                <div className="flex flex-col items-center md:items-start text-left">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                    Active Pipelines
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight">1,240+</p>
                </div>
                <div className="flex flex-col items-center md:items-start border-l-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-8 text-left">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                    Nodes Online
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight">850</p>
                </div>
                <div className="flex flex-col items-center md:items-start border-l-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-8 text-left">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                    Deployments
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight">45.2k</p>
                </div>
                <div className="flex flex-col items-center md:items-start border-l-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-8 text-left">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                    TVL in Templates
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight">$2.4M</p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20 sm:py-24 lg:py-32 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  Traditional vs. Decentralized DevOps
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                  Moving away from centralized bottlenecks towards a
                  transparent and immutable future where code is law.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <Card className="flex flex-col gap-6 p-5 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b25]" shadow="none" radius="none">
                  <CardBody className="p-0 flex flex-col gap-6">
                    <div className="flex items-center gap-3 text-red-500 mb-2 sm:mb-4">
                      <span className="material-symbols-outlined">warning</span>
                      <h3 className="text-lg sm:text-xl font-bold">The Centralized Risk</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            lock
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">Opaque Scripts</h4>
                          <p className="text-[13px] sm:text-sm text-slate-500">
                            Traditional CI/CD hidden runners can be compromised
                            without notice.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            cloud_off
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">
                            Single Point of Failure
                          </h4>
                          <p className="text-[13px] sm:text-sm text-slate-500">
                            Platform outages halt your entire development
                            lifecycle.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            gavel
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">
                            Centralized Censorship
                          </h4>
                          <p className="text-[13px] sm:text-sm text-slate-500">
                            Service providers can block your builds based on
                            arbitrary policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="flex flex-col gap-6 p-5 sm:p-8 rounded-2xl border-2 border-primary/50 bg-primary/5 relative overflow-hidden group shadow-none" shadow="none" radius="none">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <span className="material-symbols-outlined text-7xl sm:text-8xl lg:text-9xl">
                      verified
                    </span>
                  </div>
                  <CardBody className="p-0 flex flex-col gap-6 relative z-10">
                    <div className="flex items-center gap-3 text-primary mb-2 sm:mb-4">
                      <span className="material-symbols-outlined">task_alt</span>
                      <h3 className="text-lg sm:text-xl font-bold">The Nexus Advantage</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-8 relative z-10">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            hub
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">
                            Decentralized Verification
                          </h4>
                          <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-400">
                            Multi-node consensus ensures every build step is
                            audited.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            storage
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">
                            Immutable IPFS Storage
                          </h4>
                          <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-400">
                            Templates are stored on a permanent web with
                            verifiable hashes.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            public
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm sm:text-base">Censorship Resistant</h4>
                          <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-400">
                            Distributed runner network ensures your builds never
                            stop.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>

          <section className="w-full py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
                <div className="max-w-[600px] text-left">
                  <h2 className="text-3xl sm:text-4xl font-black mb-4">
                    Core Ecosystem Features
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
                    Everything you need to ship secure, decentralised software
                    at scale without the friction of traditional web2 gates.
                  </p>
                </div>
                <a
                  className="text-primary font-bold flex items-center gap-2 group w-fit"
                  href="#"
                >
                  Explore full docs
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-6 lg:gap-8">
                <FeatureCard
                  icon="shield"
                  title="On-Chain Governance"
                  description="Pipeline changes must be approved by DAO participants or automated smart contract conditions."
                />
                <FeatureCard
                  icon="find_in_page"
                  title="Public Audit Trails"
                  description="Every log, build artifact, and deployment signature is stored with a permanent on-chain hash."
                />
                <FeatureCard
                  icon="shopping_cart"
                  title="Template Marketplace"
                  description="Buy and sell pre-verified, secure pipeline components created by the community."
                />
                <FeatureCard
                  icon="account_balance_wallet"
                  title="Gasless Deployments"
                  description="Leverage meta-transactions and L2 rollup technology for fast, low-cost CI/CD execution."
                />
                <FeatureCard
                  icon="api"
                  title="Cross-Chain Ready"
                  description="Deploy to EVM, Solana, Cosmos, and traditional cloud providers using the same trustless core."
                />
                <FeatureCard
                  icon="token"
                  title="Contributor Incentives"
                  description="Earn protocol tokens for running nodes or creating high-quality open source templates."
                />
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
                    <button className="bg-white text-primary px-6 sm:px-8 h-12 sm:h-14 rounded-lg font-bold text-base sm:text-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95">
                      Connect Wallet
                    </button>
                    <button className="bg-primary-dark/20 border border-white/30 text-white px-6 sm:px-8 h-12 sm:h-14 rounded-lg font-bold text-base sm:text-lg hover:bg-white/10 transition-all active:scale-95">
                      View Marketplace
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>
        </main>

        <footer className="w-full border-t border-slate-200 dark:border-[#282e39] pt-16 pb-12 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="size-8">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Nexus CI/CD
                  </h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-sm font-medium leading-relaxed">
                  Empowering open source developers with decentralized,
                  immutable infrastructure for a trustless world.
                </p>
                <div className="flex gap-5">
                  <a
                    className="text-slate-400 hover:text-primary transition-all hover:scale-110"
                    href="#"
                  >
                    <span className="material-symbols-outlined">hub</span>
                  </a>
                  <a
                    className="text-slate-400 hover:text-primary transition-all hover:scale-110"
                    href="#"
                  >
                    <span className="material-symbols-outlined">groups</span>
                  </a>
                  <a
                    className="text-slate-400 hover:text-primary transition-all hover:scale-110"
                    href="#"
                  >
                    <span className="material-symbols-outlined">article</span>
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">
                    Platform
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Features</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Marketplace</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Node Status</a></li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">
                    Resources
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Documentation</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">API Ref</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Whitepaper</a></li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">
                    Legal
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Privacy</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Terms</a></li>
                    <li><a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Security</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                © 2024 Nexus CI/CD Protocol. All rights reserved. Secured by
                Ethereum.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card className="flex flex-col gap-3 sm:gap-4 p-5 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b25] hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 text-left group" shadow="none" radius="none">
    <CardBody className="p-0 flex flex-col gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-[20px] sm:text-[24px]">{icon}</span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-[13px] sm:text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </CardBody>
  </Card>
);

export default Landing;
