interface Props {
    src: string;
    alt: string;
    className?: string;
    OnClick?: () => void;
}

function Image({ src, alt, className, OnClick }: Props) {
    return <img src={src} alt={alt} className={className} onClick={OnClick} />;
}

export default Image;
