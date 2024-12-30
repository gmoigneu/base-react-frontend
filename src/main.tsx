import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
import { DashboardPage } from './pages/dashboard.tsx'
import { LoginPage } from './pages/login.tsx'
import { ConfigurationPage } from './pages/configuration.tsx'
import { AuthenticatedLayout } from './components/layouts/authenticated-layout.tsx'
import { PersonasPage } from './pages/configuration/personas'
import { PersonaForm } from './pages/configuration/personas/persona-form'
import { PersonaView } from './pages/configuration/personas/[id]'
import { IndustryForm } from './pages/configuration/industries/industry-form.tsx'
import { IndustryView } from './pages/configuration/industries/[id]'
import { IndustriesPage } from './pages/configuration/industries'
import { ProductGroupsPage } from './pages/configuration/product-groups/index.tsx'
import { ProductGroupForm } from './pages/configuration/product-groups/product-group-form.tsx'
import { ProductGroupView } from './pages/configuration/product-groups/[id]'
import { ProductsPage } from './pages/products/index.tsx'
import { ProductForm } from './pages/products/product-form.tsx'
import { ProductView } from './pages/products/[id].tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products">
            <Route index element={<ProductsPage />} />
            <Route path="new" element={<ProductForm />} />
            <Route path=":id" element={<ProductView />} />
            <Route path=":id/edit" element={<ProductForm />} />
          </Route>
          <Route path="/configuration">
            <Route index element={<ConfigurationPage />} />
            <Route path="personas">
              <Route index element={<PersonasPage />} />
              <Route path="new" element={<PersonaForm />} />
              <Route path=":id" element={<PersonaView />} />
              <Route path=":id/edit" element={<PersonaForm />} />
            </Route>
            <Route path="industries">
              <Route index element={<IndustriesPage />} />
              <Route path="new" element={<IndustryForm />} />
              <Route path=":id" element={<IndustryView />} />
              <Route path=":id/edit" element={<IndustryForm />} />
            </Route>
            <Route path="product-groups">
              <Route index element={<ProductGroupsPage />} />
              <Route path="new" element={<ProductGroupForm />} />
              <Route path=":id" element={<ProductGroupView />} />
              <Route path=":id/edit" element={<ProductGroupForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
