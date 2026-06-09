import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step6Cytology({ goNext, goPrev }) {
    const { formData, updateSite } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    if (formData.sites.length === 0) {
        return (
            <div className="glass-panel animate-fade-in" style={{ padding: '24px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary)' }}>No Sites Added</h2>
                <p>No sites available for Cytology reporting.</p>
                <button type="button" className="btn-secondary" style={{ marginTop: '20px' }} onClick={goPrev}>Go Back</button>
            </div>
        );
    }

    const renderThyroidFields = (site) => (
        <>
            <div className="form-group">
                <label className="form-label">Bethesda Category</label>
                <select className="glass-input" value={site.bethesdaCategory || ''} onChange={(e) => updateSite(site.id, { bethesdaCategory: e.target.value })}>
                    <option value="">Select Category</option>
                    <option value="Category I">Category I — Non-diagnostic / Unsatisfactory</option>
                    <option value="Category II">Category II — Benign</option>
                    <option value="Category III">Category III — AUS / FLUS</option>
                    <option value="Category IV">Category IV — Follicular Neoplasm / SFN</option>
                    <option value="Category V">Category V — Suspicious for Malignancy</option>
                    <option value="Category VI">Category VI — Malignant</option>
                </select>
            </div>

            {site.bethesdaCategory === 'Category VI' && (
                <div className="form-group animate-fade-in">
                    <label className="form-label">Malignancy Type</label>
                    <select className="glass-input" value={site.malignancyType || ''} onChange={(e) => updateSite(site.id, { malignancyType: e.target.value })}>
                        <option value="">Select Type</option>
                        <option value="PTC">PTC</option>
                        <option value="Follicular carcinoma">Follicular carcinoma</option>
                        <option value="Medullary carcinoma">Medullary carcinoma</option>
                        <option value="Anaplastic carcinoma">Anaplastic carcinoma</option>
                        <option value="Lymphoma">Lymphoma</option>
                        <option value="Metastatic">Metastatic</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Additional Cytology Remark</label>
                <input
                    type="text"
                    className="glass-input"
                    placeholder="e.g. Hashimoto's, PTC..."
                    value={site.cytoRemark || ''}
                    onChange={(e) => updateSite(site.id, { cytoRemark: e.target.value })}
                />
            </div>
        </>
    );

    const renderLymphNodeFields = (site) => (
        <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Cytology Result (Descriptive)</label>
            <textarea
                className="glass-input"
                rows="3"
                placeholder="Type full descriptive report here..."
                value={site.cytoResult || ''}
                onChange={(e) => updateSite(site.id, { cytoResult: e.target.value })}
            />
        </div>
    );

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>FNA Cytology Results</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Record the final pathology received for each site. Note: This could be done days later.
            </p>

            <form onSubmit={handleNext}>
                {formData.sites.map((site) => (
                    <div key={site.id} style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>
                            {site.label}
                        </h3>

                        {/* Read-only Site Details Summary */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.015)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: 'var(--text-muted)'
                        }}>
                            {site.type === 'Nodule' ? (
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                                        Ultrasound & FNA Details (Nodule)
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px 16px' }}>
                                        <div>
                                            <strong>Location:</strong> {site.lobe || '—'} 
                                            {site.lobe && site.lobe !== 'Isthmus' && site.position && ` — ${site.position}`}
                                            {site.positionRemark && site.positionRemark.length > 0 && ` (${site.positionRemark.join(', ')})`}
                                            {site.lobe === 'Isthmus' && site.isthmicExtension && site.isthmicExtension !== 'None' && ` (${site.isthmicExtension})`}
                                        </div>
                                        <div>
                                            <strong>ACR TIRADS:</strong>{' '}
                                            <span style={{ 
                                                display: 'inline-flex', gap: '6px', alignItems: 'center'
                                            }}>
                                                {site.radTirads && (
                                                    <span style={{ 
                                                        background: 'rgba(255, 255, 255, 0.05)', 
                                                        padding: '2px 6px', 
                                                        borderRadius: '4px',
                                                        fontSize: '11px' 
                                                    }}>
                                                        Rad: {site.radTirads}
                                                    </span>
                                                )}
                                                {site.irTirads && (
                                                    <span style={{ 
                                                        background: ['TR4', 'TR5'].includes(site.irTirads) ? 'rgba(255, 165, 2, 0.15)' : 'rgba(0, 225, 255, 0.1)', 
                                                        color: ['TR4', 'TR5'].includes(site.irTirads) ? '#ffa502' : 'var(--primary)', 
                                                        padding: '2px 6px', 
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: '600'
                                                    }}>
                                                        IR Team: {site.irTirads}
                                                    </span>
                                                )}
                                                {!site.radTirads && !site.irTirads && '—'}
                                            </span>
                                        </div>
                                        <div>
                                            <strong>FNA Type:</strong> {site.fnaType || '—'} {site.needlePasses ? `(${site.needlePasses} passes)` : ''}
                                        </div>
                                        <div>
                                            <strong>ROSE Done:</strong>{' '}
                                            {site.roseDone ? (
                                                <span style={{ 
                                                    background: site.roseResult === 'Adequate' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)', 
                                                    color: site.roseResult === 'Adequate' ? '#2ed573' : '#ff4757', 
                                                    padding: '2px 6px', 
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600'
                                                }}>
                                                    Yes ({site.roseResult || 'Result pending'})
                                                </span>
                                            ) : 'No'}
                                        </div>
                                    </div>
                                    {site.irImpression && (
                                        <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                                            <strong>IR Impression:</strong> <span style={{ fontStyle: 'italic', color: '#fff' }}>"{site.irImpression}"</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                                        Ultrasound & FNA Details (Lymph Node)
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px 16px' }}>
                                        <div>
                                            <strong>Location:</strong> {site.nodalLevel || '—'} {site.side ? `(${site.side} side)` : ''}
                                        </div>
                                        <div>
                                            <strong>Assessment:</strong>{' '}
                                            <span style={{ 
                                                display: 'inline-flex', gap: '6px', alignItems: 'center'
                                            }}>
                                                {site.radAssessment && (
                                                    <span style={{ 
                                                        background: site.radAssessment === 'Suspicious' ? 'rgba(255, 71, 87, 0.12)' : 'rgba(255, 255, 255, 0.05)', 
                                                        color: site.radAssessment === 'Suspicious' ? '#ff4757' : 'var(--text-muted)',
                                                        padding: '2px 6px', 
                                                        borderRadius: '4px',
                                                        fontSize: '11px' 
                                                    }}>
                                                        Rad: {site.radAssessment}
                                                    </span>
                                                )}
                                                {site.irAssessment && (
                                                    <span style={{ 
                                                        background: site.irAssessment === 'Suspicious' ? 'rgba(255, 71, 87, 0.15)' : 'rgba(46, 213, 115, 0.15)', 
                                                        color: site.irAssessment === 'Suspicious' ? '#ff4757' : '#2ed573', 
                                                        padding: '2px 6px', 
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: '600'
                                                    }}>
                                                        IR Team: {site.irAssessment}
                                                    </span>
                                                )}
                                                {!site.radAssessment && !site.irAssessment && '—'}
                                            </span>
                                        </div>
                                        <div>
                                            <strong>FNA Type:</strong> {site.fnaType || '—'} {site.needlePasses ? `(${site.needlePasses} passes)` : ''}
                                        </div>
                                        <div>
                                            <strong>ROSE Done:</strong>{' '}
                                            {site.roseDone ? (
                                                <span style={{ 
                                                    background: site.roseResult === 'Adequate' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)', 
                                                    color: site.roseResult === 'Adequate' ? '#2ed573' : '#ff4757', 
                                                    padding: '2px 6px', 
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600'
                                                }}>
                                                    Yes ({site.roseResult || 'Result pending'})
                                                </span>
                                            ) : 'No'}
                                        </div>
                                    </div>
                                    {site.irImpression && (
                                        <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                                            <strong>IR Impression:</strong> <span style={{ fontStyle: 'italic', color: '#fff' }}>"{site.irImpression}"</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={site.cytoReportReceived || false}
                                    onChange={(e) => updateSite(site.id, { cytoReportReceived: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                                />
                                <span>Cytology Report Received?</span>
                            </label>
                        </div>

                        {site.cytoReportReceived && (
                            <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Report Date</label>
                                        <input type="date" className="glass-input" style={{ colorScheme: 'dark' }} value={site.cytoReportDate || ''} onChange={(e) => updateSite(site.id, { cytoReportDate: e.target.value })} />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Reported By</label>
                                        <input type="text" className="glass-input" placeholder="Pathologist Name" value={site.cytoReportedBy || ''} onChange={(e) => updateSite(site.id, { cytoReportedBy: e.target.value })} />
                                    </div>
                                </div>

                                {site.type === 'Nodule' ? renderThyroidFields(site) : renderLymphNodeFields(site)}
                            </div>
                        )}
                    </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>Previous</button>
                    <button type="submit" className="btn-primary">Next: Decision</button>
                </div>
            </form>
        </div>
    );
}
