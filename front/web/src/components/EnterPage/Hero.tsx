import logo from "../../assets/Logo.png";

export default function Hero(){
    return (
        <div className="d-flex justify-content-center pt-5 flex-column align-items-center pb-5">
            <img src={logo} alt="logo" style={{ height: "200px", width: "200px", objectFit: "cover" }}  className="img-fluid" />
            <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
            <p className="fw-bold" style={{color: "var(--color-text-secondary)"}}>Selecciona un perfil para continuar</p>
        </div>
    )
}