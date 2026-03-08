import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step1Demographics({ goNext }) {
    const { formData, updateField } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.uhid.length < 3) return; // Simple validation block
        goNext();
    };

    return (
        <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Patient Demographics</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Please enter the patient's Universal Health Identifier (UHID).
            </p>

            <form onSubmit={handleNext}>
                <div className="form-group">
                    <label className="form-label">UHID *</label>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="e.g. MED123456"
                        value={formData.uhid}
                        onChange={(e) => updateField('uhid', e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Patient Name (Optional)</label>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Full Name"
                        value={formData.patientName}
                        onChange={(e) => updateField('patientName', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="glass-input"
                            placeholder="Years"
                            value={formData.age}
                            onChange={(e) => updateField('age', e.target.value)}
                        />
                    </div>

                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label className="form-label">Gender</label>
                        <select
                            className="glass-input"
                            value={formData.gender}
                            onChange={(e) => updateField('gender', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                    <button type="submit" className="btn-primary" disabled={!formData.uhid}>
                        Next: Procedure
                    </button>
                </div>
            </form>
        </div>
    );
}
