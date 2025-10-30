// src/PolishCoach.jsx
/* ===== Inline minimal UI + helpers (paste at the very top of src/App.jsx) ===== */
import React, { createContext, useContext, useMemo } from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Button({ variant="default", size="default", className="", asChild=false, ...p }) {
  const base="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border transition";
  const v={default:"bg-black text-white border-black",secondary:"bg-white text-black border-gray-300",outline:"bg-transparent text-black border-gray-300",destructive:"bg-red-600 text-white border-red-600",ghost:"bg-transparent border-transparent"}[variant]||"";
  const s={sm:"px-2 py-1 text-xs",default:"",icon:"p-2 w-9 h-9"}[size]||"";
  const Cmp=asChild?"span":"button";
  return <Cmp className={cx(base,v,s,className)} {...p}/>;
}
export function Input({ className="", ...p }) { return <input className={cx("h-9 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-black/20", className)} {...p}/>; }
export function Progress({ value=0, className="" }) { const pct=Math.max(0,Math.min(100,Number(value)||0)); return (<div className={cx("h-2 w-full rounded bg-gray-200", className)}><div className="h-2 rounded bg-black" style={{width:`${pct}%`}}/></div>); }
export function Card({ className="", ...p }) { return <div className={cx("rounded-lg border bg-white shadow-sm", className)} {...p}/>; }
export function CardHeader({ className="", ...p }) { return <div className={cx("p-4 border-b", className)} {...p}/>; }
export function CardTitle({ className="", ...p }) { return <h3 className={cx("font-semibold leading-none tracking-tight", className)} {...p}/>; }
export function CardContent({ className="", ...p }) { return <div className={cx("p-4", className)} {...p}/>; }
const TabsCtx=createContext(null);
export function Tabs({ value,onValueChange,children,className="" }){ const ctx=useMemo(()=>({value,onValueChange}),[value,onValueChange]); return <TabsCtx.Provider value={ctx}><div className={className}>{children}</div></TabsCtx.Provider>; }
export function TabsList({ className="", ...p }){ return <div className={cx("inline-flex gap-1 rounded-md border p-1", className)} {...p}/>; }
export function TabsTrigger({ value,children,className="" }){ const ctx=useContext(TabsCtx); const active=ctx?.value===value; return (<button onClick={()=>ctx?.onValueChange?.(value)} className={cx("px-3 py-1 text-sm rounded", active?"bg-black text-white":"bg-white", className)} aria-pressed={active}>{children}</button>); }
export function TabsContent({ value,children,className="" }){ const ctx=useContext(TabsCtx); if(ctx?.value!==value) return null; return <div className={className}>{children}</div>; }
export function Switch({ checked,onCheckedChange }){ return (<button role="switch" aria-checked={!!checked} onClick={()=>onCheckedChange?.(!checked)} className={cx("inline-flex h-6 w-10 items-center rounded-full border transition", checked?"bg-black border-black":"bg-white border-gray-300")}><span className={cx("block h-5 w-5 rounded-full bg-white transition-transform", checked?"translate-x-4":"translate-x-0.5")}/></button>); }
function getVoicesPl(){ const v=(typeof window!=="undefined" && window.speechSynthesis?.getVoices?.())||[]; const pl=v.filter(x=>x.lang?.toLowerCase?.().startsWith("pl")); return pl.length?pl:v; }
function speak(text, rate=1){ if(typeof window==="undefined"||!("speechSynthesis"in window))return; const u=new SpeechSynthesisUtterance(text); const voices=getVoicesPl(); if(voices.length)u.voice=voices[0]; u.lang="pl-PL"; u.rate=rate; try{window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
export function PronounceBtn({ text, title="Pronounce (Polish)" }){ return <Button variant="ghost" size="icon" onClick={()=>speak(text)} title={title} aria-label={title}>🔊</Button>; }
export function Chip({ children,onClick,active=false }){ return (<button type="button" onClick={onClick} className={cx("inline-block rounded-full border px-2 py-0.5 text-xs text-gray-600", active&&"bg-gray-100")} aria-pressed={active}>{children}</button>); }
/* ===== end inline UI ===== */
*/

  Check, Volume2, RotateCcw, Zap, BookOpen, Timer, ListChecks, Flag, Target,
  Upload, Download, Settings as SettingsIcon, FileJson, Mic, StopCircle, Wand2, Printer
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, Tooltip, YAxis
} from "recharts";
// --- minimal UI (inline to avoid missing files) ---
const cx = (...a) => a.filter(Boolean).join(" ");

export function Button({ variant="default", size="default", className="", asChild=false, ...p }) {
  const base = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border transition";
  const v = { default:"bg-black text-white border-black", secondary:"bg-white text-black border-gray-300",
              outline:"bg-transparent text-black border-gray-300", destructive:"bg-red-600 text-white border-red-600",
              ghost:"bg-transparent border-transparent" }[variant] || "";
  const s = { sm:"px-2 py-1 text-xs", default:"", icon:"p-2 w-9 h-9" }[size] || "";
  const Cmp = asChild ? "span" : "button";
  return <Cmp className={cx(base, v, s, className)} {...p} />;
}
export function Card({ className="", ...p }) { return <div className={cx("rounded-lg border bg-white shadow-sm", className)} {...p} />; }
export function CardHeader({ className="", ...p }) { return <div className={cx("p-4 border-b", className)} {...p} />; }
export function CardTitle({ className="", ...p }) { return <h3 className={cx("font-semibold leading-none tracking-tight", className)} {...p} />; }
export function CardContent({ className="", ...p }) { return <div className={cx("p-4", className)} {...p} />; }
export function Input({ className="", ...p }) { return <input className={cx("h-9 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-black/20", className)} {...p} />; }
export function Progress({ value=0, className="" }) { const pct=Math.max(0,Math.min(100,Number(value)||0)); return (<div className={cx("h-2 w-full rounded bg-gray-200", className)}><div className="h-2 rounded bg-black" style={{width:`${pct}%`}}/></div>); }
import React, { createContext, useContext, useMemo } from "react";
const TabsCtx=createContext(null);
export function Tabs({ value,onValueChange,children,className="" }){ const ctx=useMemo(()=>({value,onValueChange}),[value,onValueChange]); return <TabsCtx.Provider value={ctx}><div className={className}>{children}</div></TabsCtx.Provider>; }
export function TabsList({ className="", ...p }){ return <div className={cx("inline-flex gap-1 rounded-md border p-1", className)} {...p}/>; }
export function TabsTrigger({ value,children,className="" }){ const ctx=useContext(TabsCtx); const active=ctx?.value===value; return <button onClick={()=>ctx?.onValueChange?.(value)} className={cx("px-3 py-1 text-sm rounded", active?"bg-black text-white":"bg-white", className)} aria-pressed={active}>{children}</button>; }
export function TabsContent({ value,children,className="" }){ const ctx=useContext(TabsCtx); if(ctx?.value!==value) return null; return <div className={className}>{children}</div>; }
export function Switch({ checked,onCheckedChange }){ return (<button role="switch" aria-checked={!!checked} onClick={()=>onCheckedChange?.(!checked)} className={cx("inline-flex h-6 w-10 items-center rounded-full border transition", checked?"bg-black border-black":"bg-white border-gray-300")}><span className={cx("block h-5 w-5 rounded-full bg-white transition-transform", checked?"translate-x-4":"translate-x-0.5")}/></button>); }
// --- end minimal UI ---

/* ======================= Storage & Utils ======================= */
const LS_KEYS = {
  CARDS: "polishCoach.cards",
  GOAL: "polishCoach.goal",
  DONE_TODAY: "polishCoach.doneToday",
  EXAM: "polishCoach.examProfile",
  EXAM_CFG: "polishCoach.examCfg",
  EXAM_BANK: "polishCoach.examBank",
  B1_CFG: "polishCoach.b1cfg",
  B1_HISTORY: "polishCoach.b1History",
  CIVICS_HISTORY: "polishCoach.civicsHistory",
};
const hasWindow = typeof window !== "undefined";
const safeGet = (k) => (hasWindow ? window.localStorage.getItem(k) : null);
const safeSet = (k, v) => { try { if (hasWindow) window.localStorage.setItem(k, v); } catch {} };
const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);
const shuffle = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const sample = (arr, n) => (n >= arr.length ? shuffle(arr) : shuffle(arr).slice(0, n));
const nowTs = () => Date.now();

