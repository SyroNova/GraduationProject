import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx';
import { SmsProvider } from './context/SmsProvider.tsx';
import { ResumeProvider } from "./context/ResumeProvider.tsx"
import { ProfileImageProvider } from './context/ProfileImageProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SmsProvider>
        <ResumeProvider>
          <ProfileImageProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProfileImageProvider>
        </ResumeProvider>
      </SmsProvider>
    </AuthProvider>
  </StrictMode>,
)
