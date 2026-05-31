import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore';
import toast from 'react-hot-toast';

export default function Step7Decision({ goNext, goPrev }) {
    const { formData, updateField, submitCaseToServer, isSubmitting } = useFormStore();
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    const handleSaveAndExit = async () => {
        const success = await submitCaseToServer();
        if (success) {
            toast.success(`Case saved as ${formData.caseStatus}. No histopathology needed.`);
            navigate('/admin');
        } else {
            toast.error('Failed to save case to cloud. Data is securely saved offline.');
        }
    };

    const handleAblationSelect = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        updateField('ablationType', options);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Clinical Decision & Follow-up</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Record the multidisciplinary decision made following the cytological reports.
            </p>

            <form onSubmit={handleNext}>
                <div className="form-group">
                    <label className="form-label">Clinical Decision *</label>
                    <select
                        className="glass-input"
                        value={formData.clinicalDecision}
                        onChange={(e) => updateField('clinicalDecision', e.target.value)}
                        required
                    >
                        <option value="">Select Decision</option>
                        <option value="Repeat FNA">Repeat FNA</option>
                        <option value="Surveillance-Follow-up ultrasound">Surveillance-Follow-up ultrasound</option>
                        <option value="Medical management">Medical management</option>
                        <option value="Surgery recommended">Surgery recommended</option>
                        <option value="Referred to oncology">Referred to oncology</option>
                        <option value="Ablation planned">Ablation planned</option>
                        <option value="No further action">No further action</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {formData.clinicalDecision === 'Ablation planned' && (
                    <div className="form-group animate-fade-in">
                        <label className="form-label">Ablation Type</label>
                        <select
                            multiple
                            className="glass-input"
                            style={{ height: '80px', padding: '8px' }}
                            value={formData.ablationType}
                            onChange={handleAblationSelect}
                        >
                            <option value="RFA">RFA</option>
                            <option value="Ethanol">Ethanol</option>
                        </select>
                        <small style={{ color: 'var(--text-muted)' }}>Hold Cmd/Ctrl to select multiple.</small>
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Decision Made By</label>
                    <select
                        className="glass-input"
                        value={formData.decisionMadeBy}
                        onChange={(e) => updateField('decisionMadeBy', e.target.value)}
                    >
                        <option value="">Select Department/Team</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Surgery">Surgery</option>
                        <option value="ENT">ENT</option>
                        <option value="Oncology">Oncology</option>
                        <option value="MDT">MDT</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', width: '100%' }}>
                        <input
                            type="checkbox"
                            checked={formData.surgeryDone}
                            onChange={(e) => updateField('surgeryDone', e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                        />
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>Surgery Done / Completed?</span>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Check this to unlock the Histopathology Confirmation section.</p>
                        </div>
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev} disabled={isSubmitting}>Previous</button>
                    {formData.surgeryDone ? (
                        <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #00e1ff 0%, #0072ff 100%)' }}>Next: Histopathology</button>
                    ) : (
                        <button
                            type="button"
                            className="btn-primary"
                            style={{
                                background: isSubmitting ? 'var(--card-bg)' : 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleSaveAndExit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Case & Exit'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

