/* ------------------- React ------------------- */

import { useState } from "react";

/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/* ------------------- FontAwesome ------------------- */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClipboardList, faCheck } from "@fortawesome/free-solid-svg-icons";

/* ------------------- Librairies tierces ------------------- */

import { CopyToClipboard } from "react-copy-to-clipboard";

function LinkToTest() {
    const [isCopied, setIsCopied] = useState(false);

    library.add(faClipboardList, faCheck);

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {isCopied ? "Link copied !" : "Copy to clipboard"}
        </Tooltip>
    );

    return (
        <div className="d-flex flex-column link margin-top">
            <Form.Label htmlFor="basic-url">Link :</Form.Label>
            <InputGroup className="mb-1">
                <InputGroup.Text id="basic-addon1">
                    {window.location.href}
                </InputGroup.Text>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <CopyToClipboard
                        text={window.location.href}
                        onCopy={() => {
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                            }, 3000);
                        }}
                    >
                        <Button className="copy">
                            {isCopied ? (
                                <FontAwesomeIcon icon={["fas", "check"]} />
                            ) : (
                                <FontAwesomeIcon
                                    icon={["fas", "clipboard-list"]}
                                />
                            )}
                        </Button>
                    </CopyToClipboard>
                </OverlayTrigger>
            </InputGroup>
        </div>
    );
}

export default LinkToTest;
