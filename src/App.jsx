import { useState } from 'react'
import { Clock3, Users, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import Dashboard from "./pages/Dashboard";

function App() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (isRegister && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (isRegister && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoggedIn(true)
  }

  function switchMode() {
    setIsRegister(!isRegister)
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

   if (loggedIn) {
  return (
    <Dashboard
      user={{
        name: isRegister ? name : email.split("@")[0],
        email: email
      }}
    />
  )
}

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-600 to-violet-700 text-white p-12">
          <div>
            <div className="flex items-center gap-3 text-2xl font-bold">
              <Clock3 size={32} />
              FocusMate
            </div>
            <h1 className="text-4xl font-bold leading-tight mt-20">
              Focus better.<br />
              Achieve more.<br />
              Together.
            </h1>
            <p className="mt-6 text-blue-100 text-lg">
              Build good habits, stay accountable, and reach your goals with your study team.
            </p>
          </div>
          <div className="space-y-4 text-blue-100">
            <p className="flex items-center gap-3">
              <Users size={20} /> Study together in focus rooms
            </p>
            <p className="flex items-center gap-3">
              <ShieldCheck size={20} /> Stay focused and avoid distractions
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2 text-blue-600 text-xl font-bold mb-8">
            <Clock3 size={28} /> FocusMate
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            {isRegister ? 'Create your account' : 'Welcome back!'}
          </h2>
          <p className="text-slate-500 mt-2 mb-8">
            {isRegister
              ? 'Join FocusMate and build better study habits.'
              : 'Sign in to continue your productivity journey.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Enter password again"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white hover:bg-blue-700 transition"
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-blue-600 hover:underline"
            >
              {isRegister ? 'Sign In' : 'Create account'}
            </button>
          </p>

          <p className="text-center text-xs text-slate-400 mt-4">
            Demo mode — backend authentication will be connected later.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App