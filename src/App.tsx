import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { ChatMessage } from './components/chat-message';
import { AudioControls } from './components/audio-controls';
import { ScenarioSelector } from './components/scenario-selector';
import { ProgressHeader } from './components/progress-header';
import { Settings } from './components/settings';
import { Play, Mic, RotateCcw, ChevronRight, Menu, Volume2 } from 'lucide-react';

// Mock data
const scenarios = [
  { id: 'identification', name: 'Identification', icon: '🆔' },
  { id: 'appointments', name: 'Appointments', icon: '📅' },
  { id: 'forms', name: 'Forms & Documents', icon: '📋' },
  { id: 'transport', name: 'Transport & Directions', icon: '🚌' },
  { id: 'post', name: 'Post Office', icon: '📮' },
  { id: 'bank', name: 'Bank Basics', icon: '🏦' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'shopping', name: 'Shopping', icon: '🛒' },
  { id: 'health', name: 'Health Basics', icon: '🏥' }
];

const difficultyLevels = [
  { level: 0, label: 'A0-A1', color: 'bg-green-500' },
  { level: 1, label: 'A1', color: 'bg-blue-500' },
  { level: 2, label: 'A2', color: 'bg-yellow-500' },
  { level: 3, label: 'B1', color: 'bg-orange-500' },
  { level: 4, label: 'B2', color: 'bg-red-500' },
  { level: 5, label: 'C1', color: 'bg-purple-500' }
];

