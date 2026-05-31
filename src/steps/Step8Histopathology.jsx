import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore';
import toast from 'react-hot-toast';
import MemoizedSiteField from '../components/MemoizedSiteField';

export default function Step8Histopathology({ goNext, goPrev }) {
    const { formData, updateField, updateSite, submitCaseToServer, isSubmitting } = useFormStore();
    const navigate = useNavigate();

    const handleNext = async (e) => {
        e.preventDefault();

        const success = await submitCaseToServer();
        if (success) {
            toast.success(`Case saved and marked as ${formData.caseStatus}`);
            navigate('/admin');
        } else {
            toast.error('Failed to save case to cloud. Data is securely saved offline.');
        }
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

                {/* Per Site Iteration — Memoized for performance */}
                {formData.histopathologyReportReceived && formData.sites.map((site) => (
                    <MemoizedSiteField key={site.id} site={site} updateSite={updateSite} />
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
                    <button type="button" className="btn-secondary" onClick={goPrev} disabled={isSubmitting}>Previous</button>
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            background: isSubmitting ? 'var(--card-bg)' : 'linear-gradient(135deg, #2ed573 0%, #17b357 100%)',
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Final Record'}
                    </button>
                </div>
            </form>
        </div>
    );
}
