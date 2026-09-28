// Script to generate CAREVAULT_Pitch_Deck.pptx
// Minimal, humanized, zero-AI-plag content with clean editorial design
import pptxgen from 'pptxgenjs';
import path from 'path';

const pptx = new pptxgen();

// Presentation Properties
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'CAREVAULT Team';
pptx.company = 'CAREVAULT Health Systems';
pptx.title = 'CAREVAULT — Connected care. Protected identities.';
pptx.subject = 'Hackathon Project Presentation';

// Color Palette Constants
const NAVY = '17212B';       // Deep Ink Navy
const OFFWHITE = 'F7F5F0';   // Warm Off-White
const SAGE = '5E806B';       // Healthcare Sage Green
const SAGE_BG = 'E8EFEA';    // Sage Subtle
const DUSTY = '7896A8';      // Dusty Blue
const DUSTY_BG = 'EDF2F5';   // Dusty Subtle
const TERRACOTTA = 'C8755A'; // Accent Terracotta
const AMBER = 'C79A52';      // Warning Amber
const MUTED_RED = 'B85C5C';  // Danger Red
const CHARCOAL = '25282B';   // Body Text
const MUTED_GRAY = '6B7280'; // Subtitle / meta
const WHITE = 'FFFFFF';
const CARD_BG = 'FFFFFF';
const BORDER_COLOR = 'E4DFD5';

// Helper to add standard slide footer
function addSlideFooter(slide, currentNum, totalNum = 9) {
  slide.addText('CAREVAULT • Connected care. Protected identities.', {
    x: 0.8,
    y: 7.0,
    w: 8.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: MUTED_GRAY,
  });

  slide.addText(`${currentNum} / ${totalNum}`, {
    x: 11.5,
    y: 7.0,
    w: 1.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    align: 'right',
    color: MUTED_GRAY,
  });
}

// ========================================================
// SLIDE 1: Title Slide (Dark Navy Background)
// ========================================================
const slide1 = pptx.addSlide();
slide1.background = { color: NAVY };

// Eyebrow badge
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 1.5,
  w: 3.4,
  h: 0.38,
  fill: { color: '243242' },
  line: { color: SAGE, width: 1 },
  rectRadius: 0.08,
});
slide1.addText('PRIVACY-FIRST HEALTH INTELLIGENCE', {
  x: 0.8,
  y: 1.5,
  w: 3.4,
  h: 0.38,
  fontSize: 10,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
  align: 'center',
  valign: 'middle',
});

// Title & Subtitle
slide1.addText('CAREVAULT', {
  x: 0.8,
  y: 2.2,
  w: 11.0,
  h: 1.2,
  fontSize: 54,
  fontFace: 'Arial',
  bold: true,
  color: WHITE,
});

slide1.addText('Connected care. Protected identities.', {
  x: 0.8,
  y: 3.4,
  w: 11.0,
  h: 0.6,
  fontSize: 24,
  fontFace: 'Arial',
  color: SAGE,
});

slide1.addText('A privacy-enforced architectural bridge separating individual clinical records\nfrom population-level disease surveillance.', {
  x: 0.8,
  y: 4.3,
  w: 10.5,
  h: 0.8,
  fontSize: 14,
  fontFace: 'Arial',
  color: 'A0AEC0',
  lineSpacing: 20,
});

// Pillars bar
slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 5.6,
  w: 11.7,
  h: 0.8,
  fill: { color: '1F2C3A' },
  line: { color: '2D3E50', width: 1 },
});
slide1.addText('CLINICAL PLANE (Clinicians)  |  PRIVACY GATE FIREWALL (K ≥ 5)  |  POPULATION PLANE (Surveillance)', {
  x: 0.8,
  y: 5.6,
  w: 11.7,
  h: 0.8,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: WHITE,
  align: 'center',
  valign: 'middle',
});

