import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import type { User } from '@supabase/supabase-js'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { ProfessionalDashboard } from './pages/ProfessionalDashboard'
import { ClientDashboard } from './pages/ClientDashboard'
import { PricingPage } from './pages/PricingPage'
import { QuestionnairePage } from './pages/QuestionnairePage'
import { DocumentPreviewPage } from './pages/DocumentPreviewPage'
import { ProfessionalReviewPage } from './pages/ProfessionalReviewPage'
import { FindAgentPage } from './pages/FindAgentPage'
import { Skeleton } from './components/Skeleton'
import type { UserRole, Profile } from './types'
import './App.css'

type Page = 
  | 'landing'
  | 'login'
  | 'register'
  | 'pricing'
  | 'questionnaire'
  | 'document-preview'
  | 'professional-review'
  | 'find-agent'
  | 'admin-dashboard'
  | 'professional-dashboard'
  | 'client-dashboard'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [loading, setLoading] = useState(true)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setProfile(null)
        setCurrentPage('landing')
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error

      setProfile(data)
      
      // Navigate to appropriate dashboard
      if (data.role === 'admin') {
        setCurrentPage('admin-dashboard')
      } else if (data.role === 'professional') {
        setCurrentPage('professional-dashboard')
      } else {
        setCurrentPage('client-dashboard')
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setCurrentPage('landing')
  }

  const handleNavigate = (page: Page, documentId?: string) => {
    if (documentId) {
      setSelectedDocumentId(documentId)
    }
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-skeleton">
          <div className="app-loading-header">
            <Skeleton width="150px" height="40px" variant="rectangular" />
            <div className="app-loading-header-actions">
              <Skeleton width="80px" height="32px" variant="rectangular" />
              <Skeleton width="80px" height="32px" variant="rectangular" />
            </div>
          </div>
          <div className="app-loading-content">
            <Skeleton width="100%" height="200px" variant="rectangular" />
            <div className="app-loading-cards">
              <Skeleton width="100%" height="150px" variant="rectangular" />
              <Skeleton width="100%" height="150px" variant="rectangular" />
              <Skeleton width="100%" height="150px" variant="rectangular" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render current page
  switch (currentPage) {
    case 'landing':
      return <LandingPage onNavigate={handleNavigate} />
    case 'login':
      return <LoginPage onNavigate={handleNavigate} />
    case 'register':
      return <RegisterPage onNavigate={handleNavigate} />
    case 'pricing':
      return <PricingPage onNavigate={handleNavigate} user={user} />
    case 'questionnaire':
      return <QuestionnairePage onNavigate={handleNavigate} user={user!} />
    case 'document-preview':
      return (
        <DocumentPreviewPage
          onNavigate={handleNavigate}
          documentId={selectedDocumentId!}
        />
      )
    case 'professional-review':
      return (
        <ProfessionalReviewPage
          onNavigate={handleNavigate}
          documentId={selectedDocumentId!}
          professionalId={user!.id}
        />
      )
    case 'find-agent':
      return <FindAgentPage onNavigate={handleNavigate} user={user} />
    case 'admin-dashboard':
      return (
        <AdminDashboard
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          profile={profile!}
        />
      )
    case 'professional-dashboard':
      return (
        <ProfessionalDashboard
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          profile={profile!}
        />
      )
    case 'client-dashboard':
      return (
        <ClientDashboard
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          profile={profile!}
        />
      )
    default:
      return <LandingPage onNavigate={handleNavigate} />
  }
}

export default App
