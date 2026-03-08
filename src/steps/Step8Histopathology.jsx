import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step8Histopathology({ goNext, goPrev }) {
    const { formData, updateField, updateSite } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        // In a real app, this would submit to API
        alert('Case saved and marked as ' + formData.caseStatus);
    };

    if (!formData.surgeryDone) {
        return (
            <div className="glass-panel animate-fade-in" style={{ padding: '24px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary)' }}>Not Applicable</h2>
                <p>Surgery was marked as not done in the previous step. You can close this case.</p>
                <button type="button" className="btn-secondary" style={{ marginTop: '20px' }} onClick={goPrev}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Histopathology Confirmation</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Final gold standard diagnosis and Cyto-Histo correlation.
            </p>

            <form onSubmit={handleNext}>
                {/* General Details */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
                    <div className="form-group">
                        <label className="form-label">Type of Surgery</label>
                        <select className="glass-input" value={formData.typeOfSurgery} onChange={(e) => updateField('typeOfSurgery', e.target.value)}>
                            <option value="">Select Surgery</option>
                            <option value="Hemithyroidectomy">Hemithyroidectomy</option>
                            <option value="Total thyroidectomy">Total thyroidectomy</option>
                            <option value="Total thyroidectomy with neck dissection">Total thyroidectomy with neck dissection</option>
                            <option value="Lymph node excision biopsy">Lymph node excision biopsy</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={formData.histopathologyReportReceived}
                                onChange={(e) => updateField('histopathologyReportReceived', e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                            />
                            <span>Histopathology Report Received?</span>
                        </label>
                    </div>
                </div>

                {/* Per Site Iteration */}
                {formData.histopathologyReportReceived && formData.sites.map((site) => (
                    <div key={site.id} className="animate-fade-in" style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>{site.label}</h3>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Report Date</label>
                                <input type="date" className="glass-input" style={{ colorScheme: 'dark' }} value={site.histoReportDate || ''} onChange={(e) => updateSite(site.id, { histoReportDate: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Reported By</label>
                                <input type="text" className="glass-input" placeholder="Name" value={site.histoReportedBy || ''} onChange={(e) => updateSite(site.id, { histoReportedBy: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Final Histopathological Diagnosis</label>
                            <select className="glass-input" value={site.histoDiagnosis || ''} onChange={(e) => updateSite(site.id, { histoDiagnosis: e.target.value })}>
                                <option value="">Select Diagnosis</option>
                                <option value="Benign — colloid goitre">Benign — colloid goitre</option>
                                <option value="Benign — thyroiditis">Benign — thyroiditis</option>
                                <option value="Follicular adenoma">Follicular adenoma</option>
                                <option value="Follicular carcinoma">Follicular carcinoma</option>
                                <option value="Papillary thyroid carcinoma">Papillary thyroid carcinoma</option>
                                <option value="Medullary carcinoma">Medullary carcinoma</option>
                                <option value="Anaplastic carcinoma">Anaplastic carcinoma</option>
                                <option value="Lymphoma">Lymphoma</option>
                                <option value="Metastatic">Metastatic</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {site.histoDiagnosis === 'Papillary thyroid carcinoma' && (
                            <div className="form-group animate-fade-in">
                                <label className="form-label">PTC Subtype</label>
                                <select className="glass-input" value={site.ptcSubtype || ''} onChange={(e) => updateSite(site.id, { ptcSubtype: e.target.value })}>
                                    <option value="">Subtype</option>
                                    <option value="Classical">Classical</option>
                                    <option value="Follicular variant">Follicular variant</option>
                                    <option value="Tall cell">Tall cell</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Cytology-Histopathology Correlation</label>
                            <select className="glass-input" value={site.cytoHistoCorrelation || ''} onChange={(e) => updateSite(site.id, { cytoHistoCorrelation: e.target.value })}>
                                <option value="">Select Correlation</option>
                                <option value="True positive">True positive</option>
                                <option value="True negative">True negative</option>
                                <option value="False positive">False positive</option>
                                <option value="False negative">False negative</option>
                                <option value="Indeterminate">Indeterminate</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Correlation Remark</label>
                            <input type="text" className="glass-input" value={site.correlationRemark || ''} onChange={(e) => updateSite(site.id, { correlationRemark: e.target.value })} />
                        </div>
                    </div>
                ))}

                <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '32px 0' }} />

                <div className="form-group" style={{ background: 'rgba(0, 225, 255, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                    <label className="form-label" style={{ color: 'white' }}>Final Case Status</label>
                    <select
                        className="glass-input"
                        style={{ fontWeight: 'bold' }}
                        value={formData.caseStatus}
                        onChange={(e) => updateField('caseStatus', e.target.value)}
                    >
                        <option value="Open">Open (Pending Results)</option>
                        <option value="Closed">Closed (Correlated & Finished)</option>
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>Previous</button>
                    <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #2ed573 0%, #17b357 100%)' }}>
                        Submit Final Record
                    </button>
                </div>
            </form>
        </div>
    );
}