// ========================================================
// SLIDE 2: The Core Problem (Two Opposing Needs)
// ========================================================
const slide2 = pptx.addSlide();
slide2.background = { color: OFFWHITE };
addSlideFooter(slide2, 2);

slide2.addText('THE CORE CONFLICT', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: TERRACOTTA,
});

slide2.addText('One healthcare system. Two conflicting data demands.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// Left Card: Clinician Need
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: CARD_BG },
  line: { color: SAGE, width: 1.5 },
  rectRadius: 0.1,
});

slide2.addText('NEED 1: FRONTLINE CLINICIAN', {
  x: 1.2,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide2.addText('Needs deep, individual, identifiable clinical history:', {
  x: 1.2,
  y: 2.8,
  w: 4.8,
  h: 0.4,
  fontSize: 12,
  fontFace: 'Arial',
  color: CHARCOAL,
});

slide2.addText([
  { text: '• Accurate past prescriptions to prevent fatal drug interactions\n', options: { bullet: true } },
  { text: '• Life-threatening allergy alerts (e.g. Penicillin anaphylaxis)\n', options: { bullet: true } },
  { text: '• Longitudinal lab observations (Platelet curves, HbA1c)\n', options: { bullet: true } },
  { text: '• Instant access during trauma or unconscious emergencies\n', options: { bullet: true } },
], {
  x: 1.2,
  y: 3.4,
  w: 4.8,
  h: 2.6,
  fontSize: 12,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 22,
});

// Right Card: Public Health Need
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: CARD_BG },
  line: { color: DUSTY, width: 1.5 },
  rectRadius: 0.1,
});

slide2.addText('NEED 2: PUBLIC HEALTH SURVEILLANCE', {
  x: 7.3,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: DUSTY,
});

slide2.addText('Needs macro, aggregated disease trends across regions:', {
  x: 7.3,
  y: 2.8,
  w: 4.8,
  h: 0.4,
  fontSize: 12,
  fontFace: 'Arial',
  color: CHARCOAL,
});

slide2.addText([
  { text: '• Early outbreak detection across municipal wards\n', options: { bullet: true } },
  { text: '• Condition distribution (Dengue, Malaria, Influenza)\n', options: { bullet: true } },
  { text: '• Absolutely ZERO access to individual patient records\n', options: { bullet: true } },
  { text: '• Protection against small-group re-identification\n', options: { bullet: true } },
], {
  x: 7.3,
  y: 3.4,
  w: 4.8,
  h: 2.6,
  fontSize: 12,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 22,
});

// ========================================================
// SLIDE 3: The Architecture (Two Data Planes)
// ========================================================
const slide3 = pptx.addSlide();
slide3.background = { color: OFFWHITE };
addSlideFooter(slide3, 3);

slide3.addText('PRODUCT VISION', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide3.addText('One ecosystem. Two strictly enforced data boundaries.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// 3 Horizontal Architecture Columns
// Col 1: Clinical Data Plane
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 2.1,
  w: 3.6,
  h: 4.4,
  fill: { color: SAGE_BG },
  line: { color: SAGE, width: 1.5 },
  rectRadius: 0.08,
});
slide3.addText('CLINICAL DATA PLANE', {
  x: 1.0,
  y: 2.3,
  w: 3.2,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});
slide3.addText('Authorized Clinicians Only', {
  x: 1.0,
  y: 2.7,
  w: 3.2,
  h: 0.3,
  fontSize: 10,
  fontFace: 'Arial',
  color: MUTED_GRAY,
});
slide3.addText([
  { text: '• Authenticated QR identity\n', options: { bullet: true } },
  { text: '• Active patient consent\n', options: { bullet: true } },
  { text: '• Purpose-scoped (Treatment)\n', options: { bullet: true } },
  { text: '• 30-minute time-bound view\n', options: { bullet: true } },
  { text: '• Longitudinal visit timeline\n', options: { bullet: true } },
], {
  x: 1.0,
  y: 3.2,
  w: 3.2,
  h: 3.0,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 20,
});

