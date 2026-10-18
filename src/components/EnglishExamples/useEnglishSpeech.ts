import { useCallback, useEffect, useRef, useState } from 'react';

let activeReading: {
  utterance: SpeechSynthesisUtterance;
  finish: () => void;
} | null = null;

export default function useEnglishSpeech(lang: string) {
  const [support, setSupport] = useState<'pending' | 'available' | 'unavailable'>('pending');
  const [reading, setReading] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [voiceFallback, setVoiceFallback] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupport(
      'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'
        ? 'available'
        : 'unavailable'
    );
    return () => {
      const utterance = utteranceRef.current;
      if (!utterance) return;
      utterance.onend = null;
      utterance.onerror = null;
      if (activeReading?.utterance === utterance) {
        window.speechSynthesis.cancel();
        activeReading = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    const utterance = utteranceRef.current;
    if (utterance && activeReading?.utterance === utterance) {
      window.speechSynthesis.cancel();
      activeReading = null;
    }
    utteranceRef.current = null;
    setReading(null);
  }, []);

  const read = (sentence: string, index: number) => {
    if (support !== 'available') return;
    if (reading === index) {
      stop();
      return;
    }
    setFailed(false);
    setBusy(false);
    setVoiceFallback(false);
    const synthesis = window.speechSynthesis;
    if (activeReading) {
      activeReading.finish();
      synthesis.cancel();
    } else if (synthesis.speaking || synthesis.pending) {
      setBusy(true);
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(sentence);
    const voices = synthesis.getVoices();
    const matchingVoice = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
    const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));
    const voice = matchingVoice ?? englishVoice;
    if (voice) utterance.voice = voice;
    utterance.lang = lang;
    utterance.rate = 0.9;
    utteranceRef.current = utterance;
    const finish = () => {
      if (utteranceRef.current !== utterance) return;
      utteranceRef.current = null;
      if (activeReading?.utterance === utterance) activeReading = null;
      setReading(null);
    };
    activeReading = { utterance, finish };
    utterance.onend = finish;
    utterance.onerror = (event) => {
      if (utteranceRef.current !== utterance) return;
      if (event.error !== 'canceled' && event.error !== 'interrupted') setFailed(true);
      finish();
    };
    setFailed(false);
    setBusy(false);
    setVoiceFallback(!matchingVoice);
    setReading(index);
    try {
      synthesis.speak(utterance);
    } catch {
      setFailed(true);
      finish();
    }
  };

  return { support, reading, failed, busy, voiceFallback, read, stop };
}
