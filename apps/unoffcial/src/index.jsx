import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './home/page.jsx'
import Features from './feature/page.jsx'
import RootLayout from './layout.jsx'
import FeatureView from './feature/view/page.jsx'

const root = createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="feature" element={<Features />} />
        <Route path="feature/:postId" element={<FeatureView />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