// Col 2: The Privacy Firewall (Center Gate)
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 4.8,
  y: 2.1,
  w: 3.6,
  h: 4.4,
  fill: { color: 'FAF4E8' },
  line: { color: AMBER, width: 2 },
  rectRadius: 0.08,
});
slide3.addText('PRIVACY GATE FIREWALL', {
  x: 5.0,
  y: 2.3,
  w: 3.2,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: AMBER,
});
slide3.addText('Zero-Leakage Enforcement', {
  x: 5.0,
  y: 2.7,
  w: 3.2,
  h: 0.3,
  fontSize: 10,
  fontFace: 'Arial',
  color: MUTED_GRAY,
});
slide3.addText([
  { text: '• Hard API RBAC (403 Forbidden)\n', options: { bullet: true } },
  { text: '• PII permanently stripped\n', options: { bullet: true } },
  { text: '• Minimum cell threshold: K ≥ 5\n', options: { bullet: true } },
  { text: '• Differencing attack blocker\n', options: { bullet: true } },
  { text: '• Immutable audit stream\n', options: { bullet: true } },
], {
  x: 5.0,
  y: 3.2,
  w: 3.2,
  h: 3.0,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 20,
});

// Col 3: Population Intelligence Plane
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 8.8,
  y: 2.1,
  w: 3.7,
  h: 4.4,
  fill: { color: DUSTY_BG },
  line: { color: DUSTY, width: 1.5 },
  rectRadius: 0.08,
});
slide3.addText('POPULATION PLANE', {
  x: 9.0,
  y: 2.3,
  w: 3.3,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: DUSTY,
});
slide3.addText('Surveillance Officers Only', {
  x: 9.0,
  y: 2.7,
  w: 3.3,
  h: 0.3,
  fontSize: 10,
  fontFace: 'Arial',
  color: MUTED_GRAY,
});
slide3.addText([
  { text: '• Regional case aggregates\n', options: { bullet: true } },
  { text: '• Weekly epidemic growth curves\n', options: { bullet: true } },
  { text: '• Geographic hotspot mapping\n', options: { bullet: true } },
  { text: '• Zero individual records\n', options: { bullet: true } },
  { text: '• Suppressed cell counters\n', options: { bullet: true } },
], {
  x: 9.0,
  y: 3.2,
  w: 3.3,
  h: 3.0,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 20,
});

// ========================================================
// SLIDE 4: Frontline Care & QR Identification
// ========================================================
const slide4 = pptx.addSlide();
slide4.background = { color: OFFWHITE };
addSlideFooter(slide4, 4);

slide4.addText('CLINICIAN WORKSPACE', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide4.addText('Fast, authorized access at the point of care.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// 4 horizontal process cards
const steps = [
  { title: '1. QR Presentation', desc: 'Patient presents encrypted QR. No raw PII or identifiers are passed in URL payload.', border: SAGE },
  { title: '2. Identity & Role', desc: 'Clinician authenticated with professional credential and multi-factor token (MFA).', border: SAGE },
  { title: '3. Consent Verification', desc: 'Active consent verified against Master Patient Directory. Revoked consent strictly halts flow.', border: SAGE },
  { title: '4. Scoped Session', desc: 'Unlocks 30-min longitudinal timeline: past visits, prescriptions, platelet observations & allergies.', border: SAGE },
];

steps.forEach((step, idx) => {
  const xPos = 0.8 + idx * 2.95;
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 2.2,
    w: 2.8,
    h: 4.2,
    fill: { color: CARD_BG },
    line: { color: step.border, width: 1.5 },
    rectRadius: 0.08,
  });

  slide4.addText(step.title, {
    x: xPos + 0.2,
    y: 2.5,
    w: 2.4,
    h: 0.5,
    fontSize: 13,
    fontFace: 'Arial',
    bold: true,
    color: NAVY,
  });

  slide4.addText(step.desc, {
    x: xPos + 0.2,
    y: 3.2,
    w: 2.4,
    h: 2.8,
    fontSize: 11,
    fontFace: 'Arial',
    color: CHARCOAL,
    lineSpacing: 18,
  });
});

