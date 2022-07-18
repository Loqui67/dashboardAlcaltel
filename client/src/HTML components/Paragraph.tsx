interface Props {
    text: string | Array<any>,
    className?: string,
    key?: number
}

function Paragraph({ text, className, key }: Props) {
    return <p className={className} key={key}>{text}</p>
}

export default Paragraph;