interface ChevronLeftIconProps {
    size?: number;
    className?: string;
}

const ChevronLeftIcon = ({ size = 20, className = "" }: ChevronLeftIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="white"
            className={className}
            style={{ display: 'block', opacity: 1, visibility: 'visible' }}
        >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#ffffff" />
        </svg>
    );
};

export default ChevronLeftIcon;
