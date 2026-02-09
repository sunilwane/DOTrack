import * as React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../common/Logo";
import { Button } from "../common/Button";

export const PublicHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
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
                                    onClick={() => navigate("/connect")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                        </div>
                                        <span className="text-sm font-bold">Connect Wallet</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="features" textValue="Features" onClick={() => navigate("/")}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[20px] opacity-60">layers</span>
                                        <span className="text-sm">Features</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="marketplace" textValue="Marketplace" onClick={() => navigate("/")}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[20px] opacity-60">storefront</span>
                                        <span className="text-sm">Marketplace</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="docs" textValue="Docs" onClick={() => navigate("/")}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[20px] opacity-60">description</span>
                                        <span className="text-sm">Documentation</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div
                        className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer group"
                        onClick={() => navigate("/")}
                    >
                        <Logo className="size-7 sm:size-8 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                            Nexus CI/CD
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <nav className="hidden lg:flex items-center gap-6 lg:gap-8 mr-4">
                        <NavLink href="/features">Features</NavLink>
                        <NavLink href="/">Marketplace</NavLink>
                        <NavLink href="/docs">Docs</NavLink>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <Button
                            className="hidden md:flex min-w-[120px]"
                            onClick={() => navigate("/connect")}
                        >
                            <span className="text-sm">Connect Wallet</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="min-w-[90px] sm:min-w-[100px]"
                            onClick={() => navigate("/login")}
                        >
                            <span className="text-sm">Sign In</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link className="text-sm font-medium hover:text-primary transition-colors shrink-0" to={href}>
        {children}
    </Link>
);
