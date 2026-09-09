import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await axiosInstance.post('/users/register', formData)
      navigate('/home')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased">
      {/* Header / Logo Area */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-sm mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">Join the community and start sharing today.</p>
      </div>

      {/* Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm ring-1 ring-slate-900/5 sm:rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Name
              </label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 text-sm transition-all duration-150 outline-none"
              />
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Username
              </label>
              <div className="relative rounded-xl shadow-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm select-none">
                  @
                </span>
                <input 
                  id="username" 
                  name="username" 
                  type="text" 
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="alexmorgan"
                  className="w-full rounded-xl border-0 py-2.5 pl-8 pr-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 text-sm transition-all duration-150 outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Email
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 text-sm transition-all duration-150 outline-none"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Password
              </label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 text-sm transition-all duration-150 outline-none"
              />
            </div>

            {/* Sign Up Button */}
            <div className="pt-2">
              {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all duration-150 shadow-sm cursor-pointer"
              >
                {isSubmitting ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          {/* Terms Notice */}
          <p className="mt-4 text-center text-xs text-slate-400">
            By signing up, you agree to our{' '}
            <a href="#terms" className="underline hover:text-slate-600">Terms</a> and{' '}
            <a href="#privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
          </p>
        </div>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup