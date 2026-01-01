import React, { useState, useEffect, useRef } from 'react';
import Home from './Home.jsx';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [showLengthWarning, setShowLengthWarning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState([false, false, false, false]);

  const [results, setResults] = useState({
    title: '',
    summary: '',
    notes: [],
    sentiment: 'Neutral'
  });

  const qrcodeRef = useRef(null);
  const analysisSectionRef = useRef(null);
  const resultsSectionRef = useRef(null);
  const qrSectionRef = useRef(null);

  // Handle input text changes
  useEffect(() => {
    const chars = inputText.length;
    const words = inputText.trim().split(/\s+/).filter(w => w.length > 0).length;

    setCharCount(chars);
    setWordCount(words);
    setShowLengthWarning(chars > 0 && chars < 50);
  }, [inputText]);

  // Toast notification function
  const showToast = (message, type) => {
    const toastColors = {
      success: 'from-emerald-500 to-green-500 border-emerald-300',
      error: 'from-red-500 to-rose-500 border-red-300',
      warning: 'from-amber-500 to-orange-500 border-amber-300'
    };

    const toastIcons = {
      success: `<svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      error: `<svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      warning: `<svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };

    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `fixed top-4 right-4 sm:top-6 sm:right-6 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl transform translate-x-0 transition-all duration-300 z-50 max-w-xs sm:max-w-sm border-2 bg-gradient-to-r ${toastColors[type]} text-white`;
    toastEl.innerHTML = `
      <div class="flex items-center gap-2 sm:gap-3">
        <div class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">${toastIcons[type] || ''}</div>
        <span class="font-semibold text-xs sm:text-sm flex-1">${message}</span>
      </div>
    `;
    document.body.appendChild(toastEl);

    setTimeout(() => {
      toastEl.style.transform = 'translateX(500px)';
      setTimeout(() => toastEl.remove(), 300);
    }, 4000);
  };

  // Clear input
  const clearInput = () => {
    setInputText('');
    setWordCount(0);
    setCharCount(0);
    setShowLengthWarning(false);
    showToast('Input cleared', 'success');
  };

  // Simulate processing animation
  const simulateProcessing = async () => {
    const steps = [
      { duration: 1000 },
      { duration: 1200 },
      { duration: 900 },
      { duration: 1100 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));

      setProcessingSteps(prev => {
        const newSteps = [...prev];
        newSteps[i] = true;
        return newSteps;
      });

      const newProgress = ((i + 1) / steps.length) * 100;
      setProgress(newProgress);
    }
  };

  // Start analysis
  const startAnalysis = async () => {
    if (!inputText.trim()) {
      showToast('Please paste some text to analyze', 'error');
      return;
    }

    if (inputText.length < 50) {
      showToast('Please enter at least 50 characters for better results', 'warning');
      return;
    }

    setCurrentStep(2);
    setIsAnalyzing(true);
    setProgress(0);
    setProcessingSteps([false, false, false, false]);

    setTimeout(() => {
      analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

    await simulateProcessing();

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'system',
              content: `You are an advanced AI analysis assistant. Analyze the given text and provide:
1. TITLE: Create a compelling, SEO-friendly title (max 10 words)
2. SUMMARY: Write a concise summary (2-3 sentences)
3. NOTES: Extract 5-7 key insights as bullet points (each starting with •)
4. SENTIMENT: Determine sentiment (Positive/Negative/Neutral)

Format your response exactly as:
TITLE: [title here]
SUMMARY: [summary here]
NOTES:
• [note 1]
• [note 2]
SENTIMENT: [sentiment]`
            },
            {
              role: 'user',
              content: `Analyze this text:\n${inputText}`
            }
          ],
          temperature: 0.7,
          max_tokens: 600
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse results
      const titleMatch = content.match(/TITLE:\s*(.*?)(?=\n|$)/i);
      const summaryMatch = content.match(/SUMMARY:\s*([\s\S]*?)(?=NOTES:|$)/i);
      const sentimentMatch = content.match(/SENTIMENT:\s*(.*?)(?=\n|$)/i);
      const notesSection = content.split(/NOTES:/i)[1] || '';
      const notes = notesSection
        .split('\n')
        .filter(line => line.trim().startsWith('•'))
        .map(line => line.replace(/^[•\s]+/, '').trim())
        .filter(line => line.length > 0);

      const title = titleMatch ? titleMatch[1].trim() : 'Untitled Analysis';
      const summary = summaryMatch ? summaryMatch[1].trim() : 'No summary available.';
      const sentiment = sentimentMatch ? sentimentMatch[1].trim() : 'Neutral';

      setResults({ title, summary, notes, sentiment });
      setCurrentStep(3);
      // mark as complete so the AnalysisSection shows finished state
      setProgress(100);
      setProcessingSteps([true, true, true, true]);
      setIsAnalyzing(false);
      setShowResults(true);

      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);

      showToast('Analysis completed successfully! 🎉', 'success');
    } catch (err) {
      console.error('Error:', err);
      showToast(`Analysis failed: ${err.message}`, 'error');
      setCurrentStep(1);
      setIsAnalyzing(false);
    }
  };

  // Generate QR Code
  const generateQR = () => {
    if (!results.title || !results.summary) {
      showToast('Please generate AI content first', 'warning');
      setShowQR(true);
      return;
    }

    // Ensure QRCode library is available
    if (typeof QRCode === 'undefined') {
      showToast('QR generator library not loaded. Please add qrcodejs (CDN or package) to the app.', 'error');
      return;
    }

    // Ensure the QR panel is visible so the container mounts
    setShowQR(true);

    const MAX_TRIES = 12; // ~1.2s total
    const WAIT_MS = 100;

    const tryGenerate = (tries = 0) => {
      const qrContainer = qrcodeRef.current;
      if (!qrContainer) {
        if (tries >= MAX_TRIES) {
          showToast('Unable to access QR container. Try again.', 'error');
          return;
        }
        return setTimeout(() => tryGenerate(tries + 1), WAIT_MS);
      }

      qrContainer.innerHTML = '';

      const MAX_SUMMARY = 200;
      const shortSummary = results.summary.length > MAX_SUMMARY
        ? results.summary.substring(0, MAX_SUMMARY) + '...'
        : results.summary;

      const qrText = `Title: ${results.title.substring(0, 80)}\nSummary: ${shortSummary}`;

      try {
        const tryConfigs = [
          { maxLen: 500, level: 'H' },
          { maxLen: 300, level: 'H' },
          { maxLen: 300, level: 'M' },
          { maxLen: 200, level: 'M' },
          { maxLen: 180, level: 'L' },
          { maxLen: 120, level: 'L' }
        ];

        let generated = false;
        let usedConfig = null;

        for (const cfg of tryConfigs) {
          const max = cfg.maxLen;
          const payload = qrText.length > max ? qrText.slice(0, max) + '\n\n[truncated]' : qrText;
          qrContainer.innerHTML = '';

          try {
            new QRCode(qrContainer, {
              text: payload,
              width: 150,
              height: 150,
              colorDark: '#1e293b',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel[cfg.level]
            });
            generated = true;
            usedConfig = cfg;
            break;
          } catch (e) {
            if (/too long|overflow|code length overflow/i.test(e.message || '')) {
              continue;
            } else {
              throw e;
            }
          }
        }

        if (!generated) {
          throw new Error('All QR generation attempts failed (payload too large)');
        }

        showToast(`QR Code generated successfully (ECC ${usedConfig.level})!`, 'success');

        setTimeout(() => {
          qrSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      } catch (err) {
        console.error(err);
        showToast('Failed to generate QR code: ' + (err.message || err), 'error');
      }
    };

    tryGenerate();
  };

  // Download QR as PNG
  const downloadPNG = () => {
    const qrContainer = qrcodeRef.current;
    const canvas = qrContainer.querySelector('canvas');

    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'ai-analysis-qr.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('QR downloaded (PNG)', 'success');
    } else {
      showToast('No QR found to download', 'error');
    }
  };

  // Close QR
  const closeQR = () => {
    setShowQR(false);
    if (qrcodeRef.current) {
      qrcodeRef.current.innerHTML = '';
    }
    showToast('QR closed', 'success');
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const content = `✨ AI Analysis Results ✨\n\n📌 Title:\n${results.title}\n\n📝 Summary:\n${results.summary}\n\n📋 Key Insights:\n${results.notes.map(n => `• ${n}`).join('\n')}\n\n🎭 Sentiment: ${results.sentiment}\n\n⚡ Generated by AI Topic Generator - Powered by DeepSeek AI`;

    navigator.clipboard.writeText(content)
      .then(() => showToast('Results copied to clipboard! 📋', 'success'))
      .catch(err => showToast('Failed to copy: ' + err, 'error'));
  };

  // Copy individual note
  const copyNote = (note) => {
    navigator.clipboard.writeText(note)
      .then(() => showToast('Note copied!', 'success'))
      .catch(err => showToast('Failed to copy note', 'error'));
  };

  // Reset all
  const resetAll = () => {
    setInputText('');
    setWordCount(0);
    setCharCount(0);
    setCurrentStep(1);
    setShowLengthWarning(false);
    setIsAnalyzing(false);
    setShowResults(false);
    setShowQR(false);
    setProgress(0);
    setProcessingSteps([false, false, false, false]);
    setResults({ title: '', summary: '', notes: [], sentiment: 'Neutral' });

    if (qrcodeRef.current) {
      qrcodeRef.current.innerHTML = '';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Reset complete - Ready for new analysis', 'success');
  };

  // Get sentiment color classes
  const getSentimentClass = () => {
    if (results.sentiment === 'Positive') return 'bg-emerald-100 text-emerald-700';
    if (results.sentiment === 'Negative') return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
  };


   const navigate = useNavigate();
  return (



    <div className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">

<button
  onClick={() => navigate("/#home")}
  aria-label="Back to Home"
  className="
    group
    flex items-center gap-2
    px-2.5 py-1.5 sm:px-3 sm:py-2
    text-[11px] sm:text-xs font-semibold
    bg-gradient-to-r from-gray-50 to-white
    text-gray-700
    rounded-md sm:rounded-lg
    border border-gray-200
    shadow-sm
    hover:from-gray-100 hover:to-gray-50
    hover:text-gray-900 hover:shadow
    active:shadow-sm
    transition-all duration-300
  "
>
  {/* Icon container */}
  <div
    className="
      relative
      w-4 h-4 sm:w-5 sm:h-5
      flex items-center justify-center
      overflow-hidden
      shrink-0
    "
  >
    {/* Arrow */}
    <span
      className="
        absolute
        text-sm sm:text-base
        group-hover:-translate-x-full
        group-hover:opacity-0
        transition-all duration-300
      "
    >
      ←
    </span>

    {/* Home SVG */}
    <svg
      className="
        absolute
        w-3.5 h-3.5 sm:w-5 sm:h-5
        translate-x-full
        opacity-0
        group-hover:translate-x-0
        group-hover:opacity-100
        transition-all duration-300
      "
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  </div>

  {/* Text */}
  <span className="leading-none sm:text-[14px]">Home</span>
</button>



        {/* Header */}
        <div className="text-center px-3 sm:px-4 mb-6 md:mb-8 lg:mb-12">
          <div className="relative inline-block mb-3 sm:mb-4 md:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl md:blur-2xl opacity-30 animate-pulse"></div>

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 gradient-bg rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-md sm:shadow-lg animate-bounce">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4">
            <span className="gradient-text">AI Content Summarizers System</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-2">
            Transform your content into structured insights with advanced AI analysis
          </p>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm md:text-base">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white rounded-full shadow-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              <span className="font-medium text-slate-700 text-xs sm:text-sm">Real-time</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white rounded-full shadow-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-slate-700 text-xs sm:text-sm">Secure</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white rounded-full shadow-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 20V10M12 20V4M6 20v-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-slate-700 text-xs sm:text-sm">Analytics</span>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <StepIndicator currentStep={currentStep} showResults={showResults} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

          {/* Left Column: Input & Analysis */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">

            {/* Input Section */}
            <InputSection
              inputText={inputText}
              setInputText={setInputText}
              wordCount={wordCount}
              charCount={charCount}
              showLengthWarning={showLengthWarning}
              clearInput={clearInput}
              startAnalysis={startAnalysis}
            />

            {/* Analysis Progress Section */}
            {(isAnalyzing || showResults) && (
              <AnalysisSection
                ref={analysisSectionRef}
                progress={progress}
                processingSteps={processingSteps}
                completed={showResults}
              />
            )}
          </div>

          {/* Right Column: Results */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {showResults ? (
              <ResultsSection
                ref={resultsSectionRef}
                results={results}
                getSentimentClass={getSentimentClass}
                copyNote={copyNote}
                copyToClipboard={copyToClipboard}
                generateQR={generateQR}
                resetAll={resetAll}
                showQR={showQR}
                qrcodeRef={qrcodeRef}
                qrSectionRef={qrSectionRef}
                closeQR={closeQR}
                downloadPNG={downloadPNG}
              />
            ) : isAnalyzing ? null : (
              <EmptyResults />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ currentStep, showResults }) => {
  const steps = [
    { id: 1, title: 'Paste Content', desc: 'Provide your text', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 2, title: 'AI Analysis', desc: 'Processing content', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 3, title: 'Get Results', desc: 'View insights', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  const getStepClass = (stepId) => {
    if (stepId < currentStep || (stepId === 3 && showResults)) return 'border-emerald-500';
    if (stepId === currentStep) return currentStep === 1 ? 'border-indigo-500' : currentStep === 2 ? 'border-purple-500' : 'border-emerald-500';
    return 'border-slate-300';
  };

  const getIconClass = (stepId) => {
    if (stepId < currentStep || (stepId === 3 && showResults)) return 'text-emerald-600';
    if (stepId === currentStep) return currentStep === 1 ? 'text-indigo-600' : currentStep === 2 ? 'text-purple-600' : 'text-emerald-600';
    return 'text-slate-400';
  };

  const getTitleClass = (stepId) => {
    if (stepId === 3 && showResults) return 'text-emerald-600';
    if (stepId < currentStep) return 'text-emerald-600';
    if (stepId === currentStep) return currentStep === 1 ? 'text-indigo-600' : currentStep === 2 ? 'text-purple-600' : 'text-emerald-600';
    return 'text-slate-600';
  };

  return (
    <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-3 md:px-4">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 sm:gap-4 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              {index < 2 && <div className={`step-connector hidden sm:block ${index < currentStep - 1 ? 'completed' : index === currentStep - 1 ? 'active' : ''}`}></div>}

              <div className="step-icon-wrapper mb-3 sm:mb-4">
                {step.id === currentStep && (
                  <div className={`absolute inset-0 rounded-full animate-pulse-ring ${currentStep === 2 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                )}

                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white border-4 ${getStepClass(step.id)} flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer hover:scale-110`}>
                  {(step.id < currentStep || (step.id === 3 && showResults)) ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${getIconClass(step.id)} transition-colors duration-300`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d={step.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className={`text-xs sm:text-sm font-bold mb-1 ${getTitleClass(step.id)}`}>{step.title}</h3>
                <p className={`text-xs ${step.id <= currentStep ? step.id === currentStep && currentStep === 1 ? 'text-indigo-500' : step.id === currentStep && currentStep === 2 ? 'text-purple-500' : 'text-emerald-500' : 'text-slate-400'}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Input Section Component
const InputSection = ({ inputText, setInputText, wordCount, charCount, showLengthWarning, clearInput, startAnalysis }) => {
  return (
    <div className="glass-effect rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border border-slate-200 hover-lift step-card active">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 gradient-bg rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-800">Input Content</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Paste your text for analysis</p>
          </div>
        </div>
        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg sm:rounded-xl shadow-lg">
          <span className="text-xs sm:text-sm font-bold">STEP 1</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        <div className="relative">
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 md:top-4 md:left-4 flex items-center gap-1 sm:gap-2 text-slate-400 pointer-events-none">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">Your Content</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your article, research paper, blog post, notes, or any text content here...&#10;&#10;Tips for best results:&#10;• Minimum 50 characters recommended&#10;• Clear and well-structured content&#10;• Any language supported"
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 p-3 sm:p-4 md:p-6 pt-8 sm:pt-10 md:pt-12 lg:pt-14 border-2 border-slate-200 rounded-lg sm:rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-2 sm:focus:ring-3 md:focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none text-slate-700 text-sm sm:text-base leading-relaxed scrollbar-thin"
          />

          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex items-center gap-1 sm:gap-2 md:gap-3">
            <div className="px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              AI Ready
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-indigo-100">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-4 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600">{wordCount}</div>
                <div className="text-xs text-slate-600 font-medium">Words</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-purple-100">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
                  <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01" />
                  <path d="M6 13h.01M10 13h.01M14 13h.01M18 13h.01" />
                  <path d="M7 16h10" />
                </svg>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">{charCount}</div>
                <div className="text-xs text-slate-600 font-medium">Characters</div>
              </div>
            </div>
          </div>
        </div>

        {showLengthWarning && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
            <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 md:gap-3">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 xl:w-6 xl:h-6 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex-1">
                <div className="font-semibold text-amber-800 text-xs sm:text-sm">More content needed</div>
                <div className="text-amber-600 text-xs mt-0.5 sm:mt-1">Add more text for better AI analysis results</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={clearInput}
            className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-lg sm:rounded-xl font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 group"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm sm:text-base">Clear All</span>
          </button>

          <button
            onClick={startAnalysis}
            disabled={charCount < 50}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 gradient-bg text-white rounded-lg sm:rounded-xl font-bold hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 group relative overflow-hidden ${charCount < 50 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
            <span className="text-sm sm:text-base relative z-10">Start Analysis</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Analysis Section Component
const AnalysisSection = React.forwardRef(({ progress, processingSteps, completed }, ref) => {
  return (
    <div ref={ref} className="glass-effect rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border border-slate-200 hover-lift step-card active">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 gradient-bg rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <svg className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white ${completed ? '' : 'animate-spin'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={`absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-lg ${completed ? 'bg-emerald-400' : 'bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse'}`}>
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 xl:w-4 xl:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-800">{completed ? 'AI Processed' : 'AI Processing'}</h2>
            <p className="text-slate-500 text-xs sm:text-sm">{completed ? 'Analysis complete — results compiled and ready' : 'Analyzing your content intelligently'}</p>
          </div>
        </div>
        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl shadow-lg">
          <span className="text-xs sm:text-sm font-bold">STEP 2</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex xs:flex-row xs:items-center justify-between gap-1 sm:gap-2">
            <span className="text-[14px] md:text-lg font-semibold text-slate-700">Processing Stages</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="relative h-2 sm:h-3 md:h-4 lg:h-5 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 shimmer opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
          {[
            { title: 'Reading Content', desc: 'Analyzing structure...' },
            { title: 'Extracting Concepts', desc: 'Identifying key terms' },
            { title: 'Generating Summary', desc: 'Creating overview' },
            { title: 'Finalizing Results', desc: 'Compiling insights' }
          ].map((step, index) => (
            <div
              key={index}
              className={`flex items-center p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 ${processingSteps[index]
                  ? 'bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-sm'
                  : 'bg-slate-50 border-slate-100'
                }`}
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 md:mr-4 ${processingSteps[index]
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg'
                  : 'bg-slate-200'
                }`}>
                {processingSteps[index] ? (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : index === 0 ? (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-slate-400 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs sm:text-sm font-bold truncate ${processingSteps[index] ? 'text-slate-800' : 'text-slate-600'}`}>{step.title}</div>
                <div className={`text-xs mt-0.5 sm:mt-1 truncate ${processingSteps[index] ? 'text-indigo-600' : 'text-slate-400'}`}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 border border-blue-200">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-blue-800 text-xs sm:text-sm">{progress >= 100 ? 'AI Processed' : 'AI Processing'}</div>
              <div className="text-blue-600 text-xs mt-1 leading-relaxed">{progress >= 100 ? 'Analysis complete — results compiled and ready' : 'Analyzing semantic patterns, contextual relationships, and extracting meaningful insights from your content'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Results Section Component
const ResultsSection = React.forwardRef(({
  results,
  getSentimentClass,
  copyNote,
  copyToClipboard,
  generateQR,
  resetAll,
  showQR,
  qrcodeRef,
  qrSectionRef,
  closeQR,
  downloadPNG
}, ref) => {
  return (
    <div ref={ref} className="glass-effect rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border border-slate-200 hover-lift step-card active">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-800">Analysis Results</h2>
            <p className="text-slate-500 text-xs sm:text-sm">AI-generated insights ready</p>
          </div>
        </div>
        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg sm:rounded-xl shadow-lg">
          <span className="text-xs sm:text-sm font-bold">STEP 3</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Title */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 shadow-sm">
          <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base md:text-lg">Generated Title</h3>
              <p className="text-xs text-blue-600">AI-optimized headline</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight mb-2 sm:mb-3 md:mb-4">
            {results.title}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">AI Generated</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">SEO Optimized</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-purple-200 shadow-sm">
          <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base md:text-lg">Content Summary</h3>
              <p className="text-xs text-purple-600">Concise overview</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mb-2 sm:mb-3 md:mb-4">
            {results.summary}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 sm:pt-3 md:pt-4 border-t border-purple-200">
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              <span className="text-xs text-purple-600 font-semibold">Powered by DeepSeek AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Sentiment:</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${getSentimentClass()}`}>{results.sentiment}</span>
            </div>
          </div>
        </div>

        {/* Key Notes */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-emerald-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base md:text-lg">Key Insights</h3>
                <p className="text-xs text-emerald-600">Important points extracted</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{results.notes.length} items</span>
          </div>
          <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-96 overflow-y-auto scrollbar-thin p-1 sm:p-2">
            {results.notes.length > 0 ? (
              results.notes.map((note, index) => (
                <div key={index} className="flex items-start p-2 sm:p-3 md:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed flex-1">{note}</p>
                  <button
                    onClick={() => copyNote(note)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-slate-400 hover:text-emerald-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 md:py-12">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-slate-300 mx-auto mb-3 sm:mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-slate-500 text-sm sm:text-base font-medium">No key notes extracted</p>
              </div>
            )}
          </div>
        </div>

        {/* QR Code Section */}
        {showQR && (
          <div ref={qrSectionRef} className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2 sm:mb-3 md:mb-4">
              <div className="flex items-center justify-between w-full md:gap-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base md:text-lg">Share Results</h3>
                    <p className="text-xs text-slate-600">Scan QR code to share</p>
                  </div>
                </div>
                <button
                  onClick={closeQR}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 sm:mr-4 md:mr-4 bg-white border border-slate-200 text-slate-600 text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <svg className="w-3 h-3 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Close
                </button>
              </div>
              <button
                onClick={generateQR}
                className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-slate-700 to-gray-800 text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Regenerate
              </button>
            </div>
            <div ref={qrcodeRef} className="flex justify-center p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl border-2 border-slate-200 shadow-inner"></div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={downloadPNG}
                className="px-3 py-1 bg-slate-100 rounded text-sm font-semibold hover:bg-slate-200"
              >
                Download PNG
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={copyToClipboard}
            className="group flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-sm text-blue-700">Copy Result</span>
          </button>

          <button
            onClick={generateQR}
            className="group flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-purple-200 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5 text-purple-600 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
              <path d="M3 14h7v7H3z" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-sm text-purple-700">Generate QR</span>
          </button>

          <button
            onClick={resetAll}
            className="group flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-slate-300 hover:bg-slate-100 hover:border-slate-500 transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12a9 9 0 11-3-6.7" strokeWidth="2" />
              <polyline points="21 3 21 9 15 9" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-sm text-slate-700">New Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// Empty Results Component
const EmptyResults = () => {
  return (
    <div className="glass-effect rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border-2 border-dashed border-slate-300 text-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-inner">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-700 mb-2 sm:mb-3">Awaiting Analysis</h3>
      <p className="text-slate-500 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
        Your AI-generated insights will appear here after processing. Start by pasting content in the input box.
      </p>
      <div className="space-y-2 sm:space-y-3 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        {['Title generation', 'Summary extraction', 'Key insights identification'].map((item, index) => (
          <div key={index} className={`flex items-center p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border ${index === 0 ? 'bg-emerald-50 border-emerald-200' : index === 1 ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
            }`}>
            <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5 mr-1.5 sm:mr-2 md:mr-3 flex-shrink-0 ${index === 0 ? 'text-emerald-500' : index === 1 ? 'text-blue-500' : 'text-purple-500'
              }`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs sm:text-sm text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;