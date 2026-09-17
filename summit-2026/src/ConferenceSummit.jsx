import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ConferenceSummit.css';

const ConferenceSummit = () => {
  const [activeTab, setActiveTab] = useState('day1');

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="summit-page">
      <div className="summit-container">
        
        {/* HERO SECTION */}
        <header className="summit-hero">
          <div className="summit-hero-blob"></div>
          <div className="summit-hero-blob secondary"></div>
          
          <div className="summit-hero-inner">
            <span className="summit-eyebrow">Interventional Radiology CME Conference</span>
            <h1 className="summit-title">Thyroid <em>Intervention</em><br/>Summit 2026</h1>
            <p className="summit-subtitle">
              Join leading experts for an immersive two-day summit exploring the 
              latest evidence, guidelines, and advanced techniques in thyroid ablation.
            </p>
          </div>

          <div className="summit-badges">
            <span className="summit-badge teal">ISTS 2026 Pre-Conference</span>
            <span className="summit-badge gold">Medanta-Tutorials</span>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="summit-nav">
          <div 
            className={`summit-tab ${activeTab === 'day1' ? 'active' : ''}`} 
            onClick={() => setActiveTab('day1')}
          >
            Day 1 · Nov 27
          </div>
          <div 
            className={`summit-tab ${activeTab === 'day2' ? 'active' : ''}`} 
            onClick={() => setActiveTab('day2')}
          >
            Day 2 · Nov 28
          </div>
          <div 
            className={`summit-tab ${activeTab === 'faculty' ? 'active' : ''}`} 
            onClick={() => setActiveTab('faculty')}
          >
            Faculty
          </div>
        </nav>

        {/* CONTENT AREA */}
        <main className="summit-content">
          
          {/* DAY 1 */}
          {activeTab === 'day1' && (
            <div className="summit-schedule">
              <div className="summit-day-header">
                <h2 className="summit-day-title">Day <em>One</em></h2>
                <p className="summit-day-meta">Afternoon Programme · Friday, 27 November 2026</p>
              </div>

              <div className="summit-legend">
                <span className="summit-legend-item"><div className="summit-legend-dot" style={{background: 'var(--teal)'}}></div> Lecture</span>
                <span className="summit-legend-item"><div className="summit-legend-dot" style={{background: 'var(--indigo)'}}></div> Video Session</span>
                <span className="summit-legend-item"><div className="summit-legend-dot" style={{background: 'var(--crimson)'}}></div> Panel</span>
                <span className="summit-legend-item"><div className="summit-legend-dot" style={{background: 'var(--olive)'}}></div> Workshop</span>
              </div>

              <ScheduleSlot 
                time="13:30" duration="15 min" category="lecture" color="var(--teal)" label="Lecture"
                title="History & Development of Evidence for Thyroid Ablation"
                desc="From early ethanol sclerotherapy to modern thermal ablation — tracing the chronological evolution of techniques alongside the evidence base that shaped today's clinical guidelines."
                speaker="Dr. M. C. Uthappa" affil="Gleneagles, Bengaluru"
              />

              <ScheduleSlot 
                time="13:45" duration="20 min" category="lecture" color="var(--teal)" label="Evidence & Guidelines"
                title="Evidence-Based Guidelines for Use of Thyroid Ablation"
                desc="Critical appraisal of KSThR, CIRSE, SIR and AACE/ACE/AME guidelines for benign thyroid nodules — indications, contraindications, and where consensus stands today."
                speaker="Dr. Anubhav Khandelwal" affil="Medanta, Gurugram"
              />

              <ScheduleSlot 
                time="14:05" duration="20 min" category="lecture" color="var(--teal)" label="Data Analysis"
                title="Analysis of Large Non-RCT Studies"
                desc="Systematic review of registry data, multicentre cohort studies, and real-world outcomes. Volume reduction ratios, symptom scores, and long-term durability."
                speaker="Dr. Tara Prasad Tripathy" affil="AIIMS Bhubaneswar"
              />

              <ScheduleSlot 
                time="14:25" duration="15 min" category="break" color="var(--grey)" label="Networking"
                title="Tea Break & Refreshments"
                desc="Take a moment to network with colleagues and faculty."
              />

              <ScheduleSlot 
                time="14:40" duration="60 min" category="video" color="var(--indigo)" label="Technique & Energy"
                title="Technique Demonstration & Energy Selection"
                desc="Annotated procedure videos and a comparative energy lecture — probe placement, moving-shot method, augmentation manoeuvres, device handling, and evidence-based modality selection."
                speaker="Multi-Faculty Session" affil="Dr. Kaloo, Dr. Yadav, Dr. Damodharan, Dr. Gangwani"
              />
              
              <ScheduleSlot 
                time="17:30" duration="60 min" category="workshop" color="var(--olive)" label="Hands-On"
                title="Phantom-Based Practical Session — RFA & MWA"
                desc="Small-group, faculty-supervised hands-on practice on ex-vivo tissue phantoms. Rotate between RFA and MWA stations."
                speaker="Expert Proctors" affil="Station A, B, C, D"
              />
            </div>
          )}

          {/* DAY 2 */}
          {activeTab === 'day2' && (
            <div className="summit-schedule">
              <div className="summit-day-header">
                <h2 className="summit-day-title">Day <em>Two</em></h2>
                <p className="summit-day-meta">Full Day Programme · Saturday, 28 November 2026</p>
              </div>

              <ScheduleSlot 
                time="08:30" duration="30 min" category="break" color="var(--grey)" label="Registration"
                title="Registration & Morning Coffee"
                desc="Delegate registration, welcome refreshments, exhibitor networking."
              />

              <ScheduleSlot 
                time="09:10" duration="50 min" category="lecture" color="var(--teal)" label="Session I — Imaging"
                title="TI-RADS — Structured Ultrasound Reporting"
                desc="Systematic review of ACR TI-RADS and K-TIRADS scoring systems, lexicon, category thresholds, and their integration into ablation patient selection workflows."
                speaker="Dr. Jyoti Kumar & Dr. Alpana Manchanda" affil="MAMC, New Delhi"
              />
              
              <ScheduleSlot 
                time="10:00" duration="30 min" category="lecture" color="var(--teal)" label="Session II — Biopsy"
                title="FNA for Thyroid Nodules — Technique & Bethesda"
                desc="US-guided fine needle aspiration for thyroid nodules — sampling technique, and how the cytopathologist and interventional radiologist work together."
                speaker="Dr. Sanchita Gupta & Dr. Haimanti Sarin" affil="AIIMS & Medanta"
              />

              <ScheduleSlot 
                time="10:30" duration="25 min" category="lecture" color="var(--teal)" label="Decision Making"
                title="Patient Selection — The Right Patient & Difficult Cases"
                desc="Indications and ideal candidate selection for thyroid ablation, navigating difficult, borderline and unconventional cases."
                speaker="Dr. Gaurav Gangwani" affil="Lilavati Hospital, Mumbai"
              />
              
              <div style={{textAlign: 'center', marginTop: '40px', color: 'var(--grey)', fontStyle: 'italic'}}>
                Additional sessions covering Special Indications, Safety, Oncology, and Follow-Up...
              </div>
            </div>
          )}

          {/* FACULTY */}
          {activeTab === 'faculty' && (
            <div>
              <div className="summit-day-header">
                <h2 className="summit-day-title">Distinguished <em>Faculty</em></h2>
                <p className="summit-day-meta">Provisional designations & affiliations</p>
              </div>

              <div className="summit-faculty-grid">
                <FacultyCard 
                  name="Dr. S. S. Baijal" 
                  role="Course Chair" 
                  title="Chairman, Diagnostic & Interventional Radiology"
                  affil="Medanta – The Medicity, Gurugram" 
                />
                <FacultyCard 
                  name="Dr. Anubhav Khandelwal" 
                  role="Interventional Radiology" 
                  title="Director, Interventional Radiology"
                  affil="Medanta – The Medicity, Gurugram" 
                />
                <FacultyCard 
                  name="Dr. Marcin Barczyński" 
                  role="Endocrine Surgery" 
                  title="Professor of Surgery & Head, Dept. of Endocrine Surgery"
                  affil="Jagiellonian University Medical College, Poland" 
                />
                <FacultyCard 
                  name="Dr. Arun Gupta" 
                  role="Interventional Radiology" 
                  title="Chairperson & Senior Consultant, IR"
                  affil="Sir Ganga Ram Hospital, New Delhi" 
                />
                <FacultyCard 
                  name="Dr. Jyoti Kumar" 
                  role="Radiodiagnosis" 
                  title="Director Professor, Radiodiagnosis"
                  affil="Maulana Azad Medical College, New Delhi" 
                />
                <FacultyCard 
                  name="Dr. Karthikeyan Damodharan" 
                  role="Interventional Radiology" 
                  title="Director, Vascular & Interventional Radiology"
                  affil="MIOT International, Chennai" 
                />
              </div>
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer className="summit-footer">
          <div className="summit-footer-brand">Thyroid <em>Intervention</em> Summit</div>
          <div className="summit-footer-meta">
            ISTS 2026 · Medanta-Tutorials<br/>
            27–28 November 2026
          </div>
        </footer>

      </div>

      {/* FLOATING CTA */}
      <Link to="/ThyroidInterventionSummit2026/register" className="summit-fab">
        Register Now
      </Link>
    </div>
  );
};

// Helper Components
const ScheduleSlot = ({ time, duration, color, label, title, desc, speaker, affil }) => (
  <div className="summit-slot" style={{ '--accent': color }}>
    <div className="summit-time">
      <span className="summit-time-start">{time}</span>
      <span className="summit-time-duration">{duration}</span>
    </div>
    <div className="summit-details">
      <div className="summit-chip">{label}</div>
      <h3 className="summit-slot-title">{title}</h3>
      <p className="summit-slot-desc">{desc}</p>
      {speaker && (
        <div className="summit-speaker">
          <div className="summit-speaker-info">
            <span className="summit-speaker-name">{speaker}</span>
            <span className="summit-speaker-affil">{affil}</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

const FacultyCard = ({ name, role, title, affil }) => (
  <div className="summit-faculty-card">
    <span className="summit-faculty-role">{role}</span>
    <h3>{name}</h3>
    <p>{title}</p>
    <p style={{marginTop: '8px', color: 'var(--grey)'}}>{affil}</p>
  </div>
);

export default ConferenceSummit;
