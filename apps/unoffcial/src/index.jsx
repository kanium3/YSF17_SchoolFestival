import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './app.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
