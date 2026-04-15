import { createContext, useState } from "react";

type SmsType = {
    phone: string;
}

type SmsContextType = {
    phone: SmsType | null;
    setPhone: React.Dispatch<React.SetStateAction<SmsType | null>>;
};

const SmsContext = createContext<SmsContextType | null> (null);

export const SmsProvider = ({ children }: {children: React.ReactNode}) => {
    const [phone, setPhone] = useState<SmsType | null>(null);

    return (
        <SmsContext.Provider value={{ phone, setPhone}}>
            {children}
        </SmsContext.Provider>
    )
}

export default SmsContext;