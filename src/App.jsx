import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Music, Cat, Calendar, Star, Sparkles, ChevronDown } from "lucide-react";

const CONFIG = {
  startDate: new Date(2026, 0, 9),
  names: { him: "Максим", her: "Дашуля" },
  subtitle: "Тот самый день, когда всё изменилось ✨",
};

const colors = {
  rose:     "#FFB7C5",
  blush:    "#FFD6E0",
  cream:    "#FFF8F0",
  mint:     "#C8F0E8",
  lavender: "#E8D5F5",
  warm:     "#FFF0E6",
  text:     "#5C4A5A",
  soft:     "#9B8899",
};

function FloatingHeart({ x, y, id, onDone }) {
  const emojis = ["💕", "🌸", "✨", "💖", "🌷", "💝"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return (
    <motion.div
      key={id}
      initial={{ opacity: 1, x, y, scale: 0.5 }}
      animate={{ opacity: 0, y: y - 160, scale: 1.4, rotate: Math.random() * 40 - 20 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      onAnimationComplete={onDone}
      style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, fontSize: 28 }}
    >
      {emoji}
    </motion.div>
  );
}

function useFloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const spawn = (e) => {
    const x = e.clientX - 14;
    const y = e.clientY - 14;
    const id = Date.now() + Math.random();
    setHearts(h => [...h, { id, x, y }]);
  };
  const remove = (id) => setHearts(h => h.filter(hh => hh.id !== id));
  return { hearts, spawn, remove };
}

function Confetti({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    emoji: ["🐱", "💕", "🌸", "⭐", "🎀", "✨"][i % 6],
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
    delay: Math.random() * 0.5,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}>
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: -20, x: p.x }}
          animate={{ opacity: 0, y: (typeof window !== "undefined" ? window.innerHeight : 800) + 40, rotate: 360 * 3 }}
          transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: "easeIn" }}
          style={{ position: "absolute", top: 0, fontSize: 22 }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const { hearts, spawn, remove } = useFloatingHearts();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <section style={{
      minHeight: "100svh",
      background: `linear-gradient(160deg, ${colors.blush} 0%, ${colors.cream} 50%, ${colors.mint} 100%)`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 16px 40px",
    }}>
      <div style={{ position: "absolute", top: -80, left: -80, width: 280, height: 280, borderRadius: "50%", background: colors.rose, opacity: 0.25, filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: colors.lavender, opacity: 0.3, filter: "blur(50px)" }} />

      <motion.div style={{ y, width: "100%", maxWidth: 480 }} className="relative z-10">
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: 999,
              padding: "8px 18px",
              marginBottom: 20,
              boxShadow: "0 2px 20px rgba(255,183,197,0.3)",
              border: `1px solid ${colors.rose}`,
            }}
          >
            <Heart size={13} fill={colors.rose} color={colors.rose} />
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: colors.soft, fontWeight: 600 }}>love story</span>
            <Heart size={13} fill={colors.rose} color={colors.rose} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "clamp(40px, 12vw, 80px)",
              color: colors.text,
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Наша История
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(14px, 3.5vw, 17px)",
              color: colors.soft,
              maxWidth: 360,
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            {CONFIG.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            style={{ position: "relative", display: "inline-block", margin: "0 auto 28px" }}
          >
            <div style={{
              width: "clamp(220px, 72vw, 340px)",
              height: "clamp(260px, 85vw, 400px)",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: `0 20px 60px rgba(255,183,197,0.5), 0 4px 20px rgba(0,0,0,0.08)`,
              border: "5px solid white",
              position: "relative",
            }}>
              <img
                src="/public/images/our_photo.jpg"
                alt="Мы вместе"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,183,197,0.3) 0%, transparent 50%)" }} />
            </div>
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ position: "absolute", top: -14, right: -14, background: "white", borderRadius: 999, padding: "7px 12px", fontSize: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >🌸</motion.div>
            <motion.div
              animate={{ rotate: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              style={{ position: "absolute", bottom: -12, left: -12, background: "white", borderRadius: 999, padding: "7px 12px", fontSize: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >💕</motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)",
              borderRadius: 999,
              padding: "11px 22px",
              boxShadow: "0 4px 24px rgba(255,183,197,0.25)",
              border: "1px solid rgba(255,183,197,0.4)",
              marginBottom: 28,
            }}
          >
            <Calendar size={15} color={colors.rose} />
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 14, color: colors.text, fontWeight: 700 }}>
              1 Января 2026 — навсегда 💖
            </span>
          </motion.div>

          <div>
            <motion.button
              onClick={spawn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                background: `linear-gradient(135deg, ${colors.rose}, #ff8fab)`,
                color: "white",
                border: "none",
                borderRadius: 999,
                padding: "14px 30px",
                cursor: "pointer",
                boxShadow: `0 8px 30px rgba(255,143,171,0.45)`,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                touchAction: "manipulation",
              }}
            >
              <Heart size={17} fill="white" /> Нажми меня!
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}
      >
        <ChevronDown size={22} color={colors.soft} />
      </motion.div>

      {hearts.map(h => <FloatingHeart key={h.id} {...h} onDone={() => remove(h.id)} />)}
    </section>
  );
}

