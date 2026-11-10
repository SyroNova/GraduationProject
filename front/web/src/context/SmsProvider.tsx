import { createContext, useState } from "react";

type SmsContextType = {
    phone: string | null;
    setPhone: React.Dispatch<React.SetStateAction<string | null>>;
};

const SmsContext = createContext<SmsContextType | null> (null);

export const SmsProvider = ({ children }: {children: React.ReactNode}) => {
    const [phone, setPhone] = useState<string | null>(null);

    return (
        <SmsContext.Provider value={{ phone, setPhone}}>
            {children}
        </SmsContext.Provider>
    )
}

export default SmsContext;