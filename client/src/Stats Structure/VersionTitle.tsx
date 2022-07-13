interface Props {
    version : Array<{id_version: number, version_name: string, patch: number}>;
    id : number;
    clientChoose: string
}

function VersionTitle(props: Props) {

    return (
        <>
            {
                props.version.map((name, key) => {
                    if (name.id_version === props.id) {
                        return (
                            <div key={key} className="title">
                                <h2>{`Client ${props.clientChoose} ${name.version_name}.${name.patch}`}</h2>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })
            }
        </>
    )
}

export default VersionTitle;