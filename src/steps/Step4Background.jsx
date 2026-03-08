import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step4Background({ goNext, goPrev }) {
    const { formData, updateField } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    const handleMultiselect = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        updateField('provisionalDiagnosis', options);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Clinical Background</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Record the clinical history, lab values, and provisional diagnosis.
            </p>

            <form onSubmit={handleNext}>
                <div className="form-group">
                    <label className="form-label">Clinical History</label>
                    <textarea
                        className="glass-input"
                        rows="3"
                        placeholder="Symptoms, duration, relevant history..."
                        value={formData.clinicalHistory}
                        onChange={(e) => updateField('clinicalHistory', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Known Thyroid Disease</label>
                    <select
                        className="glass-input"
                        value={formData.knownThyroidDisease}
                        onChange={(e) => updateField('knownThyroidDisease', e.target.value)}
                    >
                        <option value="">Select condition</option>
                        <option value="No">No</option>
                        <option value="Hypothyroidism">Hypothyroidism</option>
                        <option value="Hyperthyroidism">Hyperthyroidism</option>
                        <option value="Known goitre">Known goitre</option>
                        <option value="Post-surgical">Post-surgical</option>
                        <option value="Post-RAI">Post-RAI</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.previousFnaDone}
                            onChange={(e) => updateField('previousFnaDone', e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                        />
                        <span>Previous FNA Done?</span>
                    </label>
                </div>

                {formData.previousFnaDone && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <div className="form-group">
                            <label className="form-label">Date of Previous FNA</label>
                            <input type="date" className="glass-input" style={{ colorScheme: 'dark' }} value={formData.previousFnaDate} onChange={(e) => updateField('previousFnaDate', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Where</label>
                            <select className="glass-input" value={formData.previousFnaWhere} onChange={(e) => updateField('previousFnaWhere', e.target.value)}>
                                <option value="">Select Location</option>
                                <option value="Medanta">Medanta</option>
                                <option value="Outside">Outside</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Previous FNA Result</label>
                            <input type="text" className="glass-input" value={formData.previousFnaResult} onChange={(e) => updateField('previousFnaResult', e.target.value)} />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Indication for FNA</label>
                    <select className="glass-input" value={formData.indicationForFna} onChange={(e) => updateField('indicationForFna', e.target.value)}>
                        <option value="">Select Indication</option>
                        <option value="Routine surveillance">Routine surveillance</option>
                        <option value="Change in nodule">Change in nodule</option>
                        <option value="Clinical suspicion">Clinical suspicion</option>
                        <option value="Referred for FNA">Referred for FNA</option>
                        <option value="Pre-ablative treatment confirmation">Pre-ablative treatment confirmation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Provisional Diagnosis (Multi-select)</label>
                    <select
                        multiple
                        className="glass-input"
                        style={{ height: '120px', padding: '8px' }}
                        value={formData.provisionalDiagnosis}
                        onChange={handleMultiselect}
                    >
                        <option value="Benign nodule">Benign nodule</option>
                        <option value="Colloid goitre">Colloid goitre</option>
                        <option value="Thyroiditis">Thyroiditis</option>
                        <option value="Follicular neoplasm">Follicular neoplasm</option>
                        <option value="Papillary thyroid carcinoma">Papillary thyroid carcinoma</option>
                        <option value="Medullary carcinoma">Medullary carcinoma</option>
                        <option value="Lymphoma">Lymphoma</option>
                        <option value="Metastatic lymph node">Metastatic lymph node</option>
                        <option value="Reactive lymphadenopathy">Reactive lymphadenopathy</option>
                        <option value="Under evaluation">Under evaluation</option>
                    </select>
                    <small style={{ color: 'var(--text-muted)' }}>Hold Cmd/Ctrl to select multiple.</small>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.relevantLabValues}
                            onChange={(e) => updateField('relevantLabValues', e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                        />
                        <span>Relevant Lab Values?</span>
                    </label>
                </div>

                {formData.relevantLabValues && (
                    <div className="form-group">
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="e.g. TSH, T3, T4, calcitonin..."
                            value={formData.labValuesText}
                            onChange={(e) => updateField('labValuesText', e.target.value)}
                        />
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>Previous</button>
                    <button type="submit" className="btn-primary">Next: FNA Details</button>
                </div>
            </form>
        </div>
    );
}
