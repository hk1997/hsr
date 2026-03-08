import { create } from 'zustand';
import { clearDraft } from '../services/db';

const DRAFT_ID = 'current-fna-session';

const initialFormState = {
    // Section 1
    patientName: '',
    age: '',
    gender: '',
    uhid: '',

    // Section 2
    dateOfProcedure: '',
    procedureType: '',
    operator: '',
    needleGauge: '',

    // Section 3 (Dynamic Sites)
    sites: [], // Array of site objects (both nodules and lymph nodes)

    // Section 4
    clinicalHistory: '',
    knownThyroidDisease: '',
    previousFnaDone: false,
    previousFnaDate: '',
    previousFnaWhere: '',
    previousFnaResult: '',
    indicationForFna: '',
    provisionalDiagnosis: [],
    relevantLabValues: false,
    labValuesText: '',

    // Sections 5, 6, 8 data will be nested inside the site objects in 'sites'

    // Section 7
    clinicalDecision: '',
    ablationType: [],
    decisionMadeBy: '',
    surgeryDone: false,

    // Section 8 General
    typeOfSurgery: '',
    dateOfSurgery: '',
    histopathologyReportReceived: false,

    // Case Level
    caseStatus: 'Open',
};

export const useFormStore = create((set) => ({
    formData: initialFormState,

    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value }
        })),

    addSite: (siteData) =>
        set((state) => ({
            formData: {
                ...state.formData,
                sites: [...state.formData.sites, { ...siteData, id: crypto.randomUUID() }]
            }
        })),

    updateSite: (siteId, updates) =>
        set((state) => ({
            formData: {
                ...state.formData,
                sites: state.formData.sites.map(site =>
                    site.id === siteId ? { ...site, ...updates } : site
                )
            }
        })),

    removeSite: (siteId) =>
        set((state) => ({
            formData: {
                ...state.formData,
                sites: state.formData.sites.filter(site => site.id !== siteId)
            }
        })),

    loadDraft: (draftData) => set({ formData: draftData }),

    resetForm: () => set({ formData: initialFormState }),

    submitCaseToServer: async () => {
        const { formData, resetForm } = useFormStore.getState();

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://jdj0yduaka.execute-api.ap-south-1.amazonaws.com/prod';
            const response = await fetch(`${apiUrl}/cases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit case to AWS');
            }

            // Clear the local draft now that we're safe on the server
            await clearDraft(DRAFT_ID);
            resetForm();
            return true;
        } catch (err) {
            console.error('Submission failed. Data retained in IndexedDB draft.', err);
            return false;
        }
    }
}));
