import { Button, Modal } from "react-bootstrap";

type Props = {
    show: boolean,
    onCancel: () => void,
    onContinue: () => void
}

export default function ConfirmDiscardModal({ show, onCancel, onContinue }: Readonly<Props>){
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
                <h4>¿Salir sin guardar?</h4>
                <p>
                    Tienes cambios sin guardar. Si sales ahora, se perderan
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button variant="primary" onClick={onContinue}>Salir sin guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}