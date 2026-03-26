import CompanyCard from "../components/EnterPage/CompanyCard";
import Hero from "../components/EnterPage/Hero";
import UserCard from "../components/EnterPage/UserCard";

export default function EnterPage(){
    return (
        <>
            <Hero />
            <div className="d-flex justify-content-center align-items-center" style={{gap: "10rem"}}>
                <UserCard />
                <CompanyCard />
            </div>
        </>
    )
}