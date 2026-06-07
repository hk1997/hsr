import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useFormStore } from '../../store/useFormStore';

// Convert an ISO timestamp to a local YYYY-MM-DD string for date comparison.
const toLocalDateString = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
};

// The case's effective date: explicit caseDate (YYYY-MM-DD) if set, else the createdAt timestamp.
const getCaseDateString = (record) => record.caseDate || toLocalDateString(record.createdAt);

// Format a YYYY-MM-DD string as a localized date without timezone shifting.
const formatCaseDate = (record) => {
    const ds = getCaseDateString(record);
    if (!ds) return '—';
    const [year, month, day] = ds.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
};

const searchInputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--card-border)',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--text)',
    fontSize: '14px',
    boxSizing: 'border-box',
};

// Native date inputs have an intrinsic min-width on WebKit and ignore width:100%.
// When the filter row wraps on mobile the Date field takes a full-width row, so
// cap it at 70% to keep it compact and prevent overflow.
const dateInputStyle = {
    ...searchInputStyle,
    minWidth: 0,
    maxWidth: '70%',
};

export default function CaseManagement() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uhidFilter, setUhidFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        setIsLoading(true);
        try {
            const apiUrl = (import.meta.env.VITE_API_URL || 'https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod').replace(/\/$/, '');
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

    const resetForm = useFormStore((state) => state.resetForm);

    const handleEdit = (caseId) => {
        navigate(`/procedure/edit/${caseId}/step-1`);
    };

    const handleNewCase = () => {
        resetForm();
        navigate('/procedure/step-1');
    };

    const hasActiveFilter = uhidFilter.trim() !== '' || nameFilter.trim() !== '' || dateFilter !== '';

    const clearFilters = () => {
        setUhidFilter('');
        setNameFilter('');
        setDateFilter('');
    };

    const filteredCases = useMemo(() => {
        const uhidTerm = uhidFilter.trim().toLowerCase();
        const nameTerm = nameFilter.trim().toLowerCase();
        return cases.filter((record) => {
            const matchesUhid = uhidTerm === '' || (record.uhid || '').toLowerCase().includes(uhidTerm);
            const matchesName = nameTerm === '' || (record.patientName || '').toLowerCase().includes(nameTerm);
            const matchesDate = dateFilter === '' || getCaseDateString(record) === dateFilter;
            return matchesUhid && matchesName && matchesDate;
        });
    }, [cases, uhidFilter, nameFilter, dateFilter]);

    if (isLoading) return <div style={{ color: 'var(--primary)', textAlign: 'center', padding: '40px' }}>Loading cases...</div>;
    if (error) return <div style={{ color: '#ff4757', textAlign: 'center', padding: '40px' }}>Error: {error}</div>;

    return (
        <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px' }}>Submitted FNA Cases ({filteredCases.length})</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="btn-primary"
                        onClick={handleNewCase}
                        style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}
                        aria-label="Create New Case"
                    >
                        <Plus size={16} /> New Case
                    </button>
                    <button className="btn-secondary" onClick={fetchCases} style={{ padding: '8px 16px', fontSize: '14px' }}>Refresh</button>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px', flex: '1 1 160px' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '12px' }}>UHID</label>
                    <input
                        type="text"
                        value={uhidFilter}
                        onChange={(e) => setUhidFilter(e.target.value.toUpperCase())}
                        placeholder="Search by UHID…"
                        style={{ ...searchInputStyle, textTransform: 'uppercase' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px', flex: '1 1 160px' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Patient Name</label>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Search by name…"
                        style={searchInputStyle}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px', flex: '1 1 160px' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Date</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        style={dateInputStyle}
                    />
                </div>
                {hasActiveFilter && (
                    <button className="btn-secondary" onClick={clearFilters} style={{ padding: '10px 16px', fontSize: '14px' }}>
                        Clear
                    </button>
                )}
            </div>

            {cases.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No cases found in database.</p>
            ) : filteredCases.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No cases match your filters.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Date</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Patient</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>UHID</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Sites</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Status</th>
                                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 'normal' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCases.map((record) => (
                                <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '16px' }}>{formatCaseDate(record)}</td>
                                    <td style={{ padding: '16px', fontWeight: '500' }}>{record.patientName || '—'}</td>
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
                                    <td style={{ padding: '16px' }}>
                                        <button
                                            onClick={() => handleEdit(record.id)}
                                            style={{
                                                padding: '6px 16px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--primary)',
                                                background: 'rgba(0, 225, 255, 0.08)',
                                                color: 'var(--primary)',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 225, 255, 0.2)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 225, 255, 0.08)';
                                            }}
                                        >
                                            Edit
                                        </button>
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