/* ======================= Speech ======================= */
function getVoicesPl(){ if(!hasWindow||!("speechSynthesis"in window))return[]; const v=window.speechSynthesis.getVoices?.()||[]; const pl=v.filter(x=>x.lang?.toLowerCase?.().startsWith("pl")); return pl.length?pl:v; }
function speak(text, rate=1){ if(!hasWindow||!("speechSynthesis"in window))return; const u=new SpeechSynthesisUtterance(text); const voices=getVoicesPl(); if(voices.length)u.voice=voices[0]; u.lang="pl-PL"; u.rate=rate; try{window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }

/* ======================= Core Deck & SRS ======================= */
const STARTER_DECK = [
  { id:"1", pl:"Cześć", en:"Hi / Hello", ipa:"t͡ʂɛɕt͡ɕ", cat:"greeting" },
  { id:"2", pl:"Dzień dobry", en:"Good day / Good morning", ipa:"d͡ʑɛɲ ˈdɔb.rɨ", cat:"greeting" },
  { id:"3", pl:"Dobry wieczór", en:"Good evening", ipa:"ˈdɔ.brɨ ˈvjɛ.t͡ʂur", cat:"greeting" },
  { id:"4", pl:"Do widzenia", en:"Goodbye", ipa:"dɔ vidˈzɛɲa", cat:"greeting" },
  { id:"5", pl:"Proszę", en:"Please / You're welcome", ipa:"ˈprɔ.ʂɛ", cat:"politeness" },
  { id:"6", pl:"Dziękuję", en:"Thank you", ipa:"d͡ʑɛŋˈkujɛ", cat:"politeness" },
  { id:"7", pl:"Przepraszam", en:"Sorry / Excuse me", ipa:"pʂɛˈpraʂam", cat:"politeness" },
  { id:"8", pl:"Tak", en:"Yes", ipa:"tak", cat:"core" },
  { id:"9", pl:"Nie", en:"No / Not", ipa:"ɲɛ", cat:"core" },
];

function loadDeck() {
  const raw = safeGet(LS_KEYS.CARDS);
  if (!raw) {
    const seed = STARTER_DECK.map((c) => ({ ...c, ease: 2.5, interval: 0, due: Date.now() }));
    safeSet(LS_KEYS.CARDS, JSON.stringify(seed)); return seed;
  }
  try { const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : []; }
  catch { const seed = STARTER_DECK.map((c)=>({...c,ease:2.5,interval:0,due:Date.now()})); safeSet(LS_KEYS.CARDS, JSON.stringify(seed)); return seed; }
}
function saveDeck(deck){ safeSet(LS_KEYS.CARDS, JSON.stringify(deck)); }
function updateSRS(card, rating){
  let {ease,interval}=card;
  if(rating===0){ease=Math.max(1.3,ease-0.2); interval=0;}
  else if(rating===1){ease=Math.max(1.3,ease-0.05); interval=Math.max(1,Math.round(interval*0.7));}
  else if(rating===3){ease=ease+0.05; interval=interval===0?1:Math.round(interval*ease);}
  const due=Date.now()+interval*24*60*60*1000;
  return {...card,ease,interval,due};
}
function pickDue(deck){ const now=Date.now(); const due=deck.filter(c=>c.due<=now); const by=(a,b)=>a.due-b.due; return (due.length?[...due]:[...deck]).sort(by)[0]; }

/* ======================= UI Small Atoms ======================= */
function Chip({children,onClick,active=false}) {
  return <button type="button" onClick={onClick} className={`inline-block rounded-full border px-2 py-0.5 text-xs ${active?"bg-secondary":""} text-muted-foreground`} aria-pressed={active}>{children}</button>;
}
function PronounceBtn({text}){
  return <Button variant="ghost" size="icon" onClick={()=>speak(text)} title="Pronounce (Polish)"><Volume2 className="h-4 w-4"/></Button>;
}

/* ======================= Flashcards / Practice ======================= */
function Flashcard({card,onGrade}){ const [rev,setRev]=useState(false); useEffect(()=>setRev(false),[card?.id]); if(!card)return null;
  return (<Card className="w-full max-w-xl">
    <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-2xl">{card.pl}</CardTitle><div className="flex items-center gap-1"><Chip>{card.cat}</Chip><PronounceBtn text={card.pl}/></div></CardHeader>
    <CardContent className="space-y-3"><div className="text-muted-foreground">/{card.ipa}/</div>
      <AnimatePresence mode="wait">{!rev?(
        <motion.div key="prompt" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}><Button className="w-full" onClick={()=>setRev(true)}>Show meaning</Button></motion.div>
      ):(
        <motion.div key="answer" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="text-center text-xl">{card.en}</motion.div>
      )}</AnimatePresence>
      <div className="flex gap-2 pt-2"><Button variant="destructive" onClick={()=>onGrade(0)}>Again</Button><Button variant="secondary" onClick={()=>onGrade(1)}>Hard</Button><Button className="ml-auto" onClick={()=>onGrade(3)}>Easy</Button></div>
    </CardContent></Card>);
}
function MCQuiz({deck,onComplete}){ const items=useMemo(()=>sample(deck,Math.min(10,deck.length)),[deck]); const [idx,setIdx]=useState(0); const [score,setScore]=useState(0);
  const q=items[idx]; const options=useMemo(()=>{ if(!q)return[]; const pool=deck.filter(c=>c.id!==q.id); const d=sample(pool,Math.min(3,pool.length)); return shuffle([...d,q]); },[q,deck]);
  function next(correct){ const s=score+(correct?1:0); setScore(s); if(idx+1>=items.length) onComplete?.(s,items.length); else setIdx(i=>i+1); }
  if(!items.length) return null;
  return (<Card className="max-w-xl w-full"><CardHeader><CardTitle className="flex items-center justify-between"><span>What does "{q.pl}" mean?</span><PronounceBtn text={q.pl}/></CardTitle></CardHeader>
    <CardContent className="space-y-3">{options.map(o=>(
      <Button key={o.id} variant="outline" className="w-full justify-start" onClick={()=>next(o.id===q.id)}>{o.en}</Button>
    ))}<div className="text-sm text-muted-foreground">{idx+1} / {items.length} — Score: {score}</div></CardContent></Card>);
}

/* ======================= Vocab / Grammar ======================= */
function VocabTable({deck,filter}){ const filtered=useMemo(()=>filter?deck.filter(c=>c.cat===filter):deck,[deck,filter]); const [q,setQ]=useState("");
  const shown=filtered.filter(c=>(c.pl+c.en).toLowerCase().includes(q.toLowerCase()));
  return (<div className="w-full max-w-2xl"><div className="flex gap-2 mb-2"><Input placeholder="Search słowo / word…" value={q} onChange={e=>setQ(e.target.value)} /></div>
    <div className="grid grid-cols-1 gap-2">{shown.map(c=>(
      <Card key={c.id}><CardContent className="flex items-center justify-between py-3"><div><div className="font-medium text-lg">{c.pl} <span className="text-sm text-muted-foreground">/{c.ipa}/</span></div><div className="text-muted-foreground">{c.en}</div></div><div className="flex items-center gap-2"><Chip>{c.cat}</Chip><PronounceBtn text={c.pl}/></div></CardContent></Card>
    ))}</div></div>);
}
function Grammar(){ return (
  <div className="max-w-3xl space-y-6">
    <Card><CardHeader><CardTitle>Polish Sounds Quick Guide</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">
      <ul className="list-disc pl-5 space-y-1"><li><b>ą</b> /ɔ̃/, <b>ę</b> /ɛ̃/ (often denasalised word-finally).</li><li><b>ł</b> ≈ “w”, <b>rz</b> ≈ French “j”, <b>sz</b> ≈ “sh”, <b>ch</b> /x/.</li></ul>
    </CardContent></Card>
  </div>
);}

