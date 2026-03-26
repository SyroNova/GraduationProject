
export default function Footer(){
    return (
        <div  style={{backgroundColor: 'var(--color-text-primary)'}}>
            <div className="d-flex justify-content-center gap-4" >
                <div className="d-flex flex-column mt-4" style={{ width: '18rem'}}>
                    <p className="fs-4 text-white">UrNextJob</p>
                    <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Conectando personas con oportunidades laborales dignas y seguras</p>
                </div>
                <div className="d-flex flex-column mt-4" style={{ width: '18rem'}}>
                    <p className="fs-5 text-white">Enlaces</p>
                    <p className="fs-5 fw-bold" style={{color: 'var(--color-text-secondary)'}}>Preguntas frecuentes</p>
                    <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Terminos y condiciones</p>                        <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Politica de privacidad</p>
                </div>
                <div className="d-flex flex-column mt-4" style={{ width: '18rem'}}>
                    <p className="fs-5 text-white">Lineas de ayuda</p>
                    <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Trata de personas: </p>
                    <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Linea 141</p>
                    <p className="fs-6" style={{color: 'var(--color-text-secondary)'}}>Policia nacional</p>
                </div>
            </div>
            <hr className="border-light w-50 mx-auto"/>
            <p className="text-center" style={{color: 'var(--color-text-secondary)'}}>{' '}2026 Empleo Dignificado. Plataforma de uso gratuito.</p>
        </div>
    )
}