import React, { useState, useRef, useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';
import { Camera, QrCode, X, Sparkles, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Step1Demographics({ goNext }) {
    const { formData, updateField } = useFormStore();
    const [showScanner, setShowScanner] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [mockInput, setMockInput] = useState('');
    const videoRef = useRef(null);
    const [cameraDevices, setCameraDevices] = useState([]);
    const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);
    const [isScanning, setIsScanning] = useState(false);

    const handleNext = (e) => {
        e.preventDefault();
        if (!formData.uhid || formData.uhid.length < 3) return;
        goNext();
    };

    // Camera control hook
    useEffect(() => {
        if (showScanner) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [showScanner, activeDeviceIdx]);

    const startCamera = async () => {
        try {
            stopCamera();
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            setCameraDevices(videoDevices);

            const constraints = {
                video: {
                    deviceId: videoDevices[activeDeviceIdx]?.deviceId ? { exact: videoDevices[activeDeviceIdx].deviceId } : undefined,
                    facingMode: videoDevices.length === 0 ? 'environment' : undefined
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsScanning(true);
        } catch (err) {
            console.error("Camera access error:", err);
            toast.error("Could not access camera. Try inputting mock label data below.");
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        setIsScanning(false);
    };

    const switchCamera = () => {
        if (cameraDevices.length > 1) {
            setActiveDeviceIdx((prev) => (prev + 1) % cameraDevices.length);
        }
    };

    const performHisLookup = (uhid) => {
        const mockHisDb = {
            'MED12345': { patientName: 'Rajesh Kumar', age: 48, gender: 'Male' },
            'MED99881': { patientName: 'Sita Sharma', age: 34, gender: 'Female' },
            'MED77665': { patientName: 'Amit Patel', age: 59, gender: 'Male' },
            'MED55443': { patientName: 'Priya Iyer', age: 29, gender: 'Female' },
            'MED11223': { patientName: 'Kabir Singh', age: 42, gender: 'Male' },
        };

        const patient = mockHisDb[uhid];
        if (patient) {
            updateField('uhid', uhid);
            updateField('patientName', patient.patientName);
            updateField('age', patient.age);
            updateField('gender', patient.gender);
            toast.success("Patient found! Demographics loaded from HIS.");
        } else {
            // Generate a fallback simulated demographic for testing
            const names = ['Karan Johar', 'Neha Gupta', 'Sunita Rao', 'Vikram Seth', 'Ananya Panday'];
            const ages = [23, 41, 56, 62, 38];
            const genders = ['Male', 'Female', 'Other'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAge = ages[Math.floor(Math.random() * ages.length)];
            const randomGender = genders[Math.floor(Math.random() * genders.length)];

            updateField('uhid', uhid);
            updateField('patientName', randomName);
            updateField('age', randomAge);
            updateField('gender', randomGender);
            toast.success("New Patient! Auto-generated demo details via HIS.");
        }
    };

    const parseBarcodeData = (rawText) => {
        if (!rawText || !rawText.trim()) return;
        const text = rawText.trim();
        
        // If demographic properties are encoded directly (separated by | or =)
        if (text.includes('|') || text.includes('=')) {
            const parts = text.split('|');
            let parsedUhid = '';
            let parsedName = '';
            let parsedAge = '';
            let parsedGender = '';

            parts.forEach(part => {
                const [key, val] = part.split('=');
                if (key && val) {
                    const cleanKey = key.trim().toLowerCase();
                    const cleanVal = val.trim();
                    if (cleanKey === 'uhid') parsedUhid = cleanVal;
                    if (cleanKey === 'name') parsedName = cleanVal;
                    if (cleanKey === 'age') parsedAge = cleanVal;
                    if (cleanKey === 'gender') parsedGender = cleanVal;
                }
            });

            if (parsedUhid) {
                updateField('uhid', parsedUhid);
                if (parsedName) updateField('patientName', parsedName);
                if (parsedAge) updateField('age', parsedAge);
                if (parsedGender) updateField('gender', parsedGender);
                toast.success("Demographics parsed from label barcode.");
                setShowScanner(false);
                return;
            }
        }

        // Treat raw text as UHID and resolve via HIS Lookup
        performHisLookup(text);
        setShowScanner(false);
    };

    // Native Barcode Detector scan loop
    useEffect(() => {
        let active = true;
        const scanFrame = async () => {
            if (!active || !isScanning || !videoRef.current || !('BarcodeDetector' in window)) return;
            try {
                // @ts-ignore
                const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code', 'code_128', 'ean_13', 'code_39', 'pdf417'] });
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes.length > 0 && barcodes[0].rawValue) {
                    parseBarcodeData(barcodes[0].rawValue);
                    active = false;
                    return;
                }
            } catch (err) {
                // Ignore detector errors in loop
            }
            if (active) {
                requestAnimationFrame(scanFrame);
            }
        };

        if (isScanning && 'BarcodeDetector' in window) {
            requestAnimationFrame(scanFrame);
        }
        return () => { active = false; };
    }, [isScanning]);

    // Simulated scanner helper
    const triggerSimulation = (mockData) => {
        toast.loading("Scanning label...", { duration: 1000 });
        setTimeout(() => {
            parseBarcodeData(mockData);
        }, 1000);
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            <style>{`
                .scanner-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(4, 9, 20, 0.95);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    backdrop-filter: blur(10px);
                }
                .scanner-box {
                    position: relative;
                    width: 280px;
                    height: 280px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    overflow: hidden;
                    background: #000;
                    box-shadow: 0 0 30px rgba(0, 225, 255, 0.15);
                    margin-bottom: 24px;
                }
                .scanner-laser {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(to right, transparent, var(--primary), transparent);
                    box-shadow: 0 0 10px var(--primary);
                    animation: laserSweep 2s ease-in-out infinite;
                }
                .scanner-corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: var(--primary);
                    border-style: solid;
                    border-width: 0;
                }
                .corner-tl { top: 15px; left: 15px; border-top-width: 3px; border-left-width: 3px; border-top-left-radius: 8px; }
                .corner-tr { top: 15px; right: 15px; border-top-width: 3px; border-right-width: 3px; border-top-right-radius: 8px; }
                .corner-bl { bottom: 15px; left: 15px; border-bottom-width: 3px; border-left-width: 3px; border-bottom-left-radius: 8px; }
                .corner-br { bottom: 15px; right: 15px; border-bottom-width: 3px; border-right-width: 3px; border-bottom-right-radius: 8px; }
                @keyframes laserSweep {
                    0% { top: 15px; }
                    50% { top: 260px; }
                    100% { top: 15px; }
                }
            `}</style>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Patient Demographics</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Search the patient's UHID in the hospital database (HIS) or enter demographics manually below.
            </p>

            <div style={{ marginBottom: '24px' }}>
                <button
                    type="button"
                    className="btn-primary"
                    style={{ 
                        width: '100%', 
                        borderRadius: '12px', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-muted)',
                        cursor: 'not-allowed',
                        opacity: 0.6 
                    }}
                    disabled
                >
                    <Camera size={18} />
                    <span>Scan Patient Label (Unsupported)</span>
                </button>
            </div>

            <form onSubmit={handleNext}>
                <div className="form-group">
                    <label className="form-label">UHID *</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="e.g. MED123456"
                            value={formData.uhid}
                            onChange={(e) => updateField('uhid', e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '0 16px', borderRadius: '12px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={() => performHisLookup(formData.uhid)}
                            disabled={!formData.uhid || formData.uhid.length < 3}
                        >
                            <RefreshCw size={14} /> Search HIS
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Patient Name (Optional)</label>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Full Name"
                        value={formData.patientName}
                        onChange={(e) => updateField('patientName', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="glass-input"
                            placeholder="Years"
                            value={formData.age}
                            onChange={(e) => updateField('age', e.target.value)}
                        />
                    </div>

                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label className="form-label">Gender</label>
                        <select
                            className="glass-input"
                            value={formData.gender}
                            onChange={(e) => updateField('gender', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                    <button type="submit" className="btn-primary" disabled={!formData.uhid || formData.uhid.length < 3}>
                        Next: Procedure
                    </button>
                </div>
            </form>

            {/* Camera Scanner Modal Overlay */}
            {showScanner && (
                <div className="scanner-overlay animate-fade-in">
                    <div style={{ alignSelf: 'flex-end', marginBottom: '8px' }}>
                        <button
                            onClick={() => setShowScanner(false)}
                            style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '6px', fontWeight: '600' }}>Scan Patient Barcode</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px', textAlign: 'center', maxWidth: '320px' }}>
                        Align patient label barcode or QR code inside the bounding box.
                    </p>

                    <div className="scanner-box">
                        <div className="scanner-laser"></div>
                        <div className="scanner-corner corner-tl"></div>
                        <div className="scanner-corner corner-tr"></div>
                        <div className="scanner-corner corner-bl"></div>
                        <div className="scanner-corner corner-br"></div>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {cameraDevices.length > 1 && (
                        <button
                            className="btn-secondary"
                            onClick={switchCamera}
                            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            <RefreshCw size={14} /> Toggle Camera
                        </button>
                    )}

                    {/* Developer Mock Scanner Input & Sandbox */}
                    <div className="glass-panel" style={{ width: '100%', maxWidth: '360px', padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                            <Sparkles size={12} /> Scanner Sandbox Fallback
                        </span>
                        <input
                            type="text"
                            className="glass-input"
                            style={{ fontSize: '13px', padding: '10px 12px', marginBottom: '12px' }}
                            placeholder="Type UHID (e.g. MED12345) or key-value list"
                            value={mockInput}
                            onChange={(e) => setMockInput(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                type="button"
                                className="btn-secondary"
                                style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '8px' }}
                                onClick={() => triggerSimulation(mockInput || 'MED99881')}
                            >
                                Simulate Scan
                            </button>
                            <button
                                type="button"
                                className="btn-secondary"
                                style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '8px', border: '1px dashed var(--primary)' }}
                                onClick={() => triggerSimulation('uhid=MED77665|name=Amit Patel|age=59|gender=Male')}
                            >
                                Full Demo Label
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
