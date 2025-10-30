// src/App.jsx
/* ===== Inline minimal UI + helpers (no external imports) ===== */
import React, { useEffect, useMemo, useRef, useState, createContext, useContext } from "react";

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
const TabsCtx = createContext(null);
export function Tabs({ value, onValueChange, children, className="" }) { return <TabsCtx.Provider value={{value,onValueChange}}><div className={className}>{children}</div></TabsCtx.Provider>; }
export function TabsList({ className="", ...p }) { return <div className={cx("inline-flex gap-1 rounded-md border p-1", className)} {...p}/>; }
export function TabsTrigger({ value, children, className="" }) { const ctx=useContext(TabsCtx); const active=ctx?.value===value; return (<button onClick={()=>ctx?.onValueChange?.(value)} className={cx("px-3 py-1 text-sm rounded", active?"bg-black text-white":"bg-white", className)} aria-pressed={active}>{children}</button>); }
export function TabsContent({ value, children, className="" }) { const ctx=useContext(TabsCtx); if(ctx?.value!==value) return null; return <div className={className}>{children}</div>; }
export function Switch({ checked, onCheckedChange }) { return (<button role="switch" aria-checked={!!checked} onClick={()=>onCheckedChange?.(!checked)} className={cx("inline-flex h-6 w-10 items-center rounded-full border transition", checked?"bg-black border-black":"bg-white border-gray-300")}><span className={cx("block h-5 w-5 rounded-full bg-white transition-transform", checked?"translate-x-4":"translate-x-0.5")} /></button>); }
export function Chip({ children, onClick, active=false }) { return (<button type="button" onClick={onClick} className={cx("inline-block rounded-full border px-2 py-0.5 text-xs text-gray-600", active&&"bg-gray-100")} aria-pressed={active}>{children}</button>); }
/* Speech helpers */
function getVoicesPl(){ const v=(typeof window!=="undefined" && window.speechSynthesis?.getVoices?.())||[]; const pl=v.filter(x=>x.lang?.toLowerCase?.().startsWith("pl")); return pl.length?pl:v; }
function speak(text, rate=1){ if(typeof window==="undefined"||!("speechSynthesis"in window))return; const u=new SpeechSynthesisUtterance(text); const voices=getVoicesPl(); if(voices.length)u.voice=voices[0]; u.lang="pl-PL"; u.rate=rate; try{window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
export function PronounceBtn({ text }) { return <Button variant="ghost" size="icon" onClick={()=>speak(text)} title="Pronounce">🔊</Button>; }
/* ===== end inline UI ===== */

/* ===== Storage & utils ===== */
const LS = { CARDS:"polishCoach.cards", GOAL:"polishCoach.goal", DONE:"polishCoach.doneToday", B1:"polishCoach.b1History", CIV:"polishCoach.civicsHistory", EXAM_CFG:"polishCoach.examCfg", B1_CFG:"polishCoach.b1cfg", EXAM_BANK:"polishCoach.examBank" };
const todayKey = (d=new Date()) => d.toISOString().slice(0,10);
const safeGet = (k) => { try{return localStorage.getItem(k);}catch{return null;} };
const safeSet = (k,v) => { try{localStorage.setItem(k,v);}catch{} };
const nowTs = () => Date.now();
const shuffle = (arr)=>{const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;};
const sample = (arr,n)=> (n>=arr.length?shuffle(arr):shuffle(arr).slice(0,n));

/* ===== Starter deck & SRS ===== */
const STARTER_DECK = [
  { id: "1", pl: "Cześć", en: "Hi / Hello", ipa: "t͡ʂɛɕt͡ɕ", cat: "greeting" },
  { id: "2", pl: "Dzień dobry", en: "Good day / Good morning", ipa: "d͡ʑɛɲ ˈdɔb.rɨ", cat: "greeting" },
  { id: "3", pl: "Dobry wieczór", en: "Good evening", ipa: "ˈdɔ.brɨ ˈvjɛ.t͡ʂur", cat: "greeting" },
  { id: "4", pl: "Do widzenia", en: "Goodbye", ipa: "dɔ vidˈzɛɲa", cat: "greeting" },
  { id: "5", pl: "Proszę", en: "Please / You're welcome", ipa: "ˈprɔ.ʂɛ", cat: "politeness" },
  { id: "6", pl: "Dziękuję", en: "Thank you", ipa: "d͡ʑɛŋˈkujɛ", cat: "politeness" },
  { id: "7", pl: "Przepraszam", en: "Sorry / Excuse me", ipa: "pʂɛˈpraʂam", cat: "politeness" },
  { id: "8", pl: "Tak", en: "Yes", ipa: "tak", cat: "core" },
  { id: "9", pl: "Nie", en: "No / Not", ipa: "ɲɛ", cat: "core" },
  { id: "10", pl: "Gdzie jest toaleta?", en: "Where is the toilet?", ipa: "ɡd͡ʑɛ jɛst tɔaˈlɛta", cat: "travel" },
  { id: "11", pl: "Ile to kosztuje?", en: "How much is it?", ipa: "ˈilɛ tɔ kɔʂˈtujɛ", cat: "travel" },
  { id: "12", pl: "Nie rozumiem", en: "I don't understand", ipa: "ɲɛ rɔˈzumʲɛm", cat: "core" },
  { id: "13", pl: "Mówię trochę po polsku", en: "I speak a little Polish", ipa: "ˈmuvʲɛ ˈtrɔxɛ pɔ ˈpɔlsku", cat: "core" },
  { id: "14", pl: "Jak masz na imię?", en: "What's your name? (informal)", ipa: "jak maʂ na ˈimʲɛ", cat: "core" },
  { id: "15", pl: "Mam na imię…", en: "My name is…", ipa: "mam na ˈimʲɛ", cat: "core" },
];
function loadDeck() {
  const raw=safeGet(LS.CARDS);
  if(!raw){ const seed=STARTER_DECK.map(c=>({...c,ease:2.5,interval:0,due:Date.now()})); safeSet(LS.CARDS,JSON.stringify(seed)); return seed; }
  try{ const parsed=JSON.parse(raw); return Array.isArray(parsed)?parsed:[]; }catch{ return STARTER_DECK.map(c=>({...c,ease:2.5,interval:0,due:Date.now()})); }
}
function saveDeck(d){ safeSet(LS.CARDS, JSON.stringify(d)); }
function updateSRS(card, rating){
  let {ease,interval}=card;
  if(rating===0){ ease=Math.max(1.3,ease-0.2); interval=0; }
  else if(rating===1){ ease=Math.max(1.3,ease-0.05); interval=Math.max(1,Math.round(interval*0.7)); }
  else if(rating===3){ ease=ease+0.05; interval=interval===0?1:Math.round(interval*ease); }
  const due=Date.now()+interval*24*60*60*1000;
  return {...card,ease,interval,due};
}
function pickDue(deck){ const now=Date.now(); const due=deck.filter(c=>c.due<=now); const by=(a,b)=>a.due-b.due; return (due.length?due:deck).sort(by)[0]; }

/* ===== Daily progress ===== */
function useDaily(goalDefault=20){
  const [goal,setGoal]=useState(()=>Number(safeGet(LS.GOAL))||goalDefault);
  const [done,setDone]=useState(()=>{const raw=safeGet(LS.DONE); if(!raw) return 0; try{const {date,count}=JSON.parse(raw); return date===todayKey()?count:0;}catch{return 0;}});
  useEffect(()=>safeSet(LS.GOAL,String(goal)),[goal]);
  useEffect(()=>safeSet(LS.DONE,JSON.stringify({date:todayKey(),count:done})),[done]);
  return {goal,setGoal,done,setDone};
}

/* ===== Small components ===== */
function Flashcard({ card, onGrade }){
  const [rev,setRev]=useState(false);
  useEffect(()=>setRev(false),[card?.id]);
  if(!card) return null;
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl">{card.pl}</CardTitle>
        <div className="flex items-center gap-2">
          <Chip>{card.cat}</Chip>
          <PronounceBtn text={card.pl}/>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-gray-500">/{card.ipa}/</div>
        {!rev ? <Button className="w-full" onClick={()=>setRev(true)}>Show meaning</Button> : <div className="text-center text-xl">{card.en}</div>}
        <div className="flex gap-2 pt-2">
          <Button variant="destructive" onClick={()=>onGrade(0)}>Again</Button>
          <Button variant="secondary" onClick={()=>onGrade(1)}>Hard</Button>
          <Button className="ml-auto" onClick={()=>onGrade(3)}>Easy</Button>
        </div>
      </CardContent>
    </Card>
  );
}
function MCQuiz({ deck, onComplete }) {
  const items=useMemo(()=>sample(deck,Math.min(10,deck.length)),[deck]);
  const [i,setI]=useState(0), [score,setScore]=useState(0);
  if(!items.length) return null;
  const q=items[i];
  const options=useMemo(()=>{ const pool=deck.filter(c=>c.id!==q.id); return shuffle([...sample(pool,Math.min(3,pool.length)), q]); },[q,deck]);
  function next(correct){ const s=score+(correct?1:0); setScore(s); if(i+1>=items.length) onComplete?.(s,items.length); else setI(i+1); }
  return (
    <Card className="max-w-xl w-full">
      <CardHeader><CardTitle>What does “{q.pl}” mean?</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {options.map(o=> <Button key={o.id} variant="outline" className="w-full justify-start" onClick={()=>next(o.id===q.id)}>{o.en}</Button>)}
        <div className="text-sm text-gray-500">{i+1}/{items.length} — Score: {score}</div>
      </CardContent>
    </Card>
  );
}
function VocabTable({ deck, filter }) {
  const filtered=useMemo(()=>filter?deck.filter(c=>c.cat===filter):deck,[deck,filter]);
  const [q,setQ]=useState(""); const shown=filtered.filter(c=>(c.pl+c.en).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="w-full max-w-2xl">
      <div className="flex gap-2 mb-2"><Input placeholder="Search słowo / word…" value={q} onChange={e=>setQ(e.target.value)} /></div>
      <div className="grid grid-cols-1 gap-2">
        {shown.map(c=>(
          <Card key={c.id}><CardContent className="flex items-center justify-between py-3">
            <div><div className="font-medium text-lg">{c.pl} <span className="text-sm text-gray-500">/{c.ipa}/</span></div><div className="text-gray-600">{c.en}</div></div>
            <div className="flex items-center gap-2"><Chip>{c.cat}</Chip><PronounceBtn text={c.pl}/></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
function Grammar(){
  return (
    <div className="max-w-3xl space-y-6">
      <Card><CardHeader><CardTitle>Polish Sounds Quick Guide</CardTitle></CardHeader><CardContent className="text-sm text-gray-600">
        <ul className="list-disc pl-5 space-y-1"><li><b>ą</b> /ɔ̃/, <b>ę</b> /ɛ̃/ (often denasalised word-finally).</li><li><b>ł</b> ≈ “w”, <b>rz</b> ≈ French “j”, <b>sz</b> ≈ “sh”, <b>ch</b> /x/.</li></ul>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Mini Grammar: Cases</CardTitle></CardHeader><CardContent className="text-sm overflow-x-auto">
        <table className="w-full text-left border">
          <thead><tr className="bg-gray-50"><th className="p-2">Case</th><th className="p-2">Question</th><th className="p-2">Example</th></tr></thead>
          <tbody>
            <tr><td className="p-2">Nominative</td><td className="p-2">kto? co?</td><td className="p-2">To jest <b>dom</b>.</td></tr>
            <tr><td className="p-2">Accusative</td><td className="p-2">kogo? co?</td><td className="p-2">Widzę <b>dom</b>.</td></tr>
            <tr><td className="p-2">Genitive</td><td className="p-2">kogo? czego?</td><td className="p-2">Nie ma <b>domu</b>.</td></tr>
            <tr><td className="p-2">Dative</td><td className="p-2">komu? czemu?</td><td className="p-2">Pomagam <b>koledze</b>.</td></tr>
            <tr><td className="p-2">Instrumental</td><td className="p-2">z kim? z czym?</td><td className="p-2">Idę z <b>koleżanką</b>.</td></tr>
            <tr><td className="p-2">Locative</td><td className="p-2">o kim? o czym?</td><td className="p-2">Mówię o <b>pracy</b>.</td></tr>
            <tr><td className="p-2">Vocative</td><td className="p-2">—</td><td className="p-2"><b>Mamo!</b></td></tr>
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}

/* ===== B1 trainer (datasets + scoring) ===== */
const READ_SETS = [
  { id:"r1", title:"Ogłoszenie o mieszkaniu", passage:"Szukam współlokatora do dwupokojowego mieszkania w centrum. Czynsz 2200 zł + media ok. 300 zł. Blisko przystanku tramwajowego. Dostępne od listopada. Proszę o kontakt mailowy.", qs:[{q:"Mieszkanie znajduje się:",opts:["Na obrzeżach","W centrum","Na wsi","Pod Warszawą"],a:1},{q:"Koszt miesięczny razem:",opts:["2200 zł","2500 zł","3000 zł","250 zł"],a:2},{q:"Kontakt preferowany:",opts:["Telefon","Osobiście","E-mail","Komunikator"],a:2}]},
  { id:"r2", title:"Mail od kolegi", passage:"Cześć! W ten weekend organizujemy mały piknik nad Wisłą. Każdy przynosi coś do jedzenia. Daj znać, czy możesz przyjść i czy masz ochotę zagrać w siatkówkę.", qs:[{q:"Gdzie?",opts:["W górach","Nad rzeką","W kinie","W restauracji"],a:1},{q:"Co przynieść?",opts:["Bilet","Jedzenie","Garnitur","Instrument"],a:1},{q:"Propozycja:",opts:["Koszykówka","Siatkówka","Tenis","Bieganie"],a:1}]},
];
const LISTEN_SETS = [
  { id:"l1", title:"Umówienie wizyty", script:"Dzień dobry. Chciałabym umówić wizytę u lekarza rodzinnego w przyszłym tygodniu, najlepiej we wtorek rano.", qs:[{q:"Kto dzwoni?",opts:["Lekarz","Pacjentka","Recepcjonista","Kurier"],a:1},{q:"Preferowany termin?",opts:["Pon wieczór","Wt rano","Śr południe","Czw wieczór"],a:1}]},
  { id:"l2", title:"Zgłoszenie awarii", script:"Chciałbym zgłosić awarię prądu w klatce trzeciej przy ulicy Lipowej. Od wczoraj wieczorem nie działa oświetlenie.", qs:[{q:"Jaki problem?",opts:["Woda","Gaz","Oświetlenie","Hałas"],a:2},{q:"Od kiedy?",opts:["Dziś rano","Wczoraj wieczór","Tydzień temu","Nie wiadomo"],a:1}]},
];
const CONNECTORS = ["ponieważ","dlatego","chociaż","jednak","więc","bo","gdy","kiedy","następnie","poza tym","co więcej","na przykład","podsumowując","w rezultacie","zatem","aby","żeby"];
const FILLERS = ["eee","yyy","no","tak jakby","w sumie","generalnie","że tak powiem","yyy"];

function tokenize(text){ return (text||"").toLowerCase().replace(/[^\p{L}\p{Zs}']/gu," ").split(/\s+/).filter(Boolean); }
function countSentences(text){ const m=(text||"").match(/[.!?…]+/g); return m?m.length:((text||"").trim()?1:0); }
function countConnectors(text){ const t=" "+(text||"").toLowerCase()+" "; return CONNECTORS.reduce((n,w)=> n + (t.includes(" "+w+" ")?1:0),0); }
function uniqueWordRatio(text){ const toks=tokenize(text); if(!toks.length) return 0; const set=new Set(toks); return set.size/toks.length; }
function fillerRatio(text){ const t=tokenize(text); if(!t.length) return 0; const f=t.filter(w=>FILLERS.includes(w)).length; return f/t.length; }
function clamp(x,a,b){ return Math.max(a,Math.min(b,x)); }

function gradeWriting(text, targetMin=80, targetMax=160){
  const words=tokenize(text).length, sent=countSentences(text), avgLen=words/Math.max(sent,1);
  const lenScore = words===0?0: words<targetMin? clamp(words/targetMin,0,1)*60 : words>targetMax? clamp(targetMax/words,0,1)*80 : 100;
  const structScore = clamp(avgLen/12,0.5,1)*100;
  const connScore = clamp(countConnectors(text)/4,0,1)*100;
  const spellProxy = tokenize(text).filter(w=>w.length>=3).every(w=>/^[\p{L}]+$/u.test(w)) ? 1 : 0.85; // simple proxy
  const punctScore = Math.min(1, (text.match(/[,;]/g)||[]).length/Math.max(sent,1)/2)*100;
  const total = Math.round(0.25*lenScore + 0.25*structScore + 0.25*connScore + 0.15*spellProxy*100 + 0.10*punctScore);
  return { total, words, sent, avgLen:Math.round(avgLen*10)/10, subs:{len:lenScore, struct:structScore, conn:connScore, spell:Math.round(spellProxy*100), punct:punctScore} };
}
function gradeSpeaking({durationSec, transcript}){
  const dur=durationSec, durScore = dur<=0?0: dur<60 ? (dur/60)*70 : dur>150 ? clamp(150/dur,0,1)*85 : 100;
  const uniq=uniqueWordRatio(transcript||""), uniqScore = clamp((uniq-0.35)/0.35,0,1)*100;
  const flu = fillerRatio(transcript||""), fluency = clamp(1 - flu*2, 0, 1)*100;
  const struct = tokenize(transcript||"").length/Math.max(countSentences(transcript||""),1);
  const structure = clamp(struct/12,0.5,1)*100;
  const total=Math.round(0.35*durScore+0.25*fluency+0.20*uniqScore+0.20*structure);
  return { total, subs:{dur:durScore, flu:fluency, lex:uniqScore, struct:structure} };
}

/* ===== Citizenship bank/attempts ===== */
function validateBank(arr){
  if(!Array.isArray(arr)) throw new Error("Bank must be an array");
  arr.forEach((q,i)=>{
    if(typeof q.id!=="string") throw new Error(`id missing at #${i}`);
    if(!["constitution","history","geography","culture"].includes(q.cat)) throw new Error(`invalid cat at #${i}`);
    if(typeof q.q!=="string") throw new Error(`q text missing at #${i}`);
    if(!Array.isArray(q.choices)||q.choices.length!==4) throw new Error(`4 choices needed at #${i}`);
    if(typeof q.answer!=="number") throw new Error(`answer index missing at #${i}`);
    if(typeof q.expl!=="string") throw new Error(`expl missing at #${i}`);
  });
  return true;
}

/* ===== History helpers ===== */
function useHistory(key){
  const [hist,setHist]=useState(()=>{try{const raw=safeGet(key); return raw?JSON.parse(raw):[];}catch{return [];}});
  useEffect(()=>safeSet(key,JSON.stringify(hist)),[key,hist]);
  return [hist,setHist];
}
function toCSV(rows){ if(!rows?.length) return "ts,label,score,meta\n"; const keys=["ts","label","score","meta"]; const esc=s=>`"${String(s??"").replace(/"/g,'""')}"`; return [keys.join(",")].concat(rows.map(r=>keys.map(k=>esc(k==="meta"?JSON.stringify(r[k]??{}):r[k])).join(","))).join("\n"); }
function fmtDate(ts){ const d=new Date(ts); return d.toLocaleDateString()+" "+d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}); }
function download(name,content,type="text/plain"){ const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url); }

/* ===== B1 Blocks ===== */
function ExamTimer({ minutes, setMinutes, secondsLeft, setSecondsLeft, running, setRunning }){
  useEffect(()=>{ if(!running) return; if(secondsLeft<=0){ setRunning(false); return; } const id=setTimeout(()=>setSecondsLeft(s=>s-1),1000); return ()=>clearTimeout(id); },[running,secondsLeft]);
  const m=Math.floor(secondsLeft/60), s=secondsLeft%60;
  return (
    <Card className="mb-3"><CardContent className="py-3 flex items-center gap-3">
      ⏱️ <div className="text-sm w-20">{m}:{s.toString().padStart(2,"0")}</div>
      <div className="ml-auto flex items-center gap-2">
        <Input type="number" className="w-20" value={minutes} onChange={e=>setMinutes(Math.max(1,Number(e.target.value)||minutes))}/>
        <Button onClick={()=>{ setSecondsLeft(minutes*60); setRunning(true); }}>Start</Button>
        <Button variant="secondary" onClick={()=>setRunning(false)}>Pause</Button>
        <Button variant="outline" onClick={()=>{ setRunning(false); setSecondsLeft(minutes*60); }}>Reset</Button>
      </div>
    </CardContent></Card>
  );
}
function MCBlock({ items, onFinish, onScore }) {
  const [i,setI]=useState(0), [sel,setSel]=useState(null), [show,setShow]=useState(false), [score,setScore]=useState(0);
  const q=items[i]; if(!q) return null;
  const next=(correct)=>{ const s=score+(correct?1:0); setScore(s); if(i+1>=items.length){ onScore?.(s,items.length); onFinish?.(); } else { setI(i+1); setSel(null); setShow(false); } };
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader><CardTitle className="text-base">Pytanie {i+1}/{items.length} — {score} pkt</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <div className="text-lg">{q.q}</div>
        {q.opts.map((opt,idx)=> {
          const correct=idx===q.a, chosen=sel===idx;
          const variant = show ? (correct?"default":chosen?"destructive":"outline") : (chosen?"secondary":"outline");
          return <Button key={idx} variant={variant} className="w-full justify-start" onClick={()=>!show&&setSel(idx)}>{opt}</Button>;
        })}
        <div className="flex gap-2 pt-2">
          <Button onClick={()=>setShow(true)} disabled={show||sel==null}>Reveal</Button>
          <Button onClick={()=>next(sel===q.a)} disabled={!show}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
}
function B1Reading({ onSave }) {
  const [idx,setIdx]=useState(0); const set=READ_SETS[idx];
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">{READ_SETS.map((s,i)=><Chip key={s.id} active={idx===i} onClick={()=>setIdx(i)}>{s.title}</Chip>)}</div>
      <Card className="max-w-3xl"><CardHeader><CardTitle>{set.title}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-gray-600"><p>{set.passage}</p></CardContent></Card>
      <MCBlock items={set.qs} onScore={(got,total)=>onSave?.({label:`B1 Reading – ${set.title}`, score:Math.round((got/total)*100), meta:{set:set.id,got,total}})} />
    </div>
  );
}
function B1Listening({ onSave }) {
  const [idx,setIdx]=useState(0); const set=LISTEN_SETS[idx];
  const [playing,setPlaying]=useState(false);
  const play=()=>{ if(playing) return; setPlaying(true); speak(set.script,0.95); setTimeout(()=>setPlaying(false), Math.max(3000, set.script.length*45)); };
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">{LISTEN_SETS.map((s,i)=><Chip key={s.id} active={idx===i} onClick={()=>setIdx(i)}>{s.title}</Chip>)}</div>
      <Card className="max-w-3xl"><CardHeader><CardTitle>{set.title}</CardTitle></CardHeader><CardContent className="space-y-2"><div className="text-sm text-gray-600">Press to play once. Questions below.</div><Button onClick={play} disabled={playing}>🔊 Play (TTS)</Button></CardContent></Card>
      <MCBlock items={set.qs} onScore={(got,total)=>onSave?.({label:`B1 Listening – ${set.title}`, score:Math.round((got/total)*100), meta:{set:set.id,got,total}})} />
    </div>
  );
}
function B1Writing({ onSave }){
  const PROMPTS=[{id:"w1",title:"E-mail o kursie B1 (80–120 słów)"},{id:"w2",title:"Notatka o remoncie kuchni (60–100)"},{id:"w3",title:"Opowiadanie: nieudany wyjazd (120–160)"}];
  const limits={w1:[80,120], w2:[60,100], w3:[120,160]};
  const [idx,setIdx]=useState(0), [text,setText]=useState(""); const p=PROMPTS[idx], [min,max]=limits[p.id];
  const r=gradeWriting(text,min,max); const words=tokenize(text).length;
  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex gap-2 flex-wrap">{PROMPTS.map((pp,i)=><Chip key={pp.id} active={idx===i} onClick={()=>{setIdx(i); setText("");}}>{pp.title}</Chip>)}</div>
      <Card><CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={10} className="w-full border rounded p-2" placeholder="Pisz tutaj..."/>
          <div className="text-xs text-gray-600">Words: {words} • Sentences: {r.sent} • Avg len: {r.avgLen}</div>
          <Card className="border"><CardContent className="py-3 space-y-2">
            <div className="text-sm font-medium">Auto-score: {r.total}/100</div>
            <div className="grid gap-1 text-xs text-gray-600">
              <div>Length: {Math.round(r.subs.len)}%</div>
              <div>Structure: {Math.round(r.subs.struct)}%</div>
              <div>Connectors: {Math.round(r.subs.conn)}%</div>
              <div>Spelling proxy: {Math.round(r.subs.spell)}%</div>
              <div>Punctuation: {Math.round(r.subs.punct)}%</div>
            </div>
            <Button onClick={()=>onSave?.({label:`B1 Writing – ${p.title}`, score:r.total, meta:{prompt:p.id,words}})}>Save attempt</Button>
          </CardContent></Card>
        </CardContent>
      </Card>
    </div>
  );
}
function B1Speaking({ onSave }){
  const CARDS=[{id:"s1",title:"Zakupy – opisz swoje nawyki"},{id:"s2",title:"Praca/Nauka – typowy dzień"},{id:"s3",title:"Podróże – ostatnia wyprawa"}];
  const [idx,setIdx]=useState(0), [rec,setRec]=useState(null), [url,setUrl]=useState(""), [start,setStart]=useState(0), [dur,setDur]=useState(0), [tr,setTr]=useState("");
  async function startRec(){ if(rec) return; try{ const stream=await navigator.mediaDevices.getUserMedia({audio:true}); const m=new MediaRecorder(stream); const chunks=[]; m.ondataavailable=e=>{if(e.data.size>0) chunks.push(e.data)}; m.onstop=()=>{ const blob=new Blob(chunks,{type:"audio/webm"}); const u=URL.createObjectURL(blob); setUrl(u); stream.getTracks().forEach(t=>t.stop()); setDur(Math.round((Date.now()-start)/1000)); }; m.start(); setStart(Date.now()); setRec(m); }catch{ alert("Microphone not available."); } }
  function stopRec(){ if(rec){ rec.stop(); setRec(null); } }
  const score=gradeSpeaking({durationSec:dur, transcript:tr});
  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex gap-2 flex-wrap">{CARDS.map((c,i)=><Chip key={c.id} active={idx===i} onClick={()=>{setIdx(i); setUrl(""); setTr(""); setDur(0);}}>{c.title}</Chip>)}</div>
      <Card><CardHeader><CardTitle>{CARDS[idx].title}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            {!rec ? <Button onClick={startRec}>🎙️ Record</Button> : <Button variant="destructive" onClick={stopRec}>⏹️ Stop</Button>}
            {url && <a href={url} download={`b1-speaking-${CARDS[idx].id}.webm`}><Button variant="secondary">⬇️ Download</Button></a>}
          </div>
          {url && <audio controls src={url} className="w-full" />}
          <textarea value={tr} onChange={e=>setTr(e.target.value)} rows={6} className="w-full border rounded p-2" placeholder="Transkrypcja (opcjonalnie)"/>
          <Card className="border"><CardContent className="py-3 space-y-2">
            <div className="text-sm font-medium">Auto-score: {score.total}/100</div>
            <div className="grid gap-1 text-xs text-gray-600">
              <div>Duration: {Math.round(score.subs.dur)}%</div>
              <div>Fluency: {Math.round(score.subs.flu)}%</div>
              <div>Lexical: {Math.round(score.subs.lex)}%</div>
              <div>Structure: {Math.round(score.subs.struct)}%</div>
            </div>
            <Button onClick={()=>onSave?.({label:`B1 Speaking – ${CARDS[idx].title}`, score:score.total, meta:{card:CARDS[idx].id,dur}})}>Save attempt</Button>
          </CardContent></Card>
        </CardContent>
      </Card>
    </div>
  );
}
function B1Trainer({ onSave }){
  const [tab,setTab]=useState("reading");
  const [mR,setMR]=useState(15), [sR,setSR]=useState(mR*60), [rR,setRR]=useState(false);
  const [mL,setML]=useState(10), [sL,setSL]=useState(mL*60), [rL,setRL]=useState(false);
  const [mW,setMW]=useState(20), [sW,setSW]=useState(mW*60), [rW,setRW]=useState(false);
  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="reading">Reading</TabsTrigger><TabsTrigger value="listening">Listening</TabsTrigger><TabsTrigger value="writing">Writing</TabsTrigger><TabsTrigger value="speaking">Speaking</TabsTrigger></TabsList>
        <TabsContent value="reading" className="pt-3">
          <ExamTimer minutes={mR} setMinutes={setMR} secondsLeft={sR} setSecondsLeft={setSR} running={rR} setRunning={setRR}/>
          <B1Reading onSave={onSave}/>
        </TabsContent>
        <TabsContent value="listening" className="pt-3">
          <ExamTimer minutes={mL} setMinutes={setML} secondsLeft={sL} setSecondsLeft={setSL} running={rL} setRunning={setRL}/>
          <B1Listening onSave={onSave}/>
        </TabsContent>
        <TabsContent value="writing" className="pt-3">
          <ExamTimer minutes={mW} setMinutes={setMW} secondsLeft={sW} setSecondsLeft={setSW} running={rW} setRunning={setRW}/>
          <B1Writing onSave={onSave}/>
        </TabsContent>
        <TabsContent value="speaking" className="pt-3"><B1Speaking onSave={onSave}/></TabsContent>
      </Tabs>
    </div>
  );
}

/* ===== Citizenship Module ===== */
function ExamQuestion({ q, index, total, selected, setSelected, revealed }) {
  const letters=["A","B","C","D"];
  return (
    <Card className="w-full">
      <CardHeader><CardTitle className="text-base">Q{index+1}/{total} — <Chip>{q.cat}</Chip></CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <div className="text-lg">{q.q}</div>
        <div className="grid gap-2">
          {q.choices.map((c,i)=> {
            const isCorrect=i===q.answer, isChosen=selected===i;
            const variant = revealed ? (isCorrect?"default":isChosen?"destructive":"outline") : (isChosen?"secondary":"outline");
            return <Button key={i} variant={variant} className="justify-start" onClick={()=>!revealed&&setSelected(i)}><span className="w-6">{letters[i]}.</span> {c}</Button>;
          })}
        </div>
        {revealed && <div className="text-sm text-gray-600 pt-1"><b>Explanation:</b> {q.expl}</div>}
      </CardContent>
    </Card>
  );
}
function ExamResults({ items, picks, onRetryIncorrect }) {
  const total=items.length; const correct=items.reduce((a,q,i)=>a+(picks[i]===q.answer?1:0),0);
  const byCat=items.reduce((acc,q,i)=>{const ok=picks[i]===q.answer; acc[q.cat]=acc[q.cat]||{total:0,ok:0}; acc[q.cat].total+=1; acc[q.cat].ok+=ok?1:0; return acc;},{});
  const incorrect=items.map((q,i)=>({q,i})).filter(({q,i})=>picks[i]!==q.answer);
  return (
    <div className="space-y-3">
      <Card><CardHeader><CardTitle>Score</CardTitle></CardHeader><CardContent className="flex items-center gap-4"><div className="text-2xl font-bold">{correct}/{total}</div><Progress value={Math.round((correct/total)*100)} className="flex-1"/></CardContent></Card>
      <Card><CardHeader><CardTitle>By Subject</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-2">
        {Object.entries(byCat).map(([cat,v])=>(
          <div key={cat} className="border rounded p-2 text-sm"><div className="mb-1"><Chip>{cat}</Chip></div><div>{v.ok}/{v.total}</div><Progress value={Math.round((v.ok/v.total)*100)}/></div>
        ))}
      </CardContent></Card>
      {incorrect.length>0 && (<div className="space-y-2">
        <div className="text-sm text-gray-600">Review incorrect questions:</div>
        <div className="grid gap-2">{incorrect.map(({q,i})=>(
          <Card key={q.id}><CardContent className="py-2">
            <div className="text-sm mb-1"><b>Q{i+1}.</b> {q.q}</div>
            <div className="text-xs mb-1">Your answer: <i>{typeof picks[i]==="number"?q.choices[picks[i]]:"—"}</i></div>
            <div className="text-xs">Correct: <b>{q.choices[q.answer]}</b></div>
            <div className="text-xs text-gray-600 mt-1">{q.expl}</div>
          </CardContent></Card>
        ))}</div>
        <Button onClick={()=>onRetryIncorrect(incorrect.map(({q})=>q))}>🔁 Retry incorrect only</Button>
      </div>)}
    </div>
  );
}
function Citizenship({ onSaveAttempt }){
  const SUBJECTS=["constitution","history","geography","culture"];
  const [cfg,setCfg]=useState(()=>{ try{const raw=safeGet(LS.EXAM_CFG); return raw?JSON.parse(raw):{size:20,timeMin:25};}catch{return {size:20,timeMin:25}}});
  useEffect(()=>safeSet(LS.EXAM_CFG,JSON.stringify(cfg)),[cfg]);
  const [bank,setBank]=useState(()=>{ try{const raw=safeGet(LS.EXAM_BANK); return raw?JSON.parse(raw):[];}catch{return [];}});
  useEffect(()=>safeSet(LS.EXAM_BANK,JSON.stringify(bank)),[bank]);
  const [mode,setMode]=useState("mock"), [cat,setCat]=useState(""), [seed,setSeed]=useState(Math.random());
  const testItems=useMemo(()=>{ const src=cat?bank.filter(q=>q.cat===cat):bank; return sample(src,Math.min(cfg.size,src.length||0)); },[bank,cat,seed,cfg]);
  const [picks,setPicks]=useState(()=>Array(testItems.length).fill(null));
  const [timeLeft,setTimeLeft]=useState(cfg.timeMin*60);
  const [submitted,setSubmitted]=useState(false);

  useEffect(()=>{ if(mode!=="mock"||submitted) return; if(timeLeft<=0){ setSubmitted(true); return; } const id=setTimeout(()=>setTimeLeft(t=>t-1),1000); return ()=>clearTimeout(id); },[timeLeft,mode,submitted]);
  useEffect(()=>{ setPicks(Array(testItems.length).fill(null)); setSubmitted(false); setTimeLeft(cfg.timeMin*60); },[seed,cat,cfg.size,cfg.timeMin,bank.length]);

  const answered=picks.filter(x=>x!==null).length;
  function submit(){
    setSubmitted(true);
    const got=testItems.reduce((n,q,i)=> n + (picks[i]===q.answer?1:0),0);
    const total=testItems.length;
    onSaveAttempt?.({label:"Civics Mock", score:Math.round((got/total)*100), meta:{got,total,cat:cat||"all",size:cfg.size,timeMin:cfg.timeMin}});
  }
  function reset(){ setSeed(Math.random()); }

  // Import/export/print
  const [importOpen,setImportOpen]=useState(false); const taRef=useRef(null);
  function doImport(){ try{ const json=JSON.parse(taRef.current.value||"[]"); validateBank(json); setBank(json); setImportOpen(false); alert(`Imported ${json.length} questions.`);}catch(e){ alert("Import failed: "+(e.message||e)); } }
  function exportBank(){ download("polish-citizenship-bank.json", JSON.stringify(bank,null,2), "application/json"); }
  function printMock(){ if(!bank.length) return alert("Import a question bank first."); const items=sample(bank,Math.min(cfg.size,bank.length)); const html=`<html><head><title>Mock</title><style>body{font-family:system-ui;margin:24px} .q{margin:10px 0}</style></head><body><h1>Citizenship Mock</h1>${items.map((q,i)=>`<div class="q"><b>${i+1}.</b> ${q.q}<ol type="A"><li>${q.choices[0]}</li><li>${q.choices[1]}</li><li>${q.choices[2]}</li><li>${q.choices[3]}</li></ol></div>`).join("")}<script>window.print()</script></body></html>`; const w=window.open("","_blank"); w.document.open(); w.document.write(html); w.document.close(); }

  const Drill = (<div className="space-y-3">
    <div className="flex gap-2 flex-wrap"><Chip active={!cat} onClick={()=>setCat("")}>all</Chip>{SUBJECTS.map(s=><Chip key={s} active={cat===s} onClick={()=>setCat(s)}>{s}</Chip>)}</div>
    {!bank.length ? <div className="text-sm text-gray-600">No bank imported. Use Settings → Import.</div> :
      <QuestionDrill items={(cat?bank.filter(q=>q.cat===cat):bank)} />}
  </div>);
  const Mock = (<div className="space-y-3">
    <div className="flex gap-2 flex-wrap"><Chip active={!cat} onClick={()=>setCat("")}>all</Chip>{SUBJECTS.map(s=><Chip key={s} active={cat===s} onClick={()=>setCat(s)}>{s}</Chip>)}</div>
    <Card className="mb-2"><CardContent className="py-3 flex items-center gap-3">⏱️ <div className="text-sm w-20">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,"0")}</div>
      <div className="flex-1"><div className="text-xs mb-1">Progress {answered}/{testItems.length}</div><Progress value={Math.round((answered/Math.max(1,testItems.length))*100)}/></div>
      <Button variant="secondary" onClick={reset}>↺ Reset</Button><Button onClick={submit} disabled={submitted||answered===0}>✔ Submit</Button>
    </CardContent></Card>
    {testItems.map((q,i)=> <ExamQuestion key={q.id} q={q} index={i} total={testItems.length} selected={picks[i]} setSelected={(v)=>setPicks(a=>{const n=[...a]; n[i]=v; return n;})} revealed={submitted}/>)}
    {submitted && <ExamResults items={testItems} picks={picks} onRetryIncorrect={(qs)=>{ setSeed(Math.random()); setSubmitted(false); setTimeLeft(cfg.timeMin*60); setMode("drill"); }}/>}
  </div>);
  const Settings = (<div className="grid gap-3 max-w-xl">
    <Card><CardHeader><CardTitle>Mock Settings</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between"><span>Questions per test</span><Input type="number" className="w-28" value={cfg.size} onChange={e=>setCfg(c=>({...c,size:Math.max(5,Math.min(200,Number(e.target.value)||20))}))}/></div>
        <div className="flex items-center justify-between"><span>Time limit (min)</span><Input type="number" className="w-28" value={cfg.timeMin} onChange={e=>setCfg(c=>({...c,timeMin:Math.max(5,Math.min(180,Number(e.target.value)||25))}))}/></div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={()=>setImportOpen(true)}>📥 Import JSON</Button>
          <Button variant="secondary" onClick={exportBank}>📤 Export JSON</Button>
          <Button variant="outline" onClick={printMock}>🖨️ Print mock sheet</Button>
        </div>
        {importOpen && <div className="border rounded p-2 space-y-2">
          <div className="text-sm">Paste question bank JSON:</div>
          <textarea ref={taRef} rows={10} className="w-full border rounded p-2" placeholder='[{"id":"q1","cat":"history","q":"...","choices":["A","B","C","D"],"answer":1,"expl":"..."}]'></textarea>
          <div className="flex gap-2"><Button onClick={doImport}>Import</Button><Button variant="secondary" onClick={()=>setImportOpen(false)}>Close</Button></div>
        </div>}
      </CardContent>
    </Card>
  </div>);

  const [modeTab,setModeTab]=useState("mock");
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-2">
        <Card><CardContent className="py-3"><div className="text-xs text-gray-600">Bank size</div><div className="text-xl font-semibold">{bank.length}</div></CardContent></Card>
        <Card><CardContent className="py-3"><div className="text-xs text-gray-600">Config</div><div className="text-sm">{cfg.size} Q • {cfg.timeMin} min</div></CardContent></Card>
        <Card><CardContent className="py-3"><div className="text-xs text-gray-600">Filter</div><div className="text-sm">{cat||"all"}</div></CardContent></Card>
      </div>

      <Tabs value={modeTab} onValueChange={setModeTab}>
        <TabsList><TabsTrigger value="mock">🎯 Mock</TabsTrigger><TabsTrigger value="drill">📝 Drill</TabsTrigger><TabsTrigger value="settings">⚙️ Settings</TabsTrigger></TabsList>
        <TabsContent value="mock" className="pt-3">{Mock}</TabsContent>
        <TabsContent value="drill" className="pt-3">{Drill}</TabsContent>
        <TabsContent value="settings" className="pt-3">{Settings}</TabsContent>
      </Tabs>
    </div>
  );
}
function QuestionDrill({ items }){
  const [i,setI]=useState(0), [pick,setPick]=useState(null), [show,setShow]=useState(false);
  if(!items.length) return <div className="text-sm text-gray-600">No questions.</div>;
  const q=items[i];
  function next(){ if(i+1>=items.length){ setI(0); setPick(null); setShow(false);} else { setI(i+1); setPick(null); setShow(false);} }
  return (<div className="space-y-3"><ExamQuestion q={q} index={i} total={items.length} selected={pick} setSelected={setPick} revealed={show}/><div className="flex gap-2"><Button onClick={()=>setShow(true)} disabled={show||pick==null}>Reveal</Button><Button onClick={next} disabled={!show}>Next</Button></div></div>);
}

