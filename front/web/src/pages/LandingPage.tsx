import AlertLanding from "../components/LandingPage/AlertLanding";
import FeaturesCards from "../components/LandingPage/FeaturesCards";
import Footer from "../components/LandingPage/Footer";
import HeadBar from "../components/LandingPage/HeadBar";
import Hero from "../components/LandingPage/Hero";

export default function LandingPage(){
    return (
        <div className="d-flex flex-column min-vh-100">
            <HeadBar />
            <AlertLanding />
            <div className="flex-grow-1">
                <div className="mb-5">
                    <Hero />
                </div>
                <div className="mb-5">
                    <FeaturesCards />
                </div>
            </div>
            <Footer />
        </div>
    );
}