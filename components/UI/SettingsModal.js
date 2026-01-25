import { useRef, useState } from "react";

import { Modal, Form } from "react-bootstrap"

import ArticlesButton from "@/components/UI/Button";
import { useStore } from "@/hooks/useStore";

import B from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/B.svg";
import { useModalNavigation } from "@/hooks/useModalNavigation";

export default function FourFrogsSettingsModal({
    show,
    setShow,
}) {

    const [showModal, setShowModal] = useState(true)

    // const [lightboxData, setLightboxData] = useState(null)

    const [tab, setTab] = useState('Graphics')

    const darkMode = useStore(state => state.darkMode);
    const toggleDarkMode = useStore(state => state.toggleDarkMode);

    const sceneOrientation = useStore(state => state.sceneOrientation);
    const setSceneOrientation = useStore(state => state.setSceneOrientation);
    const toggleSceneOrientation = useStore(state => state.toggleSceneOrientation);

    const elementsRef = useRef([]);
    useModalNavigation(elementsRef, () => setShowModal(false));

    return (
        <>
            {/* {lightboxData && (
                <Lightbox
                    mainSrc={lightboxData?.location}
                    onCloseRequest={() => setLightboxData(null)}
                    reactModalStyle={{
                        overlay: {
                            zIndex: '2000'
                        }
                    }}
                />
            )} */}

            <Modal
                className="articles-modal"
                size='md'
                show={showModal}
                // To much jumping with little content for now
                // centered
                scrollable
                onExited={() => {
                    setShow(false)
                }}
                onHide={() => {
                    setShowModal(false)
                }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Game Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    <div className='p-2'>
                        {[
                            'Graphics',
                            'Controls',
                            'Audio',
                            // 'Chat'
                        ].map(item =>
                            <ArticlesButton
                                key={item}
                                active={tab == item}
                                onClick={() => { setTab(item) }}
                            >
                                {item}
                            </ArticlesButton>
                        )}
                    </div>

                    <hr className="my-0" />

                    <div className="p-2">
                        {tab == 'Graphics' &&
                            <>
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            // ref={el => elementsRef.current[4] = el}
                                            type="switch"
                                            id="dark-mode-switch"
                                            label="Dark Mode"
                                            // value={enabled}
                                            checked={darkMode}
                                            onChange={() => {
                                                toggleDarkMode();
                                            }}
                                        />
                                    </div>
                                    <div className="small mt-2">
                                        {`Dark Mode changes the game's color scheme to be easier on the eyes in low light environments.`}
                                    </div>
                                </div>

                                <hr className="my-2" />

                                <div className="">
                                    <div className="">SceneOrientation</div>
                                    <div className="d-flex align-items-center">
                                        <ArticlesButton
                                            className=""
                                            small
                                            active={sceneOrientation == "Flat"}
                                            onClick={() => {
                                                setSceneOrientation("Flat");
                                            }}
                                        >
                                            Flat
                                        </ArticlesButton>
                                        <ArticlesButton
                                            className=""
                                            small
                                            active={sceneOrientation == "Upright"}
                                            onClick={() => {
                                                setSceneOrientation("Upright");
                                            }}
                                        >
                                            Upright
                                        </ArticlesButton>
                                    </div>
                                    <div className="small mt-2">
                                        {`SceneOrientation changes the orientation of the game scene to suit your preference.`}
                                    </div>
                                </div>
                            </>
                        }
                        {tab == 'Controls' &&
                            <div>
                                {[
                                    {
                                        action: 'Redeem Online Ball',
                                        defaultKeyboardKey: '1'
                                    },
                                    {
                                        action: 'Claim Online Points',
                                        defaultKeyboardKey: '2'
                                    },
                                    {
                                        action: 'Redeem Offline Ball',
                                        defaultKeyboardKey: '3'
                                    },
                                    {
                                        action: 'Claim Offline Points',
                                        defaultKeyboardKey: '4'
                                    },
                                ].map(obj =>
                                    <div key={obj.action}>
                                        <div className="flex-header border-bottom pb-1 mb-1">

                                            <div>
                                                <div>{obj.action}</div>
                                                {obj.emote && <div className="span badge bg-dark">Emote</div>}
                                            </div>

                                            <div>

                                                <div className="badge badge-hover bg-articles me-1">{obj.defaultKeyboardKey}</div>

                                                <ArticlesButton
                                                    className=""
                                                    small
                                                >
                                                    Change Key
                                                </ArticlesButton>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                        {tab == 'Audio' &&
                            <>
                                <Form.Label className="mb-0">Game Volume</Form.Label>
                                <Form.Range />
                                <Form.Label className="mb-0">Music Volume</Form.Label>
                                <Form.Range />
                            </>
                        }
                        {tab == 'Chat' &&
                            <>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Game chat panel"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Censor chat"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Game chat speech bubbles"
                                />
                            </>
                        }
                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <ArticlesButton
                        variant="outline-dark"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        <img src={B} className="me-1" alt="Close" />
                        Close
                    </ArticlesButton>

                    <ArticlesButton
                        variant="outline-danger ms-3"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        Reset
                    </ArticlesButton>

                </Modal.Footer>

            </Modal>
        </>
    )

}