// ========== Cache ==========
const promptCache = {};

// ========== Voice map for TTS ==========
const voiceMap = {
    en: "alloy", es: "nova", fr: "shimmer", de: "fable", it: "onyx",
    pt: "echo", ja: "alloy", ko: "nova", zh: "shimmer", ar: "fable",
    hi: "onyx", ru: "echo", tr: "fable", nl: "alloy", pl: "echo",
    sv: "nova", da: "shimmer", fi: "alloy", no: "echo", th: "nova",
    vi: "shimmer", id: "alloy", ms: "echo", ta: "onyx", te: "fable",
    bn: "nova", uk: "echo", cs: "alloy", ro: "shimmer", hu: "fable",
    el: "onyx", he: "nova",
};

function getVoiceForLanguage(langCode) {
    return voiceMap[langCode] || "alloy";
}

function getLangCode(lang) {
    const map = { English: "en", Hindi: "hi", Tamil: "ta", Telugu: "te" };
    return map[lang] || "en";
}

// ========== Pockit Engineers Knowledge Base ==========
const POCKIT_KNOWLEDGE_BASE = `
# POCKIT ENGINEERS — COMPLETE KNOWLEDGE BASE
Version: 3.1 | Updated: March 2026

---

## COMPANY OVERVIEW
- Name: Pockit Engineers (operated by Pockit Engineers Private Limited)
- Tagline: "Fast Fix Guaranteed"
- Service Areas: Mumbai, Noida (Greater Noida / Ghaziabad), Delhi
- Email: itsupport@pockitengineers.com
- Phone: +91 92402 51266
- Onsite Hours: Monday–Sunday, 10 AM–7 PM
- Human Support: Monday–Sunday, 10 AM–7 PM
- AI Bot: 24/7

---

## SERVICES — 47 across 10 categories

### INSTANT HELP (Remote, 7-day warranty)
- TechScan (ID 6) — ₹299, 20 min — Rapid remote diagnostic
- AppRescue (ID 68) — ₹299, 20 min — App crash/freeze fix
- InboxReady (ID 71) — ₹349, 40 min — Email setup, recovery, 2FA
- ProApps (ID 110) — ₹449, 60 min — Adobe/MS Office install (licence extra)

### LAPTOP (Windows, 30-day warranty)
- LaptopPulse (ID 123) — ₹349, 30 min — Full health diagnostic
- TurboBoost (ID 74) — ₹399, 40 min — Speed optimisation (remote-first)
- ShieldClear (ID 101) — ₹799, 90 min — Virus & malware removal
- PowerUp RAM (ID 62) — ₹499, 30 min — RAM upgrade (parts extra)
- FreshStart (ID 78) — ₹999, 60 min — OS reinstall (data wiped, backup required)
- PowerUp SSD (ID 93) — ₹999, 60 min — SSD upgrade (parts extra)

### MACBOOK (30-day warranty)
- MacPulse (ID 80) — ₹349, 30 min — Full health check
- SpaceMaker (ID 67) — ₹1,399, 60 min — Storage deep clean (remote)
- MacRevive (ID 77) — ₹1,399, 60 min — macOS speed tune-up (remote)

### DESKTOP (30-day warranty)
- DeskPulse (ID 75) — ₹199, 30 min — System health check
- BootFix (ID 61) — ₹799, 30 min — Startup & BIOS repair
- GameReady (ID 66) — ₹1,299, 60 min — Gaming performance boost
- DesktopReady (ID 72) — ₹2,499, 4 hrs — Custom PC build & setup
- CoreUpgrade Motherboard (ID 94) — ₹799, 2 hrs
- CoreUpgrade GPU (ID 115) — ₹499, 30 min
- CoreUpgrade RAM (ID 116) — ₹499, 30 min
- CoreUpgrade SSD (ID 117) — ₹999, 3 hrs

### PRINTER (30-day warranty)
- PrintPulse (ID 124) — ₹299, 20 min — Health check
- PrintConnect (ID 87) — ₹349, 40 min — Connectivity fix (onsite preferred)
- JamClear (ID 89) — ₹299, 30 min — Paper jam repair (onsite)
- PrintReady (ID 81) — ₹349, 30 min — New printer installation (onsite)
- Printer Ink Refilling (ID 90) — ₹299, 30 min

### WFH SETUP (30-day warranty)
- WorkSpaceAudit (ID 112) — ₹199, 30 min — Productivity check
- WorkStation Consult (ID 121) — ₹199, 30 min — Advisory visit
- WiFiBoost (ID 88) — ₹999, 60 min — Home network optimisation
- WorkStation Lite (ID 120) — ₹11,000 — 22" monitor + webcam + hub + stand + wireless KB&M
- WorkStation Pro (ID 119) — ₹16,000 — 23.8" IPS monitor + better webcam + hub + stand + wireless KB&M
- WorkStation Pro Max (ID 118) — ₹21,500 — Dell 24" IPS 100Hz + HP webcam privacy + HP hub + stand + Dell KB&M
(WorkStation prices include hardware + installation)

### SMART TV (30-day warranty)
- TVPulse (ID 111) — ₹349, 30 min — Health check
- StreamSmooth (ID 85) — ₹399, 60 min — Internet & streaming fix
- StreamReady (ID 65) — ₹399, 40 min — OTT app setup
- MirrorCast (ID 106) — ₹399, 30 min — Screen sharing setup
- AudioMax (ID 113) — ₹799, 60 min — Soundbar & audio setup

### SMART PHONE (30-day warranty)
- PhonePulse (ID 91) — ₹349, 30 min — Health check
- DroidBoost (ID 107) — ₹999, 90 min — Android speed & storage optimisation
- AppReady (ID 108) — ₹349, 40 min — App install & config
- PhoneReady (ID 92) — ₹599, 60 min — New phone migration & setup
- ConnectPro (ID 109) — ₹499, 40 min — Video calling & social media setup

### KIDS SAFETY (7-day warranty)
- KidGuard Pro (ID 83) — ₹1,399, 60 min — Kaspersky Safe Kids (licence included), content filtering, screen time, GPS, YouTube monitoring. Always framed as "family protection."

### CCTV (30-day warranty)
- CamPulse (ID 122) — ₹599, 30 min — System health check
- CamFix (ID 86) — ₹599, 40 min — Fault repair
- SmartEye (ID 84) — ₹599, 60 min — Installation & setup (min 2 cameras; equipment extra)

---

## PRICING & PAYMENT
- Service fees: ₹199 to ₹2,499 (WorkStation bundles include hardware)
- Payment at booking: Razorpay (cards, UPI, net banking, wallets)
- Spare parts / extra work: approved before ordering, paid after service via UPI/online
- No cash payments. No hidden charges.
- If issue can't be fixed: no service charge

---

## WARRANTY
- 7 days: remote services and minor repairs (no spare parts)
- 30 days: onsite hardware services
- Covers same issue recurring — free re-repair, no extra labour
- Spare parts: OEM manufacturer warranty; customer engages directly with manufacturer
- Motherboard: testing warranty only unless agreed in writing
- NOT covered: new issues, physical/liquid/surge damage, user changes, parts not from Pockit, virus after service

---

## HOW IT WORKS
1. Book & pay service fee online via Razorpay
2. Technician visits or remote/guided call
3. Transparent diagnosis & quote — no work starts without approval
4. Spare parts sourced at Pockit fixed rates with prior approval
5. Repair completed; hard disk handed to customer
6. Post-service clean-up
7. Pay additional costs after service via UPI/online

---

## REMOTE SUPPORT
- Guided Support: technician talks you through steps, no screen access
- Remote Access: technician accesses screen with customer approval, encrypted, session-only
- Customer always chooses which mode

---

## AVAILABILITY
- AI Bot: 24/7
- Human support & onsite: 10 AM–7 PM, Mon–Sun
- Express service: select categories, extra cost
- IMPORTANT: Never say "our team is 24/7" — only the AI bot is

---

## SAFETY & DATA
- Technicians: background-checked, verified, trained, certified
- Data: only what's needed is accessed; nothing copied or stored
- Back up data before service — Pockit not liable for data loss unless gross negligence
- Disputes: must be raised within 48 hours of service completion

---

## QUICK ROUTING GUIDE
- Laptop slow → TurboBoost ₹399 (remote)
- Laptop won't start → LaptopPulse ₹349 (onsite)
- Windows reinstall → FreshStart ₹999 (onsite)
- SSD upgrade → PowerUp SSD ₹999 + parts (onsite)
- Mac storage full → SpaceMaker ₹1,399 (remote)
- Printer offline → PrintConnect ₹349 (onsite, remote on request)
- Install printer → PrintReady ₹349 (onsite)
- Home office setup → WorkStation Consult ₹199 (onsite)
- Wi-Fi weak → WiFiBoost ₹999 (onsite)
- TV buffering → StreamSmooth ₹399 (onsite)
- Android slow → DroidBoost ₹999 (remote/onsite)
- New phone → PhoneReady ₹599 (onsite)
- Parental controls → KidGuard Pro ₹1,399 (onsite)
- Install CCTV → SmartEye ₹599 + equipment (onsite)
- Camera down → CamFix ₹599 (onsite)
- Urgent / unsure → TechScan ₹299 (remote)

---

## CONTACT & SUPPORT
- Email: itsupport@pockitengineers.com (reply within 4 hrs during business hours)
- Phone: +91 92402 51266 (10 AM–7 PM, Mon–Sun)
- In-app chat: AI bot 24/7; human escalation during business hours
- Business accounts: dedicated manager, priority scheduling, volume discounts — mention "Business Account Inquiry"
`;

