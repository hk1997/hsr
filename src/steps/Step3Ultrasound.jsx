import React, { useState } from 'react';
import { useFormStore } from '../store/useFormStore';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function Step3Ultrasound({ goNext, goPrev }) {
    const { formData, addSite, removeSite, updateSite } = useFormStore();
    const [siteType, setSiteType] = useState('Nodule'); // UI toggle for adding Nodule vs Lymph Node

    const handleNext = (e) => {
        e.preventDefault();
        goNext();
    };

    const handleAddSite = () => {
        const newSite = {
            type: siteType,
            label: `Site ${formData.sites.length + 1} - New ${siteType}`,
            // Nodule fields
            lobe: '', position: '', positionRemark: [], isthmicExtension: '', radTirads: '', irTirads: '',
            // Lymph Node fields
            nodalLevel: '', side: '', radAssessment: '', irAssessment: false,
        };
        addSite(newSite);
    };

    const renderThyroidFields = (site) => (
        <>
            <div className="form-group">
                <label className="form-label">Lobe *</label>
                <select className="glass-input" value={site.lobe} onChange={(e) => updateSite(site.id, { lobe: e.target.value })} required>
                    <option value="">Select Lobe</option>
                    <option value="Right lobe">Right Lobe</option>
                    <option value="Left lobe">Left Lobe</option>
                    <option value="Isthmus">Isthmus</option>
                </select>
            </div>

            {site.lobe !== 'Isthmus' && (
                <div className="form-group">
                    <label className="form-label">Position within lobe</label>
                    <select className="glass-input" value={site.position} onChange={(e) => updateSite(site.id, { position: e.target.value })}>
                        <option value="">Select Position</option>
                        <option value="Upper pole">Upper Pole</option>
                        <option value="Mid pole">Mid Pole</option>
                        <option value="Lower pole">Lower Pole</option>
                    </select>
                </div>
            )}

            {site.lobe === 'Isthmus' && (
                <div className="form-group">
                    <label className="form-label">Isthmic Extension</label>
                    <select className="glass-input" value={site.isthmicExtension} onChange={(e) => updateSite(site.id, { isthmicExtension: e.target.value })}>
                        <option value="">Select Extension</option>
                        <option value="None">None</option>
                        <option value="Extending to right lobe">Extending to right lobe</option>
                        <option value="Extending to left lobe">Extending to left lobe</option>
                    </select>
                </div>
            )}

            <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Rad ACR TIRADS</label>
                    <select className="glass-input" value={site.radTirads} onChange={(e) => updateSite(site.id, { radTirads: e.target.value })}>
                        <option value="">Select TIRADS</option>
                        <option value="TR1">TR1</option><option value="TR2">TR2</option><option value="TR3">TR3</option>
                        <option value="TR4">TR4</option><option value="TR5">TR5</option><option value="Not mentioned">Not mentioned</option>
                    </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">IR Team ACR TIRADS</label>
                    <select className="glass-input" value={site.irTirads} onChange={(e) => updateSite(site.id, { irTirads: e.target.value })}>
                        <option value="">Select TIRADS</option>
                        <option value="TR1">TR1</option><option value="TR2">TR2</option><option value="TR3">TR3</option>
                        <option value="TR4">TR4</option><option value="TR5">TR5</option>
                    </select>
                </div>
            </div>
        </>
    );

    const renderLymphNodeFields = (site) => (
        <>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Nodal Level *</label>
                    <select className="glass-input" value={site.nodalLevel} onChange={(e) => updateSite(site.id, { nodalLevel: e.target.value })} required>
                        <option value="">Select Level</option>
                        {['I', 'IIA', 'IIB', 'III', 'IV', 'VA', 'VB', 'VI'].map((lvl) => (
                            <option key={lvl} value={`Level ${lvl}`}>Level {lvl}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Side</label>
                    <select className="glass-input" value={site.side} onChange={(e) => updateSite(site.id, { side: e.target.value })}>
                        <option value="">Select Side</option>
                        <option value="Right">Right</option>
                        <option value="Left">Left</option>
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Radiologist Assessment</label>
                    <select className="glass-input" value={site.radAssessment} onChange={(e) => updateSite(site.id, { radAssessment: e.target.value })}>
                        <option value="">Select</option>
                        <option value="Suspicious">Suspicious</option>
                        <option value="Non-suspicious">Non-suspicious</option>
                        <option value="Not mentioned">Not mentioned</option>
                    </select>
                </div>
                <div className="form-group" style={{ flex: 1, display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={site.irAssessment}
                            onChange={(e) => updateSite(site.id, { irAssessment: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                        />
                        <span>IR Suspicious Toggle</span>
                    </label>
                </div>
            </div>
        </>
    );

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Ultrasound Findings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Add nodules or lymph nodes. These sites will individually carry forward to the FNA and Cytology sections.
            </p>

            <form onSubmit={handleNext}>

                {/* Sites List */}
                {formData.sites.map((site, index) => (
                    <div key={site.id} style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        position: 'relative'
                    }}>
                        <button
                            type="button"
                            onClick={() => removeSite(site.id)}
                            style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--error)' }}
                            title="Remove Site"
                        >
                            <Trash2 size={20} />
                        </button>
                        <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}>
                            Site {index + 1}: {site.type}
                        </h3>

                        {site.type === 'Nodule' ? renderThyroidFields(site) : renderLymphNodeFields(site)}
                    </div>
                ))}

                {/* Add Site Control */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '16px', marginBottom: '32px'
                }}>
                    <select
                        className="glass-input"
                        style={{ width: '200px', margin: 0 }}
                        value={siteType}
                        onChange={(e) => setSiteType(e.target.value)}
                    >
                        <option value="Nodule">Thyroid Nodule</option>
                        <option value="Lymph Node">Lymph Node</option>
                    </select>
                    <button
                        type="button"
                        className="btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}
                        onClick={handleAddSite}
                    >
                        <PlusCircle size={18} /> Add Site
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" className="btn-secondary" onClick={goPrev}>Previous</button>
                    <button type="submit" className="btn-primary" disabled={formData.sites.length === 0}>
                        Next: Background
                    </button>
                </div>
            </form>
        </div>
    );
}
