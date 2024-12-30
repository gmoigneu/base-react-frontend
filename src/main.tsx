import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
import { DashboardPage } from './pages/dashboard.tsx'
import { LoginPage } from './pages/login.tsx'
import { ConfigurationPage } from './pages/configuration.tsx'
import { AuthenticatedLayout } from './components/layouts/authenticated-layout.tsx'
import { ModelsPage } from './pages/configuration/models/index.tsx'
import { ModelView } from './pages/configuration/models/[id].tsx'
import { ModelForm } from './pages/configuration/models/model-form.tsx'
import { ProtectedRoute } from './components/auth/protected-route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<DashboardPage />} />
              <Route path="/configuration">
                <Route index element={<ConfigurationPage />} />
                <Route path="models">
                  <Route index element={<ModelsPage />} />
                  <Route path="new" element={<ModelForm />} />
                  <Route path=":id" element={<ModelView />} />
                  <Route path=":id/edit" element={<ModelForm />} />
                </Route>
              </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
