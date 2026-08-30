import CurriculumCard from "../components/CurriculumPage/CurriculumCard";
import PersonalInfoCard from "../components/CurriculumPage/PersonalInfoCard";
import ProfessionalInfoCard from "../components/CurriculumPage/ProfessionalInfoCard";
import WorkExperienceCard from "../components/CurriculumPage/WorkExperienceCard";
import AcademicExperienceCard from "../components/CurriculumPage/AcademicExperienceCard";
import SkillsCard from "../components/CurriculumPage/SkillsCard";
import UseResume from "../hooks/UseResume";


export default function CurriculumPage() {
    const { step, setStep } = UseResume();
    
    return (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            {step === "start" && (
                <CurriculumCard onNext={() => setStep("personalInfo")}/>
            )}
            {step === "personalInfo" && (
                <PersonalInfoCard onNext={() => setStep("professionalInfo")} onBack={() => setStep("start")}/>
            )}
            {step === "professionalInfo" && (
                <ProfessionalInfoCard onNext={() => setStep("workExperience")} onBack={() => setStep("personalInfo")}/>
            )}
            {step === "workExperience" && (
                <WorkExperienceCard onNext={() => setStep("academicExperience")} onBack={() => setStep("professionalInfo")}/>
            )}
            {step === "academicExperience" && (
                <AcademicExperienceCard onNext={() => setStep("skills")} onBack={() => setStep("workExperience")}/>
            )}
            {step === "skills" && (
                <SkillsCard onBack={() => setStep("academicExperience")}/>
            )}
        </div>
    )
}