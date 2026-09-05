import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF8F4',
          padding: '24px',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            background: '#FFDF34',
            border: '3px solid #0E0F14',
            borderRadius: '24px',
            boxShadow: '8px 8px 0px #0E0F14',
            padding: '32px',
            maxWidth: '540px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>
              Oops, Terjadi Kendala Render!
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#1F2937', marginBottom: '20px' }}>
              {this.state.error?.message || 'Gagal memuat komponen antarmuka.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                boxShadow: '3px 3px 0px #0E0F14',
                padding: '10px 24px',
                borderRadius: '999px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
