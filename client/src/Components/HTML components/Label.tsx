interface Props {
    text: string;
}

function Label({ text }: Props): JSX.Element {
    return <label>{text}</label>;
}

export default Label;