/* ======================= B1 Trainer Data & Scoring ======================= */
const CONNECTORS = ["ponieważ","dlatego","chociaż","jednak","więc","bo","gdy","kiedy","następnie","poza tym","co więcej","po pierwsze","po drugie","na przykład","podsumowując","w rezultacie","zatem","aby","żeby"];
const READ_SETS = [
  { id:"r1", title:"Ogłoszenie o mieszkaniu", passage:"Szukam współlokatora do dwupokojowego mieszkania w centrum. Czynsz 2200 zł + media ok. 300 zł. Blisko przystanku tramwajowego. Dostępne od listopada. Proszę o kontakt mailowy.", qs:[{q:"Mieszkanie znajduje się:",opts:["Na obrzeżach","W centrum","Na wsi","Pod Warszawą"],a:1},{q:"Koszt miesięczny razem to około:",opts:["2200 zł","2500 zł","3000 zł","250 zł"],a:2},{q:"Kontakt preferowany:",opts:["Telefoniczny","Osobisty","Mailowy","Przez komunikator"],a:2}]},
  { id:"r2", title:"Mail od kolegi", passage:"Cześć! W ten weekend organizujemy mały piknik nad Wisłą. Każdy przynosi coś do jedzenia. Daj znać, czy możesz przyjść i czy masz ochotę zagrać w siatkówkę.", qs:[{q:"Spotkanie odbędzie się:",opts:["W górach","Nad rzeką","W kinie","W restauracji"],a:1},{q:"Uczestnicy mają:",opts:["Zapłacić za bilet","Przynieść jedzenie","Przyjść w garniturach","Przyjść z instrumentami"],a:1},{q:"Organizator proponuje:",opts:["Koszykówkę","Siatkówkę","Tenisa","Bieganie"],a:1}]},
  { id:"r3", title:"Informacja z urzędu", passage:"Urząd dzielnicy informuje, że w dniach 2–6 marca będzie prowadzony remont chodnika przy ulicy Słonecznej. Prosimy mieszkańców o parkowanie samochodów po drugiej stronie ulicy.", qs:[{q:"Remont dotyczy:",opts:["Jezdni","Chodnika","Mostu","Szkoły"],a:1},{q:"Kiedy zaplanowano prace?",opts:["Cały marzec","2–6 marca","6–12 marca","Weekend"],a:1},{q:"Mieszkańcy proszeni są o:",opts:["Zostawienie aut na miejscu","Parkowanie po drugiej stronie","Zgłoszenie do urzędu","Opłatę karną"],a:1}]},
  { id:"r4", title:"Recenzja kawiarni", passage:"Nowa kawiarnia przy rynku oferuje pyszne ciasta i kawę z lokalnej palarni. Obsługa jest uprzejma, ale w godzinach szczytu trzeba poczekać około 10 minut.", qs:[{q:"Kawa pochodzi z:",opts:["Dużego koncernu","Lokalnej palarni","Importu z Włoch","Nie wiadomo"],a:1},{q:"Problem w kawiarni to:",opts:["Brak ciast","Długa kolejka w szczycie","Brak obsługi","Wysokie ceny"],a:1},{q:"Czas oczekiwania:",opts:["1 min","5 min","10 min","20 min"],a:2}]},
  { id:"r5", title:"Ogłoszenie szkolne", passage:"W najbliższy piątek odbędzie się kiermasz książek w sali gimnastycznej. Dochód zostanie przeznaczony na zakup nowych komputerów do biblioteki.", qs:[{q:"Wydarzenie to:",opts:["Kiermasz książek","Turniej sportowy","Koncert","Wystawa"],a:0},{q:"Miejsce:",opts:["Biblioteka","Sala gimnastyczna","Korytarz","Aula"],a:1},{q:"Cel zbiórki:",opts:["Wakacje","Remont sali","Komputery do biblioteki","Wycieczka"],a:2}]},
  { id:"r6", title:"Instrukcja obsługi", passage:"Przed pierwszym użyciem blendera upewnij się, że wszystkie elementy są prawidłowo złożone. Nie włączaj urządzenia bez zamkniętej pokrywy. Myj części tylko po odłączeniu od prądu.", qs:[{q:"Czego NIE należy robić?",opts:["Składać elementów","Włączać bez pokrywy","Myć po odłączeniu","Sprawdzać złożenie"],a:1},{q:"Mycie części:",opts:["Przed odłączeniem","W trakcie pracy","Po odłączeniu","Nie myć"],a:2},{q:"Instrukcja dotyczy:",opts:["Czajnika","Blendera","Pralki","Piekarnika"],a:1}]},
  { id:"r7", title:"Ogłoszenie pracy", passage:"Firma logistyczna zatrudni magazyniera na pełen etat. Wymagane doświadczenie i prawo jazdy kat. B. Praca zmianowa, umowa o pracę.", qs:[{q:"Stanowisko:",opts:["Kierowca","Magazynier","Kurier","Sprzedawca"],a:1},{q:"Rodzaj umowy:",opts:["Zlecenie","O dzieło","Umowa o pracę","Brak umowy"],a:2},{q:"Wymagania:",opts:["Kat. C","Doświadczenie i kat. B","Brak wymagań","Znajomość francuskiego"],a:1}]},
  { id:"r8", title:"Komunikat MPK", passage:"Z powodu maratonu w niedzielę linie 12 i 24 pojadą objazdem. Przystanek 'Park' będzie nieczynny od 8:00 do 15:00.", qs:[{q:"Powód zmian:",opts:["Awaria","Maraton","Remont torów","Święto"],a:1},{q:"Które linie?",opts:["12 i 24","1 i 3","A i B","24 i 28"],a:0},{q:"Przystanek 'Park' będzie:",opts:["Czynny cały dzień","Nieczynny 8–15","Nieczynny 15–22","Przeniesiony"],a:1}]},
  { id:"r9", title:"Notatka służbowa", passage:"Proszę przygotować raport sprzedaży za ostatni kwartał do środy. Raport powinien zawierać wyniki według regionów i kanałów sprzedaży.", qs:[{q:"Termin oddania:",opts:["Wtorek","Środa","Czwartek","Piątek"],a:1},{q:"Raport ma zawierać:",opts:["Tylko podsumowanie","Szczegóły według regionów i kanałów","Analizę konkurencji","Prognozy roczne"],a:1},{q:"Okres dotyczy:",opts:["Miesiąca","Roku","Kwartału","Tygodnia"],a:2}]},
  { id:"r10", title:"Informacja zdrowotna", passage:"Zalecamy szczepienie przeciw grypie przed sezonem jesienno-zimowym. Osoby 65+ mogą skorzystać z refundacji.", qs:[{q:"Dotyczy:",opts:["Antybiotyków","Szczepienia przeciw grypie","Testów alergicznych","Rehabilitacji"],a:1},{q:"Refundacja dla:",opts:["Dzieci","Każdego","65+","Sportowców"],a:2},{q:"Termin zalecenia:",opts:["Wiosna","Lato","Jesień–zima","Cały rok"],a:2}]},
];
const LISTEN_SETS = [
  { id:"l1", title:"Umówienie wizyty", script:"Dzień dobry. Chciałabym umówić wizytę u lekarza rodzinnego w przyszłym tygodniu, najlepiej we wtorek rano. Czy jest dostępny termin? Mam bóle gardła od kilku dni.", qs:[{q:"Kto dzwoni?",opts:["Lekarz","Pacjentka","Recepcjonista","Kurier"],a:1},{q:"Preferowany termin:",opts:["Poniedziałek wieczór","Wtorek rano","Środa południe","Czwartek wieczór"],a:1},{q:"Główny objaw:",opts:["Kaszel","Ból brzucha","Ból gardła","Ból głowy"],a:2}]},
  { id:"l2", title:"Zgłoszenie awarii", script:"Dzień dobry, chciałbym zgłosić awarię prądu w klatce trzeciej przy ulicy Lipowej. Od wczoraj wieczorem nie działa oświetlenie na korytarzu.", qs:[{q:"Jaki problem?",opts:["Brak wody","Brak gazu","Brak oświetlenia","Hałas"],a:2},{q:"Gdzie?",opts:["Klatka pierwsza","Klatka trzecia","Poddasze","Piwnica"],a:1},{q:"Od kiedy?",opts:["Dzisiaj rano","Wczoraj wieczorem","Tydzień temu","Nie wiadomo"],a:1}]},
  { id:"l3", title:"Rezerwacja stolika", script:"Chciałbym zarezerwować stolik na cztery osoby na sobotę o 19. Czy jest możliwość miejsca w ogrodzie? Mamy rocznicę ślubu.", qs:[{q:"Na ile osób?",opts:["Dwie","Trzy","Cztery","Sześć"],a:2},{q:"Kiedy?",opts:["Piątek 18","Sobota 19","Niedziela 19","Sobota 21"],a:1},{q:"Okazja:",opts:["Urodziny","Rocznica ślubu","Spotkanie firmowe","Brak"],a:1}]},
  { id:"l4", title:"Informacja z siłowni", script:"Przypominamy o obowiązku wycierania sprzętu po ćwiczeniach. W przyszłym tygodniu sauna będzie nieczynna z powodu przeglądu technicznego.", qs:[{q:"Czego dotyczy przypomnienie?",opts:["Zakazu biegania","Wycierania sprzętu","Sprzątania szatni","Zakupu ręczników"],a:1},{q:"Sauna będzie:",opts:["Czynna cały czas","Nieczynna w przyszłym tygodniu","Nieczynna dziś","Zlikwidowana"],a:1},{q:"Powód:",opts:["Przegląd techniczny","Remont basenu","Brak personelu","Święto"],a:0}]},
  { id:"l5", title:"Kolej i opóźnienie", script:"Pociąg do Gdyni ma opóźnienie około 25 minut z powodu warunków pogodowych. Prosimy o pozostanie na peronie trzecim.", qs:[{q:"Dokąd pociąg?",opts:["Gdynia","Gdańsk","Poznań","Wrocław"],a:0},{q:"Opóźnienie:",opts:["5 min","15 min","25 min","45 min"],a:2},{q:"Gdzie czekać?",opts:["Peron 1","Peron 2","Peron 3","Hol"],a:2}]},
  { id:"l6", title:"Kurier", script:"Dzień dobry, dzwonię z firmy kurierskiej. Mam paczkę dla pana Kowalskiego. Czy mogę podjechać między 12 a 14? Potrzebny będzie podpis.", qs:[{q:"Kto dzwoni?",opts:["Klient","Kurier","Sąsiad","Urząd"],a:1},{q:"Przedział czasowy:",opts:["8–10","10–12","12–14","14–16"],a:2},{q:"Co będzie potrzebne?",opts:["Dowód osobisty","Podpis","Gotówka","Pieczątka"],a:1}]},
  { id:"l7", title:"Szkoła językowa", script:"Nowy kurs B1 startuje 5 października. Zajęcia odbywają się we wtorki i czwartki wieczorem, a pierwsze spotkanie jest bezpłatne.", qs:[{q:"Poziom kursu:",opts:["A2","B1","B2","C1"],a:1},{q:"Kiedy zajęcia?",opts:["Poniedziałki i środy","Wtorki i czwartki","Weekend","Codziennie"],a:1},{q:"Pierwsze spotkanie jest:",opts:["Płatne","Bezpłatne","Online","Odwołane"],a:1}]},
  { id:"l8", title:"Wynajem samochodu", script:"Wypożyczalnia informuje, że samochód zarezerwowany przez pana jest gotowy do odbioru jutro od 9:00. Prosimy zabrać prawo jazdy i kartę płatniczą.", qs:[{q:"Kiedy odbiór?",opts:["Dziś 9:00","Jutro 9:00","Jutro 19:00","W poniedziałek"],a:1},{q:"Co zabrać?",opts:["Dowód i gotówkę","Prawo jazdy i kartę","Paszport i wizę","Tylko telefon"],a:1},{q:"Kto informuje?",opts:["Urząd","Wypożyczalnia","Serwis","Hotel"],a:1}]},
  { id:"l9", title:"Koncert", script:"Z powodu choroby wokalistki koncert zostaje przełożony na przyszły miesiąc. Bilety zachowują ważność lub można je zwrócić do końca tygodnia.", qs:[{q:"Powód zmiany:",opts:["Awaria","Choroba wokalistki","Deszcz","Remont"],a:1},{q:"Co z biletami?",opts:["Nieaktualne","Ważne lub zwrot","Ważne tylko jutro","Wymiana obowiązkowa"],a:1},{q:"Nowy termin:",opts:["Dziś","Jutro","W przyszłym miesiącu","Nieznany"],a:2}]},
];

