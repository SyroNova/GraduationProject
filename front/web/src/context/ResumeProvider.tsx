import { createContext, useEffect, useState } from "react";
import type { AcademicExperience, Skill, WorkExperience } from "../types/Resume";

type ResumeType = {
    professionalProfile: {
        title: string,
        resume: string
    },
    workExperience: WorkExperience[],
    academicExperience: AcademicExperience[],
    skills: Skill[]
}

type ResumeContextType = {
    resume: ResumeType | null;
    setResume: React.Dispatch<React.SetStateAction<ResumeType | null>>;
    step: string;
    setStep: React.Dispatch<React.SetStateAction<string>>;
};

const ResumeContext = createContext<ResumeContextType | null> (null);

export const ResumeProvider = ({ children }: {children: React.ReactNode}) => {
    const draft = localStorage.getItem("resumeDraft");

    const parsedDraft = draft ? JSON.parse(draft) : null;

    const [resume, setResume] = useState<ResumeType | null>(parsedDraft?.resume ?? null);
    const [step, setStep] = useState<string>(parsedDraft?.step ?? "start");

    useEffect(() => {
        localStorage.setItem(
            "resumeDraft",
            JSON.stringify({ resume, step })
        )
    }, [resume, step])

    return (
        <ResumeContext.Provider value={{ resume, setResume, step, setStep }}>
            {children}
        </ResumeContext.Provider>
    )
}

export default ResumeContext;