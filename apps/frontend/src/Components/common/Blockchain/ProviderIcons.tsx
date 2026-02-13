import * as React from "react";

interface ProviderIconProps {
  className?: string;
}

export const GitHubIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export const JenkinsIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const GitLabIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.65 14.39l-1.52-4.684L21.5 8.25c.101-.311.06-.648-.108-.925-.169-.277-.447-.471-.764-.529L12 5.5 3.372 6.796c-.317.058-.595.252-.764.529-.169.277-.21.614-.108.925l.37 1.456-1.52 4.684c-.169.521.068 1.086.548 1.329L12 21.5l9.102-5.781c.48-.243.717-.808.548-1.329zM12 7.5l6.598 1.058-1.598 4.942H7l-1.598-4.942L12 7.5z"/>
  </svg>
);

export const BitbucketIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2.25A.5.5 0 0 0 2 2.75v18.5c0 .276.224.5.5.5h19a.5.5 0 0 0 .5-.5V2.75a.5.5 0 0 0-.5-.5h-19zm2.5 2h14v14H5v-14z"/>
  </svg>
);

export const CircleCIIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <circle cx="12" cy="12" r="6" fill="white"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

export const TravisCIIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
);

export const AzureDevOpsIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 1.26-.31 2.46-.77 3.55-1.35L12 2z"/>
    <path d="M12 2l10 5v10c0 5.55-3.84 10.74-9 12-1.26-.31-2.46-.77-3.55-1.35L12 2z" fill="#0078D4" opacity="0.8"/>
  </svg>
);

export const DefaultProviderIcon: React.FC<ProviderIconProps> = ({ className = "size-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