function useB1Cfg(){
  const [cfg,setCfg]=useState(()=>{const raw=safeGet(LS_KEYS.B1_CFG); if(!raw) return {readMin:15, listenMin:10, writeMin:20, speakMin:10};
    try{const x=JSON.parse(raw); return {readMin:x.readMin||15, listenMin:x.listenMin||10, writeMin:x.writeMin||20, speakMin:x.speakMin||10};}catch{return {readMin:15, listenMin:10, writeMin:20, speakMin:10};}
  });
  useEffect(()=>{safeSet(LS_KEYS.B1_CFG,JSON.stringify(cfg));},[cfg]);
  return [cfg,setCfg];
}

/* ==== Scoring helpers for B1 ==== */
function tokenize(text){ return (text||"").toLowerCase().replace(/[^\p{L}\p{Zs}']/gu," ").split(/\s+/).filter(Boolean); }
function countSentences(text){ const m=(text||"").match(/[.!?…]+/g); return m?m.length:((text||"").trim()?1:0); }
function countConnectors(text,list){ if(!text) return 0; const t=" "+text.toLowerCase()+" "; return list.reduce((n,w)=> n + (t.includes(" "+w+" ")?1:0),0); }
function punctuationBalance(text){ const p=(text||""); const commas=(p.match(/[,;]/g)||[]).length; const sentences=Math.max(countSentences(p),1); return Math.min(1, commas/(sentences*2)); }
function uniqueWordRatio(text){ const toks=tokenize(text); if(!toks.length) return 0; const set=new Set(toks); return set.size/toks.length; }
function spellingProxy(text){ const toks=tokenize(text).filter(w=>w.length>=3); if(!toks.length) return 0; const ok=toks.filter(w=>/^[\p{L}]+$/u.test(w)); return ok.length/toks.length; }
function clamp(x,a,b){ return Math.max(a,Math.min(b,x)); }

function gradeWriting(text, targetMin=80, targetMax=160){
  const words=tokenize(text).length;
  const lengthScore = words===0 ? 0 : words<targetMin ? clamp(words/targetMin,0,1)*60 : words>targetMax ? clamp(targetMax/words,0,1)*80 : 100;
  const sent=countSentences(text); const avgLen = words/Math.max(sent,1);
  const structureScore = clamp(avgLen/12,0.5,1)*100;
  const conn=countConnectors(text, CONNECTORS); const connScore = clamp(conn/4, 0, 1)*100;
  const punct=punctuationBalance(text); const punctScore = punct*100;
  const spell=spellingProxy(text); const spellScore = spell*100;
  const total = Math.round(0.25*lengthScore + 0.25*structureScore + 0.25*connScore + 0.15*spellScore + 0.10*punctScore);
  return { total, words, sent, avgLen:Math.round(avgLen*10)/10, conn, subscores:{length:lengthScore, structure:structureScore, connectors:connScore, spelling:spellScore, punctuation:punctScore} };
}

const FILLERS = ["eee","yyy","no","tak jakby","w sumie","generalnie","że tak powiem","yyy"];
function fillerRatio(text){ const t=tokenize(text); if(!t.length) return 0; const f=t.filter(w=>FILLERS.includes(w)).length; return f/t.length; }
function gradeSpeaking({durationSec, transcript}){
  const durScore = durationSec<=0?0: durationSec<60 ? (durationSec/60)*70 : durationSec>150 ? clamp(150/durationSec,0,1)*85 : 100;
  const hasTr = !!(transcript && transcript.trim().length>0);
  const uniq = hasTr ? uniqueWordRatio(transcript) : 0.4;
  const uniqScore = clamp((uniq-0.35)/0.35, 0, 1)*100;
  const fill = hasTr ? fillerRatio(transcript) : 0.1;
  const fluencyScore = clamp(1 - fill*2, 0, 1)*100;
  const struct = hasTr ? countSentences(transcript) : Math.max(1, Math.round(durationSec/45));
  const avgLen = hasTr ? tokenize(transcript).length/Math.max(struct,1) : 10;
  const structureScore = clamp(avgLen/12,0.5,1)*100;
  const total = Math.round(0.35*durScore + 0.25*fluencyScore + 0.20*uniqScore + 0.20*structureScore);
  return { total, durationSec, uniq:Math.round(uniq*100)/100, fill:Math.round(fill*100)/100, struct, avgLen:Math.round(avgLen*10)/10,
           subscores:{duration:durScore, fluency:fluencyScore, lexical:uniqScore, structure:structureScore} };
}

/* ======================= Citizenship (bank + trainer) ======================= */
function useExamProfile(){ const [profile,setProfile]=useState(()=>{const raw=safeGet(LS_KEYS.EXAM); if(!raw)return{seen:{},correct:{}}; try{return JSON.parse(raw);}catch{return{seen:{},correct:{}};}});
  useEffect(()=>{safeSet(LS_KEYS.EXAM,JSON.stringify(profile));},[profile]); return [profile,setProfile];
}
function useExamCfg(){ const [cfg,setCfg]=useState(()=>{const raw=safeGet(LS_KEYS.EXAM_CFG); if(!raw)return{size:20,timeMin:25}; try{const x=JSON.parse(raw); return {size:Math.max(5,x.size||20), timeMin:Math.max(5,x.timeMin||25)};}catch{return{size:20,timeMin:25}}});
  useEffect(()=>{safeSet(LS_KEYS.EXAM_CFG,JSON.stringify(cfg));},[cfg]); return [cfg,setCfg];
}
function useExamBank(){
  const [bank,setBank]=useState(()=>{const raw=safeGet(LS_KEYS.EXAM_BANK); if(!raw) return []; try{const arr=JSON.parse(raw); return Array.isArray(arr)?arr:[];}catch{return[];}});
  useEffect(()=>{safeSet(LS_KEYS.EXAM_BANK,JSON.stringify(bank));},[bank]); return [bank,setBank];
}
function validateBank(json){
  if(!Array.isArray(json)) throw new Error("Bank must be an array.");
  json.forEach((q,idx)=>{
    if(typeof q.id!=="string") throw new Error(`id missing at #${idx}`);
    if(!["constitution","history","geography","culture"].includes(q.cat)) throw new Error(`cat invalid at #${idx}`);
    if(typeof q.q!=="string") throw new Error(`q missing at #${idx}`);
    if(!Array.isArray(q.choices)||q.choices.length!==4||q.choices.some(c=>typeof c!=="string")) throw new Error(`choices invalid at #${idx}`);
    if(typeof q.answer!=="number"||q.answer<0||q.answer>3) throw new Error(`answer invalid at #${idx}`);
    if(typeof q.expl!=="string") throw new Error(`expl missing at #${idx}`);
  });
  return true;
}

/* ======================= History (B1 & Civics) ======================= */
function useHistory(key){
  const [hist,setHist]=useState(()=>{const raw=safeGet(key); if(!raw) return []; try{const arr=JSON.parse(raw); return Array.isArray(arr)?arr:[];}catch{return[];}});
  useEffect(()=>{safeSet(key,JSON.stringify(hist));},[key,hist]);
  return [hist,setHist];
}
function fmtDate(ts){ const d=new Date(ts); return d.toLocaleDateString()+" "+d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}); }
function toCSV(rows){
  if(!rows.length) return "ts,label,score,meta\n";
  const keys = ["ts","label","score","meta"];
  const escape = (s)=> `"${String(s??"").replace(/"/g,'""')}"`;
  const lines = [keys.join(",")].concat(rows.map(r=>keys.map(k=>escape(k==="meta"?JSON.stringify(r[k]??{}):r[k])).join(",")));
  return lines.join("\n");
}
function downloadFile(name, content, type="text/plain"){
  const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url);
}
function mergeHistory(existing, incoming){
  const keyBy = (r)=> `${r.ts}-${r.label}-${r.score}`;
  const map = new Map(existing.map(r=>[keyBy(r),r]));
  incoming.forEach(r=>{ if(!map.has(keyBy(r))) map.set(keyBy(r), r); });
  return Array.from(map.values()).sort((a,b)=>a.ts-b.ts);
}

