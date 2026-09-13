import React, { useState, useRef } from 'react';
import { PRESET_TRACKS } from '../audio/demoTrackGenerator';
import { audioEngine } from '../audio/audioEngine';
import { X, UploadCloud, Music, Check, ShieldCheck, Disc, FileAudio, AlertCircle } from 'lucide-react';

export default function TrackSelectorModal({ isOpen, onClose, currentTrack }) {
  const [activeTab, setActiveTab] = useState(currentTrack?.isCustom ? 'upload' : 'preset');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSelectPreset = async (presetId) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await audioEngine.loadPresetTrack(presetId);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Gagal memuat preset: ' + err.message);
    }
  };

  const handleProcessFile = async (file) => {
    if (!file) return;

    // Validate mime type
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|flac|m4a|aac|ogg)$/i)) {
      setErrorMessage('Format file tidak didukung. Harap gunakan file audio (.mp3, .wav, .flac, .m4a, .ogg).');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      await audioEngine.loadCustomAudioFile(file);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Gagal memproses file audio: ' + err.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(14, 15, 20, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      {/* Modal Container */}
      <div style={{
        background: '#FAF8F4',
        border: '3.5px solid #0E0F14',
        borderRadius: '28px',
        boxShadow: '10px 10px 0px #0E0F14',
        width: '100%',
        maxWidth: '620px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '32px'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '2.5px solid #0E0F14',
            boxShadow: '2.5px 2.5px 0px #0E0F14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 900
          }}
          title="Tutup Modal"
        >
          <X size={20} color="#0E0F14" strokeWidth={3} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--c-yellow)',
            border: '2px solid #0E0F14',
            borderRadius: '999px',
            padding: '4px 14px',
            fontWeight: 900,
            fontSize: '0.78rem',
            boxShadow: '2px 2px 0px #0E0F14',
            marginBottom: '10px'
          }}>
            HYBRID AUDIO SOURCE
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: '6px' }}>
            Pilih Trek Musik untuk Blind Test
          </h2>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', fontWeight: 600 }}>
            Uji telingamu dengan lagu demo kurasi atau file lagu favoritmu sendiri.
          </p>
        </div>

        {/* Tab Navigation (Neo-Brutalism Pills) */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '24px',
          background: '#FFFFFF',
          padding: '6px',
          border: '2.5px solid #0E0F14',
          borderRadius: '999px',
          boxShadow: '3px 3px 0px #0E0F14'
        }}>
          <button
            onClick={() => setActiveTab('preset')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.88rem',
              border: activeTab === 'preset' ? '2px solid #0E0F14' : 'none',
              background: activeTab === 'preset' ? 'var(--c-yellow)' : 'transparent',
              color: '#0E0F14',
              boxShadow: activeTab === 'preset' ? '2px 2px 0px #0E0F14' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Disc size={16} />
            <span>Preset Musik Kurasi</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.88rem',
              border: activeTab === 'upload' ? '2px solid #0E0F14' : 'none',
              background: activeTab === 'upload' ? 'var(--c-pink)' : 'transparent',
              color: '#0E0F14',
              boxShadow: activeTab === 'upload' ? '2px 2px 0px #0E0F14' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <UploadCloud size={16} />
            <span>Upload File Sendiri</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            background: '#FEE2E2',
            border: '2px solid #DC2626',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem',
            color: '#B91C1C',
            fontWeight: 700
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: PRESET TRACKS */}
        {activeTab === 'preset' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {PRESET_TRACKS.map(preset => {
              const isSelected = !currentTrack?.isCustom && currentTrack?.id === preset.id;

              return (
                <div
                  key={preset.id}
                  onClick={() => !isLoading && handleSelectPreset(preset.id)}
                  style={{
                    background: isSelected ? 'var(--c-yellow)' : '#FFFFFF',
                    border: '2.5px solid #0E0F14',
                    borderRadius: '18px',
                    boxShadow: isSelected ? '5px 5px 0px #0E0F14' : '3px 3px 0px #0E0F14',
                    padding: '18px 20px',
                    cursor: isLoading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transform: isSelected ? 'translate(-2px, -2px)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ maxWidth: '80%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        background: '#FFFFFF',
                        border: '1.5px solid #0E0F14',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 900
                      }}>
                        {preset.genre} • {preset.bpm} BPM
                      </span>
                      {isSelected && (
                        <span style={{
                          background: 'var(--c-orange)',
                          color: '#FFFFFF',
                          border: '1.5px solid #0E0F14',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 900
                        }}>
                          SEDANG DIGUNAKAN
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '4px' }}>
                      {preset.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 600 }}>
                      {preset.description}
                    </p>
                  </div>

                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isSelected ? '#0E0F14' : '#F3F4F6',
                    color: isSelected ? '#FFFFFF' : '#0E0F14',
                    border: '2px solid #0E0F14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isSelected ? <Check size={18} strokeWidth={3} /> : <Music size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: LOCAL FILE UPLOAD (100% IN-MEMORY) */}
        {activeTab === 'upload' && (
          <div>
            {/* Privacy Guarantee Banner */}
            <div style={{
              background: '#DCFCE7',
              border: '2px solid #15803D',
              borderRadius: '16px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <ShieldCheck size={22} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#14532D', marginBottom: '2px' }}>
                  100% Aman & Berjalan Lokal di Perangkatmu
                </div>
                <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600, lineHeight: 1.4 }}>
                  File lagumu tidak pernah diunggah ke server internet. Audio langsung di-decode di memori RAM browser komputermu menggunakan Web Audio API.
                </div>
              </div>
            </div>

            {/* Currently Loaded Custom Track Info (If Any) */}
            {currentTrack?.isCustom && (
              <div style={{
                background: 'var(--c-pink)',
                border: '2.5px solid #0E0F14',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '4px 4px 0px #0E0F14',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>
                    FILE LOKAL AKTIF:
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0E0F14' }}>
                    {currentTrack.fileName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#4B5563', fontWeight: 700 }}>
                    Ukuran: {currentTrack.fileSizeFormatted} • Durasi: {currentTrack.duration} detik
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '2px solid #0E0F14',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 900
                }}>
                  <Check size={14} color="#10B981" strokeWidth={3} />
                  <span>Terpasang</span>
                </div>
              </div>
            )}

            {/* Drag and Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: dragOver ? '3px solid #6949FE' : '2.5px dashed #0E0F14',
                borderRadius: '20px',
                background: dragOver ? '#EEF2FF' : '#FFFFFF',
                padding: '36px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px #0E0F14',
                transition: 'all 0.15s ease'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.flac,.m4a,.ogg,.aac"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--c-yellow)',
                border: '2.5px solid #0E0F14',
                boxShadow: '3px 3px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <FileAudio size={30} color="#0E0F14" strokeWidth={2.4} />
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '6px' }}>
                {isLoading ? 'Sedang Memproses Audio...' : 'Tarik & Lepas File Audio ke Sini'}
              </h4>
              <p style={{ color: '#6B7280', fontSize: '0.88rem', fontWeight: 600, marginBottom: '16px' }}>
                atau klik untuk memilih file dari komputermu
              </p>

              {/* Supported Format Pills */}
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px' }}>
                {['.MP3', '.WAV', '.FLAC (Lossless)', '.M4A', '.OGG'].map((fmt, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#F3F4F6',
                      border: '1.5px solid #0E0F14',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Revert to Default Button */}
            {currentTrack?.isCustom && (
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                  onClick={() => handleSelectPreset('allrounder')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6949FE',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  ← Kembalikan ke Lagu Studio Preset Bawaan
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
