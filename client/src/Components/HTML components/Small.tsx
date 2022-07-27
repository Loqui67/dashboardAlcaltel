interface Props {
    text: string;
    id?: string;
}

function Small({ text, id }: Props): JSX.Element {
    return <small id={id}>{text}</small>;
}

export default Small;
