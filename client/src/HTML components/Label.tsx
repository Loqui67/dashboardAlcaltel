interface Props {
  text: string;
}

function Label({ text }: Props) {
  return <label>{text}</label>;
}

export default Label;
