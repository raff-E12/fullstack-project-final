import { useNavigate } from "react-router-dom"

export default function NotFound(){
    const navigate = useNavigate()
    
    return <div className="m-5">
    <div className="text-center mb-3">
        <h1 className="mb-3">Pagina non Trovata</h1>
        <h2 className="mb-3">ERROR: <span className="fw-bolder">404</span></h2>
    </div>
    <div className="d-flex justify-content-center gap-3 mb-3">
        <button className="btn btn-dark" onClick={()=>navigate(-1)}>Torna Indietro</button>
        <button className="btn btn-dark" onClick={()=>navigate("/")}>Torna alla Home</button>
    </div>
    </div>
}