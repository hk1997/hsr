import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WizardContainer from './components/Wizard/WizardContainer';
import AdminDashboard from './pages/AdminDashboard';
import { useFormStore } from './store/useFormStore';
import { getDraft, saveDraft } from './services/db';

import { Toaster } from 'react-hot-toast';

const DRAFT_ID = 'current-fna-session';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const loadDraft = useFormStore((state) => state.loadDraft);

  useEffect(() => {
    // 1. Hydrate state from IndexedDB on startup
    const hydrate = async () => {
      const draft = await getDraft(DRAFT_ID);
      if (draft && draft.data) {
        loadDraft(draft.data);
      }
      setIsInitializing(false);
    };
    hydrate();

    // 2. Subscribe to store changes to auto-save to IndexedDB
    const unsubscribe = useFormStore.subscribe((state) => {
      if (state.formData && state.formData.uhid) {
        saveDraft(DRAFT_ID, state.formData);
      }
    });

    return () => unsubscribe();
  }, [loadDraft]);

  if (isInitializing) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
        <h2>Starting Medical Session...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/medanta/thyroidfna">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-main)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
          },
          success: {
            style: {
              border: '1px solid var(--primary)',
            },
          },
          error: {
            style: {
              border: '1px solid var(--error)',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/procedure/:stepId" element={<WizardContainer />} />
        <Route path="/procedure/edit/:caseId/:stepId" element={<WizardContainer />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
