import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function Step2Procedure({ goNext, goPrev }) {
    const { formData, updateField } = useFormStore();

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Procedure Details</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Record the clinical parameters of the FNA procedure.
            </p>

            <form onSubmit={handleNext}>
                <div className="form-group">
                    <label className="form-label">Date of Procedure *</label>
                    <input
                        type="date"
                        className="glass-input"
                        value={formData.dateOfProcedure}
                        onChange={(e) => updateField('dateOfProcedure', e.target.value)}
                        required
                        style={{ colorScheme: 'dark' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Procedure Type *</label>
                    <select
                        className="glass-input"
                        value={formData.procedureType}
                        onChange={(e) => updateField('procedureType', e.target.value)}
                        required
                    >
                        <option value="">Select Procedure</option>
                        <option value="Thyroid FNA">Thyroid FNA</option>
                        <option value="Lymph Node FNA">Lymph Node FNA</option>
                        <option value="Both">Both</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Operator *</label>
                    <select
                        className="glass-input"
                        value={formData.operator}
                        onChange={(e) => updateField('operator', e.target.value)}
                        required
                    >
                        <option value="">Select Operator</option>
                        {/* Mocking the 6 IRs until Admin Panel is integrated */}
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Dr. Jones">Dr. Jones</option>
                        <option value="Dr. Patel">Dr. Patel</option>
                        <option value="Dr. Gupta">Dr. Gupta</option>
                        <option value="Dr. Sharma">Dr. Sharma</option>
                        <option value="Dr. Davis">Dr. Davis</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Needle Gauge</label>
                    <select
                        className="glass-input"
                        value={formData.needleGauge}
                        onChange={(e) => updateField('needleGauge', e.target.value)}
                    >
                        <option value="">Select Gauge</option>
                        <option value="22G">22G</option>
                        <option value="26G">26G</option>
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>
                        Previous
                    </button>
                    <button type="submit" className="btn-primary" disabled={!formData.dateOfProcedure || !formData.procedureType || !formData.operator}>
                        Next: Ultrasound
                    </button>
                </div>
            </form>
        </div>
    );
}