const aboutData = {
  him: {
    emoji: "🎮",
    color: colors.lavender,
    facts: ["Немношка красивый (она так сказала)", "Пишет код в 3 ночи (правда)", "Немношка умный (я сам так сказал)"],
    loves: ["🎵 Музыка", "🐱 Дашуля", "🌙 Писать код", "Когда код работает"],
    photo: "/public/images/maksim.jpg",
  },
  her: {
    emoji: "🌸",
    color: colors.blush,
    facts: ["Самая красивая", "Самая милая", "Знает рецепт идеальных блинов", "Умеет хорошо рисовать"],
    loves: ["🎨 Рисование", "🐱 Котики", "🌿 Бравл старс", "📚 Книги"],
    photo: "/public/images/dasha.jpg",
  },
};

function AboutCard({ data, name, side }) {
  const { hearts, spawn, remove } = useFloatingHearts();
  return (
    <FadeIn direction={side} className="flex-1">
      <div style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)",
        borderRadius: 28,
        padding: "28px 22px",
        boxShadow: "0 8px 40px rgba(255,183,197,0.15)",
        border: "1px solid rgba(255,255,255,0.8)",
        height: "100%",
      }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", margin: "0 auto 18px", border: "4px solid white", boxShadow: "0 4px 20px rgba(255,183,197,0.4)" }}>
          <img src={data.photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <span style={{ fontSize: 26 }}>{data.emoji}</span>
          <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: 26, color: colors.text, margin: "7px 0 3px" }}>{name}</h3>
        </div>
        <div style={{ marginBottom: 18 }}>
          {data.facts.map((f, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 0",
              borderBottom: i < data.facts.length - 1 ? "1px solid rgba(255,183,197,0.2)" : "none",
            }}>
              <span style={{ color: colors.rose, flexShrink: 0 }}>✦</span>
              <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: colors.text }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {data.loves.map((l, i) => (
            <span key={i} style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              background: `${data.color}80`,
              color: colors.text,
              borderRadius: 999,
              padding: "5px 12px",
            }}>{l}</span>
          ))}
        </div>
        <motion.button
          onClick={spawn}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            width: "100%",
            marginTop: 22,
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            background: `${data.color}90`,
            color: colors.text,
            border: "none",
            borderRadius: 999,
            padding: "12px",
            cursor: "pointer",
            touchAction: "manipulation",
          }}
        >
          💕 Отправить любовь
        </motion.button>
        {hearts.map(h => <FloatingHeart key={h.id} {...h} onDone={() => remove(h.id)} />)}
      </div>
    </FadeIn>
  );
}

function AboutUs() {
  return (
    <section style={{ padding: "72px 16px", background: colors.warm }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text, marginBottom: 10 }}>О нас</h2>
            <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Два совершенно разных человека, созданных друг для друга 🌸</p>
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px" }}>
            <AboutCard data={aboutData.him} name={CONFIG.names.him} side="left" />
          </div>
          <div style={{ flex: "1 1 260px" }}>
            <AboutCard data={aboutData.her} name={CONFIG.names.her} side="right" />
          </div>
        </div>
      </div>
    </section>
  );
}

