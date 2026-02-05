import * as React from "react";
import { PublicHeader } from "../../Components/layout/PublicHeader";
import { Scroller } from "../../Components/common/Scroller";
import { HeroSection } from "../../Components/common/LandingPageComp/HeroSection";
import { StatsSection } from "../../Components/common/LandingPageComp/StatsSection";
import { ComparisonSection } from "../../Components/common/LandingPageComp/ComparisonSection";
import { FeaturesSection } from "../../Components/common/LandingPageComp/FeaturesSection";
import { CTASection } from "../../Components/common/LandingPageComp/CTASection";
import { LandingFooter } from "../../Components/common/LandingPageComp/LandingFooter";

const Landing: React.FC = () => {
  return (
    <Scroller 
      className="relative min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300" 
      direction="vertical" 
      scrollbarStyle="thin"
      root={true}
      lerp={0.06}
      duration={1.5}
    >
      <div className="flex flex-col overflow-x-hidden">
        <PublicHeader />

        <main className="flex-1 flex flex-col items-center">
          <HeroSection />
          <StatsSection />
          <ComparisonSection />
          <FeaturesSection />
          <CTASection />
        </main>

        <LandingFooter />
      </div>
    </Scroller>
  );
};

export default Landing;
