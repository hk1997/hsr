import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Step1Demographics from '../../steps/Step1Demographics';
import Step2Procedure from '../../steps/Step2Procedure';
import Step3Ultrasound from '../../steps/Step3Ultrasound';
import Step4Background from '../../steps/Step4Background';
import Step5FNA from '../../steps/Step5FNA';
import Step6Cytology from '../../steps/Step6Cytology';
import Step7Decision from '../../steps/Step7Decision';
import Step8Histopathology from '../../steps/Step8Histopathology';

// Placeholder for remaining steps until we build them
const PlaceholderStep = ({ stepNumber }) => (
    <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ marginBottom: '16px' }}>Section {stepNumber}</h2>
        <p>This section is under development.</p>
    </div>
);

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
    const { stepId } = useParams();
    const navigate = useNavigate();

    const currentStepIndex = steps.findIndex((s) => s.id === stepId);
    const isValidStep = currentStepIndex !== -1;

    useEffect(() => {
        if (!isValidStep) {
            navigate('/procedure/step-1', { replace: true });
        }
    }, [isValidStep, navigate]);

    if (!isValidStep) return null;

    const CurrentComponent = steps[currentStepIndex].component;

    const goNext = () => {
        if (currentStepIndex < steps.length - 1) {
            navigate(`/procedure/${steps[currentStepIndex + 1].id}`);
        }
    };

    const goPrev = () => {
        if (currentStepIndex > 0) {
            navigate(`/procedure/${steps[currentStepIndex - 1].id}`);
        }
    };

    return (
        <div className="app-container animate-fade-in">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        HF
                    </div>
                    <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Thyroid FNA Procedure</h1>
                </div>
            </header>

            {/* Progress Bar Mock */}
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
