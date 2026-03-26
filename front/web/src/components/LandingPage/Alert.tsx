import AlertComponent from "react-bootstrap/Alert"

export default function Alert(){
    return (
        <AlertComponent variant="warning" className="text-center">
            <b>Importante:</b>{' '}
            Esta plataforma NO intermedia procesos de contratación. Contactamos directamente
            a personas con empresas verificadas. Reporta cualquier solicitud sospechosa de pago o
            intermediación.
        </AlertComponent>
        
    )
}