// ========== GET Chat Response ==========
async function getChatResponse(lang, query) {
    if (promptCache[query]) {
        return promptCache[query];
    }

    const prompt = `
You are a helpful AI assistant for Pockit Engineers — a professional home IT support service with the tagline "Fast Fix Guaranteed", serving Mumbai, Noida, and Delhi.

Use ONLY the following knowledge base to answer customer queries:

${POCKIT_KNOWLEDGE_BASE}

Customer query: ${query}

Instructions:
- Answer helpfully and accurately using only the information above.
- If the query is a greeting or casual conversation, respond in a warm, friendly way.
- For issue-related queries, recommend the most relevant service with its price.
- Always be honest about pricing — mention that exact prices are shown in the app before booking.
- Never say the human team is available 24/7 — only the AI bot is. Human support is 10 AM–7 PM Mon–Sun.
- If the query is completely unrelated to IT support, home tech, or Pockit Engineers, politely say you can only help with IT support questions.
- Keep your response under 400 characters.
- Respond in ${lang} language.
`;

    try {
        const aiRes = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: prompt,
            }),
        });

        const data = await aiRes.json();
        let answer = "No response";

        if (data.output && data.output.length > 0) {
            const content = data.output[0].content;
            if (content && content.length > 0) {
                for (let item of content) {
                    if (item.type === "output_text") {
                        answer = item.text;
                        break;
                    }
                }
            }
        }

        promptCache[query] = answer;
        return answer;
    } catch (err) {
        console.error("getChatResponse error:", err.message);
        return "No response";
    }
}