const catsData = [
  { name: "Пуговка", desc: "Главная принцесса дома 👑", photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80", rotate: -4 },
  { name: "Мурзик", desc: "Любит греться на ноутбуке 💻", photo: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&q=80", rotate: 3 },
  { name: "Рыжик", desc: "Охотник на носки 🧦", photo: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&q=80", rotate: -2 },
];

function PolaroidCard({ cat, index }) {
  return (
    <FadeIn delay={index * 0.15}>
      <motion.div
        whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
        whileTap={{ rotate: 0, scale: 1.03 }}
        style={{
          rotate: cat.rotate,
          background: "white",
          padding: "14px 14px 36px",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "inline-block",
          width: "clamp(150px, 42vw, 220px)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 2, marginBottom: 14 }}>
          <img src={cat.photo} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ fontFamily: "'Pacifico', cursive", fontSize: 16, color: colors.text, marginBottom: 4, textAlign: "center" }}>{cat.name}</p>
        <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: colors.soft, textAlign: "center" }}>{cat.desc}</p>
      </motion.div>
    </FadeIn>
  );
}

function OurCats() {
  return (
    <section style={{ padding: "72px 16px", background: `linear-gradient(180deg, ${colors.warm}, ${colors.blush}30)` }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Cat size={26} color={colors.rose} />
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text }}>Наши будущие котики</h2>
            <Cat size={26} color={colors.rose} />
          </div>
          <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, marginBottom: 44, fontSize: "clamp(13px, 3.5vw, 15px)" }}>
            Наводи на фото — они любят внимание 🐾
          </p>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
          {catsData.map((cat, i) => <PolaroidCard key={i} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const timelineData = [
  { date: "31 Декабря 2025", title: "Первая прогулка", desc: "Тот самый вечер, когда мы встретились у магазина", emoji: "🌟", color: colors.rose },
  { date: "9 Января 2026", title: "Первое «Я люблю тебя»", desc: "Прощаясь, у подъезда — немного испуганно и тихо", emoji: "💕", color: colors.lavender },
  { date: "Coming Soon", title: "Первый отпуск", desc: "Море, закаты, мороженое и ни одной тревоги в голове", emoji: "🌊", color: colors.mint },
  { date: "Coming Soon", title: "Переехали вместе", desc: "Теперь у нас общий холодильник — это серьёзно", emoji: "🏠", color: colors.blush },
  { date: "Coming Soon", title: "Котёнок терминатор", desc: "Нас стало трое. Она сразу украла все сердца", emoji: "🐱", color: colors.rose },
  { date: "Сейчас", title: "Продолжение следует...", desc: "Каждый день — новая страница нашей истории 💕", emoji: "📖", color: colors.lavender },
];

function Timeline() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  return (
    <section style={{ padding: "72px 16px", background: colors.cream }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text, marginBottom: 10 }}>Наша лента</h2>
            <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Моменты, которые сделали нас нами 🌸</p>
          </div>
        </FadeIn>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "clamp(20px, 5vw, 50%)",
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, transparent, ${colors.rose}, ${colors.lavender}, transparent)`,
            transform: window.innerWidth >= 600 ? "translateX(-50%)" : "none",
          }} />

          {timelineData.map((item, i) => {
            const isDesktop = typeof window !== "undefined" && window.innerWidth >= 600;
            const isRight = isDesktop && i % 2 !== 0;

            return (
              <FadeIn key={i} delay={i * 0.1} direction={isRight ? "right" : "left"}>
                <div style={{
                  display: "flex",
                  justifyContent: isDesktop ? (i % 2 === 0 ? "flex-start" : "flex-end") : "flex-end",
                  marginBottom: 28,
                  position: "relative",
                  paddingLeft: isDesktop ? 0 : "clamp(36px, 8vw, 52px)",
                }}>
                  <div style={{
                    position: "absolute",
                    left: isDesktop ? "50%" : "clamp(13px, 3.5vw, 20px)",
                    top: 20,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: item.color,
                    border: "3px solid white",
                    transform: isDesktop ? "translateX(-50%)" : "none",
                    boxShadow: "0 0 0 4px rgba(255,183,197,0.3)",
                    zIndex: 2,
                  }} />

                  <div style={{
                    width: isDesktop ? "calc(50% - 28px)" : "100%",
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 22,
                    padding: "18px 20px",
                    boxShadow: "0 4px 24px rgba(255,183,197,0.15)",
                    border: "1px solid rgba(255,255,255,0.8)",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{item.emoji}</div>
                    <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 700, color: colors.soft, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.date}</div>
                    <h4 style={{ fontFamily: "'Pacifico', cursive", fontSize: 17, color: colors.text, marginBottom: 5 }}>{item.title}</h4>
                    <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: colors.soft, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function useLoveCounter() {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now - CONFIG.startDate;
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTime({ days, hours, minutes, seconds });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function CounterBox({ value, label }) {
  return (
    <motion.div
      key={value}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        borderRadius: 20,
        padding: "20px 14px",
        minWidth: "clamp(64px, 20vw, 96px)",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(255,183,197,0.2)",
        border: "1px solid rgba(255,255,255,0.9)",
        flex: "1 1 0",
      }}
    >
      <div style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(24px, 7vw, 40px)", color: colors.text }}>{String(value).padStart(2, "0")}</div>
      <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, color: colors.soft, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
    </motion.div>
  );
}

function LoveCounter() {
  const { days, hours, minutes, seconds } = useLoveCounter();
  const { hearts, spawn, remove } = useFloatingHearts();

  return (
    <section style={{ padding: "72px 16px", background: `linear-gradient(160deg, ${colors.lavender}50, ${colors.rose}30, ${colors.mint}40)` }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text, marginBottom: 10 }}>Мы вместе уже</h2>
          <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, marginBottom: 36, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Каждая секунда — бесценна 💖</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32, padding: "0 4px" }}>
            <CounterBox value={days} label="дней" />
            <CounterBox value={hours} label="часов" />
            <CounterBox value={minutes} label="минут" />
            <CounterBox value={seconds} label="секунд" />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <motion.button
            onClick={spawn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              background: `linear-gradient(135deg, ${colors.rose}, #ff8fab)`,
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "14px 30px",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(255,143,171,0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              touchAction: "manipulation",
            }}
          >
            <Sparkles size={17} /> Нажми, когда скучаешь
          </motion.button>
        </FadeIn>
      </div>
      {hearts.map(h => <FloatingHeart key={h.id} {...h} onDone={() => remove(h.id)} />)}
    </section>
  );
}

