"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { MotionConfig, motion } from "motion/react";

const DEFAULT_WISH = `Nhân ngày Phụ nữ Việt Nam 20/10, chúc {to} luôn xinh đẹp, rạng rỡ và hạnh phúc.

Mong rằng mỗi ngày trôi qua đều mang đến thật nhiều niềm vui, những điều ngọt ngào và những yêu thương chân thành.

Chúc {to} luôn tự tin, tỏa sáng theo cách riêng của mình và mãi là đóa hoa xinh đẹp nhất trong khu vườn cuộc sống.

Happy Women's Day! 🌷`;

const stems = [
  { x: 205, lean: -44, height: 285, bloom: "#e87870", delay: 0.2 },
  { x: 280, lean: -22, height: 350, bloom: "#f49b8e", delay: 0.45 },
  { x: 365, lean: 4, height: 420, bloom: "#e96972", delay: 0.05 },
  { x: 445, lean: 26, height: 370, bloom: "#f3a6a0", delay: 0.35 },
  { x: 510, lean: 50, height: 305, bloom: "#df777a", delay: 0.55 },
];

const backdropBlooms = [
  { x: 28, y: 444, size: 0.75, color: "#d97879", delay: 0.1, lean: -13 },
  { x: 88, y: 545, size: 0.55, color: "#e99088", delay: 0.35, lean: 17 },
  { x: 24, y: 654, size: 0.48, color: "#e7a19a", delay: 0.55, lean: 8 },
  { x: 362, y: 425, size: 0.66, color: "#dd777a", delay: 0.25, lean: 13 },
  { x: 306, y: 536, size: 0.72, color: "#ef9b8e", delay: 0.05, lean: -16 },
  { x: 367, y: 664, size: 0.52, color: "#e5a29a", delay: 0.45, lean: -8 },
];

function Tulip({ x, lean, height, bloom, delay, index }) {
  const top = 470 - height;
  return (
    <g className={`stem stem-${index}`} transform={`translate(${x - 360} 0)`} style={{ "--grow-delay": `${delay}s` }}>
      <path className="stem-line" d={`M 360 540 Q ${360 + lean * 0.36} 395 ${360 + lean} ${top + 25}`} />
      <path className="leaf leaf-left" d={`M ${350 + lean * 0.38} 420 Q ${285 + lean * 0.5} 366 ${296 + lean * 0.42} 329 Q ${358 + lean * 0.4} 350 ${350 + lean * 0.38} 420Z`} />
      <path className="leaf leaf-right" d={`M ${362 + lean * 0.68} 468 Q ${420 + lean * 0.5} 409 ${443 + lean * 0.45} 424 Q ${425 + lean * 0.4} 479 ${362 + lean * 0.68} 468Z`} />
      <g className="bloom" transform={`translate(${360 + lean} ${top + 14})`}>
        <path d="M-35 11 C-50-30-41-65-18-77 C-9-53-7-27 0 8Z" fill={bloom} />
        <path d="M-20 10 C-27-42-13-83 0-91 C13-73 12-26 10 11Z" fill="#f7b7aa" />
        <path d="M-2 10 C8-31 15-70 32-75 C49-53 43-20 27 12Z" fill={bloom} />
        <path d="M-32 3 Q0 15 34 3 L29 21 Q0 34-29 18Z" fill="#d9656c" opacity=".82" />
        <path d="M-30-28 Q-20-47-11-53 M7-58 Q13-35 13-21" fill="none" stroke="#ffd1c6" strokeWidth="3" strokeLinecap="round" opacity=".58" />
      </g>
    </g>
  );
}

