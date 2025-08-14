import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './home/page.jsx'
import Features from './feature/page.jsx'
import RootLayout from './layout.jsx'
import FeatureView from './feature/view/page.jsx'
import Dining from '@/dining/page.jsx'
import FoodSales from '@/dining/foodSales/page.jsx'
import Cafeteria from '@/dining/cafeteria/page.jsx'
import AllergyTable from '@/dining/foodSales/allergyTable/page.jsx'

const root = createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="feature" element={<Features />} />
        <Route path="feature/:postId" element={<FeatureView />} />
        <Route path="dining" element={<Dining />} />
        <Route path="dining/foodSales" element={<FoodSales />} />
        <Route path="dining/foodSales/allergyTable" element={<AllergyTable />} />
        <Route path="dining/cafeteria" element={<Cafeteria />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