const mockSentences = {
  identification: [
    { 
      level: 0, 
      romanian: 'Bună ziua!', 
      translations: {
        en: 'Good day!',
        he: 'יום טוב!',
        es: '¡Buen día!',
        fr: 'Bonjour !',
        de: 'Guten Tag!',
        it: 'Buongiorno!',
        pt: 'Bom dia!',
        ru: 'Добрый день!',
        ar: 'نهارك سعيد!',
        zh: '你好！',
        ja: 'こんにちは！',
        ko: '안녕하세요!',
        hi: 'नमस्ते!',
        tr: 'İyi günler!',
        pl: 'Dzień dobry!',
        nl: 'Goedendag!',
        sv: 'God dag!',
        da: 'God dag!',
        no: 'God dag!',
        fi: 'Hyvää päivää!'
      }, 
      context: 'greeting' 
    },
    { 
      level: 0, 
      romanian: 'Mă numesc Maria.', 
      translations: {
        en: 'My name is Maria.',
        he: 'קוראים לי מריה.',
        es: 'Me llamo María.',
        fr: 'Je m\'appelle Maria.',
        de: 'Ich heiße Maria.',
        it: 'Mi chiamo Maria.',
        pt: 'Meu nome é Maria.',
        ru: 'Меня зовут Мария.',
        ar: 'اسمي ماريا.',
        zh: '我叫玛丽亚。',
        ja: '私の名前はマリアです。',
        ko: '제 이름은 마리아입니다.',
        hi: 'मेरा नाम मारिया है।',
        tr: 'Benim adım Maria.',
        pl: 'Nazywam się Maria.',
        nl: 'Mijn naam is Maria.',
        sv: 'Jag heter Maria.',
        da: 'Mit navn er Maria.',
        no: 'Jeg heter Maria.',
        fi: 'Nimeni on Maria.'
      }, 
      context: 'introduction' 
    },
    { 
      level: 1, 
      romanian: 'Aș dori să fac o programare pentru pașaport.', 
      translations: {
        en: "I'd like to make an appointment for a passport.",
        he: 'אני רוצה לקבוע תור לדרכון.',
        es: 'Me gustaría hacer una cita para un pasaporte.',
        fr: 'J\'aimerais prendre un rendez-vous pour un passeport.',
        de: 'Ich möchte einen Termin für einen Reisepass vereinbaren.',
        it: 'Vorrei fissare un appuntamento per un passaporto.',
        pt: 'Gostaria de marcar uma consulta para um passaporte.',
        ru: 'Я хотел бы записаться на прием для получения паспорта.',
        ar: 'أود أن أحدد موعداً للحصول على جواز سفر.',
        zh: '我想预约办理护照。',
        ja: 'パスポートの予約を取りたいのですが。',
        ko: '여권 발급 예약을 하고 싶습니다.',
        hi: 'मैं पासपोर्ट के लिए अपॉइंटमेंट लेना चाहूंगा।',
        tr: 'Pasaport için randevu almak istiyorum.',
        pl: 'Chciałbym umówić się na wizytę w sprawie paszportu.',
        nl: 'Ik zou graag een afspraak maken voor een paspoort.',
        sv: 'Jag skulle vilja boka en tid för ett pass.',
        da: 'Jeg vil gerne bestille en tid til et pas.',
        no: 'Jeg vil gjerne bestille en time for et pass.',
        fi: 'Haluaisin varata ajan passia varten.'
      }, 
      context: 'request' 
    },
    { 
      level: 2, 
      romanian: 'Am depus actele ieri și aș vrea să știu stadiul cererii.', 
      translations: {
        en: 'I submitted the documents yesterday and would like to know the status of my application.',
        he: 'הגשתי את המסמכים אתמול ואני רוצה לדעת מה המצב של הבקשה.',
        es: 'Presenté los documentos ayer y me gustaría saber el estado de mi solicitud.',
        fr: 'J\'ai soumis les documents hier et j\'aimerais connaître le statut de ma demande.',
        de: 'Ich habe die Dokumente gestern eingereicht und möchte den Status meines Antrags wissen.',
        it: 'Ho presentato i documenti ieri e vorrei sapere lo stato della mia richiesta.',
        pt: 'Enviei os documentos ontem e gostaria de saber o status da minha solicitação.',
        ru: 'Я подал документы вчера и хотел бы узнать статус моего заявления.',
        ar: 'قدمت الوثائق أمس وأود أن أعرف حالة طلبي.',
        zh: '我昨天提交了文件，想了解我申请的状态。',
        ja: '昨日書類を提出しましたので、申請の状況を知りたいのですが。',
        ko: '어제 서류를 제출했는데 신청 상태를 알고 싶습니다.',
        hi: 'मैंने कल दस्तावेज जमा किए थे और अपने आवेदन की स्थिति जानना चाहूंगा।',
        tr: 'Dün belgeleri verdim ve başvurumun durumunu öğrenmek istiyorum.',
        pl: 'Złożyłem dokumenty wczoraj i chciałbym poznać status mojego wniosku.',
        nl: 'Ik heb gisteren de documenten ingediend en zou graag de status van mijn aanvraag willen weten.',
        sv: 'Jag lämnade in dokumenten igår och skulle vilja veta statusen på min ansökan.',
        da: 'Jeg indsendte dokumenterne i går og vil gerne vide status på min ansøgning.',
        no: 'Jeg leverte dokumentene i går og vil gjerne vite statusen på søknaden min.',
        fi: 'Jätin asiakirjat eilen ja haluaisin tietää hakemukseni tilan.'
      }, 
      context: 'follow-up' 
    },
    { 
      level: 3, 
      romanian: 'Dacă este posibil, aș prefera o programare dimineața săptămâna viitoare.', 
      translations: {
        en: 'If possible, I would prefer an appointment in the morning next week.',
        he: 'אם אפשר, הייתי מעדיף תור בבוקר השבוע הבא.',
        es: 'Si es posible, preferiría una cita por la mañana la próxima semana.',
        fr: 'Si possible, je préférerais un rendez-vous le matin la semaine prochaine.',
        de: 'Wenn möglich, hätte ich gern einen Termin am Morgen nächste Woche.',
        it: 'Se possibile, preferirei un appuntamento al mattino la prossima settimana.',
        pt: 'Se possível, eu preferiria uma consulta de manhã na próxima semana.',
        ru: 'Если возможно, я бы предпочел встречу утром на следующей неделе.',
        ar: 'إذا كان ذلك ممكناً، أفضل موعداً في الصباح الأسبوع القادم.',
        zh: '如果可能的话，我希望下周上午预约。',
        ja: '可能であれば、来週の午前中に予約をお願いします。',
        ko: '가능하다면 다음 주 오전에 예약을 하고 싶습니다.',
        hi: 'यदि संभव हो तो मैं अगले सप्ताह सुबह अपॉइंटमेंट लेना पसंद करूंगा।',
        tr: 'Mümkünse gelecek hafta sabah bir randevu tercih ederim.',
        pl: 'Jeśli to możliwe, wolałbym wizytę rano w przyszłym tygodniu.',
        nl: 'Indien mogelijk zou ik een afspraak in de ochtend volgende week prefereren.',
        sv: 'Om möjligt skulle jag föredra en tid på morgonen nästa vecka.',
        da: 'Hvis muligt ville jeg foretrække en tid om morgenen næste uge.',
        no: 'Hvis mulig ville jeg foretrekke en time om morgenen neste uke.',
        fi: 'Jos mahdollista, haluaisin ajan aamulla ensi viikolla.'
      }, 
      context: 'preference' 
    }
  ],
  appointments: [
    { 
      level: 0, 
      romanian: 'Vreau o programare.', 
      translations: {
        en: 'I want an appointment.',
        he: 'אני רוצה תור.',
        es: 'Quiero una cita.',
        fr: 'Je veux un rendez-vous.',
        de: 'Ich möchte einen Termin.',
        it: 'Voglio un appuntamento.',
        pt: 'Quero uma consulta.',
        ru: 'Я хочу запись.',
        ar: 'أريد موعداً.',
        zh: '我要预约。',
        ja: '予約をお願いします。',
        ko: '예약하고 싶습니다.',
        hi: 'मुझे अपॉइंटमेंट चाहिए।',
        tr: 'Randevu istiyorum.',
        pl: 'Chcę wizytę.',
        nl: 'Ik wil een afspraak.',
        sv: 'Jag vill ha en tid.',
        da: 'Jeg vil have en tid.',
        no: 'Jeg vil ha en time.',
        fi: 'Haluan ajan.'
      }, 
      context: 'basic' 
    },
    { 
      level: 1, 
      romanian: 'Când aveți timp liber?', 
      translations: {
        en: 'When do you have free time?',
        he: 'מתי יש לכם זמן פנוי?',
        es: '¿Cuándo tienen tiempo libre?',
        fr: 'Quand avez-vous du temps libre ?',
        de: 'Wann haben Sie freie Zeit?',
        it: 'Quando avete tempo libero?',
        pt: 'Quando vocês têm tempo livre?',
        ru: 'Когда у вас есть свободное время?',
        ar: 'متى لديكم وقت فراغ؟',
        zh: '你们什么时候有空？',
        ja: 'いつお時間ありますか？',
        ko: '언제 시간 있으세요?',
        hi: 'आपके पास कब खाली समय है?',
        tr: 'Ne zaman boş zamanınız var?',
        pl: 'Kiedy macie wolny czas?',
        nl: 'Wanneer hebben jullie vrije tijd?',
        sv: 'När har ni ledig tid?',
        da: 'Hvornår har I fri tid?',
        no: 'Når har dere ledig tid?',
        fi: 'Milloin teillä on vapaata aikaa?'
      }, 
      context: 'inquiry' 
    },
    { 
      level: 2, 
      romanian: 'Pot să schimb programarea de marți?', 
      translations: {
        en: 'Can I change my Tuesday appointment?',
        he: 'אני יכול לשנות את התור של יום שלישי?',
        es: '¿Puedo cambiar mi cita del martes?',
        fr: 'Puis-je changer mon rendez-vous de mardi ?',
        de: 'Kann ich meinen Dienstag-Termin ändern?',
        it: 'Posso cambiare il mio appuntamento di martedì?',
        pt: 'Posso mudar minha consulta de terça-feira?',
        ru: 'Могу ли я изменить запись на вторник?',
        ar: 'هل يمكنني تغيير موعدي يوم الثلاثاء؟',
        zh: '我可以改变周二的预约吗？',
        ja: '火曜日の予約を変更できますか？',
        ko: '화요일 예약을 바꿀 수 있나요?',
        hi: 'क्या मैं मंगलवार की अपॉइंटमेंट बदल सकता हूं?',
        tr: 'Salı günkü randevumu değiştirebilir miyim?',
        pl: 'Czy mogę zmienić wizytę we wtorek?',
        nl: 'Kan ik mijn afspraak van dinsdag veranderen?',
        sv: 'Kan jag ändra min tid på tisdag?',
        da: 'Kan jeg ændre min tid på tirsdag?',
        no: 'Kan jeg endre timen min på tirsdag?',
        fi: 'Voinko muuttaa tiistain aikaani?'
      }, 
      context: 'modification' 
    }
  ]
};

