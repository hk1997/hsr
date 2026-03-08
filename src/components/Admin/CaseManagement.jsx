import React, { useState, useEffect } from 'react';

export default function CaseManagement() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://jdj0yduaka.execute-api.ap-south-1.amazonaws.com/prod';
            const response = await fetch(`${apiUrl}/cases`);
            if (!response.ok) throw new Error('Failed to fetch cases');

            const data = await response.json();
            // Sort by createdAt descending
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCases(sortedData);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ color: 'var(--primary)', textAlign: 'center', padding: '40px' }}>Loading cases...</div>;
    if (error) return <div style={{ color: '#ff4757', textAlign: 'center', padding: '40px' }}>Error: {error}</div>;

    return (
        <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px' }}>Submitted FNA Cases ({cases.length})</h2>
                <button className="btn-secondary" onClick={fetchCases} style={{ padding: '8px 16px', fontSize: '14px' }}>Refresh</button>
            </div>

            {cases.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No cases found in database.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Date</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Case ID</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>UHID</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Sites</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((record) => (
                                <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '16px' }}>{new Date(record.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px', color: 'var(--primary)' }}>{record.id.substring(0, 10)}...</td>
                                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{record.uhid || 'N/A'}</td>
                                    <td style={{ padding: '16px' }}>
                                        {record.sites && record.sites.length > 0 ? (
                                            <span style={{ background: 'rgba(0, 225, 255, 0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                                {record.sites.length} Identified
                                            </span>
                                        ) : 'None'}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: record.caseStatus === 'Closed' ? '#2ed573' : '#ffa502',
                                            marginRight: '8px'
                                        }}></span>
                                        {record.caseStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
