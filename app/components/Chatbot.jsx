"use client";
import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../../lib/chatBotApi";

// ========== Robot SVG Icon ==========
const RobotIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="currentColor" className={className}>
        <rect x="30" y="2" width="4" height="8" rx="2" />
        <circle cx="32" cy="2" r="3" />
        <rect x="12" y="10" width="40" height="28" rx="8" />
        <circle cx="23" cy="24" r="5" fill="white" />
        <circle cx="41" cy="24" r="5" fill="white" />
        <circle cx="24" cy="24" r="2.5" fill="#3b82f6" />
        <circle cx="42" cy="24" r="2.5" fill="#3b82f6" />
        <rect x="22" y="32" width="20" height="3" rx="1.5" fill="white" opacity="0.8" />
        <rect x="28" y="38" width="8" height="5" rx="2" />
        <rect x="14" y="43" width="36" height="18" rx="6" />
        <rect x="20" y="49" width="8" height="6" rx="2" fill="white" opacity="0.3" />
        <rect x="36" y="49" width="8" height="6" rx="2" fill="white" opacity="0.3" />
    </svg>
);

// ========== Service Card ==========
const ServiceCard = ({ service }) => {
    if (!service || !service.name) return null;
    const modeColor = service.mode?.includes("Remote")
        ? "bg-blue-50 text-blue-600 border-blue-200"
        : "bg-orange-50 text-orange-600 border-orange-200";
    return (
        <div className="mt-2 rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 flex items-center justify-between">
                <span className="text-white font-semibold text-xs tracking-wide">{service.name}</span>
                <span className="text-white/80 text-xs">ID #{service.id}</span>
            </div>
            <div className="px-3 py-2.5 flex flex-wrap gap-2 items-center">
                {service.price && <span className="text-base font-bold text-gray-800">{service.price}</span>}
                {service.duration && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                        {service.duration}
                    </span>
                )}
                {service.mode && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${modeColor}`}>{service.mode}</span>
                )}
                {service.warranty && (
                    <span className="text-xs px-2 py-0.5 rounded-full border bg-green-50 text-green-600 border-green-200 font-medium">✓ {service.warranty}</span>
                )}
            </div>
            <div className="px-3 pb-3">
                <a href={`/book?serviceId=${service.id}`}
                    className="block w-full text-center text-xs font-semibold py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition">
                    Book Now →
                </a>
            </div>
        </div>
    );
};

// ========== Human Handoff Banner ==========
const HandoffBanner = () => (
    <div className="mt-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 flex items-center justify-between gap-2">
        <div>
            <p className="text-xs font-semibold text-orange-700">Need a human? We&apos;re here!</p>
            <p className="text-xs text-orange-500">Mon–Sun · 10 AM–7 PM</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <a href="tel:+919240251266"
                className="text-xs px-2.5 py-1.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition flex items-center gap-1">
                📞 Call
            </a>
            <a href="mailto:itsupport@pockitengineers.com"
                className="text-xs px-2.5 py-1.5 rounded-lg border border-orange-400 text-orange-600 font-semibold hover:bg-orange-100 transition">
                ✉ Email
            </a>
        </div>
    </div>
);

// ========== Error Banner ==========
const ErrorBanner = () => (
    <div className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
        <p className="text-xs font-semibold text-red-700 mb-1">⚠️ Something went wrong</p>
        <p className="text-xs text-red-500 mb-2">Our AI is temporarily unavailable. Reach us directly:</p>
        <div className="flex gap-2">
            <a href="tel:+919240251266" className="text-xs px-2.5 py-1.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">📞 +91 92402 51266</a>
            <a href="mailto:itsupport@pockitengineers.com" className="text-xs px-2.5 py-1.5 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-100 transition">✉ Email us</a>
        </div>
    </div>
);

// ========== Main Chatbot Component ==========
export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [followUpChips, setFollowUpChips] = useState([]);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const [lang, setLang] = useState("English");

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "🌅" };
        if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "☀️" };
        if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌇" };
        return { text: "Good Night", emoji: "🌙" };
    };
    const [greeting, setGreeting] = useState({ text: "", emoji: "" });

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting({ text: "Good Morning", emoji: "🌅" });
        else if (hour >= 12 && hour < 17) setGreeting({ text: "Good Afternoon", emoji: "☀️" });
        else if (hour >= 17 && hour < 21) setGreeting({ text: "Good Evening", emoji: "🌇" });
        else setGreeting({ text: "Good Night", emoji: "🌙" });
    }, []);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    useEffect(() => {
        if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            setSpeechSupported(true);
        }
    }, []);

    const getSpeechLangCode = (l) => ({ English: "en-IN", Hindi: "hi-IN", Tamil: "ta-IN", Telugu: "te-IN" }[l] || "en-IN");

    const startListening = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SR();
        recognition.lang = getSpeechLangCode(lang);
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (e) => setInput(Array.from(e.results).map(r => r[0].transcript).join(""));
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); };
    const toggleListening = () => isListening ? stopListening() : startListening();

    const sendMessage = async (overrideText) => {
        const text = (overrideText !== undefined ? overrideText : input).trim();
        if (!text) return;

        const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const userMsg = { type: "user", text, time: getTime() };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setFollowUpChips([]);
        setIsLoading(true);

        try {
            // Pass last 6 messages as history for multi-turn memory
            const history = updatedMessages.slice(-6);
            const response = await getChatResponse(text, lang, history);

            let parsed = typeof response === "string"
                ? { message: response, service: null, followUpChips: [], showHumanHandoff: false }
                : response;

            setMessages(prev => [...prev, {
                type: "bot",
                text: parsed.message || "Sorry, I couldn't get a response.",
                service: parsed.service || null,
                showHumanHandoff: !!parsed.showHumanHandoff,
                isError: false,
                time: getTime(),
            }]);
            setFollowUpChips(parsed.followUpChips || []);
        } catch {
            setMessages(prev => [...prev, { type: "bot", text: "", isError: true, time: getTime() }]);
            setFollowUpChips(["Call support", "Send email", "Try again"]);
        } finally {
            setIsLoading(false);
        }
    };

    const initialChips = ["My laptop is slow", "Printer not working", "WiFi is weak", "How much does it cost?", "Book a service", "What areas do you cover?"];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">

            {/* Chat Window */}
            <div className={`transform transition-all duration-300 ease-out ${isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}>
                <div className="w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100" style={{ height: "420px" }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <RobotIcon size={26} className="text-white" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight">Pockit Engineers</h3>
                                <p className="text-xs text-green-200 font-medium">● Fast Fix Guaranteed</p>
                            </div>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            {/* <a href="tel:+919240251266" title="Call us"
                                className="text-white hover:bg-white/20 rounded-full p-1.5 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                                </svg>
                            </a> */}
                            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1.5 transition cursor-pointer">✕</button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-2">
                                <div className="text-4xl">{greeting.emoji}</div>
                                <p className="font-bold text-gray-700 text-lg">{greeting.text}!</p>
                                <p className="text-sm text-gray-500 px-4">I&apos;m your Pockit Engineers assistant. How can I help fix your tech today?</p>
                                <div className="flex flex-wrap gap-2 justify-center mt-2 cursor-pointer">
                                    {initialChips.map((chip) => (
                                        <button key={chip} onClick={() => sendMessage(chip)}
                                            className=" cursor-pointer text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition shadow-sm">
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                                        {msg.type === "bot" && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                                                <RobotIcon size={18} className="text-white" />
                                            </div>
                                        )}
                                        <div className="flex flex-col max-w-[270px]">
                                            {msg.isError ? <ErrorBanner /> : (
                                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.type === "user"
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"}`}>
                                                    {msg.text}
                                                </div>
                                            )}
                                            {msg.type === "bot" && !msg.isError && msg.service && <ServiceCard service={msg.service} />}
                                            {msg.type === "bot" && !msg.isError && msg.showHumanHandoff && <HandoffBanner />}
                                            {msg.time && (
                                                <span className={`text-[10px] text-gray-400 mt-1 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                                                    {msg.time}
                                                </span>
                                            )}
                                        </div>
                                        {msg.type === "user" && (
                                            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm flex-shrink-0 ml-2 mt-0.5">👤</div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start animate-fadeIn">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mr-2">
                                            <RobotIcon size={18} className="text-white" />
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-none shadow-sm">
                                            <div className="flex gap-1 items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Dynamic follow-up chips */}
                                {!isLoading && followUpChips.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pl-10 animate-fadeIn">
                                        {followUpChips.map((chip) => (
                                            <button key={chip} onClick={() => sendMessage(chip)}
                                                className="text-xs px-3 py-1.5 bg-white border border-purple-200 text-purple-600 rounded-full hover:bg-purple-50 transition shadow-sm">
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="px-3 pt-2 pb-3 border-t border-gray-200 bg-white flex-shrink-0">
                        {isListening && (
                            <div className="flex items-center gap-1 pb-1 text-purple-500 text-xs font-medium animate-pulse">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full inline-block"></span>
                                Listening...
                            </div>
                        )}
                        <input type="text" value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder={isListening ? "Listening..." : lang === "Hindi" ? "संदेश लिखें..." : "Describe your issue..."}
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition text-sm disabled:bg-gray-100 mb-2"
                        />
                        <div className="flex items-center justify-end gap-2">
                            <select value={lang} onChange={(e) => setLang(e.target.value)}
                                className="px-2 py-1.5 border border-gray-300 rounded-full text-xs focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                                <option value="English">EN</option>
                                <option value="Hindi">HI</option>
                                <option value="Tamil">TA</option>
                                <option value="Telugu">TE</option>
                            </select>
                            {speechSupported && (
                                <button onClick={toggleListening} disabled={isLoading}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${isListening ? "bg-purple-500 text-white animate-pulse" : "bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600"} disabled:opacity-40`}>
                                    {isListening
                                        ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zm7 8a1 1 0 0 1 1 1 8 8 0 0 1-7 7.938V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-1.062A8 8 0 0 1 4 12a1 1 0 1 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 1-1z" /></svg>
                                    }
                                </button>
                            )}
                            <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}
                                className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold transition-all text-sm ${isLoading || !input.trim() ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"}`}>
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="relative">
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></span>
                        <span className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-ping" style={{ animationDelay: "0.4s" }}></span>
                    </>
                )}
                {!hasOpened && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center z-10 shadow">1</span>
                )}
                <button onClick={() => { if (!isOpen) setHasOpened(true); setIsOpen(!isOpen); }}
                    className={` cursor-pointer relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transform transition-all duration-300 ${isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl hover:scale-110 "}`}>
                    {isOpen
                        ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        : <RobotIcon size={30} className="text-white" />
                    }
                </button>
            </div>

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}