const songs = [
  { title: "А люди любят", artist: "Дайте танк", duration: "2:42", emoji: "🎸", color: colors.lavender },
  { title: "Рассвет", artist: "Какая разница", duration: "2:04", emoji: "🌅", color: colors.blush },
  { title: "Котенок в колодце", artist: "Роман Шторгунов", duration: "3:28", emoji: "🐱", color: colors.mint },
  { title: "Даже если весь мир против нас", artist: "Призрак Июня", duration: "2:51", emoji: "🌙", color: colors.lavender },
  { title: "Total Eclipse Of The Heart", artist: "Bonnie Tyler", duration: "2:19", emoji: "💫", color: colors.rose },
];

function Playlist() {
  const [playing, setPlaying] = useState(null);

  return (
    <section style={{ padding: "72px 16px", background: colors.warm }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Music size={24} color={colors.rose} />
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text }}>Наш плейлист</h2>
            </div>
            <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Песни, которые звучат у нас в сердце 🎵</p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {songs.map((song, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                onClick={() => setPlaying(playing === i ? null : i)}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: playing === i ? `${song.color}60` : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 18,
                  padding: "14px 16px",
                  cursor: "pointer",
                  border: `1px solid ${playing === i ? song.color : "rgba(255,255,255,0.8)"}`,
                  boxShadow: "0 2px 16px rgba(255,183,197,0.12)",
                  touchAction: "manipulation",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `${song.color}80`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{song.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 14, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{song.title}</div>
                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: colors.soft }}>{song.artist}</div>
                </div>
                {playing === i && (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                    <span style={{ fontSize: 18 }}>🎵</span>
                  </motion.div>
                )}
                <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: colors.soft, flexShrink: 0 }}>{song.duration}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SurpriseSection() {
  const [boom, setBoom] = useState(false);
  const trigger = () => {
    setBoom(true);
    setTimeout(() => setBoom(false), 3000);
  };

  return (
    <section style={{ padding: "60px 16px", background: `linear-gradient(160deg, ${colors.mint}50, ${colors.blush}60)`, textAlign: "center" }}>
      <FadeIn>
        <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(22px, 6vw, 38px)", color: colors.text, marginBottom: 10 }}>Нажми, когда скучаешь</h2>
        <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, marginBottom: 30, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Только не злоупотребляй 😸</p>
        <motion.button
          onClick={trigger}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94, rotate: -3 }}
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 20,
            background: `linear-gradient(135deg, #ff8fab, ${colors.rose})`,
            color: "white",
            border: "none",
            borderRadius: 999,
            padding: "16px 38px",
            cursor: "pointer",
            boxShadow: "0 10px 40px rgba(255,143,171,0.5)",
            touchAction: "manipulation",
          }}
        >
          🐱 Взрыв котиков!
        </motion.button>
      </FadeIn>
      <Confetti active={boom} />
    </section>
  );
}

