import React, { memo } from 'react';

const MemoizedSiteField = memo(({ site, updateSite }) => {
    return (
        <div className="animate-fade-in" style={{
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
                    <input
                        type="date"
                        className="glass-input"
                        style={{ colorScheme: 'dark' }}
                        value={site.histoReportDate || ''}
                        onChange={(e) => updateSite(site.id, { histoReportDate: e.target.value })}
                    />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Reported By</label>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Name"
                        value={site.histoReportedBy || ''}
                        onChange={(e) => updateSite(site.id, { histoReportedBy: e.target.value })}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Final Histopathological Diagnosis</label>
                <select
                    className="glass-input"
                    value={site.histoDiagnosis || ''}
                    onChange={(e) => updateSite(site.id, { histoDiagnosis: e.target.value })}
                >
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
                    <select
                        className="glass-input"
                        value={site.ptcSubtype || ''}
                        onChange={(e) => updateSite(site.id, { ptcSubtype: e.target.value })}
                    >
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
                <select
                    className="glass-input"
                    value={site.cytoHistoCorrelation || ''}
                    onChange={(e) => updateSite(site.id, { cytoHistoCorrelation: e.target.value })}
                >
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
                <input
                    type="text"
                    className="glass-input"
                    value={site.correlationRemark || ''}
                    onChange={(e) => updateSite(site.id, { correlationRemark: e.target.value })}
                />
            </div>
        </div>
    );
});

export default MemoizedSiteField;