// ========================================================
// SLIDE 5: Population Surveillance & Privacy Gate
// ========================================================
const slide5 = pptx.addSlide();
slide5.background = { color: OFFWHITE };
addSlideFooter(slide5, 5);

slide5.addText('POPULATION HEALTH PLANE', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: DUSTY,
});

slide5.addText('Public health intelligence without privacy compromises.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// 2 Comparison Panels: Protected vs Suppressed
// Panel 1: Protected
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: CARD_BG },
  line: { color: SAGE, width: 1.5 },
  rectRadius: 0.1,
});

slide5.addText('CASE 1: NORMAL AGGREGATE (N ≥ 5)', {
  x: 1.2,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide5.addText('Query: Pune • Dengue • August–September', {
  x: 1.2,
  y: 2.8,
  w: 4.8,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  color: MUTED_GRAY,
});

slide5.addText('Result: 342 Cases', {
  x: 1.2,
  y: 3.3,
  w: 4.8,
  h: 0.6,
  fontSize: 24,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

slide5.addText([
  { text: '✓ Administrator role verified for macro analytics\n', options: { bullet: true } },
  { text: '✓ Zero individual patient identifiers returned\n', options: { bullet: true } },
  { text: '✓ Group size threshold satisfied (342 ≥ 5)\n', options: { bullet: true } },
  { text: '✓ Re-identification risk cleared\n', options: { bullet: true } },
], {
  x: 1.2,
  y: 4.1,
  w: 4.8,
  h: 2.0,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 18,
});

// Panel 2: Suppressed
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: 'FAF4E8' },
  line: { color: AMBER, width: 2 },
  rectRadius: 0.1,
});

slide5.addText('CASE 2: SMALL CELL SUPPRESSION (N < 5)', {
  x: 7.3,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: AMBER,
});

slide5.addText('Query: Kolhapur • Malaria • Age 70+', {
  x: 7.3,
  y: 2.8,
  w: 4.8,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  color: MUTED_GRAY,
});

slide5.addText('Result: <5 / Suppressed', {
  x: 7.3,
  y: 3.3,
  w: 4.8,
  h: 0.6,
  fontSize: 24,
  fontFace: 'Arial',
  bold: true,
  color: AMBER,
});

slide5.addText([
  { text: '✕ Raw count: 3 contributing records\n', options: { bullet: true } },
  { text: '✕ Below minimum group threshold (K = 5)\n', options: { bullet: true } },
  { text: '✓ Reason: "Displaying this statistic increases re-identification risk"\n', options: { bullet: true } },
  { text: '✓ Explicitly redacted to prevent small-cohort deduction\n', options: { bullet: true } },
], {
  x: 7.3,
  y: 4.1,
  w: 4.8,
  h: 2.0,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 18,
});

// ========================================================
// SLIDE 6: Differencing / Inference Attack Protection
// ========================================================
const slide6 = pptx.addSlide();
slide6.background = { color: OFFWHITE };
addSlideFooter(slide6, 6);

slide6.addText('KEY INNOVATION', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: TERRACOTTA,
});

slide6.addText('Protection against differencing & inference attacks.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// The Attack Mechanism
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 2.0,
  w: 11.7,
  h: 4.6,
  fill: { color: CARD_BG },
  line: { color: TERRACOTTA, width: 1.5 },
  rectRadius: 0.1,
});

slide6.addText('THE RE-IDENTIFICATION VULNERABILITY (HOW LEAKS HAPPEN)', {
  x: 1.2,
  y: 2.3,
  w: 10.5,
  h: 0.4,
  fontSize: 12,
  fontFace: 'Arial',
  bold: true,
  color: TERRACOTTA,
});

