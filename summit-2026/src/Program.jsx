/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import './Program.css';
import { Link } from 'react-router-dom';
import TopNav from './TopNav';

const Program = () => {
  const [activeTab, setActiveTab] = useState('1');
  return (
    <>
      

<TopNav />
<div className="sheet">

  {/*  ===== HEADER =====  */}
  <header className="hdr">
    <div className="hdr-blob"></div>
    <div className="hdr-inner">
      <p className="hdr-eyebrow">Interventional Radiology CME Conference · 2026</p>
      <h1 className="hdr-title">Thyroid <em>Intervention</em><br/>Summit</h1>
      <p className="hdr-sub">Day 1 · ISTS 2026 Pre-Conference Workshop · Medanta – The Medicity, Gurgaon  |  Day 2 · IR Tutorials · Holiday Inn, Aerocity, New Delhi</p>
    </div>
  </header>

  {/*  ===== TABS =====  */}
  <nav className="tabs">
    <div className={`tab ${activeTab === '1' ? 'active' : ''}`} onClick={() => setActiveTab('1')}>Day 1 · 27 Nov</div>
    <div className={`tab ${activeTab === '2' ? 'active' : ''}`} onClick={() => setActiveTab('2')}>Day 2 · 28 Nov</div>
    <div className={`tab ${activeTab === '3' ? 'active' : ''}`} onClick={() => setActiveTab('3')}>Faculty</div>
  </nav>

  {/*  =====================================================  */}
  {/*  ======================  DAY 1  ======================  */}
  {/*  =====================================================  */}
  <section className={`day ${activeTab === '1' ? 'active' : ''}`} id="day1">
    <h2 className="day-title">Day <em>One</em></h2>
    <p className="day-meta">ISTS 2026 Pre-Conference Workshop · Friday, 27 November 2026 · Afternoon Programme from 13:30<br/><span className="venue venue-d1">Venue · Auditorium, 2nd Floor, Medanta – The Medicity, CH Baktawar Singh Road, Sector 38, Gurugram, Haryana 122001</span></p>

    <div className="legend">
      <span className="leg"><i style={{background: 'var(--teal)'}}></i>Lecture</span>
      <span className="leg"><i style={{background: 'var(--indigo)'}}></i>Video Session</span>
      <span className="leg"><i style={{background: 'var(--crimson)'}}></i>Panel / Discussion</span>
      <span className="leg"><i style={{background: 'var(--olive)'}}></i>Workshop</span>
      <span className="leg"><i style={{background: 'var(--grey)'}}></i>Break</span>
    </div>

    <div className="band">
      <span className="band-l">Afternoon Session</span>
      <span className="band-r">13:30 onwards</span>
    </div>

    {/*  1. History  */}
    <div className="ses-band"><span className="ses-name">Foundations &amp; Evidence</span><span className="ses-chairs"><b>Chaired by</b> Dr. Arun Gupta  &middot;  Surgeon (TBC)</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">13:30</span><span className="d">15 min</span></div>
      <div className="slot-body">
        <div className="chip">Lecture</div>
        <h3 className="slot-title">History &amp; Development of Evidence for Thyroid Ablation</h3>
        <div className="talk-split">10 min lecture + 5 min discussion</div>
        <p className="slot-desc">From early ethanol sclerotherapy to modern thermal ablation — tracing the chronological evolution of techniques alongside the evidence base that shaped today's clinical guidelines.</p>
        <div className="faculty">Dr. M. C. Uthappa<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Gleneagles, Bengaluru</span></div>
      </div>
    </div>

    {/*  2. Guidelines  */}
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">13:45</span><span className="d">20 min</span></div>
      <div className="slot-body">
        <div className="chip">Evidence &amp; Guidelines</div>
        <h3 className="slot-title">Evidence-Based Guidelines for Use of Thyroid Ablation in Benign Disease</h3>
        <div className="talk-split">15 min lecture + 5 min discussion</div>
        <p className="slot-desc">Critical appraisal of KSThR, CIRSE, SIR and AACE/ACE/AME guidelines for benign thyroid nodules — indications, contraindications, and where consensus stands today.</p>
        <div className="faculty">Dr. Anubhav Khandelwal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div>
      </div>
    </div>

    {/*  3. Non-RCT analysis  */}
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">14:05</span><span className="d">20 min</span></div>
      <div className="slot-body">
        <div className="chip">Data Analysis</div>
        <h3 className="slot-title">Analysis of Large Non-RCT Studies — Evaluating Outcomes of Thyroid Ablation</h3>
        <div className="talk-split">15 min lecture + 5 min discussion</div>
        <p className="slot-desc">Systematic review of registry data, multicentre cohort studies, and real-world outcomes. Volume reduction ratios, symptom scores, and long-term durability across published series.</p>
        <div className="faculty">Dr. Tara Prasad Tripathy<span style={{color: 'var(--grey)', fontWeight: '400'}}> · AIIMS Bhubaneswar</span></div>
      </div>
    </div>

    {/*  Tea break  */}
    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">14:25</span><span className="d">15 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Tea Break</h3>
        <p className="slot-desc">Refreshments &amp; networking</p>
      </div>
    </div>

    {/*  4. Technique & Energy Session (video + lecture block)  */}
    <div className="ses-band"><span className="ses-name">Technique &amp; Energy</span><span className="ses-chairs"><b>Chaired by</b> Dr. Tara Prasad Tripathy  &middot;  Endocrine Surgeon (TBC)</span></div>
    <div className="slot" data-cat="video">
      <div className="slot-time"><span className="t">14:40</span><span className="d">60 min</span></div>
      <div className="slot-body">
        <div className="chip">Technique &amp; Energy Session</div>
        <h3 className="slot-title">Technique Demonstration &amp; Energy Selection</h3>
        <p className="slot-desc">Annotated procedure videos and a comparative energy lecture — probe placement, moving-shot method, augmentation manoeuvres, device handling, and evidence-based modality selection.</p>
        <div className="subs">
          <div className="sub">
            <span className="sub-t">14:40</span>
            <div>
              <div className="sub-title">RFA Technique — Trans-isthmic Approach &amp; Moving Shot Demonstration <span style={{color: 'var(--indigo)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.14em'}}> · VIDEO</span></div>
              <div className="sub-fac">Dr. Shahnawaz Bashir<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Max Hospital, Saket, New Delhi</span> <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 10 min + 5 min discussion</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">14:55</span>
            <div>
              <div className="sub-title">MWA Technique — Device Handling &amp; Energy Delivery Optimisation <span style={{color: 'var(--indigo)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.14em'}}> · VIDEO</span></div>
              <div className="sub-fac">Dr. Ajit Yadav<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Sir Ganga Ram Hospital, New Delhi</span> <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 10 min + 5 min discussion</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">15:10</span>
            <div>
              <div className="sub-title">Energies to Be Used — RFA, MWA, Laser &amp; Ethanol: A Comparative Overview <span style={{color: 'var(--teal)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.14em'}}> · LECTURE</span></div>
              <div className="sub-fac">Dr. Karthikeyan Damodharan<span style={{color: 'var(--grey)', fontWeight: '400'}}> · MIOT International, Chennai</span> <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">15:25</span>
            <div>
              <div className="sub-title">Augmentation Techniques — Adjuncts to Complete Ablation <span style={{color: 'var(--indigo)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.14em'}}> · VIDEO</span></div>
              <div className="sub-fac">Dr. Gaurav Gangwani<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Lilavati Hospital, Mumbai</span> <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 10 min + 5 min discussion</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*  5. Expanding the Horizon (lecture per request)  */}
    <div className="ses-band"><span className="ses-name">Advanced Indications</span><span className="ses-chairs"><b>Chaired by</b> Dr. Puneet Garg  &middot;  Dr. Kanika Rana</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">15:40</span><span className="d">20 min</span></div>
      <div className="slot-body">
        <div className="chip">Lecture</div>
        <h3 className="slot-title">Expanding the Horizon — Ablation in Low-Risk Thyroid Cancer &amp; Malignant Disease</h3>
        <div className="talk-split">15 min lecture + 5 min discussion</div>
        <p className="slot-desc">Current evidence and emerging indications: ablation for papillary thyroid microcarcinoma, recurrent disease, lymph node metastases, and the frontier of combination therapies.</p>
        <div className="faculty">Dr. Anubhav Khandelwal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div>
      </div>
    </div>

    {/*  6. Laser ablation (International Faculty)  */}
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">16:00</span><span className="d">20 min</span></div>
      <div className="slot-body">
        <div className="chip">International Faculty</div>
        <h3 className="slot-title">Laser Ablation for Thyroid Nodules — Benign Disease &amp; PTMC</h3>
        <div className="talk-split">15 min lecture + 5 min discussion</div>
        <p className="slot-desc">Principles, technique and evidence for laser (LITT) ablation of thyroid nodules — patient selection and outcomes across benign nodules and papillary thyroid microcarcinoma (PTMC), from a high-volume endocrine-surgery perspective.</p>
        <div className="faculty">Dr. Marcin Barczyński<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Jagiellonian University, Kraków</span></div>
      </div>
    </div>

    {/*  Short break (after Advanced Indications)  */}
    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">16:20</span><span className="d">10 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Short Break</h3>
      </div>
    </div>

    {/*  7. Multidisciplinary panel  */}
    <div className="ses-band"><span className="ses-name">Panel / Discussion</span><span className="ses-chairs"><b>Moderated by</b> Dr. Anubhav Khandelwal</span></div>
    <div className="slot" data-cat="panel">
      <div className="slot-time"><span className="t">16:30</span><span className="d">75 min</span></div>
      <div className="slot-body">
        <div className="chip">Panel / Discussion</div>
        <h3 className="slot-title">Multidisciplinary Panel — Positioning Thyroid Ablation Across Specialties</h3>
        <p className="slot-desc">A cross-specialty discussion on where ablation sits alongside surgery, radioiodine and active surveillance — indications, patient selection, referral pathways, and points of disagreement between disciplines.</p>
        <div className="subs">
          <div className="sub">
            <span className="sub-t">IR</span>
            <div>
              <div className="sub-title">Interventional Radiology Perspective</div>
              <div className="sub-fac">Dr. M. C. Uthappa<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Gleneagles, Bengaluru</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">IR</span>
            <div>
              <div className="sub-title">Interventional Radiology Perspective</div>
              <div className="sub-fac">Dr. Arun Gupta<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Sir Ganga Ram Hospital, New Delhi</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">Surgery</span>
            <div>
              <div className="sub-title">Endocrine / Head &amp; Neck Surgery Perspective</div>
              <div className="sub-fac tbc">Endocrine Surgeon (TBC)</div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">Surgery</span>
            <div>
              <div className="sub-title">Endocrine Surgery Perspective (International)</div>
              <div className="sub-fac">Dr. Marcin Barczyński<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Jagiellonian University, Kraków</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">NM</span>
            <div>
              <div className="sub-title">Nuclear Medicine Perspective</div>
              <div className="sub-fac">Dr. Manas Sahoo<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">Endo</span>
            <div>
              <div className="sub-title">Endocrinology Perspective</div>
              <div className="sub-fac">Dr. Parjeet Kaur<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Apollo, Gurugram</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">Endo</span>
            <div>
              <div className="sub-title">Endocrinology Perspective</div>
              <div className="sub-fac">Dr. Harmandeep Kaur<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div>
            </div>
          </div>
        </div>
        <div className="faculty" style={{marginTop: '12px'}}>Dr. Anubhav Khandelwal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span> · Moderator</div>
      </div>
    </div>

    {/*  Hands-on workshop (Day 1)  */}
    <div className="ses-band"><span className="ses-name">Hands-On Workshop</span><span className="ses-chairs"><b>For</b> Interventional Radiologists / Radiologists only</span></div>
    <div className="slot" data-cat="workshop">
      <div className="slot-time"><span className="t">17:45</span><span className="d">60 min</span></div>
      <div className="slot-body">
        <div className="chip">Hands-On Workshop</div>
        <h3 className="slot-title">Phantom-Based Practical Session — RFA &amp; MWA Technique Training</h3>
        <p className="slot-desc">Small-group, faculty-supervised hands-on practice on ex-vivo tissue phantoms. All four stations run simultaneously; delegates rotate once between an RFA and an MWA station — two 30-minute rotations (17:45–18:15 &amp; 18:15–18:45).</p>
        <div className="subs">
          <div className="sub">
            <span className="sub-t">RFA</span>
            <div>
              <div className="sub-title">Station A — RFA: Electrode Positioning &amp; Real-Time US Monitoring</div>
              <div className="sub-fac" style={{color: 'var(--olive)'}}>Dr. Rohit Khandelwal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Noida</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">RFA</span>
            <div>
              <div className="sub-title">Station B — RFA: Electrode Positioning &amp; Real-Time US Monitoring</div>
              <div className="sub-fac" style={{color: 'var(--olive)'}}>Dr. Shahnawaz Bashir<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Max Hospital, Saket, New Delhi</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">MWA</span>
            <div>
              <div className="sub-title">Station C — MWA: Antenna Positioning &amp; Real-Time US Monitoring</div>
              <div className="sub-fac" style={{color: 'var(--olive)'}}>Dr. Ajit Yadav<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Sir Ganga Ram Hospital, New Delhi</span></div>
            </div>
          </div>
          <div className="sub">
            <span className="sub-t">MWA</span>
            <div>
              <div className="sub-title">Station D — MWA: Antenna Positioning &amp; Real-Time US Monitoring</div>
              <div className="sub-fac" style={{color: 'var(--olive)'}}>Dr. Gaurav Gangwani<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Lilavati Hospital, Mumbai</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*  End of day  */}
    <div className="slot close-row" data-cat="break">
      <div className="slot-time"><span className="t">18:45</span><span className="d">—</span></div>
      <div className="slot-body">
        <h3 className="slot-title">End of Day 1</h3>
      </div>
    </div>

  </section>

  {/*  =====================================================  */}
  {/*  ======================  DAY 2  ======================  */}
  {/*  =====================================================  */}
  <section className={`day ${activeTab === '2' ? 'active' : ''}`} id="day2">
    <h2 className="day-title">Day <em>Two</em></h2>
    <p className="day-meta">IR Tutorials · Saturday, 28 November 2026 · Full Day Programme · 08:30 – 15:25<br/><span className="venue venue-d2">Venue · Holiday Inn New Delhi Aerocity, Asset Area 12, Hospitality District, Aerocity, New Delhi 110037</span></p>

    <div className="legend">
      <span className="leg"><i style={{background: 'var(--teal)'}}></i>Lecture</span>
      <span className="leg"><i style={{background: 'var(--grey)'}}></i>Break</span>
    </div>

    <div className="band">
      <span className="band-l">Morning Session</span>
      <span className="band-r">08:30 – 13:00</span>
    </div>

    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">08:30</span><span className="d">30 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Registration &amp; Morning Coffee</h3>
        <p className="slot-desc">Delegate registration, welcome refreshments, exhibitor networking</p>
      </div>
    </div>

    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">09:00</span><span className="d">10 min</span></div>
      <div className="slot-body">
        <div className="chip">Welcome</div>
        <h3 className="slot-title">Welcome Address &amp; Day 1 Recap</h3>
        <p className="slot-desc">Summary of key takeaways from Day 1 and overview of Day 2 programme.</p>
        <div className="faculty">Dr. S. S. Baijal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span> · Course Chair</div>
      </div>
    </div>

    <div className="ses-band"><span className="ses-name">Imaging &amp; Biopsy</span><span className="ses-chairs"><b>Chaired by</b> Dr. Rohit Khandelwal  &middot;  Dr. Abhishek Bansal</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">09:10</span><span className="d">60 min</span></div>
      <div className="slot-body">
        <div className="chip">Session I — Imaging</div>
        <h3 className="slot-title">TI-RADS — Structured Ultrasound Reporting for Thyroid Nodules</h3>
        <p className="slot-desc">A practical approach to thyroid nodule assessment using TI-RADS — applying the lexicon and risk categories in day-to-day reporting to stratify malignancy risk and guide the biopsy and ablation pathway.</p>
        <div className="subs">
          <div className="sub"><span className="sub-t">09:10</span><div><div className="sub-title">TI-RADS — A Practical Approach to Thyroid Nodule Assessment <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Jyoti Kumar<span style={{color: 'var(--grey)', fontWeight: '400'}}> · MAMC, New Delhi</span></div></div></div>
          <div className="sub"><span className="sub-t">09:30</span><div><div className="sub-title">Ultrasound Features That Predict Malignancy — Pitfalls &amp; Borderline Cases <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Alpana Manchanda<span style={{color: 'var(--grey)', fontWeight: '400'}}> · MAMC, New Delhi</span></div></div></div>
          <div className="sub"><span className="sub-t">09:50</span><div><div className="sub-title">Interactive Case Quiz — Audience TI-RADS Scoring Exercise</div><div className="sub-fac" style={{color: 'var(--crimson)'}}>Dr. Prabhjyot Singh Chowhan<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span> · Moderator</div></div></div>
        </div>
      </div>
    </div>

    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">10:10</span><span className="d">40 min</span></div>
      <div className="slot-body">
        <div className="chip">Session II — Biopsy</div>
        <h3 className="slot-title">FNA for Thyroid Nodules — Technique, Bethesda Classification &amp; Decision Making</h3>
        <p className="slot-desc">US-guided fine needle aspiration for thyroid nodules — sampling technique, and how the cytopathologist and interventional radiologist work together to maximise diagnostic yield: Bethesda reporting, ROSE and optimal smear preparation.</p>
        <div className="subs">
          <div className="sub"><span className="sub-t">10:10</span><div><div className="sub-title">US-Guided FNA Technique — Tips for Adequate Sampling <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Sanchita Gupta<span style={{color: 'var(--grey)', fontWeight: '400'}}> · AIIMS, New Delhi</span></div></div></div>
          <div className="sub"><span className="sub-t">10:30</span><div><div className="sub-title">Cytopathology for the IR — Bethesda Reporting, ROSE &amp; Optimising Smears &amp; Samples <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Haimanti Sarin<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div></div></div>
        </div>
      </div>
    </div>

    {/*  Patient selection & decision-making lecture  */}
    <div className="ses-band"><span className="ses-name">Patient Selection &amp; Decision-Making</span><span className="ses-chairs"><b>Chaired by</b> Dr. Ajit Yadav  &middot;  Dr. Karthikeyan Damodharan</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">10:50</span><span className="d">25 min</span></div>
      <div className="slot-body">
        <div className="chip">Clinical Decision-Making</div>
        <h3 className="slot-title">Patient Selection &amp; Decision-Making — The Right Patient, Difficult &amp; Unconventional Cases</h3>
        <div className="talk-split">20 min lecture + 5 min discussion</div>
        <p className="slot-desc">Indications and ideal candidate selection for thyroid ablation, navigating difficult, borderline and unconventional cases and complex decision-making situations, with a brief discussion of planned multi-session ablation as a legitimate strategy in appropriate patients.</p>
        <div className="faculty">Dr. Gaurav Gangwani<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Lilavati Hospital, Mumbai</span></div>
      </div>
    </div>

    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">11:15</span><span className="d">15 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Tea Break</h3>
      </div>
    </div>

    <div className="ses-band"><span className="ses-name">Hyperfunctioning Nodules</span><span className="ses-chairs"><b>Chaired by</b> Dr. Manas Sahoo  &middot;  Dr. Rajesh Rajput</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">11:30</span><span className="d">40 min</span></div>
      <div className="slot-body">
        <div className="chip">Session III — Special Indications</div>
        <h3 className="slot-title">Role of Thyroid Ablation for Hyperfunctioning Nodules</h3>
        <p className="slot-desc">Ablation as an alternative to radioiodine and surgery for toxic adenoma and autonomously functioning thyroid nodules — patient selection, procedural nuances, hormone normalisation rates, and recurrence data.</p>
        <div className="subs">
          <div className="sub"><span className="sub-t">11:30</span><div><div className="sub-title">Pathophysiology, Guidelines &amp; Evidence for Ablation of AFTN / Toxic Adenoma <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Arun Gupta<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Sir Ganga Ram Hospital, New Delhi</span></div></div></div>
          <div className="sub"><span className="sub-t">11:50</span><div><div className="sub-title">RFA vs Ethanol vs RAI — Comparative Outcomes in Hyperthyroidism <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Abhishek Bansal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Aakash Healthcare, Dwarka</span></div></div></div>
        </div>
      </div>
    </div>

    <div className="ses-band"><span className="ses-name">Safety &amp; Follow-Up</span><span className="ses-chairs"><b>Chaired by</b> Dr. M. C. Uthappa  &middot;  Dr. Gaurav Gangwani</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">12:10</span><span className="d">25 min</span></div>
      <div className="slot-body">
        <div className="chip">Session IV — Safety</div>
        <h3 className="slot-title">Managing Complications of Thyroid Ablation</h3>
        <div className="talk-split">20 min lecture + 5 min discussion</div>
        <p className="slot-desc">Incidence, grading (SIR classification), prevention strategies and structured management of peri- and post-procedural adverse events — RLN injury and voice change, haematoma, thyroid storm and skin burns.</p>
        <div className="faculty">Dr. Ajit Yadav<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Sir Ganga Ram Hospital, New Delhi</span></div>
      </div>
    </div>

    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">12:35</span><span className="d">25 min</span></div>
      <div className="slot-body">
        <div className="chip">Session V — Follow-Up &amp; Surveillance</div>
        <h3 className="slot-title">Post-Ablation Follow-Up — VRR Reporting, Regrowth &amp; Cancer Detection</h3>
        <div className="talk-split">20 min lecture + 5 min discussion</div>
        <p className="slot-desc">Evidence-based surveillance protocol, volume reduction ratio (VRR) interpretation, follow-up imaging at 1/3/6/12 months, mechanisms of regrowth and repeat-treatment algorithm, plus red flags and salvage pathways for de-novo or occult malignancy on follow-up.</p>
        <div className="faculty">Dr. Navin M. Mulamani<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Belgaum</span></div>
      </div>
    </div>

    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">13:00</span><span className="d">60 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Lunch Break</h3>
        <p className="slot-desc">Buffet lunch · Industry-sponsored lunch symposium available in Room B (optional)</p>
      </div>
    </div>

    <div className="band">
      <span className="band-l">Afternoon Session</span>
      <span className="band-r">14:00 – 15:25</span>
    </div>

    <div className="ses-band"><span className="ses-name">Thyroid Malignancy</span><span className="ses-chairs"><b>Chaired by</b> Dr. S. S. Baijal  &middot;  Dr. Shahnawaz Bashir</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">14:00</span><span className="d">40 min</span></div>
      <div className="slot-body">
        <div className="chip">Session VI — Oncology</div>
        <h3 className="slot-title">Thyroid Cancers — Current Role &amp; Evidence for Ablation</h3>
        <p className="slot-desc">The evolving evidence landscape for thermal ablation in thyroid malignancy — from papillary thyroid microcarcinoma (PTMC) under active surveillance, to recurrent disease and lymph node metastases. Where does ablation stand against surgery today?</p>
        <div className="subs">
          <div className="sub"><span className="sub-t">14:00</span><div><div className="sub-title">Ablation in Thyroid Malignancy — PTMC (Active Surveillance vs Immediate Ablation), Recurrent Cancer &amp; Lymph Node Metastases <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Anubhav Khandelwal<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Medanta, Gurugram</span></div></div></div>
          <div className="sub"><span className="sub-t">14:20</span><div><div className="sub-title">Ablation vs Surgery for Low-Risk DTC — Oncological Safety, Long-Term Data &amp; Controversies <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Karthikeyan Damodharan<span style={{color: 'var(--grey)', fontWeight: '400'}}> · MIOT International, Chennai</span></div></div></div>
        </div>
      </div>
    </div>

    <div className="ses-band"><span className="ses-name">Trans-Arterial Embolization</span><span className="ses-chairs"><b>Chaired by</b> Dr. Arun Gupta  &middot;  Dr. Anubhav Khandelwal</span></div>
    <div className="slot" data-cat="lecture">
      <div className="slot-time"><span className="t">14:40</span><span className="d">35 min</span></div>
      <div className="slot-body">
        <div className="chip">Special Session</div>
        <h3 className="slot-title">Role of Trans-Arterial Embolization in Thyroid Nodules</h3>
        <p className="slot-desc">A two-part session on TAE as a complementary or alternative strategy to thermal ablation — rationale, patient selection and evidence, followed by technique, embolic agents and outcomes.</p>
        <div className="subs">
          <div className="sub"><span className="sub-t">14:40</span><div><div className="sub-title">Part 1 — Rationale, Patient Selection &amp; Evidence Base <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min</span></div><div className="sub-fac">Dr. Gaurav Gangwani<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Lilavati Hospital, Mumbai</span></div></div></div>
          <div className="sub"><span className="sub-t">14:55</span><div><div className="sub-title">Part 2 — Technique, Embolic Agents &amp; Outcomes <span style={{color: 'var(--grey)', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.1em'}}>· 15 min + 5 min discussion</span></div><div className="sub-fac">Dr. Puneet Garg<span style={{color: 'var(--grey)', fontWeight: '400'}}> · Safdarjang Hospital, New Delhi</span></div></div></div>
        </div>
      </div>
    </div>

    <div className="slot" data-cat="break">
      <div className="slot-time"><span className="t">15:15</span><span className="d">10 min</span></div>
      <div className="slot-body">
        <h3 className="slot-title">Conference Close</h3>
        <p className="slot-desc">Feedback forms · Closing remarks</p>
      </div>
    </div>

    <div className="slot close-row" data-cat="break">
      <div className="slot-time"><span className="t">15:25</span><span className="d">—</span></div>
      <div className="slot-body">
        <h3 className="slot-title">High Tea</h3>
        <p className="slot-desc">Networking high tea to close the summit</p>
      </div>
    </div>

  </section>


  {/*  ===== FACULTY =====  */}
  <section className={`day ${activeTab === '3' ? 'active' : ''}`} id="day3">
    <h2 className="day-title">Faculty <em>&amp; Affiliations</em></h2>
    <p className="day-meta">Designations &amp; affiliations</p>
    <div className="faculty-list">
      <div className="fac-group">
        <h3 className="fac-group-title">Radiology & Interventional Radiology</h3>
        <div className="fac-entry"><span className="fac-name">Dr. S. S. Baijal</span><span className="fac-desig">Chairman, Diagnostic & Interventional Radiology, Medanta – The Medicity, Gurugram</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Arun Gupta</span><span className="fac-desig">Chairperson & Senior Consultant, Interventional Radiology, Sir Ganga Ram Hospital, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Jyoti Kumar</span><span className="fac-desig">Director Professor, Radiodiagnosis, Maulana Azad Medical College, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Alpana Manchanda</span><span className="fac-desig">Director Professor, Radiodiagnosis, Maulana Azad Medical College, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Karthikeyan Damodharan</span><span className="fac-desig">Director, Vascular & Interventional Radiology, MIOT International, Chennai</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Anubhav Khandelwal</span><span className="fac-desig">Director, Interventional Radiology, Medanta – The Medicity, Gurugram</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Rohit Khandelwal</span><span className="fac-desig">Director, Interventional Radiology, Medanta, Noida</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. M. C. Uthappa</span><span className="fac-desig">Director, Interventional Radiology & Interventional Oncology, Gleneagles Hospitals, Bengaluru</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Puneet Garg</span><span className="fac-desig">Professor, Interventional Radiology, VMMC & Safdarjang Hospital, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Ajit Yadav</span><span className="fac-desig">Vice Chairperson & Senior Consultant, Interventional Radiology, Sir Ganga Ram Hospital, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Abhishek Bansal</span><span className="fac-desig">Senior Consultant & Chief of Interventional Radiology, Aakash Healthcare, Dwarka, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Shahnawaz Bashir</span><span className="fac-desig">Head of Unit, Interventional Radiology, Max Hospital, Saket, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Prabhjyot Singh Chowhan</span><span className="fac-desig">Consultant, Interventional Radiology, Medanta – The Medicity, Gurugram</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Gaurav Gangwani</span><span className="fac-desig">Consultant, Interventional Radiology, Lilavati Hospital & Research Centre, Mumbai</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Navin M. Mulamani</span><span className="fac-desig">Consultant, Interventional Radiology, Belgaum</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Sanchita Gupta</span><span className="fac-desig">Assistant Professor, Interventional Radiology, AIIMS, New Delhi</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Tara Prasad Tripathy</span><span className="fac-desig">Assistant Professor, Interventional Radiology, AIIMS Bhubaneswar</span></div>
      </div>
      <div className="fac-group">
        <h3 className="fac-group-title">Surgery</h3>
        <div className="fac-entry"><span className="fac-name">Dr. Marcin Barczyński</span><span className="fac-desig">Professor of Surgery & Head, Dept. of Endocrine Surgery, Jagiellonian University Medical College, Kraków, Poland</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Kanika Rana</span><span className="fac-desig">Senior Consultant, Head & Neck Onco-Surgery, Medanta – The Medicity, Gurugram</span></div>
      </div>
      <div className="fac-group">
        <h3 className="fac-group-title">Nuclear Medicine</h3>
        <div className="fac-entry"><span className="fac-name">Dr. Manas Sahoo</span><span className="fac-desig">Associate Director, Nuclear Medicine, Medanta – The Medicity, Gurugram</span></div>
      </div>
      <div className="fac-group">
        <h3 className="fac-group-title">Endocrinology</h3>
        <div className="fac-entry"><span className="fac-name">Dr. Rajesh Rajput</span><span className="fac-desig">Director, Endocrinology & Diabetes, Medanta – The Medicity, Gurugram</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Harmandeep Kaur</span><span className="fac-desig">Associate Director, Endocrinology & Diabetes, Medanta – The Medicity, Gurugram</span></div>
        <div className="fac-entry"><span className="fac-name">Dr. Parjeet Kaur</span><span className="fac-desig">Senior Consultant, Department of Endocrinology, Apollo Hospitals, Gurugram</span></div>
      </div>
      <div className="fac-group">
        <h3 className="fac-group-title">Cytopathology</h3>
        <div className="fac-entry"><span className="fac-name">Dr. Haimanti Sarin</span><span className="fac-desig">Director, Cytopathology, Medanta – The Medicity, Gurugram</span></div>
      </div>
    </div>
  </section>

  {/*  ===== FOOTER =====  */}
  <footer className="foot">
    <div className="foot-brand">Thyroid <em>Intervention</em> Summit</div>
    <div className="foot-meta">ISTS 2026 · IR Tutorials · 27–28 November 2026</div>
  </footer>

</div>

<button className="printbtn" onClick="window.print()">Print / PDF</button>

    </>
  );
};

export default Program;
