import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore';

export default function FloatingActionButton() {
    const navigate = useNavigate();
    const resetForm = useFormStore((state) => state.resetForm);

    const handleNewCase = () => {
        resetForm();
        navigate('/procedure/step-1');
    };

    return (
        <button
            onClick={handleNewCase}
            aria-label="Create New Case"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                color: '#fff',
                fontSize: '32px',
                fontWeight: '300',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(0, 198, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 198, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 198, 255, 0.4)';
            }}
        >
            +
        </button>
    );
}