type Message = {
  id: string;
  type: 'bot' | 'user';
  content: string;
  translation?: string;
  score?: number;
  feedback?: string;
  level?: number;
  timestamp: Date;
};

export default function App() {
  const [currentScenario, setCurrentScenario] = useState('identification');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [skillScore, setSkillScore] = useState(45);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState<any>(null);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(3);
  const [dailyGoal, setDailyGoal] = useState({ current: 12, target: 15 });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [appSettings, setAppSettings] = useState({
    showDiacritics: true,
    autoPlay: false,
    slowByDefault: false,
    hapticFeedback: true,
    notifications: true,
    offlineMode: false
  });

  useEffect(() => {
    generateNextSentence();
  }, [currentScenario, currentLevel, currentLanguage]);

  const generateNextSentence = () => {
    const scenarioSentences = mockSentences[currentScenario as keyof typeof mockSentences] || mockSentences.identification;
    const availableSentences = scenarioSentences.filter(s => s.level <= currentLevel + 1);
    const targetSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)];
    
    setCurrentSentence(targetSentence);
    
    const translation = targetSentence.translations[currentLanguage as keyof typeof targetSentence.translations] || targetSentence.translations.en;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: targetSentence.romanian,
      translation: translation,
      level: targetSentence.level,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const playAudio = async () => {
    setIsPlaying(true);
    // Mock TTS delay
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const playSlowAudio = async () => {
    setIsPlaying(true);
    // Mock slow TTS delay
    setTimeout(() => {
      setIsPlaying(false);
    }, 3500);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Mock recording duration
    setTimeout(() => {
      setIsRecording(false);
      processRecording();
    }, 3000);
  };

  const processRecording = () => {
    // Mock ASR processing and scoring
    const mockTranscript = generateMockTranscript();
    const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
    const mockFeedback = generateMockFeedback(mockScore);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: mockTranscript,
      score: mockScore,
      feedback: mockFeedback,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    updateSkillLevel(mockScore);
    
    // Auto-generate next sentence after a delay
    setTimeout(() => {
      generateNextSentence();
    }, 2000);
  };

  const generateMockTranscript = () => {
    if (!currentSentence) return "buna ziua";
    
    // Simulate ASR with some variations
    const variations = [
      currentSentence.romanian.toLowerCase(),
      currentSentence.romanian.toLowerCase().replace(/ă/g, 'a').replace(/î/g, 'i'),
      currentSentence.romanian.toLowerCase().replace(/ș/g, 's').replace(/ț/g, 't'),
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
  };

  const generateMockFeedback = (score: number) => {
    const feedbacks = [
      "Great pronunciation! Try to stress the second syllable more.",
      "Good effort! Focus on the 'ă' sound - it's like 'uh'.",
      "Nice! Roll the 'r' sound more in 'programare'.",
      "Well done! Make sure to pronounce 'ș' like 'sh'.",
      "Excellent! Try speaking a bit slower for clarity.",
      "Good work! The 'â' sound is closer to 'uh' than 'ah'."
    ];
    
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const updateSkillLevel = (score: number) => {
    let newSkillScore = skillScore;
    let newLevel = currentLevel;
    
    if (score >= 80) {
      newSkillScore = Math.min(100, skillScore + 6);
      setStreak(prev => prev + 1);
      setDailyGoal(prev => ({ ...prev, current: Math.min(prev.target, prev.current + 1) }));
    } else if (score >= 70) {
      newSkillScore = Math.min(100, skillScore + 3);
    } else if (score >= 50) {
      newSkillScore = Math.min(100, skillScore + 1);
    } else {
      newSkillScore = Math.max(0, skillScore - 3);
    }
    
    // Level up/down logic
    if (newSkillScore >= 80 && currentLevel < 5) {
      newLevel = currentLevel + 1;
    } else if (newSkillScore < 30 && currentLevel > 0) {
      newLevel = currentLevel - 1;
    }
    
    setSkillScore(newSkillScore);
    setCurrentLevel(newLevel);
  };

  const simplifyCurrentSentence = () => {
    // Generate easier version
    if (currentLevel > 0) {
      setCurrentLevel(prev => Math.max(0, prev - 1));
      generateNextSentence();
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // Update existing messages with new translations
    setMessages(prev => prev.map(message => {
      if (message.type === 'bot' && currentSentence) {
        const sentence = mockSentences[currentScenario as keyof typeof mockSentences]?.find(s => s.romanian === message.content);
        if (sentence) {
          const newTranslation = sentence.translations[language as keyof typeof sentence.translations] || sentence.translations.en;
          return { ...message, translation: newTranslation };
        }
      }
      return message;
    }));
  };

  const handleSettingsChange = (key: string, value: boolean) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDailyGoalChange = (target: number) => {
    setDailyGoal(prev => ({ ...prev, target }));
  };

  const currentScenarioName = scenarios.find(s => s.id === currentScenario)?.name || 'Identification';
  const currentLevelInfo = difficultyLevels[currentLevel];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <ProgressHeader 
        scenarioName={currentScenarioName}
        level={currentLevelInfo}
        streak={streak}
        dailyGoal={dailyGoal}
        onMenuClick={() => setShowScenarios(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            showDiacritics={appSettings.showDiacritics}
          />
        ))}
        
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-4">🇷🇴</div>
            <p>Welcome to Romanian Citizenship Coach!</p>
            <p className="text-sm mt-2">Practice speaking Romanian for everyday situations.</p>
          </div>
        )}
      </div>

      {/* Audio Controls */}
      {currentSentence && (
        <AudioControls
          onPlay={playAudio}
          onPlaySlow={playSlowAudio}
          onRecord={startRecording}
          onSimplify={simplifyCurrentSentence}
          onNext={generateNextSentence}
          isPlaying={isPlaying}
          isRecording={isRecording}
          canSimplify={currentLevel > 0}
        />
      )}

      {/* Scenario Selector Sheet */}
      <Sheet open={showScenarios} onOpenChange={setShowScenarios}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Practice Scenarios</SheetTitle>
          </SheetHeader>
          <ScenarioSelector
            scenarios={scenarios}
            currentScenario={currentScenario}
            onScenarioChange={(scenarioId) => {
              setCurrentScenario(scenarioId);
              setShowScenarios(false);
              setMessages([]); // Clear chat when switching scenarios
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <Settings
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            dailyGoalTarget={dailyGoal.target}
            onDailyGoalChange={handleDailyGoalChange}
            settings={appSettings}
            onSettingsChange={handleSettingsChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}