/**
 * Scoring & Recommendation Engine for Audiophile Blind Test
 */

import { ARCHETYPES } from '../data/archetypes';
import { BUDGET_IEMS } from '../data/iemDatabase';

/**
 * Calculates user's sound vector and matches against budget IEMs
 * @param {Object} answers e.g. { 1: 'A', 2: 'B', 3: 'indifferent', ... }
 */
export function calculateProfileAndRecommendations(answers) {
  // Baseline neutral values (scale 0 - 100)
  let bass = 50;
  let mid = 50;
  let treble = 50;
  let stage = 50;
  let detail = 65;

  let indifferentCount = 0;

  // Round 1: Bass
  const r1 = answers[1];
  if (r1 === 'A') { // Warm Punchy
    bass += 28; // 78
  } else if (r1 === 'B') { // Clean / Sub-bass
    bass -= 18; // 32
    detail += 8;
  } else {
    indifferentCount++;
  }

  // Round 2: Mids / Vocals
  const r2 = answers[2];
  if (r2 === 'A') { // Vocal forward intimate
    mid += 32; // 82
  } else if (r2 === 'B') { // Recessed / V-shape
    mid -= 24; // 26
    bass += 5;
  } else {
    indifferentCount++;
  }

  // Round 3: Treble & Air
  const r3 = answers[3];
  if (r3 === 'A') { // Smooth / Fatigue-free
    treble -= 22; // 28
  } else if (r3 === 'B') { // Crisp / Sparkle
    treble += 28; // 78
    detail += 12;
  } else {
    indifferentCount++;
  }

  // Round 4: Soundstage & Spatial
  const r4 = answers[4];
  if (r4 === 'A') { // Intimate
    stage -= 18; // 32
  } else if (r4 === 'B') { // Wide / Holographic
    stage += 26; // 76
    detail += 5;
  } else {
    indifferentCount++;
  }

  // Round 5: Overall Tonal Signature
  const r5 = answers[5];
  if (r5 === 'A') { // Warm Musical
    bass += 8;
    treble -= 6;
  } else if (r5 === 'B') { // Harman Balanced
    mid += 6;
    treble += 6;
  } else {
    indifferentCount++;
  }

  // Bound within 10 - 95
  const clamp = (val) => Math.min(95, Math.max(15, Math.round(val)));
  const userVector = {
    bass: clamp(bass),
    mid: clamp(mid),
    treble: clamp(treble),
    stage: clamp(stage),
    detail: clamp(detail - (indifferentCount * 5))
  };

  // Determine Archetype
  let archetypeKey = 'harman_balancer';

  if (userVector.bass >= 75 && userVector.treble <= 50) {
    archetypeKey = 'warmth_seeker';
  } else if (userVector.bass >= 70 && userVector.treble >= 65 && userVector.mid <= 45) {
    archetypeKey = 'energy_v';
  } else if (userVector.mid >= 70 && userVector.treble <= 65) {
    archetypeKey = 'vocal_purist';
  } else if (userVector.treble >= 70 || (userVector.stage >= 70 && userVector.detail >= 75)) {
    archetypeKey = 'detail_hunter';
  } else {
    archetypeKey = 'harman_balancer';
  }

  const archetype = ARCHETYPES[archetypeKey] || ARCHETYPES.harman_balancer;

  // Generate Readable Labels
  const labels = {
    bass: userVector.bass > 68 ? 'Warm & Punchy' : userVector.bass < 42 ? 'Clean & Lean' : 'Balanced',
    mid: userVector.mid > 68 ? 'Vocal-Forward / Intimate' : userVector.mid < 42 ? 'Relaxed / V-Shape' : 'Natural',
    treble: userVector.treble > 68 ? 'Sparkle & Extended Air' : userVector.treble < 45 ? 'Smooth & Fatigue-Free' : 'Crisp Balanced',
    stage: userVector.stage > 65 ? 'Wide & Holographic' : userVector.stage < 45 ? 'Centered & Intimate' : 'Medium-Wide',
    detail: userVector.detail > 70 ? 'High Sensitivity' : userVector.detail > 50 ? 'Moderate' : 'Smooth Listening'
  };

  // Calculate Similarity against each IEM in database
  // Weighted Euclidean Distance Formula
  const weights = { bass: 1.2, mid: 1.3, treble: 1.2, stage: 0.9, detail: 1.0 };
  const maxPossibleDistance = Math.sqrt(
    Object.keys(weights).reduce((acc, k) => acc + weights[k] * Math.pow(85, 2), 0)
  );

  const rankedRecommendations = BUDGET_IEMS.map(iem => {
    let sumSquared = 0;
    for (const key of Object.keys(weights)) {
      const diff = (userVector[key] || 50) - (iem.soundVector[key] || 50);
      sumSquared += weights[key] * Math.pow(diff, 2);
    }
    const distance = Math.sqrt(sumSquared);
    const rawMatch = 100 - (distance / maxPossibleDistance) * 100;
    const matchPercentage = Math.min(98, Math.max(55, Math.round(rawMatch)));

    return {
      ...iem,
      matchScore: matchPercentage
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return {
    userVector,
    archetype,
    labels,
    indifferentCount,
    recommendations: rankedRecommendations
  };
}
