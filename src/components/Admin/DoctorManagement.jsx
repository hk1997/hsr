import React, { useState, useEffect } from 'react';

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newDocName, setNewDocName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'https://jdj0yduaka.execute-api.ap-south-1.amazonaws.com/prod';

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/doctors`);
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();
            setDoctors(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        if (!newDocName.trim()) return;

        setIsSaving(true);
        try {
            const response = await fetch(`${apiUrl}/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newDocName })
            });
            if (!response.ok) throw new Error('Failed to add doctor');
            setNewDocName('');
            await fetchDoctors();
        } catch (err) {
            alert('Error adding doctor: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to remove this doctor?')) return;

        try {
            const response = await fetch(`${apiUrl}/doctors/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete');
            setDoctors(doctors.filter(d => d.id !== id));
        } catch (err) {
            alert('Error deleting: ' + err.message);
        }
    };

    if (isLoading) return <div style={{ color: 'var(--primary)', textAlign: 'center', padding: '40px' }}>Loading doctors...</div>;

    return (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', height: 'fit-content' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Add IR Doctor</h2>
                <form onSubmit={handleAddDoctor}>
                    <div className="form-group">
                        <label className="form-label">Doctor's Name</label>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="e.g. Dr. A. Sharma"
                            value={newDocName}
                            onChange={(e) => setNewDocName(e.target.value)}
                            disabled={isSaving}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isSaving || !newDocName.trim()} style={{ width: '100%' }}>
                        {isSaving ? 'Registering...' : 'Register Doctor'}
                    </button>
                </form>
            </div>

            <div className="glass-panel" style={{ flex: '2 1 500px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px' }}>Active Staff ({doctors.length})</h2>
                </div>

                {error && <p style={{ color: '#ff4757', marginBottom: '16px' }}>{error}</p>}

                {doctors.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No doctors registered yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {doctors.map(doc => (
                            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 225, 255, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {doc.name.charAt(0)}
                                    </div>
                                    <span style={{ fontWeight: '500' }}>{doc.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    style={{ background: 'transparent', border: '1px solid rgba(255, 71, 87, 0.3)', color: '#ff4757', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
