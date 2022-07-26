interface Props {
    text: string | Array<any>;
    className?: string;
    _key?: number;
}

function Paragraph({ text, className, _key }: Props) {
    return (
        <p className={className} key={_key === undefined ? "1" : _key}>
            {text}
        </p>
    );
}

export default Paragraph;