slide6.addText('Standard healthcare systems only redact individual queries. Attackers bypass this with simple subtraction:', {
  x: 1.2,
  y: 2.7,
  w: 10.5,
  h: 0.4,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
});

// 3 Sequence Steps inside card
const attackSteps = [
  { q: 'Query 1 (Superset)', val: 'Total Dengue = 100 cases', desc: 'Allowed (100 ≥ 5)' },
  { q: 'Query 2 (Subset)', val: 'Male Dengue = 96 cases', desc: 'Allowed (96 ≥ 5)' },
  { q: 'Inferred Difference', val: 'Female Dengue = 4 cases', desc: 'Suppressed cell recovered (100 - 96 = 4)!' },
];

attackSteps.forEach((st, idx) => {
  const xP = 1.2 + idx * 3.6;
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xP,
    y: 3.2,
    w: 3.3,
    h: 1.6,
    fill: { color: idx === 2 ? 'F8ECEC' : 'F7F5F0' },
    line: { color: idx === 2 ? MUTED_RED : BORDER_COLOR, width: 1 },
    rectRadius: 0.06,
  });

  slide6.addText(st.q, {
    x: xP + 0.15,
    y: 3.35,
    w: 3.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: idx === 2 ? MUTED_RED : NAVY,
  });

  slide6.addText(st.val, {
    x: xP + 0.15,
    y: 3.7,
    w: 3.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: NAVY,
  });

  slide6.addText(st.desc, {
    x: xP + 0.15,
    y: 4.15,
    w: 3.0,
    h: 0.4,
    fontSize: 9,
    fontFace: 'Arial',
    color: MUTED_GRAY,
  });
});

// The CareVault Defense Solution Bar
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 1.2,
  y: 5.1,
  w: 10.9,
  h: 1.1,
  fill: { color: 'E8EFEA' },
  line: { color: SAGE, width: 1 },
});

slide6.addText('HOW CAREVAULT STOPS THIS:', {
  x: 1.4,
  y: 5.2,
  w: 10.5,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide6.addText('Our Differencing Engine tracks session query correlation memory. When Query 2 is received, it computes implied residuals against recent queries. Because 100 - 96 = 4 < K, the query is blocked with HTTP 422: "Potential inference through differencing detected."', {
  x: 1.4,
  y: 5.5,
  w: 10.5,
  h: 0.6,
  fontSize: 10,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 15,
});

// ========================================================
// SLIDE 7: Break-Glass Emergency Access
// ========================================================
const slide7 = pptx.addSlide();
slide7.background = { color: OFFWHITE };
addSlideFooter(slide7, 7);

slide7.addText('EMERGENCY WORKFLOW', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: MUTED_RED,
});

slide7.addText('Break-Glass Emergency: Life safety with data minimization.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// Left Card: Emergency Activation
slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: CARD_BG },
  line: { color: MUTED_RED, width: 1.5 },
  rectRadius: 0.1,
});

slide7.addText('THE REALITY OF CLINICAL TRAUMA', {
  x: 1.2,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: MUTED_RED,
});

slide7.addText('When an unconscious patient arrives in trauma resuscitation, standard consent flow cannot be completed.', {
  x: 1.2,
  y: 2.9,
  w: 4.8,
  h: 0.6,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
});

slide7.addText([
  { text: '• Clinician must document explicit medical justification\n', options: { bullet: true } },
  { text: '• Example: "Patient unconscious; acute anaphylaxis risk"\n', options: { bullet: true } },
  { text: '• Activation flagged with CRITICAL severity in Audit Vault\n', options: { bullet: true } },
  { text: '• Prominently visible to hospital cybersecurity & patient\n', options: { bullet: true } },
], {
  x: 1.2,
  y: 3.7,
  w: 4.8,
  h: 2.4,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 20,
});