/* ===== Root App ===== */
export default function App(){
  // Deck & daily progress
  const initialDeck=useMemo(()=>loadDeck(),[]);
  const [deck,setDeck]=useState(initialDeck);
  const [active,setActive]=useState(()=>pickDue(initialDeck));
  const [autoSpeak,setAutoSpeak]=useState(true);
  const [tab,setTab]=useState("citizenship");
  const [filterCat,setFilterCat]=useState("");
  const {goal,setGoal,done,setDone}=useDaily();
  useEffect(()=>{ if(typeof window==="undefined"||!("speechSynthesis"in window))return; const cb=()=>{}; window.speechSynthesis.addEventListener?.("voiceschanged",cb); getVoicesPl(); return ()=>window.speechSynthesis.removeEventListener?.("voiceschanged",cb); },[]);
  useEffect(()=>{ if(autoSpeak&&active?.pl) speak(active.pl,1); },[active,autoSpeak]);

  function grade(r){ const next=deck.map(c=>c.id===active.id?updateSRS(c,r):c); saveDeck(next); setDeck(next); setDone(d=>d+1); setActive(pickDue(next)); }
  function reset(){ if(!confirm("Reset your learning progress?")) return; const seed=STARTER_DECK.map(c=>({...c,ease:2.5,interval:0,due:Date.now()})); saveDeck(seed); setDeck(seed); setActive(pickDue(seed)); setDone(0); }
  const progress=Math.min(100,Math.round((done/Math.max(1,goal))*100));
  const cats=useMemo(()=>Array.from(new Set(deck.map(c=>c.cat))),[deck]);

  // Histories
  const [b1Hist,setB1]=useHistory(LS.B1);
  const [civHist,setCiv]=useHistory(LS.CIV);
  const saveB1 = (r)=> setB1(h=>[...h,{ts:nowTs(),...r}]);
  const saveCiv = (r)=> setCiv(h=>[...h,{ts:nowTs(),...r}]);

  return (
    <div className="min-h-screen w-full" style={{background: "linear-gradient(to bottom, white, #f8fafc)"}}>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div><h1 className="text-3xl font-bold tracking-tight">🇵🇱 Polish Coach + Citizenship + B1</h1><p className="text-gray-600">Civics mock tests + B1 trainer with auto-scoring & local history.</p></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-2 text-sm">🔊 Auto-speak <Switch checked={autoSpeak} onCheckedChange={setAutoSpeak}/></div></div>
        </header>

        <Card className="mb-6"><CardContent className="py-4">
          <div className="flex items-center gap-3">⚡
            <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span>Daily goal: {goal} reviews</span><span>{done}/{goal}</span></div><Progress value={progress}/></div>
            <Button variant="outline" size="sm" onClick={reset} title="Reset progress">↺ Reset</Button>
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

          <TabsContent value="learn" className="pt-4">
            <div className="flex flex-col items-center gap-4">
              <Flashcard card={active} onGrade={grade}/>
              <p className="text-sm text-gray-600">Tip: click 🔊 to hear Polish pronunciation.</p>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="pt-4">
            <MCQuiz deck={deck} onComplete={(score,total)=>{ alert(`Quiz complete! ${score}/${total}`); setDone(d=>d+total); setTab("learn"); }}/>
          </TabsContent>

          <TabsContent value="vocab" className="pt-4">
            <div className="flex gap-2 mb-4 flex-wrap">
              <Chip key="all" active={!filterCat} onClick={()=>setFilterCat("")}>all</Chip>
              {cats.map(cat=>(<Chip key={cat} active={filterCat===cat} onClick={()=>setFilterCat(cat)}>{cat}</Chip>))}
            </div>
            <VocabTable deck={deck} filter={filterCat}/>
          </TabsContent>

          <TabsContent value="grammar" className="pt-4"><Grammar/></TabsContent>

          <TabsContent value="citizenship" className="pt-4"><Citizenship onSaveAttempt={saveCiv}/></TabsContent>

          <TabsContent value="b1" className="pt-4"><B1Trainer onSave={saveB1}/></TabsContent>

          <TabsContent value="analytics" className="pt-4">
            <div className="grid md:grid-cols-2 gap-3">
              <Card><CardHeader><CardTitle>B1 Attempts</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {b1Hist.length===0 && <div className="text-sm text-gray-600">No attempts yet.</div>}
                  {b1Hist.slice().reverse().map((r,i)=>(
                    <div key={i} className="border rounded p-2 text-sm flex justify-between"><span>{r.label}</span><span>{r.score}%</span></div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" onClick={()=>download("b1-history.json", JSON.stringify(b1Hist,null,2), "application/json")}>Export JSON</Button>
                    <Button variant="outline" onClick={()=>download("b1-history.csv", toCSV(b1Hist), "text/csv")}>Export CSV</Button>
                  </div>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle>Civics Attempts</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {civHist.length===0 && <div className="text-sm text-gray-600">No attempts yet.</div>}
                  {civHist.slice().reverse().map((r,i)=>(
                    <div key={i} className="border rounded p-2 text-sm flex justify-between"><span>{r.label}</span><span>{r.score}%</span></div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" onClick={()=>download("civics-history.json", JSON.stringify(civHist,null,2), "application/json")}>Export JSON</Button>
                    <Button variant="outline" onClick={()=>download("civics-history.csv", toCSV(civHist), "text/csv")}>Export CSV</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="pt-4">
            <Card className="max-w-xl"><CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Daily goal (reviews)</span>
                  <Input type="number" value={goal} onChange={e=>setGoal(Math.max(1,Number(e.target.value||1)))} className="w-28"/>
                </div>
                <div className="text-sm text-gray-600">All data stays in your browser (localStorage).</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-10 text-center text-xs text-gray-600">Built for 🇵🇱 citizenship & B1 practice. Print sheets in Citizenship → Settings. </footer>
      </div>
    </div>
  );
}
