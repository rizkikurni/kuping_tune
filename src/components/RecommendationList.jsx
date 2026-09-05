import React, { useState } from 'react';
import { ExternalLink, Check, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function RecommendationList({ recommendations, userVector }) {
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  let filtered = recommendations.filter(iem => {
    if (budgetFilter === 'under300') return iem.price <= 300000;
    if (budgetFilter === '300to600') return iem.price > 300000 && iem.price <= 600000;
    if (budgetFilter === 'above600') return iem.price > 600000;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return b.matchScore - a.matchScore;
  });

  const getShopLink = (name) => {
    return `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(name)}`;
  };

  return (
    <section id="recommendations-section" style={{ padding: '40px 0 100px', background: 'var(--c-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--c-yellow)',
            border: '2px solid #0E0F14',
            borderRadius: '999px',
            padding: '6px 18px',
            fontWeight: 900,
            fontSize: '0.85rem',
            boxShadow: '3px 3px 0px #0E0F14',
            marginBottom: '16px'
          }}>
            🎯 REKOMENDASI IEM KERE HORE
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
            IEM Paling Cocok Untuk Telingamu
          </h2>
          <p style={{ color: 'var(--c-text-muted)', fontSize: '1.02rem', maxWidth: '620px', margin: '0 auto', fontWeight: 600 }}>
            Dipasangkan menggunakan kalkulasi matematis *Euclidean Distance* antara respons frekuensi fisik earphone dengan hasil tes kupingmu.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF',
          border: '2.5px solid #0E0F14',
          borderRadius: '20px',
          boxShadow: '4px 4px 0px #0E0F14',
          padding: '16px 24px',
          marginBottom: '36px'
        }}>
          {/* Budget Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0E0F14', marginRight: '4px' }}>
              BUDGET:
            </span>
            <button
              onClick={() => setBudgetFilter('all')}
              className={`badge-pill ${budgetFilter === 'all' ? 'badge-pill-yellow' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Semua Harga (&lt; Rp 1 Jt)
            </button>
            <button
              onClick={() => setBudgetFilter('under300')}
              className={`badge-pill ${budgetFilter === 'under300' ? 'badge-pill-yellow' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              &lt; Rp 300 Ribu
            </button>
            <button
              onClick={() => setBudgetFilter('300to600')}
              className={`badge-pill ${budgetFilter === '300to600' ? 'badge-pill-pink' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Rp 300rb - 600rb
            </button>
            <button
              onClick={() => setBudgetFilter('above600')}
              className={`badge-pill ${budgetFilter === 'above600' ? 'badge-pill-yellow' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Rp 600rb - 900rb
            </button>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} color="#0E0F14" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                color: '#0E0F14',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '2px 2px 0px #0E0F14'
              }}
            >
              <option value="match">Urutkan: Match Tertinggi</option>
              <option value="priceAsc">Urutkan: Harga Termurah</option>
              <option value="priceDesc">Urutkan: Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {filtered.map((iem, index) => {
            const isTopChoice = index === 0 && sortBy === 'match';

            return (
              <div
                key={iem.id}
                style={{
                  background: isTopChoice ? 'var(--c-yellow)' : '#FFFFFF',
                  border: '3px solid #0E0F14',
                  borderRadius: '24px',
                  boxShadow: isTopChoice ? '8px 8px 0px #0E0F14' : '5px 5px 0px #0E0F14',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  {/* Top Bar: Brand, Match Score Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      background: '#FFFFFF',
                      border: '2px solid #0E0F14',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      boxShadow: '2px 2px 0px #0E0F14'
                    }}>
                      {iem.brand}
                    </span>

                    <div style={{
                      background: iem.matchScore >= 90 ? 'var(--c-orange)' : 'var(--c-pink)',
                      color: iem.matchScore >= 90 ? '#FFFFFF' : '#0E0F14',
                      border: '2px solid #0E0F14',
                      borderRadius: '999px',
                      padding: '4px 14px',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      boxShadow: '2px 2px 0px #0E0F14'
                    }}>
                      {iem.matchScore}% Match
                    </div>
                  </div>

                  {/* IEM Name & Price */}
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '4px' }}>
                    {iem.name}
                  </h3>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: isTopChoice ? '#6949FE' : '#FF7728',
                    marginBottom: '16px'
                  }}>
                    {iem.priceFormatted}
                  </div>

                  {/* Tuning Box */}
                  <div style={{
                    background: '#FFFFFF',
                    border: '2px solid #0E0F14',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '16px',
                    boxShadow: '2px 2px 0px #0E0F14'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--c-text-muted)' }}>
                      TUNING SIGNATURE
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#0E0F14' }}>
                      {iem.tuning}
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginTop: '2px' }}>
                      {iem.driver}
                    </div>
                  </div>

                  {/* Why this matches you */}
                  <div style={{
                    background: isTopChoice ? '#FFFFFF' : 'var(--c-cream)',
                    border: '2px dashed #0E0F14',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '18px'
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      color: '#FF7728',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}>
                      ⚡ Kenapa Pas Denganmu:
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#1F2937', fontWeight: 600, lineHeight: 1.5 }}>
                      {iem.recommendationReason}
                    </p>
                  </div>

                  {/* Pros list */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14', marginBottom: '8px' }}>
                      KELEBIHAN UTAMA:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {iem.pros.map((pro, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                          <Check size={16} color="#10B981" strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Search on Tokopedia Button */}
                <a
                  href={getShopLink(iem.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neo btn-neo-white"
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    fontSize: '0.9rem',
                    marginTop: '8px'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Cari di Tokopedia / Olshop</span>
                  <ExternalLink size={14} />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
