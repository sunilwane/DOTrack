interface ChevronRightIconProps {
    size?: number;
    className?: string;
}

const ChevronRightIcon = ({ size = 20, className = "" }: ChevronRightIconProps) => {
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
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#ffffff" />
        </svg>
    );
};

export default ChevronRightIcon;
