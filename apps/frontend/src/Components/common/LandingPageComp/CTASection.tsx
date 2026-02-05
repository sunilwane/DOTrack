import * as React from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
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
    );
};
