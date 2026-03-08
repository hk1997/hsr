import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaseManagement from '../components/Admin/CaseManagement';
import DoctorManagement from '../components/Admin/DoctorManagement';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('cases');

    return (
        <div className="app-container animate-fade-in" style={{ padding: '0 20px 40px' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid var(--card-border)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
                        A
                    </div>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Admin Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Hospital Sarthi Thyroid FNA</p>
                    </div>
                </div>
                <button className="btn-secondary" onClick={() => navigate('/procedure/step-1')}>
                    Close Admin
                </button>
            </header>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <button
                    onClick={() => setActiveTab('cases')}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'cases' ? 'rgba(0, 225, 255, 0.15)' : 'transparent',
                        color: activeTab === 'cases' ? 'var(--primary)' : 'var(--text-light)',
                        borderBottom: activeTab === 'cases' ? '2px solid var(--primary)' : '2px solid transparent',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Case Records
                </button>
                <button
                    onClick={() => setActiveTab('doctors')}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'doctors' ? 'rgba(0, 225, 255, 0.15)' : 'transparent',
                        color: activeTab === 'doctors' ? 'var(--primary)' : 'var(--text-light)',
                        borderBottom: activeTab === 'doctors' ? '2px solid var(--primary)' : '2px solid transparent',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Manage Doctors
                </button>
            </div>

            <main>
                {activeTab === 'cases' ? <CaseManagement /> : <DoctorManagement />}
            </main>
        </div>
    );
}