/* ======================= Reusable pieces ======================= */
function ExamBanner({ timeLeftSec, answered, total, onSubmit, onReset, disabled }) {
  const mins=Math.floor(timeLeftSec/60), secs=timeLeftSec%60, pct=Math.round((answered/total)*100);
  return (<Card className="mb-4"><CardContent className="py-3 flex items-center gap-3">
    <Timer className="h-5 w-5"/><div className="text-sm w-24">{mins}:{secs.toString().padStart(2,"0")}</div>
    <div className="flex-1"><div className="flex justify-between text-xs mb-1"><span>Progress</span><span>{answered}/{total}</span></div><Progress value={pct}/></div>
    <Button variant="secondary" onClick={onReset}><RotateCcw className="h-4 w-4 mr-1"/>Reset</Button>
    <Button onClick={onSubmit} disabled={disabled}><Check className="h-4 w-4 mr-1"/>Submit</Button>
  </CardContent></Card>);
}
function ExamQuestion({ q, index, total, selected, setSelected, revealed }) {
  const letters=["A","B","C","D"];
  return (<Card className="w-full">
    <CardHeader><CardTitle className="text-base flex items-center justify-between"><span>Q{index+1}/{total} — <Chip>{q.cat}</Chip></span></CardTitle></CardHeader>
    <CardContent className="space-y-2">
      <div className="text-lg">{q.q}</div>
      <div className="grid gap-2">
        {q.choices.map((c,i)=> {
          const isCorrect=i===q.answer, isChosen=selected===i;
          const variant = revealed ? (isCorrect?"default":isChosen?"destructive":"outline") : (isChosen?"secondary":"outline");
          return <Button key={i} variant={variant} className="justify-start" onClick={()=>!revealed&&setSelected(i)}><span className="w-6">{letters[i]}.</span> {c}</Button>;
        })}
      </div>
      {revealed && <div className="text-sm text-muted-foreground pt-2"><b>Explanation:</b> {q.expl}</div>}
    </CardContent>
  </Card>);
}
function ExamResults({ items, picks, onRetryIncorrect }) {
  const total=items.length; const correct=items.reduce((a,q,i)=>a+(picks[i]===q.answer?1:0),0);
  const byCat=items.reduce((acc,q,i)=>{const ok=picks[i]===q.answer; acc[q.cat]=acc[q.cat]||{total:0,ok:0}; acc[q.cat].total+=1; acc[q.cat].ok+=ok?1:0; return acc;},{});
  const incorrect=items.map((q,i)=>({q,i})).filter(({q,i})=>picks[i]!==q.answer);
  return (<div className="space-y-4">
    <Card><CardHeader><CardTitle>Score</CardTitle></CardHeader><CardContent className="flex items-center gap-4"><div className="text-3xl font-bold">{correct}/{total}</div><Progress value={Math.round((correct/total)*100)} className="flex-1"/></CardContent></Card>
    <Card><CardHeader><CardTitle>By Subject</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-3">
      {Object.entries(byCat).map(([cat,v])=>(
        <div key={cat} className="border rounded p-3"><div className="text-sm mb-1"><Chip>{cat}</Chip></div><div className="text-sm">{v.ok}/{v.total}</div><Progress value={Math.round((v.ok/v.total)*100)}/></div>
      ))}
    </CardContent></Card>
    {incorrect.length>0 && (<div className="space-y-2">
      <div className="text-sm text-muted-foreground">Review incorrect questions:</div>
      <div className="grid gap-2">{incorrect.map(({q,i})=>(
        <Card key={q.id}><CardContent className="py-3">
          <div className="text-sm mb-1"><b>Q{i+1}.</b> {q.q}</div>
          <div className="text-xs mb-1">Your answer: <i>{typeof picks[i]==="number"?q.choices[picks[i]]:"—"}</i></div>
          <div className="text-xs">Correct: <b>{q.choices[q.answer]}</b></div>
          <div className="text-xs text-muted-foreground mt-1">{q.expl}</div>
        </CardContent></Card>
      ))}</div>
      <Button onClick={()=>onRetryIncorrect(incorrect.map(({q})=>q))}><ListChecks className="h-4 w-4 mr-1"/>Retry incorrect only</Button>
    </div>)}
  </div>);
}

/* ======================= B1 Trainer blocks (with history saves) ======================= */
function ScoreBar({label,val}){ return (<div><div className="flex justify-between text-xs mb-1"><span>{label}</span><span>{Math.round(val)}%</span></div><Progress value={val}/></div>); }

function MCBlock({ items, onFinish, onScore }) {
  const [i,setI]=useState(0); const [sel,setSel]=useState(null); const [show,setShow]=useState(false); const [score,setScore]=useState(0); const q=items[i];
  if(!q) return null;
  const next=(correct)=>{ const s=score+(correct?1:0); setScore(s);
    if(i+1>=items.length){ onScore?.(s,items.length); onFinish?.(); }
    else { setI(i+1); setSel(null); setShow(false); }
  };
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader><CardTitle className="text-base">Pytanie {i+1}/{items.length} — {score} pkt</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <div className="text-lg">{q.q}</div>
        {q.opts.map((opt,idx)=> {
          const correct = idx===q.a, chosen = sel===idx;
          const variant = show ? (correct?"default":chosen?"destructive":"outline") : (chosen?"secondary":"outline");
          return <Button key={idx} variant={variant} className="w-full justify-start" onClick={()=>!show && setSel(idx)}>{opt}</Button>;
        })}
        <div className="flex gap-2 pt-2">
          <Button onClick={()=>setShow(true)} disabled={show||sel==null}>Reveal</Button>
          <Button onClick={()=>next(sel===q.a)} disabled={!show}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ExamBannerLite({ minutes, setMinutes, secondsLeft, setSecondsLeft, running, setRunning }) {
  useEffect(()=>{ if(!running) return; if(secondsLeft<=0) { setRunning(false); return; } const id=setTimeout(()=>setSecondsLeft((s)=>s-1),1000); return ()=>clearTimeout(id); },[running,secondsLeft]);
  const mins=Math.floor(secondsLeft/60), secs=secondsLeft%60;
  return (
    <Card className="mb-3">
      <CardContent className="py-3 flex items-center gap-3">
        <Timer className="h-5 w-5" />
        <div className="text-sm w-24">{mins}:{secs.toString().padStart(2,"0")}</div>
        <div className="flex items-center gap-2 ml-auto">
          <Input type="number" className="w-20" min={1} value={minutes} onChange={(e)=>setMinutes(Math.max(1,Number(e.target.value)||minutes))}/>
          <Button onClick={()=>{ setSecondsLeft(minutes*60); setRunning(true); }}>Start</Button>
          <Button variant="secondary" onClick={()=>setRunning(false)}>Pause</Button>
          <Button variant="outline" onClick={()=>{ setRunning(false); setSecondsLeft(minutes*60); }}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function B1Reading({ onSaveAttempt }) {
  const [setIdx,setSetIdx]=useState(0);
  const set=READ_SETS[setIdx];
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">{READ_SETS.map((s,idx)=><Chip key={s.id} active={setIdx===idx} onClick={()=>setSetIdx(idx)}>{s.title}</Chip>)}</div>
      <Card className="max-w-3xl"><CardHeader><CardTitle>{set.title}</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">{set.passage}</p></CardContent></Card>
      <MCBlock items={set.qs} onScore={(got,total)=>onSaveAttempt?.({label:`B1 Reading – ${set.title}`, score:Math.round((got/total)*100), meta:{set:set.id, got, total}})} />
    </div>
  );
}

function B1Listening({ onSaveAttempt }) {
  const [setIdx,setSetIdx]=useState(0);
  const set=LISTEN_SETS[setIdx];
  const [playing,setPlaying]=useState(false);
  const play = () => { if(playing) return; setPlaying(true); speak(set.script, 0.95); setTimeout(()=>setPlaying(false), Math.max(3000, set.script.length*45)); };
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">{LISTEN_SETS.map((s,idx)=><Chip key={s.id} active={setIdx===idx} onClick={()=>setSetIdx(idx)}>{s.title}</Chip>)}</div>
      <Card className="max-w-3xl"><CardHeader><CardTitle>{set.title}</CardTitle></CardHeader><CardContent className="space-y-2"><div className="text-sm text-muted-foreground">Press to play once. Questions below.</div><Button onClick={play} disabled={playing}><Volume2 className="h-4 w-4 mr-1" />Play (TTS)</Button></CardContent></Card>
      <MCBlock items={set.qs} onScore={(got,total)=>onSaveAttempt?.({label:`B1 Listening – ${set.title}`, score:Math.round((got/total)*100), meta:{set:set.id, got, total}})} />
    </div>
  );
}

function B1Writing({ onSaveAttempt }) {
  const PROMPTS = [
    { id:"w1", title:"E-mail: prośba o informację", task:"Napisz e-mail do szkoły językowej z prośbą o informacje o kursie B1 (terminy, cena, liczba godzin). (80–120 słów)", min:80, max:120 },
    { id:"w2", title:"Notatka / ogłoszenie", task:"Napisz krótką notatkę dla współlokatorów o planowanym remoncie kuchni. Podaj termin, zakres prac i prośbę o współpracę. (60–100 słów)", min:60, max:100 },
    { id:"w3", title:"Opowiadanie z życia", task:"Opisz nieudany wyjazd weekendowy: co planowałeś(-aś), co poszło nie tak, czego się nauczyłeś(-aś). (120–160 słów)", min:120, max:160 },
  ];
  const [idx,setIdx]=useState(0);
  const [text,setText]=useState("");
  const p=PROMPTS[idx];
  const words=tokenize(text).length;
  const result=gradeWriting(text, p.min, p.max);
  const tips = [
    words<p.min ? "Dodaj 1–2 zdania, rozwiń szczegóły." : null,
    result.subscores.connectors<70 ? "Dodaj 3–4 spójniki (ponieważ, dlatego, następnie…)." : null,
    result.subscores.structure<75 ? "Uśrednij długość zdań (~12 słów)." : null,
    result.subscores.spelling<85 ? "Sprawdź literówki." : null,
    result.subscores.punctuation<70 ? "Doprecyzuj przecinki/kropki." : null,
  ].filter(Boolean);

  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex gap-2 flex-wrap">{PROMPTS.map((pp,i)=><Chip key={pp.id} active={idx===i} onClick={()=>{setIdx(i); setText("");}}>{pp.title}</Chip>)}</div>
      <Card><CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">{p.task}</div>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={12} className="w-full border rounded p-2" placeholder="Pisz tutaj..."/>
          <div className="text-xs text-muted-foreground">Words: {words} • Sentences: {result.sent} • Avg len: {result.avgLen}</div>
          <Card className="border"><CardContent className="py-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium"><Wand2 className="h-4 w-4"/>Auto-score: <span className="text-base ml-1">{result.total}/100</span></div>
            <ScoreBar label="Length target" val={result.subscores.length}/>
            <ScoreBar label="Sentence structure" val={result.subscores.structure}/>
            <ScoreBar label="Connectors" val={result.subscores.connectors}/>
            <ScoreBar label="Spelling proxy" val={result.subscores.spelling}/>
            <ScoreBar label="Punctuation" val={result.subscores.punctuation}/>
            {tips.length>0 && <div className="text-xs text-muted-foreground pt-1">Tips: {tips.join(" · ")}</div>}
            <Button onClick={()=> onSaveAttempt?.({label:`B1 Writing – ${p.title}`, score:result.total, meta:{prompt:p.id, words:result.words}})}>Save attempt</Button>
          </CardContent></Card>
        </CardContent>
      </Card>
    </div>
  );
}

