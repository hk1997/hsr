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
