export interface LandingStatItem {
    label: string;
    value: string;
    border: boolean;
}

export interface ComparisonItem {
    icon: string;
    title: string;
    desc: string;
}

export interface ComparisonCardData {
    variant: 'centralized' | 'nexus';
    title: string;
    items: ComparisonItem[];
}

export interface LandingFeature {
    icon: string;
    title: string;
    description: string;
}

export interface HeroTerminalLog {
    icon: string;
    text: string;
    color: string;
    truncate?: boolean;
}

export interface FooterColumn {
    title: string;
    links: string[];
}
