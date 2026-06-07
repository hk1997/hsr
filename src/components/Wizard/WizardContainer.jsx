import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useFormStore } from '../../store/useFormStore';
import Step1Demographics from '../../steps/Step1Demographics';
import Step2Procedure from '../../steps/Step2Procedure';
import Step3Ultrasound from '../../steps/Step3Ultrasound';
import Step4Background from '../../steps/Step4Background';
import Step5FNA from '../../steps/Step5FNA';
import Step6Cytology from '../../steps/Step6Cytology';
import Step7Decision from '../../steps/Step7Decision';
import Step8Histopathology from '../../steps/Step8Histopathology';

const steps = [
    { id: 'step-1', label: 'Client Info', component: Step1Demographics },
    { id: 'step-2', label: 'History & Procedure', component: Step2Procedure },
    { id: 'step-3', label: 'Ultrasound Findings', component: Step3Ultrasound },
    { id: 'step-4', label: 'Background & Diagnosis', component: Step4Background },
    { id: 'step-5', label: 'FNA Details', component: Step5FNA },
    { id: 'step-6', label: 'Cytology', component: Step6Cytology },
    { id: 'step-7', label: 'Decision', component: Step7Decision },
    { id: 'step-8', label: 'Histopathology', component: Step8Histopathology },
];

export default function WizardContainer() {
    const { stepId, caseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoadingCase, setIsLoadingCase] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const loadCaseForEdit = useFormStore((state) => state.loadCaseForEdit);
    const editingCaseId = useFormStore((state) => state.editingCaseId);
    const formData = useFormStore((state) => state.formData);

    const isEditMode = location.pathname.includes('/procedure/edit/');

    // Fetch case data when in edit mode
    useEffect(() => {
        if (isEditMode && caseId && editingCaseId !== caseId) {
            const fetchCase = async () => {
                setIsLoadingCase(true);
                setLoadError(null);
                try {
                    const apiUrl = (import.meta.env.VITE_API_URL || 'https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod').replace(/\/$/, '');
                    const response = await fetch(`${apiUrl}/cases`);
                    if (!response.ok) throw new Error('Failed to fetch cases');
                    const allCases = await response.json();
                    const targetCase = allCases.find((c) => c.id === caseId);
                    if (!targetCase) throw new Error('Case not found');
                    loadCaseForEdit(targetCase);
                } catch (err) {
                    console.error('Error loading case for edit:', err);
                    setLoadError(err.message);
                } finally {
                    setIsLoadingCase(false);
                }
            };
            fetchCase();
        }
    }, [isEditMode, caseId, editingCaseId, loadCaseForEdit]);

    const currentStepIndex = steps.findIndex((s) => s.id === stepId);
    const isValidStep = currentStepIndex !== -1;

    useEffect(() => {
        if (!isValidStep) {
            if (isEditMode && caseId) {
                navigate(`/procedure/edit/${caseId}/step-1`, { replace: true });
            } else {
                navigate('/procedure/step-1', { replace: true });
            }
        }
    }, [isValidStep, navigate, isEditMode, caseId]);

    if (!isValidStep) return null;

    if (isLoadingCase) {
        return (
            <div className="app-container animate-fade-in" style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <h2>Loading case data...</h2>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="app-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '60vh', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <h2 style={{ color: 'var(--error)' }}>Error: {loadError}</h2>
                <button className="btn-secondary" onClick={() => navigate('/admin')}>Back to Dashboard</button>
            </div>
        );
    }

    const CurrentComponent = steps[currentStepIndex].component;

    const goNext = () => {
        if (currentStepIndex < steps.length - 1) {
            const nextStepId = steps[currentStepIndex + 1].id;
            if (isEditMode && caseId) {
                navigate(`/procedure/edit/${caseId}/${nextStepId}`);
            } else {
                navigate(`/procedure/${nextStepId}`);
            }
        }
    };

    const goPrev = () => {
        if (currentStepIndex > 0) {
            const prevStepId = steps[currentStepIndex - 1].id;
            if (isEditMode && caseId) {
                navigate(`/procedure/edit/${caseId}/${prevStepId}`);
            } else {
                navigate(`/procedure/${prevStepId}`);
            }
        }
    };

    return (
        <div className="app-container animate-fade-in">
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isEditMode ? 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        {isEditMode ? '✎' : 'MIR'}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: '600' }}>
                            {isEditMode ? `Editing Case` : 'New FNA Procedure'}
                        </h1>
                        {isEditMode && formData.uhid && (
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>UHID: {formData.uhid}</p>
                        )}
                    </div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => navigate('/admin')}>
                    ← Dashboard
                </button>
            </header>

            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', left: '0', right: '0', height: '2px', background: 'var(--card-border)', zIndex: 0 }} />
                {steps.map((step, index) => {
                    const isActive = index === currentStepIndex;
                    const isPast = index < currentStepIndex;
                    return (
                        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '40px' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: isActive ? 'var(--primary)' : isPast ? 'rgba(0, 225, 255, 0.4)' : 'var(--card-bg)',
                                border: `2px solid ${isActive || isPast ? 'var(--primary)' : 'var(--card-border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: isActive ? '#000' : 'var(--text-light)',
                                fontWeight: 'bold', fontSize: '14px', marginBottom: '8px',
                                boxShadow: isActive ? '0 0 15px var(--primary-glow)' : 'none'
                            }}>
                                {index + 1}
                            </div>
                            <span style={{ fontSize: '10px', color: isActive ? 'var(--primary)' : 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '60px' }}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <main>
                <CurrentComponent goNext={goNext} goPrev={goPrev} />
            </main>
        </div>
    );
}