function B1Speaking({ onSaveAttempt }) {
  const CARDS = [
    { id:"s1", title:"Zakupy", prompt:"Opowiedz o tym, jak zazwyczaj robisz zakupy spożywcze. Gdzie? Jak często? Na co zwracasz uwagę?" },
    { id:"s2", title:"Praca i nauka", prompt:"Opisz swój typowy dzień pracy lub nauki. Co jest najtrudniejsze, a co daje satysfakcję?" },
    { id:"s3", title:"Podróże", prompt:"Opowiedz o ostatniej podróży. Dokąd pojechałeś(-aś), z kim, co zobaczyłeś(-aś)?" },
    { id:"s4", title:"Zdrowie", prompt:"Jak dbasz o zdrowie? Opisz dietę, sport i odpoczynek w tygodniu." },
  ];
  const [idx,setIdx]=useState(0);
  const card=CARDS[idx];
  const [rec,setRec]=useState(null);
  const [url,setUrl]=useState(""); const [startedAt,setStartedAt]=useState(0); const [duration,setDuration]=useState(0);
  const [transcript,setTranscript]=useState(""); const [recog,setRecog]=useState(null);

  async function startRec(){
    if(rec) return;
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
      const m = new MediaRecorder(stream);
      const chunks=[];
      m.ondataavailable = e => { if(e.data.size>0) chunks.push(e.data); };
      m.onstop = () => {
        const blob = new Blob(chunks,{type:"audio/webm"});
        const u = URL.createObjectURL(blob);
        setUrl(u);
        stream.getTracks().forEach(t=>t.stop());
        setDuration(Math.round((Date.now()-startedAt)/1000));
      };
      m.start(); setStartedAt(Date.now()); setRec(m);
    }catch{ alert("Microphone not available."); }
  }
  function stopRec(){ if(rec){ rec.stop(); setRec(null); } }
  function startTranscribe(){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ alert("SpeechRecognition not supported in this browser."); return; }
    const r = new SR(); r.lang="pl-PL"; r.interimResults=true; r.continuous=true;
    let text=""; r.onresult = (e)=>{ for(let i=e.resultIndex; i<e.results.length; i++){ text += e.results[i][0].transcript + " "; } setTranscript(text.trim()); };
    r.onend = ()=> setRecog(null); setRecog(r); r.start();
  }
  function stopTranscribe(){ try{ recog?.stop(); }catch{} }

  const scoring = gradeSpeaking({ durationSec: duration, transcript });

  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex gap-2 flex-wrap">{CARDS.map((p,i)=><Chip key={p.id} active={idx===i} onClick={()=>{setIdx(i); setUrl(""); setTranscript(""); setDuration(0);}}>{p.title}</Chip>)}</div>
      <Card><CardHeader><CardTitle>{card.title}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">{card.prompt}</div>
          <div className="flex gap-2 flex-wrap">
            {!rec ? <Button onClick={startRec}><Mic className="h-4 w-4 mr-1"/>Record</Button> : <Button variant="destructive" onClick={stopRec}><StopCircle className="h-4 w-4 mr-1"/>Stop</Button>}
            {url && <a href={url} download={`b1-speaking-${card.id}.webm`}><Button variant="secondary"><Download className="h-4 w-4 mr-1"/>Download</Button></a>}
            {!recog ? <Button variant="outline" onClick={startTranscribe}><Wand2 className="h-4 w-4 mr-1"/>Transcribe (beta)</Button> : <Button variant="outline" onClick={stopTranscribe}>Stop transcript</Button>}
          </div>
          {url && <audio controls src={url} className="w-full" />}
          <textarea value={transcript} onChange={(e)=>setTranscript(e.target.value)} rows={6} className="w-full border rounded p-2" placeholder="Transkrypcja (opcjonalnie)"/>
          <Card className="border"><CardContent className="py-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium"><Wand2 className="h-4 w-4"/>Auto-score: <span className="text-base ml-1">{scoring.total}/100</span></div>
            <ScoreBar label={`Duration (~90s)`} val={scoring.subscores.duration}/>
            <ScoreBar label="Fluency (fewer fillers)" val={scoring.subscores.fluency}/>
            <ScoreBar label="Lexical variety" val={scoring.subscores.lexical}/>
            <ScoreBar label="Structure" val={scoring.subscores.structure}/>
            <div className="text-xs text-muted-foreground">Dur: {scoring.durationSec}s • Fillers≈ {Math.round(scoring.fill*100)}% • Unique≈ {Math.round(scoring.uniq*100)}%</div>
            <Button onClick={()=> onSaveAttempt?.({label:`B1 Speaking – ${card.title}`, score:scoring.total, meta:{card:card.id, dur:scoring.durationSec}})}>Save attempt</Button>
          </CardContent></Card>
        </CardContent>
      </Card>
    </div>
  );
}

function B1Settings() {
  const [cfg,setCfg]=useB1Cfg();
  // print helper (Reading set / Writing prompt)
  function printB1Sheet(){
    const html = `
    <html><head><title>B1 Exam Sheet</title>
      <style>body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:24px;line-height:1.35} h1{margin:0 0 8px} h2{margin:16px 0 8px} .box{border:1px solid #ccc;padding:12px;margin:10px 0} ol{margin:6px 0 6px 18px}</style>
    </head><body>
      <h1>B1 Practice Sheet</h1>
      <p>Reading & Writing prompts for offline practice.</p>
      <div class="box"><h2>Reading</h2>
        ${READ_SETS.slice(0,2).map(s=>`<h3>${s.title}</h3><p>${s.passage}</p><ol>${s.qs.map(q=>`<li>${q.q}</li>`).join("")}</ol>`).join("")}
      </div>
      <div class="box"><h2>Writing</h2>
        <ol>
          <li>E-mail: prośba o informację (80–120 słów)</li>
          <li>Notatka / ogłoszenie (60–100 słów)</li>
          <li>Opowiadanie z życia (120–160 słów)</li>
        </ol>
        <p>Miejsce na odpowiedź:</p>
        <div style="height:480px;border:1px dashed #aaa"></div>
      </div>
      <script>window.print()</script>
    </body></html>`;
    const w = window.open("", "_blank"); w.document.open(); w.document.write(html); w.document.close();
  }
  return (
    <Card className="max-w-xl">
      <CardHeader><CardTitle><SettingsIcon className="h-5 w-5 inline mr-2" />B1 Settings</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between"><span>Reading time (min)</span><Input type="number" className="w-28" min={5} value={cfg.readMin} onChange={(e)=>setCfg({...cfg,readMin:Math.max(5,Number(e.target.value)||cfg.readMin)})}/></div>
        <div className="flex items-center justify-between"><span>Listening time (min)</span><Input type="number" className="w-28" min={5} value={cfg.listenMin} onChange={(e)=>setCfg({...cfg,listenMin:Math.max(5,Number(e.target.value)||cfg.listenMin)})}/></div>
        <div className="flex items-center justify-between"><span>Writing time (min)</span><Input type="number" className="w-28" min={10} value={cfg.writeMin} onChange={(e)=>setCfg({...cfg,writeMin:Math.max(10,Number(e.target.value)||cfg.writeMin)})}/></div>
        <div className="flex items-center justify-between"><span>Speaking prep (min)</span><Input type="number" className="w-28" min={1} value={cfg.speakMin} onChange={(e)=>setCfg({...cfg,speakMin:Math.max(1,Number(e.target.value)||cfg.speakMin)})}/></div>
        <Button onClick={printB1Sheet}><Printer className="h-4 w-4 mr-1"/>Print B1 sheet</Button>
      </CardContent>
    </Card>
  );
}

