import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod'}/summit/admin/registrations`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setIsAuthenticated(true);
      } else {
        setError('Invalid password or unauthorized.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
    setLoading(false);
  };

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod'}/summit/admin/registrations`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="reg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%', margin: '0 20px' }}>
          <h2>Admin Login</h2>
          <div className="sub">Thyroid Intervention Summit 2026</div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="field">
              <input 
                type="password" 
                placeholder="Enter admin password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <div className="notice err">{error}</div>}
            <button type="submit" className="paybtn" disabled={loading}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-page">
      <header className="hero" style={{ paddingBottom: '20px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Summit Dashboard</h1>
            <button 
              onClick={() => { setIsAuthenticated(false); setPassword(''); }}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="wrap" style={{ maxWidth: '1200px' }}>
          <div className="card" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2>Registrations ({registrations.length})</h2>
              <button 
                onClick={fetchRegistrations}
                style={{ background: 'var(--teal)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Refresh
              </button>
            </div>
            
            {registrations.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                No registrations found yet.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--line)', textAlign: 'left', color: 'var(--muted)' }}>
                    <th style={{ padding: '12px 8px' }}>Date</th>
                    <th style={{ padding: '12px 8px' }}>Reg ID</th>
                    <th style={{ padding: '12px 8px' }}>Name</th>
                    <th style={{ padding: '12px 8px' }}>Category</th>
                    <th style={{ padding: '12px 8px' }}>Workshop</th>
                    <th style={{ padding: '12px 8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map(reg => (
                    <tr key={reg.id} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                      <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>{new Date(reg.timestamp).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{reg.id}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ fontWeight: 600 }}>{reg.title} {reg.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{reg.email} • {reg.mobile}</div>
                      </td>
                      <td style={{ padding: '12px 8px', textTransform: 'capitalize' }}>{reg.category}</td>
                      <td style={{ padding: '12px 8px' }}>
                        {reg.workshop ? <span style={{ color: 'var(--green)', fontWeight: 600 }}>Yes</span> : 'No'}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ 
                          background: reg.status === 'PAID' ? 'var(--green-tint)' : 'var(--amber-tint)', 
                          color: reg.status === 'PAID' ? 'var(--green)' : 'var(--amber)',
                          padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600
                        }}>
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