// ========== Transcribe Audio ==========
async function transcribeAudio(req) {
    const formData = await req.formData();
    const file = formData.get("file");

    const outForm = new FormData();
    outForm.append("file", file);
    outForm.append("model", "whisper-1");

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: outForm,
    });

    return await res.text();
}

// ========== Text To Speech ==========
async function textToSpeech(text, lang) {
    const langCode = getLangCode(lang);
    const voice = getVoiceForLanguage(langCode);

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "tts-1",
            input: text,
            voice: voice,
            speed: 1.0,
            response_format: "mp3",
        }),
    });

    if (res.ok) {
        const buffer = await res.arrayBuffer();
        return Buffer.from(buffer);
    }
    return null;
}

// ========== Main POST Handler ==========
export async function POST(req) {
    try {
        const contentType = req.headers.get("content-type") || "";

        // --- Audio Transcription ---
        if (contentType.includes("multipart/form-data")) {
            const transcript = await transcribeAudio(req);
            return Response.json({ success: true, data: transcript });
        }

        const body = await req.json();
        const { action, message, lang, text } = body;

        // --- Text To Speech ---
        if (action === "tts") {
            const audioBuffer = await textToSpeech(text, lang);
            if (audioBuffer) {
                return new Response(audioBuffer, {
                    headers: {
                        "Content-Type": "audio/mpeg",
                        "Content-Disposition": 'attachment; filename="speech.mp3"',
                    },
                });
            }
            return Response.json({ success: false, error: "TTS failed" });
        }

        // --- Chat Response (default) ---
        const answer = await getChatResponse(lang || "English", message);
        return Response.json({ success: true, data: answer });

    } catch (err) {
        console.error("POST handler error:", err.message);
        return Response.json({ success: false, error: err.message });
    }
}