function B1Trainer({ onSaveAttempt }) {
  const [tab,setTab]=useState("reading");
  const [cfg] = useB1Cfg();
  const [rm,setRm]=useState(cfg.readMin), [rs,setRs]=useState(rm*60), [rr,setRr]=useState(false);
  const [lm,setLm]=useState(cfg.listenMin), [ls,setLs]=useState(lm*60), [lr,setLr]=useState(false);
  const [wm,setWm]=useState(cfg.writeMin), [ws,setWs]=useState(wm*60), [wr,setWr]=useState(false);

  return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="listening">Listening</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="speaking">Speaking</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reading" className="pt-4">
          <ExamBannerLite minutes={rm} setMinutes={setRm} secondsLeft={rs} setSecondsLeft={setRs} running={rr} setRunning={setRr} />
          <B1Reading onSaveAttempt={(r)=>onSaveAttempt?.(r)} />
        </TabsContent>

        <TabsContent value="listening" className="pt-4">
          <ExamBannerLite minutes={lm} setMinutes={setLm} secondsLeft={ls} setSecondsLeft={setLs} running={lr} setRunning={setLr} />
          <B1Listening onSaveAttempt={(r)=>onSaveAttempt?.(r)} />
        </TabsContent>

        <TabsContent value="writing" className="pt-4">
          <ExamBannerLite minutes={wm} setMinutes={setWm} secondsLeft={ws} setSecondsLeft={setWs} running={wr} setRunning={setWr} />
          <B1Writing onSaveAttempt={(r)=>onSaveAttempt?.(r)} />
        </TabsContent>

        <TabsContent value="speaking" className="pt-4">
          <B1Speaking onSaveAttempt={(r)=>onSaveAttempt?.(r)} />
        </TabsContent>

        <TabsContent value="settings" className="pt-4">
          <B1Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ======================= Citizenship Module (history + printables) ======================= */
function ExamDrill({ bank, cat, onDone }) {
  const items=useMemo(()=>{ const subset=cat?bank.filter(q=>q.cat===cat):bank; return sample(subset,subset.length); },[bank,cat]);
  const [i,setI]=useState(0), [pick,setPick]=useState(null), [show,setShow]=useState(false);
  const q=items[i]; if(!q) return <div className="text-sm text-muted-foreground">No questions.</div>;
  const next=()=>{ if(i+1>=items.length) onDone?.(); else { setI(i+1); setPick(null); setShow(false);} };
  return (<div className="space-y-3">
    <ExamQuestion q={q} index={i} total={items.length} selected={pick} setSelected={setPick} revealed={show}/>
    <div className="flex gap-2"><Button onClick={()=>setShow(true)} disabled={show||pick==null}>Reveal</Button><Button onClick={next} disabled={!show}>Next</Button></div>
  </div>);
}

function CitizenshipModule({ onSaveAttempt }) {
  const SUBJECTS=["constitution","history","geography","culture"];
  const [profile,setProfile]=useExamProfile();
  const [cfg,setCfg]=useExamCfg();
  const [bank,setBank]=useExamBank();
  const [mode,setMode]=useState("mock");
  const [cat,setCat]=useState("");
  const [seed,setSeed]=useState(()=>Math.random());
  const [submitted,setSubmitted]=useState(false);

  const testItems=useMemo(()=>{ const src=cat?bank.filter(q=>q.cat===cat):bank; return sample(src,Math.min(cfg.size,src.length)); },[bank,cat,seed,cfg]);
  const [picks,setPicks]=useState(()=>Array(testItems.length).fill(null));
  const [timeLeft,setTimeLeft]=useState(cfg.timeMin*60);

  useEffect(()=>{ if(mode!=="mock"||submitted) return; if(timeLeft<=0){ setSubmitted(true); return; } const id=setTimeout(()=>setTimeLeft(t=>t-1),1000); return()=>clearTimeout(id); },[timeLeft,mode,submitted]);
  useEffect(()=>{ setPicks(Array(testItems.length).fill(null)); setSubmitted(false); setTimeLeft(cfg.timeMin*60); },[seed,cat,cfg.size,cfg.timeMin,bank.length]);

  const answered=picks.filter(x=>x!==null).length;
  function submit(){
    setSubmitted(true);
    const seen={...(profile.seen||{})}, correct={...(profile.correct||{})};
    testItems.forEach((q,idx)=>{ seen[q.cat]=(seen[q.cat]||0)+1; if(picks[idx]===q.answer) correct[q.cat]=(correct[q.cat]||0)+1; });
    setProfile({seen,correct});

    // Save attempt to history
    const got = testItems.reduce((n,q,i)=> n + (picks[i]===q.answer?1:0), 0);
    const total = testItems.length;
    onSaveAttempt?.({label:"Civics Mock", score:Math.round((got/total)*100), meta:{got,total,cat:cat||"all", size:cfg.size, timeMin:cfg.timeMin}});
  }
  function resetTest(){ setSeed(Math.random()); }

  // Import/export & printable
  const fileRef=useRef(null);
  function exportBank(){ downloadFile("polish-citizenship-bank.json", JSON.stringify(bank,null,2), "application/json"); }
  async function importFromFile(file){ try{ const text=await file.text(); const json=JSON.parse(text); validateBank(json); setBank(json); alert(`Imported ${json.length} questions.`);}catch(e){ alert(`Import failed: ${e.message||e}`);} }
  function resetToEmpty(){ setBank([]); }
  function printMockSheet(){
    if(!bank.length){ alert("Import a question bank first."); return; }
    const items = sample(bank, Math.min(cfg.size, bank.length));
    const html = `
      <html><head><title>Citizenship Mock Sheet</title>
      <style>body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:24px;line-height:1.35} h1{margin:0 0 8px} .q{margin:10px 0} .cat{font-size:12px;color:#555}</style>
      </head><body>
      <h1>Citizenship Mock Test</h1>
      <p>Questions: ${items.length} • Time suggestion: ${cfg.timeMin} min</p>
      ${items.map((q,i)=>`
        <div class="q"><div><b>${i+1}.</b> ${q.q} <span class="cat">[${q.cat}]</span></div>
        <ol type="A"><li>${q.choices[0]}</li><li>${q.choices[1]}</li><li>${q.choices[2]}</li><li>${q.choices[3]}</li></ol></div>
      `).join("")}
      <script>window.print()</script>
      </body></html>`;
    const w=window.open("","_blank"); w.document.open(); w.document.write(html); w.document.close();
  }

  const DrillView=(<div className="space-y-3"><div className="flex gap-2 flex-wrap"><Chip active={!cat} onClick={()=>setCat("")}>all</Chip>{SUBJECTS.map(s=><Chip key={s} active={cat===s} onClick={()=>setCat(s)}>{s}</Chip>)}</div><ExamDrill bank={bank} cat={cat} onDone={()=>{}} /></div>);
  const MockView=(<div className="space-y-3">
    <div className="flex gap-2 flex-wrap"><Chip active={!cat} onClick={()=>setCat("")}>all</Chip>{SUBJECTS.map(s=><Chip key={s} active={cat===s} onClick={()=>setCat(s)}>{s}</Chip>)}</div>
    <ExamBanner timeLeftSec={timeLeft} answered={answered} total={testItems.length} onSubmit={submit} onReset={resetTest} disabled={submitted||answered===0}/>
    {testItems.map((q,i)=>(
      <ExamQuestion key={q.id} q={q} index={i} total={testItems.length} selected={picks[i]} setSelected={(v)=>setPicks(arr=>{const n=[...arr]; n[i]=v; return n;})} revealed={submitted}/>
    ))}
    {submitted && <ExamResults items={testItems} picks={picks} onRetryIncorrect={()=>{ setSeed(Math.random()); setSubmitted(false); setTimeLeft(cfg.timeMin*60); setMode("drill"); }}/>}
  </div>);
  const GuideView=(<div className="grid gap-4 max-w-3xl">
    <Card><CardHeader><CardTitle><Flag className="h-5 w-5 inline mr-2"/>Constitution</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Unitary parliamentary republic; Sejm/Senat; President (5y) + PM-led Council of Ministers.</CardContent></Card>
    <Card><CardHeader><CardTitle><BookOpen className="h-5 w-5 inline mr-2"/>History</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">966; 1569; 1791; 1918; 1980–89; 2004 (EU).</CardContent></Card>
  </div>);
  const SettingsView=(<div className="grid gap-4 max-w-xl">
    <Card><CardHeader><CardTitle><SettingsIcon className="h-5 w-5 inline mr-2"/>Mock Test Settings</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between"><span>Questions per test</span><Input type="number" className="w-28" min={5} max={200} value={cfg.size} onChange={(e)=>setCfg(x=>({...x,size:Math.max(5,Math.min(200,Number(e.target.value)||20))}))}/></div>
        <div className="flex items-center justify-between"><span>Time limit (minutes)</span><Input type="number" className="w-28" min={5} max={180} value={cfg.timeMin} onChange={(e)=>setCfg(x=>({...x,timeMin:Math.max(5,Math.min(180,Number(e.target.value)||25))}))}/></div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={()=>fileRef.current?.click()}><Upload className="h-4 w-4 mr-1"/>Import JSON</Button>
          <Button variant="secondary" onClick={exportBank}><Download className="h-4 w-4 mr-1"/>Export JSON</Button>
          <Button variant="outline" onClick={resetToEmpty}><RotateCcw className="h-4 w-4 mr-1"/>Clear</Button>
          <Button onClick={printMockSheet}><Printer className="h-4 w-4 mr-1" />Print mock sheet</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(f) importFromFile(f); e.target.value="";}}/>
        </div>
      </CardContent></Card>
  </div>);

  // Dashboard mini-cards
  const seen=profile.seen||{}, corr=profile.correct||{};
  const totalSeen=Object.values(seen).reduce((a,b)=>a+b,0)||0, totalOk=Object.values(corr).reduce((a,b)=>a+b,0)||0;
  const pct=(c)=> seen[c]?Math.round(((corr[c]||0)/seen[c])*100):0;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-3">
        <Card><CardContent className="py-4"><div className="text-xs text-muted-foreground mb-1">Overall Seen</div><div className="text-2xl font-semibold">{totalSeen}</div></CardContent></Card>
        <Card><CardContent className="py-4"><div className="text-xs text-muted-foreground mb-1">Overall Correct</div><div className="text-2xl font-semibold">{totalOk}</div></CardContent></Card>
        <Card><CardContent className="py-4"><div className="text-xs text-muted-foreground mb-1">Best Subject</div><div className="text-sm">{["constitution","history","geography","culture"].sort((a,b)=>pct(b)-pct(a))[0]||"—"}</div></CardContent></Card>
        <Card><CardContent className="py-4"><div className="text-xs text-muted-foreground mb-1">Weakest Subject</div><div className="text-sm">{["constitution","history","geography","culture"].sort((a,b)=>pct(a)-pct(b))[0]||"—"}</div></CardContent></Card>
      </div>
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList><TabsTrigger value="mock"><Target className="h-4 w-4 mr-1"/>Mock Test</TabsTrigger><TabsTrigger value="drill"><ListChecks className="h-4 w-4 mr-1"/>Subject Drill</TabsTrigger><TabsTrigger value="guide"><BookOpen className="h-4 w-4 mr-1"/>Study Guide</TabsTrigger><TabsTrigger value="settings"><SettingsIcon className="h-4 w-4 mr-1"/>Settings</TabsTrigger></TabsList>
        <TabsContent value="mock" className="pt-4">{MockView}</TabsContent>
        <TabsContent value="drill" className="pt-4">{DrillView}</TabsContent>
        <TabsContent value="guide" className="pt-4">{GuideView}</TabsContent>
        <TabsContent value="settings" className="pt-4">{SettingsView}</TabsContent>
      </Tabs>
    </div>
  );
}

