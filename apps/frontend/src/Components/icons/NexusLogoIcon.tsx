import * as React from "react";

interface NexusLogoIconProps {
  className?: string;
  fill?: string;
}

export const NexusLogoIcon: React.FC<NexusLogoIconProps> = ({ 
  className = "size-8", 
  fill = "currentColor" 
}) => {
  return (
    <svg fill={fill} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
    </svg>
  );
};