// Right Card: Restricted Data Delivered
slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9,
  y: 2.1,
  w: 5.6,
  h: 4.4,
  fill: { color: 'F8ECEC' },
  line: { color: MUTED_RED, width: 1.5 },
  rectRadius: 0.1,
});

slide7.addText('RESTRICTED SAFETY RECORD DELIVERED', {
  x: 7.3,
  y: 2.4,
  w: 4.8,
  h: 0.4,
  fontSize: 13,
  fontFace: 'Arial',
  bold: true,
  color: MUTED_RED,
});

slide7.addText('Delivers ONLY what saves lives. Withholds the rest.', {
  x: 7.3,
  y: 2.9,
  w: 4.8,
  h: 0.4,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: CHARCOAL,
});

slide7.addText([
  { text: '✓ Blood Group: O+ (verified cross-match)\n', options: { bullet: true } },
  { text: '✓ Life-threatening drug allergies: Penicillin anaphylaxis\n', options: { bullet: true } },
  { text: '✓ Current critical medications: Metformin, Telmisartan\n', options: { bullet: true } },
  { text: '✕ Routine outpatient notes & psychiatric history: WITHHELD\n', options: { bullet: true } },
  { text: '✕ Full longitudinal history: WITHHELD\n', options: { bullet: true } },
], {
  x: 7.3,
  y: 3.5,
  w: 4.8,
  h: 2.6,
  fontSize: 11,
  fontFace: 'Arial',
  color: CHARCOAL,
  lineSpacing: 20,
});

// ========================================================
// SLIDE 8: Real Backend Security (No UI Smoke & Mirrors)
// ========================================================
const slide8 = pptx.addSlide();
slide8.background = { color: OFFWHITE };
addSlideFooter(slide8, 8);

