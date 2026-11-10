import { Alert, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import UseAuth from "../../hooks/UseAuth";
import { useEffect, useState, type ChangeEvent } from "react";
import type User from "../../types/User";
import axios from "../../api/axios";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt, FaRegIdCard  } from "react-icons/fa";
import Cropper, { type Area, type Point } from "react-easy-crop";
import 'react-easy-crop/react-easy-crop.css'
import { getCroppedImage } from "../../utils/GetCroppedImage";
import { isAxiosError } from "axios";
import UseProfileImage from "../../hooks/UseProfileImage";
import { useNavigate } from "react-router-dom";


export default function DashboardMe(){
    const { auth } = UseAuth()
    const [me, setMe] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [show, setShow] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [saved, setSaved] = useState(false)
    const { setProfileImage } = UseProfileImage()
    const navigate = useNavigate()

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if(!file){
            return
        }

        setImage(URL.createObjectURL(file))
    }


    useEffect(() => {
        const fetchMe = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/users/get/id/${auth?.id ?? 5}`)

                setMe(response.data)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }

        void fetchMe()
    }, [auth?.id])

    const items = [
        { data: `${me?.documentType} ${me?.document}`, icon: "document"},
        { data: me?.email, icon: "email"},
        { data: me?.phone, icon: "phone"},
        { data: me?.actualCity, icon: "location"}
    ]

    const icons = {
        document: FaRegIdCard,
        email: CiMail,
        phone: FaPhoneAlt,
        location: CiLocationOn
    }

    const handleSaveImage = async () => {
        if(!image || !croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImage(image, croppedAreaPixels)

            console.log(croppedImage)

            const formData = new FormData()
            formData.append("image", croppedImage)

            await axios.put("/users/image", formData)

            setProfileImage(URL.createObjectURL(croppedImage))
            setShow(false)
            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 3000)

        } catch (error) {
            console.error("Error al guardar la imagen:", error);
            if(isAxiosError(error)){
                console.log(error.response?.data)
            }
        }
    }

    return (
        <>
            {loading ?
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                :
                <>
                    <div className="d-flex flex-column align-items-center mt-2">
                        <h2 style={{color: "var(--color-text-primary)"}}>{me?.name ?? "Usuario"}</h2>
                        <p className="text-muted" style={{color: "var(--color-text-secondary)"}}>Edita aqui tu perfil</p>
                    </div>
                    <hr className="mt-0"/>
                    <div className="ms-5">
                        <Col className="d-flex flex-column gap-3">
                            {items.map((item, index) => {
                                const Icon = icons[item.icon as keyof typeof icons]
                                return (
                                    <Row key={index}>
                                        <Col>
                                            <Card style={{width: "90%", backgroundColor: "rgb(241, 245, 249)"}}>
                                                <Card.Body>
                                                    <Row>
                                                        <Col sm={1}>
                                                            <Icon size={40} style={{color: "rgb(30, 64, 175)"}}/>
                                                        </Col>
                                                        <Col>
                                                            <Card.Subtitle className="text-muted">Documento</Card.Subtitle>
                                                            <Card.Text className="fw-bold">{item.data ?? "No disponible"}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                        <h1 className="mt-5">Acciones rapidas</h1>
                        <Col className="d-flex flex-column gap-4 mt-4">
                            <Row>
                                <Col>
                                    <Button variant="light" className="fs-4" style={{width: "80%"}} onClick={() => navigate('/dashboard/curriculum')}>Ver hoja de vida</Button>
                                </Col>
                                <Col>
                                    <Button variant="light" className="fs-4" style={{width: "80%"}} onClick={() => setShow(true)} >Añadir foto de perfil</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="light" className="fs-4" style={{width: "80%"}}>Editar hoja de vida</Button>
                                </Col>
                                <Col>   
                                    <Button variant="light" className="fs-4" style={{width: "80%"}}>Cambiar contraseña</Button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </>
            }
            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column gap-3">
                        <div>
                            <Form.Label>Selecciona una imagen</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                            <Form.Text className="text-muted">
                                Selecciona una imagen en formato JPG, PNG o WEBP.
                            </Form.Text>
                        </div>
                        {image && (
                            <>
                                <div
                                    className="position-relative w-100"
                                    style={{ height: "350px" }}
                                >
                                    <Cropper
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        cropShape="round"
                                        showGrid={false}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                                    />
                                </div>
                                <div>
                                    <Form.Label>Zoom</Form.Label>
                                    <Form.Range
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button variant="primary" disabled={!image} onClick={handleSaveImage}>Guardar imagen</Button>
                </Modal.Footer>
            </Modal>
            {saved && (
                <Alert variant="success" className="mt-3 ms-5" style={{width: "90%"}}>
                    ¡Los cambios se guardaron correctamente!
                </Alert>
            )}
        </>
    )
}