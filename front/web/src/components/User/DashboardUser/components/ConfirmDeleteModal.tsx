import { Button, Modal } from "react-bootstrap";

type Props = {
    show: boolean,
    onCancel: () => void,
    onContinue: () => void
}

export default function ConfirmDeleteModal({ show, onCancel, onContinue }: Readonly<Props>){
    return (
        <Modal
            show={show}
            onHide={onCancel}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ¡¡Alerta!!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>¿Estas seguro de que deseas borrar la experiencia?</h4>
                <p>
                    Si la borras no podras recuperarla
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button variant="primary" onClick={onContinue}>Borrar</Button>
            </Modal.Footer>
        </Modal>
    )
}