import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, Stethoscope, Bot, User, ShieldAlert, FileText, BarChart3 } from 'lucide-react';

export function AiAssistantPage() {
  const { activeProfile, medications, medicationLogs, appointments, careNotes, theme } = useApp();
  
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'handover' | 'doctorQuestions'>('chat');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: `Hello! I am your CareCircle AI Care Assistant. I can help summarize today's medication schedule for ${activeProfile.name}, review upcoming doctor appointments, or answer questions. How can I help you today?` }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Insights state
  const [insightsResult, setInsightsResult] = useState<string>('');
  const [insightsLoading, setInsightsLoading] = useState(false);

  // Handover state
  const [handoverResult, setHandoverResult] = useState<string>('');
  const [handoverLoading, setHandoverLoading] = useState(false);

  // Doctor Questions state
  const [doctorQuestionsResult, setDoctorQuestionsResult] = useState<string>('');
  const [doctorQuestionsLoading, setDoctorQuestionsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;

    const userMsg = inputQuery;
    setInputQuery('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg, context: { profile: activeProfile, medications } })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: data.error || 'Failed to generate response.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Network error connecting to Gemini API server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    setInsightsLoading(true);
    try {
      const res = await fetch('/api/gemini/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medications, logs: medicationLogs, profileName: activeProfile.name })
      });
      const data = await res.json();
      if (data.success) setInsightsResult(data.insights);
    } catch (err) {
      setInsightsResult('Failed to generate insights.');
    } finally {
      setInsightsLoading(false);
    }
  };

  const generateHandover = async () => {
    setHandoverLoading(true);
    try {
      const res = await fetch('/api/gemini/handover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: careNotes, logs: medicationLogs, appointments })
      });
      const data = await res.json();
      if (data.success) setHandoverResult(data.handover);
    } catch (err) {
      setHandoverResult('Failed to generate handover.');
    } finally {
      setHandoverLoading(false);
    }
  };

  const generateDoctorQuestions = async () => {
    setDoctorQuestionsLoading(true);
    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 5 structured, helpful questions for ${activeProfile.name}'s upcoming cardiology and endocrinology doctor appointments based on medical conditions: ${activeProfile.medicalConditions.join(', ')} and active medications: ${medications.map(m => m.name).join(', ')}.`,
          context: activeProfile
        })
      });
      const data = await res.json();
      if (data.success) setDoctorQuestionsResult(data.text);
    } catch (err) {
      setDoctorQuestionsResult('Failed to generate questions.');
    } finally {
      setDoctorQuestionsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-teal-600" />
          <h1 className="text-2xl font-extrabold tracking-tight">AI Care Assistant & Intelligence</h1>
        </div>
        <p className="text-xs text-slate-500">Powered by Gemini AI. Safe, supportive healthcare routine intelligence.</p>
      </div>

      {/* AI Safety Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 space-y-0.5">
          <strong className="font-bold">Healthcare Safety Disclaimer:</strong>
          <p>CareCircle AI Assistant never diagnoses medical conditions, prescribes medications, or recommends altering prescribed dosages. Always consult your doctor or pharmacist for professional medical advice.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'chat' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          AI Chat Assistant
        </button>
        <button
          onClick={() => { setActiveTab('insights'); if (!insightsResult) generateInsights(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'insights' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Adherence Insights
        </button>
        <button
          onClick={() => { setActiveTab('handover'); if (!handoverResult) generateHandover(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'handover' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Care Handover Summary
        </button>
        <button
          onClick={() => { setActiveTab('doctorQuestions'); if (!doctorQuestionsResult) generateDoctorQuestions(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'doctorQuestions' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Doctor Discussion Generator
        </button>
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <div className="h-96 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                  m.sender === 'user' ? 'bg-teal-700' : 'bg-teal-600'
                }`}>
                  {m.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-teal-600 text-white'
                    : theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Sparkles className="w-4 h-4 animate-spin text-teal-600" />
                <span>CareCircle AI is analyzing schedule and formulating response...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              placeholder="Ask about medications, schedule, or appointments..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} text-xs focus:ring-2 focus:ring-teal-500 outline-none`}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" /> Smart Adherence Intelligence
            </h3>
            <button
              onClick={generateInsights}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
            >
              Refresh Analysis
            </button>
          </div>
          {insightsLoading ? (
            <p className="text-xs text-slate-400 py-8 text-center">Analyzing medication adherence patterns...</p>
          ) : (
            <div className="prose dark:prose-invert text-xs leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              {insightsResult}
            </div>
          )}
        </div>
      )}

      {/* Handover Tab */}
      {activeTab === 'handover' && (
        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" /> Care Handover Shift Summary
            </h3>
            <button
              onClick={generateHandover}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
            >
              Refresh Handover
            </button>
          </div>
          {handoverLoading ? (
            <p className="text-xs text-slate-400 py-8 text-center">Summarizing recent care notes and logs...</p>
          ) : (
            <div className="prose dark:prose-invert text-xs leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              {handoverResult}
            </div>
          )}
        </div>
      )}

      {/* Doctor Questions Tab */}
      {activeTab === 'doctorQuestions' && (
        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" /> Doctor Discussion Generator
            </h3>
            <button
              onClick={generateDoctorQuestions}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
            >
              Generate Questions
            </button>
          </div>
          {doctorQuestionsLoading ? (
            <p className="text-xs text-slate-400 py-8 text-center">Generating tailored questions for doctor visits...</p>
          ) : (
            <div className="prose dark:prose-invert text-xs leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              {doctorQuestionsResult}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
