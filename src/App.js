import "./App.css"
import Home from "./pages/Home"
import { AuthProvider } from "./context/auth"

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

export default App
