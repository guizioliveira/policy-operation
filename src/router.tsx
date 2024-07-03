import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { EditApolice } from './pages/Edit'
import { CreateApolice } from './pages/Create'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateApolice />} />
        <Route path="/edit/:id" element={<EditApolice />} />
        {/* <Route path="*" element={} /> */}
      </Route>
    </Routes>
  )
}
