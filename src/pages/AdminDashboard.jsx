import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div className="app-container animate-fade-in" style={{ maxWidth: '800px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Admin Dashboard</h1>
                <Link to="/procedure/step-1" className="btn-secondary">Back to App</Link>
            </header>

            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary)' }}>Doctor Management</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    This portal will allow you to add and remove Interventional Radiologists (Operators).
                </p>
                <p style={{ marginTop: '16px', fontStyle: 'italic', fontSize: '14px' }}>
                    (Under Construction for Phase 5)
                </p>
            </div>
        </div>
    );
}
