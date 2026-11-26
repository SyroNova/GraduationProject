import { createContext, useState } from "react";

type SmsContextType = {
    document: string | null;
    setDocument: React.Dispatch<React.SetStateAction<string | null>>;
};

const SmsContext = createContext<SmsContextType | null> (null);

export const SmsProvider = ({ children }: {children: React.ReactNode}) => {
    const [document, setDocument] = useState<string | null>(null);

    return (
        <SmsContext.Provider value={{ document, setDocument}}>
            {children}
        </SmsContext.Provider>
    )
}

export default SmsContext;