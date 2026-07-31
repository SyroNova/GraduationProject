import Alert from "react-bootstrap/Alert"

export default function AlertLanding(){
    return (
        <Alert variant="warning" className="text-center">
            <b>Importante:</b>{' '}
            Esta plataforma NO intermedia procesos de contratación. Contactamos directamente
            a personas con empresas verificadas. Reporta cualquier solicitud sospechosa de pago o
            intermediación.
        </Alert>
    )
}