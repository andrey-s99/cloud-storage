import { Header } from './components/header/header'
import { AuthPage } from './pages/auth-page/auth-page'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { SignInForm } from './components/auth-forms/sign-in-form'
import { SignUpForm } from './components/auth-forms/sign-up-form'
import { HomePage } from './pages/home-page/home-page'
import './App.css'
import { AuthProvider } from './contexts/auth-context'

function App() {
  return (
    <AuthProvider>
      <Router>
          <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/cloud"/>} />
                <Route path="/cloud" element={<HomePage />} />
                <Route path="/sign-in" element={<AuthPage authForm={<SignInForm />} />} />
                <Route path="/sign-up" element={<AuthPage authForm={<SignUpForm />} />} />
            </Routes>
        </Router>
    </AuthProvider>
  )
}

export default App
