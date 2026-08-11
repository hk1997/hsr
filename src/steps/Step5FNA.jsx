import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step5FNA({ goNext, goPrev }) {
    const { formData, updateSite } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    if (formData.sites.length === 0) {
        return (
            <div className="glass-panel animate-fade-in" style={{ padding: '24px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary)' }}>No Sites Added</h2>
                <p>You did not add any nodules or lymph nodes in Step 3.</p>
                <button type="button" className="btn-secondary" style={{ marginTop: '20px' }} onClick={goPrev}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>FNA Details (Per Site)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Record the aspiration details for each site identified during Ultrasound.
            </p>

            <form onSubmit={handleNext}>
                {formData.sites.map((site, index) => (
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

                        {/* Read-only Ultrasound Details Summary */}
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
                                        Ultrasound Details (Nodule)
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
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                                        Ultrasound Details (Lymph Node)
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
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">FNA Type</label>
                            <select className="glass-input" value={site.fnaType || ''} onChange={(e) => updateSite(site.id, { fnaType: e.target.value })}>
                                <option value="">Select</option>
                                <option value="First time">First time</option>
                                <option value="Repeat">Repeat</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Number of Needle Passes</label>
                            <input
                                type="number"
                                className="glass-input"
                                placeholder="e.g. 2"
                                value={site.needlePasses || ''}
                                onChange={(e) => updateSite(site.id, { needlePasses: e.target.value })}
                            />
                        </div>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={site.roseDone || false}
                                    onChange={(e) => updateSite(site.id, { roseDone: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                                />
                                <span>ROSE Done?</span>
                            </label>
                        </div>

                        {site.roseDone && (
                            <div className="form-group animate-fade-in">
                                <label className="form-label">ROSE Result</label>
                                <select className="glass-input" value={site.roseResult || ''} onChange={(e) => updateSite(site.id, { roseResult: e.target.value })}>
                                    <option value="">Select Result</option>
                                    <option value="Adequate">Adequate</option>
                                    <option value="Inadequate">Inadequate</option>
                                    <option value="Suspicious">Suspicious</option>
                                    <option value="Positive for malignancy">Positive for malignancy</option>
                                </select>
                            </div>
                        )}

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">IR Impression (Real-time opinion)</label>
                            <textarea
                                className="glass-input"
                                rows="2"
                                placeholder="Type real-time impression here..."
                                value={site.irImpression || ''}
                                onChange={(e) => updateSite(site.id, { irImpression: e.target.value })}
                            />
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>Previous</button>
                    <button type="submit" className="btn-primary">Next: Cytology</button>
                </div>
            </form>
        </div>
    );
}