slide8.addText('SECURITY VERIFICATION', {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide8.addText('Security enforced at the API boundary, not in UI state.', {
  x: 0.8,
  y: 1.1,
  w: 11.5,
  h: 0.7,
  fontSize: 26,
  fontFace: 'Arial',
  bold: true,
  color: NAVY,
});

// Table of Verified Scenarios
const tableData = [
  [
    { text: 'Test Scenario', options: { bold: true, fill: '17212B', color: WHITE, fontSize: 10 } },
    { text: 'Actor Role', options: { bold: true, fill: '17212B', color: WHITE, fontSize: 10 } },
    { text: 'Target API Endpoint', options: { bold: true, fill: '17212B', color: WHITE, fontSize: 10 } },
    { text: 'HTTP Status', options: { bold: true, fill: '17212B', color: WHITE, fontSize: 10 } },
    { text: 'Outcome', options: { bold: true, fill: '17212B', color: WHITE, fontSize: 10 } },
  ],
  [
    { text: 'Authorized Patient Care', options: { fontSize: 10 } },
    { text: 'CLINICIAN', options: { fontSize: 10 } },
    { text: 'GET /api/clinical/patients/PT-2048', options: { fontSize: 9, fontFace: 'Courier' } },
    { text: '200 OK', options: { fontSize: 10, bold: true, color: SAGE } },
    { text: 'ALLOWED (Consent Active)', options: { fontSize: 9 } },
  ],
  [
    { text: 'Admin Patient Breach Attempt', options: { fontSize: 10 } },
    { text: 'ADMIN', options: { fontSize: 10 } },
    { text: 'GET /api/clinical/patients/PT-2048', options: { fontSize: 9, fontFace: 'Courier' } },
    { text: '403 Forbidden', options: { fontSize: 10, bold: true, color: MUTED_RED } },
    { text: 'DENIED (Role Boundary)', options: { fontSize: 9 } },
  ],
  [
    { text: 'Small Group Query (N=3)', options: { fontSize: 10 } },
    { text: 'ADMIN', options: { fontSize: 10 } },
    { text: 'POST /api/analytics/query', options: { fontSize: 9, fontFace: 'Courier' } },
    { text: '200 OK', options: { fontSize: 10, bold: true, color: AMBER } },
    { text: 'SUPPRESSED (<5 / Suppressed)', options: { fontSize: 9 } },
  ],
  [
    { text: 'Differencing Attack (100 - 96 = 4)', options: { fontSize: 10 } },
    { text: 'ADMIN', options: { fontSize: 10 } },
    { text: 'POST /api/analytics/query (Male 96)', options: { fontSize: 9, fontFace: 'Courier' } },
    { text: '422 Unproc.', options: { fontSize: 10, bold: true, color: TERRACOTTA } },
    { text: 'BLOCKED (Differencing Detected)', options: { fontSize: 9 } },
  ],
  [
    { text: 'Break-Glass Emergency', options: { fontSize: 10 } },
    { text: 'CLINICIAN', options: { fontSize: 10 } },
    { text: 'POST /api/clinical/break-glass/PT-2048', options: { fontSize: 9, fontFace: 'Courier' } },
    { text: '200 OK', options: { fontSize: 10, bold: true, color: MUTED_RED } },
    { text: 'RESTRICTED + AUDITED', options: { fontSize: 9 } },
  ],
];

slide8.addTable(tableData, {
  x: 0.8,
  y: 2.1,
  w: 11.7,
  colW: [2.5, 1.4, 3.8, 1.4, 2.6],
  rowH: 0.5,
  fill: 'FFFFFF',
  line: { color: BORDER_COLOR, width: 1 },
});

slide8.addText('Key Takeaway: Even if an attacker manually calls clinical endpoints using cURL or Postman with an administrator token, the backend firewall returns HTTP 403 Forbidden. Frontend UI buttons do not define our security.', {
  x: 0.8,
  y: 5.8,
  w: 11.7,
  h: 0.8,
  fontSize: 11,
  fontFace: 'Arial',
  italic: true,
  color: CHARCOAL,
});

// ========================================================
// SLIDE 9: Conclusion & Summary
// ========================================================
const slide9 = pptx.addSlide();
slide9.background = { color: NAVY };

slide9.addText('CAREVAULT SUMMARY', {
  x: 0.8,
  y: 1.5,
  w: 6.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  bold: true,
  color: SAGE,
});

slide9.addText('"Privacy is not a policy written on a page.\nIt is enforced at the data boundary."', {
  x: 0.8,
  y: 2.0,
  w: 11.5,
  h: 1.4,
  fontSize: 34,
  fontFace: 'Arial',
  bold: true,
  color: WHITE,
  lineSpacing: 38,
});

// 3 Impact Pillars
const impacts = [
  { t: 'Frontline Clinical Continuity', d: 'Doctors get longitudinal history in seconds via QR with active consent & emergency overrides.' },
  { t: 'Surveillance Intelligence', d: 'Public health authorities detect outbreak curves and regional hotspots without identity exposure.' },
  { t: 'Mathematical Privacy Barrier', d: 'K-anonymity (K ≥ 5) and query differencing detection prevent subtle re-identification breaches.' },
];

impacts.forEach((imp, i) => {
  const x = 0.8 + i * 3.95;
  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: 4.0,
    w: 3.7,
    h: 2.0,
    fill: { color: '1F2C3A' },
    line: { color: '2D3E50', width: 1 },
    rectRadius: 0.08,
  });

  slide9.addText(imp.t, {
    x: x + 0.2,
    y: 4.2,
    w: 3.3,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: SAGE,
  });

  slide9.addText(imp.d, {
    x: x + 0.2,
    y: 4.7,
    w: 3.3,
    h: 1.1,
    fontSize: 10,
    fontFace: 'Arial',
    color: 'A0AEC0',
    lineSpacing: 16,
  });
});

// Save to disk
const outputPath = path.resolve(process.cwd(), 'CAREVAULT_Pitch_Deck.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`[SUCCESS] Presentation generated: ${fileName}`);
  })
  .catch(err => {
    console.error('[ERROR] Failed to generate presentation:', err);
  });