function BackdropGarden() {
  return (
    <svg className="backdrop-art" viewBox="0 0 390 844" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="backdrop-stem" x1="0" y1="1" x2="0.12" y2="0"><stop stopColor="#7c8966" stopOpacity=".12"/><stop offset="1" stopColor="#697c59" stopOpacity=".7"/></linearGradient></defs>
      {backdropBlooms.map((flower, index) => {
        const top = flower.y;
        return <g className="backdrop-flower" key={index} style={{ "--flower-delay": `${flower.delay}s` }}>
          <path className="backdrop-stem" d={`M ${flower.x + flower.lean * .35} 880 Q ${flower.x - flower.lean} 690 ${flower.x + flower.lean} ${top + 32}`} />
          <path className="backdrop-leaf" d={`M ${flower.x + flower.lean * .1} 740 Q ${flower.x - 62} 696 ${flower.x - 54} 668 Q ${flower.x - 1} 684 ${flower.x + flower.lean * .1} 740Z`} />
          <path className="backdrop-leaf leaf-2" d={`M ${flower.x + flower.lean * .2} 805 Q ${flower.x + 44} 757 ${flower.x + 66} 778 Q ${flower.x + 48} 814 ${flower.x + flower.lean * .2} 805Z`} />
          <g className="backdrop-head" transform={`translate(${flower.x + flower.lean} ${top}) scale(${flower.size})`} style={{ color: flower.color }}>
            <path d="M-23 17 C-35-11-28-35-13-43 C-6-28-4-9 0 16Z" fill={flower.color}/>
            <path d="M-13 17 C-19-19-9-48 0-53 C10-39 9-9 7 17Z" fill="#f8b7a9"/>
            <path d="M-2 17 C6-11 11-40 24-43 C36-27 31-5 19 17Z" fill={flower.color}/>
            <path d="M-20 13 Q0 22 23 13" fill="none" stroke="#fff0dc" strokeWidth="2" opacity=".65"/>
          </g>
        </g>;
      })}
    </svg>
  );
}

function Butterfly({ color }) {
  return (
    <svg className="butterfly-mark" viewBox="0 0 48 40" aria-hidden="true">
      <g className="butterfly-wing wing-left" fill={color}>
        <path d="M23 18C13 2 2 3 4 14c1 6 8 9 17 9Z" />
        <path d="M22 21C10 15 5 23 11 29c4 4 9 1 13-4Z" opacity=".88" />
      </g>
      <g className="butterfly-wing wing-right" fill={color}>
        <path d="M25 18C35 2 46 3 44 14c-1 6-8 9-17 9Z" />
        <path d="M26 21c12-6 17 2 11 8-4 4-9 1-13-4Z" opacity=".88" />
      </g>
      <path d="M24 15v14" stroke="#775c52" strokeWidth="2" strokeLinecap="round" />
      <path d="m23 16-4-5m6 5 4-5" fill="none" stroke="#775c52" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Garden({ opened, onFlowerTap }) {
  return (
    <svg className={`garden-art ${opened ? "garden-opened" : ""}`} viewBox="0 0 720 600" role="img" aria-label="Năm bông tulip màu hồng được vẽ tay trong khu vườn">
      <defs>
        <radialGradient id="wash"><stop stopColor="#fff8ee" stopOpacity=".75" /><stop offset="1" stopColor="#f9e7d2" stopOpacity="0" /></radialGradient>
        <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="9"/><feColorMatrix values=".3 0 0 0 .7 .3 0 0 0 .55 .3 0 0 0 .4 0 0 0 .1 0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
      </defs>
      <ellipse cx="360" cy="435" rx="300" ry="155" fill="url(#wash)" />
      <g className="garden-sway" filter="url(#paper)">
        {stems.map((flower, i) => <g key={i} onClick={() => onFlowerTap(i)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onFlowerTap(i); } }} className="flower-hit" role="button" tabIndex="0" aria-label={`Chạm vào tulip ${i + 1}`}><Tulip {...flower} index={i} /></g>)}
      </g>
      <g className="petal-drift" aria-hidden="true">
        <path d="M125 220 Q143 201 148 222 Q143 240 125 220Z" fill="#e98f8c" />
        <path d="M585 280 Q606 261 612 284 Q601 302 585 280Z" fill="#edb1a7" />
        <path d="M162 358 Q177 344 183 362 Q174 377 162 358Z" fill="#da7e80" />
      </g>
    </svg>
  );
}

