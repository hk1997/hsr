import React, { useState, useEffect, useMemo } from 'react';
import './RegistrationForm.css';

// Keep configuration out of the component
const CONFIG = {
  earlyBirdEnd: "2026-10-15",
  regularEnd: "2026-11-20",
  prices: {
    earlyBird: { consultant: 3000, trainee: 1500 },
    regular: { consultant: 5000, trainee: 1500 }
  },
  workshopCap: 50,
  workshopAddOn: { consultant: 1000, trainee: 0 },
  contactEmail: "registrations@irflo.net"
};

const TIER_META = [
  { key: "earlyBird", name: "Early bird", win: "until 15 Oct 2026" },
  { key: "regular", name: "Regular", win: "16 Oct – 20 Nov 2026" }
];

const formatCurrency = (n) => "₹" + Number(n).toLocaleString("en-IN");

function RegistrationForm() {
  const [formData, setFormData] = useState({
    title: 'Dr',
    name: '',
    email: '',
    mobile: '',
    institution: '',
    city: '',
    specialty: '',
    category: 'consultant',
    mci: '',
    diet: 'Vegetarian',
    workshop: false,
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [proofFile, setProofFile] = useState(null);
  const [seats, setSeats] = useState({ known: false, remaining: CONFIG.workshopCap });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [globalWarn, setGlobalWarn] = useState("");

  // Determine current tier based on date
  const currentTier = useMemo(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    const eb = new Date(CONFIG.earlyBirdEnd + "T23:59:59+05:30");
    const rg = new Date(CONFIG.regularEnd + "T23:59:59+05:30");
    if (t <= eb) return "earlyBird";
    if (t <= rg) return "regular";
    return "closed";
  }, []);

  // Fetch seats dynamically (Simulating call to the new Lambda)
  useEffect(() => {
    async function fetchSeats() {
      if (formData.specialty !== 'IR') return;
      try {
        // We will call the actual API once deployed
        const res = await fetch('https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod/summit/seats').catch(() => null);
        if (res && res.ok) {
          const j = await res.json();
          setSeats({ known: true, remaining: j.remaining });
        } else {
          setSeats({ known: false, remaining: CONFIG.workshopCap });
        }
      } catch (e) {
        setSeats({ known: false, remaining: CONFIG.workshopCap });
      }
    }
    fetchSeats();
  }, [formData.specialty]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [id]: type === 'checkbox' ? checked : value };
      // Auto-uncheck workshop if specialty changes from IR
      if (id === 'specialty' && value !== 'IR') updated.workshop = false;
      return updated;
    });
    // Clear field error
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isValidType = /\.(pdf|jpe?g)$/i.test(file.name);
    if (!isValidType) {
      setErrors(prev => ({ ...prev, proofFile: "Only PDF or JPEG files are accepted." }));
      setProofFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, proofFile: "File too large — maximum 5 MB." }));
      setProofFile(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setProofFile({
        name: file.name,
        type: file.type,
        base64: String(reader.result).split(",")[1]
      });
      setErrors(prev => ({ ...prev, proofFile: null }));
    };
    reader.readAsDataURL(file);
  };

  // Compute Totals
  const totals = useMemo(() => {
    if (currentTier === "closed") return { closed: true, base: 0, workshop: 0, total: 0 };
    
    const base = CONFIG.prices[currentTier][formData.category] || 0;
    const addOn = CONFIG.workshopAddOn[formData.category] || 0;
    const workshop = (formData.specialty === 'IR' && formData.workshop) ? addOn : 0;
    
    return { closed: false, base, workshop, total: base + workshop };
  }, [currentTier, formData.category, formData.specialty, formData.workshop]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = true;
    if (formData.mobile.replace(/\D/g, "").length < 8) newErrors.mobile = true;
    if (!formData.institution.trim()) newErrors.institution = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.specialty) newErrors.specialty = true;

    setGlobalError("");
    setGlobalWarn("");

    if (formData.category === 'trainee' && !proofFile) {
      newErrors.proofFile = "Please attach your proof (PDF or JPEG, max 5 MB).";
      setGlobalError("Please attach your proof of Fellow / Trainee status to continue.");
    }
    if (!formData.consent) {
      newErrors.consent = true;
      setGlobalError("Please accept the declaration to continue.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !globalError;
  };

  // Submit Logic
  const captureAndPay = async () => {
    if (!validate()) return;
    if (totals.closed) return;
    
    setIsSubmitting(true);
    setGlobalError("");
    
    try {
      // 1. Submit Registration to Backend
      const payload = {
        ...formData,
        tier: currentTier,
        baseFee: totals.base,
        workshopFee: totals.workshop,
        total: totals.total,
        proofFileName: proofFile ? proofFile.name : "",
        proofBase64: proofFile ? proofFile.base64 : ""
      };

      // Simulating API call to the Lambda endpoint we just built
      const res = await fetch('https://0g82gy1lng.execute-api.ap-south-1.amazonaws.com/prod/summit/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        alert(`Integration step! Backend returned Order ID: ${data.razorpayOrderId}\nThis is where the Razorpay checkout opens.`);
        setIsSubmitting(false);
      } else if (res) {
        const errData = await res.json().catch(() => ({}));
        setGlobalError(errData.error || "Failed to register. Please try again.");
        setIsSubmitting(false);
      } else {
        setGlobalError("Failed to connect to the server. Please check your connection.");
        setIsSubmitting(false);
      }
    } catch (e) {
      setGlobalError("Failed to connect to the server. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reg-page">
      <header className="hero">
        <div className="wrap">
          <div className="kicker">CME · thyroid ablation &amp; intervention · Delhi-NCR</div>
          <h1>Thyroid Intervention Summit 2026</h1>
          <div className="meta">
            <span className="pill"><b>27–28 Nov 2026</b></span>
            <span className="pill">Day 1 · <b>hands-on workshop</b> — IR only</span>
            <span className="pill">Day 2 · <b>full scientific programme</b></span>
            <span className="pill">RFA &amp; MWA · thyroid</span>
          </div>
          <div className="venues">
            Day 1 · <span>Medanta – The Medicity, Gurugram</span> &nbsp;·&nbsp; Day 2 · <span>Holiday Inn, Aerocity, New Delhi</span>
          </div>
        </div>
      </header>

      <main>
        <div className="wrap">
          {/* TIERS */}
          <div className="card">
            <h2>Registration fees</h2>
            <div className="sub">Consultant and Fellow/Trainee fees are shown side by side; your applicable window is highlighted automatically by today's date.</div>
            <div className="tiers">
              {TIER_META.map(tm => {
                const c = CONFIG.prices[tm.key].consultant;
                const r = CONFIG.prices[tm.key].trainee;
                const isActive = tm.key === currentTier;
                const isClosed = currentTier === 'closed';
                return (
                  <div key={tm.key} className={`tier ${isActive ? 'active' : ''} ${isClosed ? 'closed' : ''}`}>
                    {isActive && <span className="badge">Your window</span>}
                    <div className="tname">{tm.name}</div>
                    <div className="twin">{tm.win}</div>
                    <div className={`prow first ${formData.category === 'consultant' ? 'sel' : ''}`}>
                      <span className="pk">Consultant</span><span className="pv">{formatCurrency(c)}</span>
                    </div>
                    <div className={`prow ${formData.category === 'trainee' ? 'sel' : ''}`}>
                      <span className="pk">Fellow / Trainee</span><span className="pv">{formatCurrency(r)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FORM */}
          <div className="card">
            <h2>Your details</h2>
            <div className="sub">Fields marked <span style={{color: 'var(--red)'}}>*</span> are required. Your medical registration number is collected for CME credit records.</div>
            <div className="grid">

              <div className={`field full ${errors.name ? 'bad' : ''}`}>
                <label>Full name <span className="req">*</span></label>
                <div className="namewrap">
                  <select id="title" value={formData.title} onChange={handleChange}>
                    <option>Dr</option><option>Prof</option><option>Mr</option><option>Ms</option><option>Mrs</option>
                  </select>
                  <input id="name" placeholder="Full name" value={formData.name} onChange={handleChange} />
                </div>
                {errors.name && <span className="err">Please enter your name.</span>}
              </div>

              <div className={`field ${errors.email ? 'bad' : ''}`}>
                <label>Email <span className="req">*</span></label>
                <input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="err">Enter a valid email.</span>}
              </div>

              <div className={`field ${errors.mobile ? 'bad' : ''}`}>
                <label>Mobile <span className="req">*</span></label>
                <input id="mobile" placeholder="+91 …" value={formData.mobile} onChange={handleChange} />
                {errors.mobile && <span className="err">Enter a valid mobile number.</span>}
              </div>

              <div className={`field ${errors.institution ? 'bad' : ''}`}>
                <label>Institution / Hospital <span className="req">*</span></label>
                <input id="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} />
                {errors.institution && <span className="err">Required.</span>}
              </div>

              <div className={`field ${errors.city ? 'bad' : ''}`}>
                <label>City <span className="req">*</span></label>
                <input id="city" placeholder="City" value={formData.city} onChange={handleChange} />
                {errors.city && <span className="err">Required.</span>}
              </div>

              <div className={`field ${errors.specialty ? 'bad' : ''}`}>
                <label>Speciality <span className="req">*</span></label>
                <select id="specialty" value={formData.specialty} onChange={handleChange}>
                  <option value="">Select…</option>
                  <option value="IR">Interventional Radiology (IR)</option>
                  <option value="NonIR">Non-IR</option>
                </select>
                <span className="hint">Hands-on workshop is open to IR delegates only.</span>
                {errors.specialty && <span className="err">Please select.</span>}
              </div>

              <div className="field">
                <label>Delegate category <span className="req">*</span></label>
                <select id="category" value={formData.category} onChange={handleChange}>
                  <option value="consultant">Consultant / Faculty</option>
                  <option value="trainee">Fellow / Trainee</option>
                </select>
                <span className="hint">Category sets your fee.</span>
              </div>

              <div className="field">
                <label>Medical registration no.</label>
                <input id="mci" placeholder="State / NMC registration no." value={formData.mci} onChange={handleChange} />
                <span className="hint">Used for CME credit records.</span>
              </div>

              <div className="field">
                <label>Dietary preference</label>
                <select id="diet" value={formData.diet} onChange={handleChange}>
                  <option>Vegetarian</option><option>Non-vegetarian</option>
                </select>
              </div>

              {/* Hands-on workshop: IR only */}
              {formData.specialty === 'IR' && (
                <div className="wsblock" style={{display: 'block'}}>
                  <div className="flag">Hands-on stations are strictly for Interventional Radiologists.</div>
                  <label className="wschk">
                    <input type="checkbox" id="workshop" checked={formData.workshop} onChange={handleChange} disabled={seats.remaining <= 0} />
                    <span className="t">
                      Add the Day-1 hands-on workshop (RFA & MWA)
                      {CONFIG.workshopAddOn[formData.category] > 0 && ` · +${formatCurrency(CONFIG.workshopAddOn[formData.category])}`}
                    </span>
                  </label>
                  <div className={`seats ${seats.remaining <= 0 ? 'full' : (seats.remaining <= 10 ? 'low' : '')}`}>
                    <span className="dot"></span>
                    <span className="n">
                      {!seats.known ? `${CONFIG.workshopCap} seats · allocated first-come` :
                       seats.remaining <= 0 ? "Hands-on workshop is full" :
                       `${seats.remaining} of ${CONFIG.workshopCap} hands-on seats available`}
                    </span>
                  </div>
                </div>
              )}

              {/* Fellow/Trainee proof */}
              {formData.category === 'trainee' && (
                <div className={`field full ${errors.proofFile ? 'bad' : ''}`}>
                  <label>Proof of Fellow / Trainee status <span className="req">*</span></label>
                  <input type="file" id="proofFile" accept=".pdf,.jpg,.jpeg,image/jpeg,application/pdf" onChange={handleFileChange} />
                  <span className="hint">PDF or JPEG, up to 5 MB — e.g. a letter from your HOD. Required before payment.</span>
                  {errors.proofFile && <span className="err">{errors.proofFile}</span>}
                  {proofFile && <div style={{fontSize:'12px', color:'var(--green)', fontWeight:500, marginTop:'4px'}}>Attached: {proofFile.name}</div>}
                </div>
              )}

              <div className="check">
                <input type="checkbox" id="consent" checked={formData.consent} onChange={handleChange} />
                <div className="ctxt">
                  I declare that the information and documents I have provided are true and correct.
                  <span className="s">Registration is provisional and subject to verification, and may be cancelled without refund if any discrepancy is found in the facts or eligibility declared.</span>
                </div>
              </div>

            </div>
          </div>

          {/* SUMMARY */}
          <div className="summary">
            <div className="sumcard">
              <div className="sline">
                <span>Registration {totals.closed ? '' : `· ${TIER_META.find(t => t.key === currentTier)?.name}`}</span>
                <span className="mono">{totals.base > 0 ? formatCurrency(totals.base) : "—"}</span>
              </div>
              
              {totals.workshop > 0 && (
                <div className="sline">
                  <span>Hands-on workshop</span>
                  <span className="mono">{formatCurrency(totals.workshop)}</span>
                </div>
              )}

              <div className="sline total">
                <span>Total payable</span>
                <span className="mono">{totals.total > 0 ? formatCurrency(totals.total) : "—"}</span>
              </div>
              
              <button className="paybtn" disabled={totals.closed || isSubmitting || totals.total <= 0} onClick={captureAndPay}>
                {totals.closed ? 'Online registration closed' : 
                 isSubmitting ? 'Saving your details...' :
                 totals.total <= 0 ? 'Fees not yet published' :
                 `Proceed to secure payment · ${formatCurrency(totals.total)}`}
              </button>
              
              <div className="paysub">Payments processed securely by <b>Razorpay</b>. You'll be redirected to complete payment.</div>
              
              {globalWarn && <div className="notice warn">{globalWarn}</div>}
              {globalError && <div className="notice err">{globalError}</div>}
              {totals.closed && <div className="notice warn">Online registration has closed (20 Nov 2026). Spot registration may be available on-site.</div>}
            </div>
          </div>

        </div>
      </main>

      <footer>
        <div className="wrap">
          Thyroid Intervention Summit 2026 · 27–28 Nov 2026 · organised at Medanta – The Medicity, Gurugram.<br/>
          Queries: <span className="mono">{CONFIG.contactEmail}</span>
        </div>
      </footer>
    </div>
  );
}

export default RegistrationForm;
