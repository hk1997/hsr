import { create } from 'zustand';

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

    resetForm: () => set({ formData: initialFormState })
}));