export default function Home() {
  const [to, setTo] = useState("Bạn");
  const [from, setFrom] = useState("");
  const [wish, setWish] = useState(DEFAULT_WISH);
  const [opened, setOpened] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [portalReady, setPortalReady] = useState(false);
  const root = useRef(null);
  const card = useRef(null);
  const audio = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTo((params.get("to") || "Bạn").slice(0, 40));
    setFrom((params.get("from") || "").slice(0, 40));
    if (params.has("wish")) setWish(params.get("wish").slice(0, 600));
    if (params.has("id")) {
      fetch(`/api/cards/${encodeURIComponent(params.get("id"))}`, { cache: "no-store" })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Không thể mở thiệp.");
          setTo(data.to || "Bạn"); setFrom(data.from || ""); setWish(data.wish || DEFAULT_WISH);
        })
        .catch((error) => setNotice(error.message));
    }
  }, []);

  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({ defaults: { ease: "power2.out" } });
      reveal.fromTo(".backdrop-stem", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.9, stagger: 0.08 })
        .fromTo(".stem", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 1.05, stagger: 0.11 }, "-=0.42")
        .fromTo(".intro-copy > *", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.11 }, "-=0.9");
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!opened || !card.current) return;
    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({ defaults: { ease: "power3.out" } });
      reveal.fromTo(card.current,
        { y: 66, rotationX: -13, scale: 0.84, opacity: 0, transformPerspective: 1100 },
        { y: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" },
      )
        .fromTo(".card-aura", { scale: 0.55, opacity: 0 }, { scale: 1.35, opacity: 0.8, duration: 0.55, ease: "power2.out" }, 0)
        .to(".card-aura", { opacity: 0, duration: 0.65, ease: "power1.out" }, 0.55)
        .fromTo(".card-corner", { scale: 0.2, rotation: -35, opacity: 0 }, { scale: 1, rotation: 0, opacity: 0.8, duration: 0.55, stagger: 0.07 }, "-=0.85")
        .fromTo(".card-sparkle", { scale: 0, rotation: -50, opacity: 0 }, { scale: 1, rotation: 0, opacity: 0.9, duration: 0.48, stagger: 0.065 }, "-=0.55")
        .fromTo(".letter-kicker, .letter-card h2, .date-mark, .to-line", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58, stagger: 0.1 }, "-=0.66")
        .fromTo(".wish-line", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58, stagger: 0.27 }, "-=0.35")
        .fromTo(".from-line, .heart-button, .final-bloom", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.28");
    }, root);
    return () => ctx.revert();
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    let previousY = window.scrollY;
    let travelledToCard = false;
    let scrollDirection = 0;
    let distanceInDirection = 0;
    let lastButterflyBurst = 0;
    const animationsReadyAt = Date.now() + 1100;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (delta !== 0) {
        const nextDirection = Math.sign(delta);
        if (nextDirection !== scrollDirection) distanceInDirection = 0;
        scrollDirection = nextDirection;
        distanceInDirection += Math.abs(delta);
        const now = Date.now();
        if (now >= animationsReadyAt && distanceInDirection > 34 && now - lastButterflyBurst > 1050) {
          lastButterflyBurst = now;
          distanceInDirection = 0;
          const burstId = `scroll-${now}`;
          const burst = Array.from({ length: 5 }, (_, i) => ({
            id: `${burstId}-${i}`,
            left: 19 + Math.random() * 62,
            delay: i * 0.12,
            drift: [-15, 12, -8, 17, -12][i],
            color: ["#d67c82", "#cf9690", "#b98489", "#e19b85", "#998b78"][i],
          }));
          setButterflies((items) => [...items.slice(-10), ...burst]);
          window.setTimeout(() => setButterflies((items) => items.filter((item) => !item.id.startsWith(burstId))), 2900);
        }
      }
      if (currentY > window.innerHeight * 0.72) travelledToCard = true;
      if (travelledToCard && currentY < previousY && currentY < window.innerHeight * 0.48) {
        travelledToCard = false;
        const burst = Array.from({ length: 12 }, (_, i) => ({
          id: `return-${Date.now()}-${i}`,
          left: 28 + Math.random() * 44,
          delay: Math.random() * 0.35,
          petal: true,
        }));
        setHearts(burst);
        window.setTimeout(() => setHearts((items) => items.filter((item) => !item.id.startsWith("return-"))), 2400);
        gsap.fromTo(".stem", { scaleY: 0.94, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.9, stagger: 0.08, ease: "power2.out", overwrite: true });
        gsap.fromTo(".backdrop-stem", { scaleY: 0.98, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.9, stagger: 0.06, ease: "power2.out", overwrite: true });
      }
      previousY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  useEffect(() => {
    if (!soundOn) return;
    playNote();
    const timer = window.setInterval(playNote, 6800);
    return () => window.clearInterval(timer);
  }, [soundOn]);

  function playNote() {
    if (!soundOn) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audio.current ||= new AudioContextClass();
    if (audio.current.state === "suspended") audio.current.resume();
    [523.25, 659.25, 783.99].forEach((frequency, i) => {
      const oscillator = audio.current.createOscillator();
      const gain = audio.current.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audio.current.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.025, audio.current.currentTime + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.current.currentTime + i * 0.08 + 0.55);
      oscillator.connect(gain).connect(audio.current.destination);
      oscillator.start(audio.current.currentTime + i * 0.08);
      oscillator.stop(audio.current.currentTime + i * 0.08 + 0.6);
    });
  }

  function openCard() {
    if (opened) return;
    setOpened(true);
    playNote();
    setHearts(Array.from({ length: 22 }, (_, i) => ({ id: `${Date.now()}-${i}`, left: 35 + Math.random() * 30, delay: Math.random() * 0.65, petal: i < 16 })));
    window.setTimeout(() => setHearts([]), 2400);
    window.setTimeout(() => document.querySelector(".letter-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
  }

  async function getShareUrl() {
    const params = new URLSearchParams();
    if (wish === DEFAULT_WISH) {
      if (to.trim() && to !== "Bạn") params.set("to", to.trim());
      if (from.trim()) params.set("from", from.trim());
    } else if (wish.length > 220) {
      const response = await fetch("/api/cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, from, wish }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không thể lưu thiệp.");
      params.set("id", data.id);
    } else {
      if (to.trim() && to !== "Bạn") params.set("to", to.trim());
      if (from.trim()) params.set("from", from.trim());
      params.set("wish", wish);
    }
    return `${window.location.origin}${window.location.pathname}${params.size ? `?${params}` : ""}`;
  }

  async function makeLink(event) {
    event.preventDefault();
    try {
      const url = await getShareUrl();
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setNotice("Đã tạo và sao chép liên kết thiệp 🌷");
      } else setNotice(url);
    } catch (error) { setNotice(error.message); }
  }

  async function shareCard() {
    try {
      const url = await getShareUrl();
      if (navigator.share) await navigator.share({ title: "A Little Flower For You", text: "Một đóa hoa nhỏ dành cho bạn 🌷", url });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); setNotice("Đã sao chép liên kết để bạn gửi đi 🌷"); }
      else setNotice(url);
    } catch (error) { setNotice(error.message); }
  }

  function sendHeart() {
    setHearts((items) => [...items, { id: `${Date.now()}-${Math.random()}`, left: 44 + Math.random() * 12, delay: 0 }]);
    playNote();
    window.setTimeout(() => setHearts((items) => items.slice(1)), 1800);
  }

  const renderedWish = wish.replaceAll("{to}", to.trim() || "Bạn").split("\n").filter(Boolean);

  return (
    <>
    <MotionConfig reducedMotion="never">
    <main ref={root} className={`page-shell ${opened ? "is-open" : ""}`}>
      <div className="paper-grain" aria-hidden="true" />
      <section className="garden-scene" aria-label="Khu vườn tulip ngày 20 tháng 10">
        <BackdropGarden />
        <div className="scene-topline"><span>20 · 10</span><span className="topline-flower">✿</span><span>Một điều dịu dàng</span></div>
        <div className="garden-wrap"><Garden opened={opened} onFlowerTap={() => { playNote(); document.querySelector(".garden-art")?.classList.add("flower-tap"); window.setTimeout(() => document.querySelector(".garden-art")?.classList.remove("flower-tap"), 700); }} />
          <div className="intro-copy">
            <span className="eyebrow">VƯỜN NHỎ DÀNH TẶNG BẠN</span>
            <h1>A Little Flower<br /><em>For You</em></h1>
            <p>Giữa khu vườn tháng Mười, có một đóa hoa<br className="desktop-break" /> nhỏ đang đợi được gửi trao.</p>
            {!opened && <motion.button whileTap={{ scale: 0.96 }} className="open-button" onClick={openCard}>Chạm để nhận hoa <span aria-hidden="true">♡</span></motion.button>}
          </div>
        </div>
        <div className="scene-bottom"><span>TRƯỢT NHẸ ĐỂ KHÁM PHÁ</span><span className="scroll-stem" /></div>
        {hearts.map((heart) => <span key={heart.id} className={heart.petal ? "floating-petal" : "floating-heart"} style={{ left: `${heart.left}%`, animationDelay: `${heart.delay}s` }} aria-hidden="true">{heart.petal ? "❀" : "♡"}</span>)}
      </section>

      <section className={`letter-section ${opened ? "letter-visible" : "letter-waiting"}`}>
        <div className="letter-ornament" aria-hidden="true">❧</div>
        <div className="card-stage">
        <span className="card-aura" aria-hidden="true" />
        <article className="letter-card" ref={card} aria-live="polite">
          {Array.from({ length: 8 }, (_, i) => <span key={i} className={`card-sparkle sparkle-${i + 1}`} aria-hidden="true">✦</span>)}
          <div className="card-corner corner-tl">❀</div><div className="card-corner corner-tr">❀</div><div className="card-corner corner-bl">❀</div><div className="card-corner corner-br">❀</div>
          <p className="letter-kicker">A GIFT FOR YOU</p>
          <h2>Happy Women’s Day</h2>
          <div className="date-mark"><span>20</span><i /> <span>10</span></div>
          <p className="to-line">Gửi đến <strong>{to.trim() || "Bạn"}</strong> <span>♡</span></p>
          <div className="wish-copy">{renderedWish.map((line, i) => <p className="wish-line" key={i}>{line}</p>)}</div>
          <p className="from-line">{from.trim() ? `Thương gửi từ ${from.trim()}` : "Với tất cả yêu thương"}</p>
          <button className="heart-button" onClick={sendHeart} aria-label="Gửi một trái tim">♡</button>
          <p className="final-bloom">You deserve all the beautiful things ♡</p>
        </article>
        </div>
        <div className="letter-actions">
          <button className="share-button" onClick={shareCard}>Chia sẻ thiệp <span>↗</span></button>
          <button className={`sound-button ${soundOn ? "sound-on" : ""}`} onClick={() => setSoundOn((value) => !value)} aria-pressed={soundOn}>{soundOn ? "♫ Âm thanh đang bật" : "♫ Bật giai điệu"}</button>
        </div>
        <button className="builder-toggle" onClick={() => setBuilderOpen((value) => !value)} aria-expanded={builderOpen}>{builderOpen ? "Khép lại" : "Tự tay gửi một đóa hoa"} <span>{builderOpen ? "−" : "+"}</span></button>
        {builderOpen && <motion.form className="builder-form" onSubmit={makeLink} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <label>Tên người nhận<input maxLength={40} value={to === "Bạn" ? "" : to} onChange={(e) => setTo(e.target.value)} placeholder="Ví dụ: Ngọc Anh" autoComplete="off" /></label>
          <label>Tên người gửi <small>(không bắt buộc)</small><input maxLength={40} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Tên của bạn" autoComplete="off" /></label>
          <label>Lời chúc<textarea maxLength={600} rows={6} value={wish} onChange={(e) => setWish(e.target.value)} /></label>
          <button className="share-button create-button" type="submit">Tạo thiệp của bạn <span>♡</span></button>
          <p className="form-note" role="status">{notice || "Thiệp được tạo ngay trên trình duyệt của bạn."}</p>
        </motion.form>}
        <footer>Gửi một chút dịu dàng, vào ngày thật đẹp.</footer>
      </section>
    </main>
    </MotionConfig>
    {portalReady && butterflies.length > 0 && createPortal(
      <div className="butterfly-layer" aria-hidden="true">
        {butterflies.map((butterfly) => <span key={butterfly.id} className="butterfly-flight" style={{ left: `${butterfly.left}%`, animationDelay: `${butterfly.delay}s`, "--flight-drift": `${butterfly.drift}vw` }}><Butterfly color={butterfly.color} /></span>)}
      </div>,
      document.body,
    )}
    </>
  );
}