/* ======================= Analytics (sparklines + export/import) ======================= */
function Sparkline({ data }) {
  if(!data.length) return <div className="text-xs text-muted-foreground">No attempts yet</div>;
  const rows = data.map((r,i)=>({i, score:r.score}));
  return (
    <div style={{width:"100%", height:80}}>
      <ResponsiveContainer>
        <LineChart data={rows} margin={{left:6,right:6,top:10,bottom:0}}>
          <XAxis dataKey="i" hide />
          <YAxis domain={[0,100]} hide />
          <Tooltip formatter={(v)=>`${v}%`} />
          <Line type="monotone" dataKey="score" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Analytics({ b1History, setB1History, civicsHistory, setCivicsHistory }) {
  const [range,setRange]=useState("30"); // 7 | 30 | all
  const cut = (arr)=> range==="all" ? arr : arr.slice(-Number(range));
  const groups = useMemo(()=>{
    const g = {
      reading: b1History.filter(x=>x.label.startsWith("B1 Reading")),
      listening: b1History.filter(x=>x.label.startsWith("B1 Listening")),
      writing: b1History.filter(x=>x.label.startsWith("B1 Writing")),
      speaking: b1History.filter(x=>x.label.startsWith("B1 Speaking")),
      civics: civicsHistory,
    };
    return Object.fromEntries(Object.entries(g).map(([k,v])=>[k, cut(v)]));
  },[b1History,civicsHistory,range]);

  function exportAllJSON(){
    const payload = { b1History, civicsHistory };
    downloadFile("polish-coach-history.json", JSON.stringify(payload,null,2), "application/json");
  }
  function exportAllCSV(){
    const rows = [
      ...b1History.map(r=>({...r, kind:"B1"})),
      ...civicsHistory.map(r=>({...r, kind:"CIVICS"})),
    ];
    downloadFile("polish-coach-history.csv", toCSV(rows), "text/csv");
  }
  const fileRef=useRef(null);
  async function importJSON(file){
    try{
      const text=await file.text(); const json=JSON.parse(text);
      const b1=Array.isArray(json.b1History)?json.b1History:[]; const cv=Array.isArray(json.civicsHistory)?json.civicsHistory:[];
      setB1History(h=>mergeHistory(h,b1)); setCivicsHistory(h=>mergeHistory(h,cv));
      alert(`Imported ${b1.length + cv.length} attempts.`);
    }catch(e){ alert(`Import failed: ${e.message||e}`); }
  }

  const CardBlock = ({title, rows}) => (
    <Card><CardHeader><CardTitle className="text-sm">{title}</CardTitle></CardHeader>
      <CardContent>
        <Sparkline data={rows}/>
        <div className="text-xs text-muted-foreground mt-1">
          Attempts: {rows.length ? rows.length : 0} {rows.length>0 && `• Last: ${rows[rows.length-1].score}% (${fmtDate(rows[rows.length-1].ts)})`}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Range:</span>
        <Chip active={range==="7"} onClick={()=>setRange("7")}>7</Chip>
        <Chip active={range==="30"} onClick={()=>setRange("30")}>30</Chip>
        <Chip active={range==="all"} onClick={()=>setRange("all")}>all</Chip>
        <div className="ml-auto flex gap-2">
          <Button onClick={exportAllJSON}><Download className="h-4 w-4 mr-1"/>Export JSON</Button>
          <Button variant="secondary" onClick={exportAllCSV}><Download className="h-4 w-4 mr-1"/>Export CSV</Button>
          <Button variant="outline" onClick={()=>fileRef.current?.click()}><Upload className="h-4 w-4 mr-1"/>Import JSON</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(f) importJSON(f); e.target.value="";}}/>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <CardBlock title="B1 Reading" rows={groups.reading}/>
        <CardBlock title="B1 Listening" rows={groups.listening}/>
        <CardBlock title="B1 Writing" rows={groups.writing}/>
        <CardBlock title="B1 Speaking" rows={groups.speaking}/>
        <CardBlock title="Civics Mock" rows={groups.civics}/>
      </div>
    </div>
  );
}

/* ======================= Root App ======================= */
export default function App(){
  // Deck + daily goal
  const initialDeck=useMemo(()=>loadDeck(),[]);
  const [deck,setDeck]=useState(initialDeck);
  const [active,setActive]=useState(()=>pickDue(initialDeck));
  const [autoSpeak,setAutoSpeak]=useState(true);
  const [tab,setTab]=useState("citizenship");
  const [filterCat,setFilterCat]=useState("");
  const [goal,setGoal]=useState(()=>Number(safeGet(LS_KEYS.GOAL))||20);
  const [done,setDone]=useState(()=>{const raw=safeGet(LS_KEYS.DONE_TODAY); if(!raw)return 0; try{const {date,count}=JSON.parse(raw); return date===todayKey()?count:0;}catch{return 0;}});
  useEffect(()=>{ safeSet(LS_KEYS.GOAL,String(Math.max(1,Number(goal)||20))); },[goal]);
  useEffect(()=>{ safeSet(LS_KEYS.DONE_TODAY,JSON.stringify({date:todayKey(),count:done})); },[done]);
  useEffect(()=>{ if(!hasWindow||!("speechSynthesis"in window))return; const handle=()=>{}; window.speechSynthesis.addEventListener?.("voiceschanged",handle); getVoicesPl(); return ()=>window.speechSynthesis.removeEventListener?.("voiceschanged",handle); },[]);
  useEffect(()=>{ if(autoSpeak&&active?.pl) speak(active.pl,1); },[active,autoSpeak]);
  function grade(rating){ const next=deck.map(c=>c.id===active.id?updateSRS(c,rating):c); saveDeck(next); setDeck(next); setDone(d=>d+1); setActive(pickDue(next)); }
  function resetProgress(){ if(!confirm("Reset your learning progress?"))return; const seed=STARTER_DECK.map(c=>({...c,ease:2.5,interval:0,due:Date.now()})); saveDeck(seed); setDeck(seed); setActive(pickDue(seed)); setDone(0); }
  const progress=Math.min(100,Math.round((done/Math.max(1,goal))*100)); const categories=useMemo(()=>Array.from(new Set(deck.map(c=>c.cat))),[deck]);

  // History
  const [b1History,setB1History] = useHistory(LS_KEYS.B1_HISTORY);
  const [civicsHistory,setCivicsHistory] = useHistory(LS_KEYS.CIVICS_HISTORY);
  const saveB1Attempt = (r)=> setB1History(h=>[...h, { ts: nowTs(), ...r }]);
  const saveCivicsAttempt = (r)=> setCivicsHistory(h=>[...h, { ts: nowTs(), ...r }]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div><h1 className="text-3xl font-bold tracking-tight">🇵🇱 Polish Coach + Citizenship + B1</h1><p className="text-muted-foreground">Civics mock tests + B1 trainer with auto-scoring & analytics.</p></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-2 text-sm"><Volume2 className="h-4 w-4"/> Auto-speak <Switch checked={autoSpeak} onCheckedChange={setAutoSpeak}/></div></div>
        </header>

        <Card className="mb-6"><CardContent className="py-4">
          <div className="flex items-center gap-3"><Zap className="h-5 w-5"/>
            <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span>Daily goal: {goal} reviews</span><span>{done}/{goal}</span></div><Progress value={progress}/></div>
            <Button variant="outline" size="sm" onClick={resetProgress} title="Reset progress"><RotateCcw className="h-4 w-4"/></Button>
          </div>
        </CardContent></Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="vocab">Vocab</TabsTrigger>
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
            <TabsTrigger value="citizenship">Citizenship</TabsTrigger>
            <TabsTrigger value="b1">B1 Trainer</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="pt-4"><div className="flex flex-col items-center gap-4"><Flashcard card={active} onGrade={grade}/><p className="text-sm text-muted-foreground">Speaker = native-like browser TTS.</p></div></TabsContent>

          <TabsContent value="practice" className="pt-4">
            <MCQuiz deck={deck} onComplete={(score,total)=>{ alert(`Quiz complete! ${score}/${total}`); setDone(d=>d+total); setTab("learn"); }}/>
          </TabsContent>

          <TabsContent value="vocab" className="pt-4">
            <div className="flex gap-2 mb-4 flex-wrap"><Chip key="all" active={!filterCat} onClick={()=>setFilterCat("")}>all</Chip>{categories.map(cat=>(<Chip key={cat} active={filterCat===cat} onClick={()=>setFilterCat(cat)}>{cat}</Chip>))}</div>
            <VocabTable deck={deck} filter={filterCat}/>
          </TabsContent>

          <TabsContent value="grammar" className="pt-4"><Grammar/></TabsContent>

          <TabsContent value="citizenship" className="pt-4"><CitizenshipModule onSaveAttempt={saveCivicsAttempt}/></TabsContent>

          <TabsContent value="b1" className="pt-4"><B1Trainer onSaveAttempt={saveB1Attempt}/></TabsContent>

          <TabsContent value="analytics" className="pt-4">
            <Analytics b1History={b1History} setB1History={setB1History} civicsHistory={civicsHistory} setCivicsHistory={setCivicsHistory} />
          </TabsContent>

          <TabsContent value="settings" className="pt-4">
            <Card className="max-w-xl"><CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><span>Daily goal (reviews)</span><Input type="number" value={goal} min={1} onChange={(e)=>{const v=Math.max(1,Number(e.target.value||1)); setGoal(v);}} className="w-28"/></div>
                <div className="text-sm text-muted-foreground">Progress lives only in your browser.</div>
              </CardContent></Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Tip: Export your attempts from <b>Analytics</b> (JSON/CSV). Print sheets in <b>B1 Settings</b> or <b>Citizenship Settings</b>.
        </footer>
      </div>
    </div>
  );
}