const wishes = [
  { text: "Переехать жить вместе в красивый дом", emoji: "🏠", done: false },
  { text: "Посмотреть северное сияние", emoji: "🌌", done: false },
  { text: "Завести кота", emoji: "🐱", done: false },
  { text: "Быть вместе навсегда", emoji: "💕", done: true },
  { text: "Посетить все страны мира", emoji: "✈️", done: false },
  { text: "Быть счастливыми вместе", emoji: "🌟", done: true },
];

function Wishlist() {
  const [items, setItems] = useState(wishes);
  const toggle = (i) => setItems(prev => prev.map((w, idx) => idx === i ? { ...w, done: !w.done } : w));

  return (
    <section style={{ padding: "72px 16px", background: colors.cream }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Star size={22} color={colors.rose} />
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(28px, 8vw, 48px)", color: colors.text }}>Мечты на двоих</h2>
            </div>
            <p style={{ fontFamily: "'Quicksand', sans-serif", color: colors.soft, fontSize: "clamp(13px, 3.5vw, 15px)" }}>Нажимай на пункты — отмечай выполненное! ✨</p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((w, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                onClick={() => toggle(i)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: w.done ? `${colors.mint}50` : "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 18,
                  padding: "14px 18px",
                  cursor: "pointer",
                  border: `1px solid ${w.done ? colors.mint : "rgba(255,255,255,0.8)"}`,
                  boxShadow: "0 2px 12px rgba(255,183,197,0.1)",
                  touchAction: "manipulation",
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 11, background: w.done ? `${colors.mint}80` : `${colors.blush}80`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{w.emoji}</div>
                <span style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600, fontSize: 14, color: w.done ? colors.soft : colors.text, textDecoration: w.done ? "line-through" : "none", flex: 1 }}>{w.text}</span>
                <motion.div animate={{ scale: w.done ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                  {w.done ? <span style={{ fontSize: 18 }}>✅</span> : <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${colors.rose}`, opacity: 0.5 }} />}
                </motion.div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "36px 16px", background: `linear-gradient(160deg, ${colors.blush}, ${colors.lavender}60)`, textAlign: "center" }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ fontSize: 34, marginBottom: 10 }}
      >💕</motion.div>
      <p style={{ fontFamily: "'Pacifico', cursive", fontSize: 20, color: colors.text, marginBottom: 7 }}>{CONFIG.names.him} & {CONFIG.names.her}</p>
      <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: colors.soft }}>Сделано с любовью · 2026 · навсегда 🌸</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #FFF8F0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #FFD6E0; }
        ::-webkit-scrollbar-thumb { background: #FFB7C5; border-radius: 999px; }
        @media (max-width: 480px) {
          section { padding-left: 14px !important; padding-right: 14px !important; }
        }
      `}</style>

      <Hero />
      <AboutUs />
      <OurCats />
      <Timeline />
      <LoveCounter />
      <Playlist />
      <SurpriseSection />
      <Wishlist />
      <Footer />
    </>
  );
}