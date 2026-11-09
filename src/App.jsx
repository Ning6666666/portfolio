import { useEffect, useMemo, useRef, useState } from "react";
import Grainient from "./Grainient";
import BorderGlow from "./BorderGlow";
import SpotlightCard from "./SpotlightCard";
import SpecularButton from "./SpecularButton";
import GooeyNav from "./GooeyNav";
import SlingButton from "./SlingButton";
import LiquidEther from "./LiquidEther";
import TiltedCard from "./TiltedCard";
import Threads from "./Threads";
import { initPortfolioAnimations } from "./animations";

const projects = [
  {
    id: "last-tram",
    number: "01",
    title: "末班车",
    english: "THE LAST TRAM",
    category: "AI SHORT FILM",
    year: "2026.10",
    image: "/media/project-last-tram.webp",
    video: "/media/project-last-tram-preview.mp4",
    poster: "/media/project-last-tram-poster.webp",
    film: "/media/last-tram-film.mp4",
    summary:
      "独立完成从剧本、分镜、视觉生成到剪辑交付的全流程 AI 短片。以双时空交错的叙事，连接 1930 年代青年战士与当代都市女性。",
    metrics: ["03′40″", "65 SHOTS", "1080P / 30FPS"],
    tools: "LIBTV / CHATGPT / 剪映专业版",
    highlights: [
      "完成约 65 镜分镜设计，并围绕角色一致性、镜头连续性和双时空场景搭建 AI 视频工作流。",
      "对生成镜头进行筛选、补镜与问题修正，并通过多轨剪辑完成节奏、转场、字幕与声音整合。",
      "以冷峻夜景到黎明暖光的色彩推进，完成跨时空相遇的情绪与叙事落点。",
    ],
  },
  {
    id: "ayan",
    number: "02",
    title: "吼山怪 · 阿岩",
    english: "A-YAN / CHARACTER IP",
    category: "CHARACTER IP & VISUAL SYSTEM",
    year: "2026",
    image: "/media/project-ayan-cover.webp",
    summary:
      "以民间年画、青绿山水与山村市井为灵感，建立具有低饱和矿物色与东方志怪质感的角色 IP 视觉系统。",
    metrics: ["03 BOARDS", "16 EXPRESSIONS", "16 MERCH ITEMS"],
    tools: "CHATGPT / TAPNOW / DOUBAO",
    boards: [
      {
        src: "/media/ayan-board-01.webp",
        label: "角色设定 · 世界观",
        english: "CHARACTER SYSTEM",
        alt: "吼山怪阿岩角色设定展板，包含主视觉、三视图、灵感采风、配色与表情延展",
      },
      {
        src: "/media/ayan-board-02.webp",
        label: "场景海报 · 动作延展",
        english: "SCENES & ACTIONS",
        alt: "吼山怪阿岩场景海报展板，包含五站海报与六组动作延展",
      },
      {
        src: "/media/ayan-board-03.webp",
        label: "文创周边 · IP 应用",
        english: "MERCHANDISE",
        alt: "吼山怪阿岩文创周边展板，包含帆布包、马克杯、手机壳、徽章与贴纸",
      },
    ],
    highlights: [
      "完成角色三视图、16 款表情、6 组动作、5 站场景海报、16 款文创周边与 3 页展板。",
      "统一角色、场景与周边视觉，让角色母版能够延展到不同内容与应用场景。",
      "结合 ChatGPT 打磨世界观与提示词，并通过 TapNow、豆包沉淀可复用的 AI 视觉生产流程。",
    ],
  },
];

const capabilities = [
  {
    number: "01",
    title: "AI 影像制作",
    english: "AIGC VIDEO",
    note: "生成链路",
    body: "LibTV 节点式生成、文生视频与图生视频，围绕角色一致性、镜头连续性、场景控制和镜头筛选搭建完整流程。",
    tags: ["LIBTV", "CHATGPT", "AI WORKFLOW"],
  },
  {
    number: "02",
    title: "视觉与品牌系统",
    english: "VISUAL IDENTITY",
    note: "视觉规范",
    body: "从概念、视觉规范到场景物料与展板，建立可延展的统一语言，让风格在多种媒介中保持一致。",
    tags: ["ART DIRECTION", "LAYOUT", "SYSTEM"],
  },
  {
    number: "03",
    title: "角色 IP 设计",
    english: "CHARACTER IP",
    note: "角色母版",
    body: "覆盖角色三视图、表情与动作延展、场景海报和文创周边，兼顾角色辨识度与商业应用。",
    tags: ["CHARACTER", "IP", "ILLUSTRATION"],
  },
  {
    number: "04",
    title: "后期与动态包装",
    english: "POST & MOTION",
    note: "节奏结构",
    body: "用剪辑、节奏、转场、字幕与声音完成叙事收束；熟悉剪映专业版、Photoshop 与 After Effects 的视觉精修。",
    tags: ["剪映专业版", "AFTER EFFECTS", "PHOTOSHOP"],
  },
];

function ArrowUpRight({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function CapabilityDiagram({ index }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="319" height="179" stroke="currentColor" strokeOpacity="0.16" />
        <path
          d="M55 42C102 42 106 90 158 90M55 138C102 138 106 90 158 90M158 90C210 90 210 40 262 40M158 90C210 90 210 140 262 140"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="0.9"
        />
        <circle cx="55" cy="42" r="11" stroke="currentColor" strokeOpacity="0.6" />
        <circle cx="55" cy="138" r="11" stroke="currentColor" strokeOpacity="0.6" />
        <circle cx="158" cy="90" r="20" stroke="currentColor" strokeOpacity="0.7" />
        <circle cx="262" cy="40" r="11" stroke="currentColor" strokeOpacity="0.6" />
        <circle cx="262" cy="140" r="11" stroke="currentColor" strokeOpacity="0.6" />
        <circle cx="158" cy="90" r="3" fill="currentColor" />
        <path d="M158 70V54M158 110v16" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2 3" />
        <text x="43" y="24">TEXT</text>
        <text x="37" y="166">IMAGE</text>
        <text x="140" y="62">NODE</text>
        <text x="248" y="22">SHOT</text>
        <text x="248" y="168">EDIT</text>
        <text x="168" y="50">CONSISTENCY</text>
        <text x="168" y="140">SELECT</text>
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="319" height="179" stroke="currentColor" strokeOpacity="0.16" />
        <g stroke="currentColor" strokeOpacity="0.24" strokeWidth="0.8">
          <rect x="40" y="26" width="240" height="126" />
          <path d="M40 63h240M40 100h240M40 137h240M88 26v126M136 26v126M184 26v126M232 26v126" />
          <path d="M30 26h-8M30 100h-8M30 152h-8" />
        </g>
        <rect x="136" y="26" width="48" height="126" fill="currentColor" fillOpacity="0.07" />
        <path d="M136 26v126M184 26v126" stroke="currentColor" strokeOpacity="0.55" />
        <rect x="40" y="137" width="30" height="15" fill="currentColor" fillOpacity="0.38" />
        <rect x="74" y="137" width="30" height="15" fill="currentColor" fillOpacity="0.22" />
        <rect x="108" y="137" width="30" height="15" fill="currentColor" fillOpacity="0.11" />
        <text x="192" y="21">TYPE</text>
        <text x="252" y="134">SPEC</text>
        <text x="40" y="170">MODULE / 12 COL</text>
        <text x="244" y="21">02 — IDENTITY</text>
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="319" height="179" stroke="currentColor" strokeOpacity="0.16" />
        <circle cx="112" cy="52" r="24" stroke="currentColor" strokeOpacity="0.65" />
        <path
          d="M112 76v42M86 94h52M112 118l-16 34M112 118l16 34"
          stroke="currentColor"
          strokeOpacity="0.65"
          strokeWidth="0.9"
        />
        <path
          d="M112 18v-8M112 28v10M88 52H76M136 52h12M72 160h80"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="2 3"
        />
        <circle cx="228" cy="40" r="11" stroke="currentColor" strokeOpacity="0.4" />
        <circle cx="228" cy="40" r="4" fill="currentColor" fillOpacity="0.75" />
        <path
          d="M228 51v22M214 64h28M228 73v28M228 101l-9 26M228 101l9 26"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <text x="130" y="50">TURNAROUND</text>
        <text x="198" y="26">EXPR</text>
        <text x="72" y="172">PROPORTION / 1 : 2.6</text>
        <text x="246" y="172">03 — MASTER</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="319" height="179" stroke="currentColor" strokeOpacity="0.16" />
      <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.7">
        <path d="M22 34h276M22 64h276M22 94h276M22 124h276M22 154h276" />
        <path d="M82 24v142M142 24v142M202 24v142M262 24v142" strokeDasharray="2 4" />
      </g>
      <rect x="22" y="28" width="96" height="6" fill="currentColor" fillOpacity="0.42" />
      <rect x="96" y="40" width="78" height="6" fill="currentColor" fillOpacity="0.2" />
      <rect x="22" y="58" width="58" height="6" fill="currentColor" fillOpacity="0.3" />
      <rect x="86" y="70" width="128" height="6" fill="currentColor" fillOpacity="0.15" />
      <path d="M26 88h64v22H26zM98 88h88v22H98zM194 88h78v22h-78z" stroke="currentColor" strokeOpacity="0.3" />
      <path
        d="M24 128c15-22 21 14 36-8s18 4 32-14 20 18 34-4 18 8 32-12 20 16 34-6 18 4 32-10"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="0.9"
      />
      <path d="M204 20v128" stroke="currentColor" strokeOpacity="0.85" />
      <path d="M199 20h10" stroke="currentColor" strokeOpacity="0.85" />
      <text x="210" y="26">PLAYHEAD</text>
      <text x="22" y="18">V1</text>
      <text x="22" y="52">A1</text>
      <text x="22" y="120">MIX</text>
      <text x="238" y="172">04 — TIMELINE</text>
    </svg>
  );
}

function ArrowDown({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v16M5.5 13.5 12 20l6.5-6.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function SectionLabel({ index, label, note }) {
  return (
    <div className="section-label" data-reveal>
      <div className="section-label__index">
        <span>{index}</span>
        <i />
        <span>{label}</span>
      </div>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function ProjectCover({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    let disposed = false;

    const play = () => {
      if (disposed) return;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const events = ["loadeddata", "canplay", "canplaythrough"];
    events.forEach((event) => video.addEventListener(event, play));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) play();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    play();

    return () => {
      disposed = true;
      events.forEach((event) => video.removeEventListener(event, play));
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [project.video]);

  if (project.video) {
    return (
      <video
        ref={videoRef}
        className="project__video"
        src={project.video}
        poster={project.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return <img src={project.image} alt={`${project.title}项目主视觉`} />;
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div className="project-modal" role="presentation" onMouseDown={onClose}>
      <section
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="project-modal__bar">
          <span>
            PROJECT / {project.number} — {project.year}
          </span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭项目详情">
            <CloseIcon />
          </button>
        </div>
        <div className={`project-modal__media ${project.film ? "is-film" : ""}`}>
          {project.film ? (
            <video
              className="project-modal__video"
              src={project.film}
              poster={project.poster}
              autoPlay
              controls
              playsInline
              preload="metadata"
              aria-label={`${project.title}完整短片`}
            />
          ) : (
            <img src={project.image} alt={`${project.title}项目主视觉`} />
          )}
        </div>
        <div className="project-modal__content">
          <div className="project-modal__heading">
            <p>{project.category}</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <span>{project.english}</span>
          </div>
          <div className="project-modal__details">
            <p className="project-modal__summary">{project.summary}</p>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="project-modal__meta">
              <span>{project.tools}</span>
              <span>{project.metrics.join(" / ")}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "首页", href: "#top" },
  { label: "关于", href: "#about" },
  { label: "作品", href: "#work" },
  { label: "能力", href: "#capabilities" },
  { label: "联系", href: "#contact" },
];

const NAV_HASHES = NAV_ITEMS.map((item) => item.href);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [time, setTime] = useState("");
  const [navActive, setNavActive] = useState(() => {
    const index = NAV_HASHES.indexOf(window.location.hash);
    return index >= 0 ? index : 0;
  });
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history.replaceState) {
      window.history.replaceState(null, "", href);
    }
  };

  const closeAndScroll = (href) => {
    closeMenu();
    scrollToSection(href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const anchors = NAV_HASHES.map((hash) => document.querySelector(hash)).filter(Boolean);
    if (!anchors.length) return undefined;

    const updateActive = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      anchors.forEach((anchor, index) => {
        const top = anchor.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = index;
      });
      setNavActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return undefined;

    const scrollToHash = () => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    document.fonts?.ready.then(scrollToHash);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const tick = () => {
      const value = new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai",
      }).format(new Date());
      setTime(value);
    };
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const cleanup = initPortfolioAnimations();
    return cleanup;
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    const email = "2265410431@qq.com";

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setEmailCopied(true);
  };

  const copyPhone = async () => {
    const phone = "15177924409";

    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      const field = document.createElement("textarea");
      field.value = phone;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setPhoneCopied(true);
  };

  useEffect(() => {
    if (!emailCopied) return undefined;
    const timer = window.setTimeout(() => setEmailCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [emailCopied]);

  useEffect(() => {
    if (!phoneCopied) return undefined;
    const timer = window.setTimeout(() => setPhoneCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [phoneCopied]);

  useEffect(() => {
    const preview = document.querySelector(".project__video");
    if (!preview) return;

    if (activeProject) {
      preview.pause();
    } else {
      preview.play().catch(() => {});
    }
  }, [activeProject]);

  return (
    <div className="site-shell">
      <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
        <div className="nav-ether" aria-hidden="true">
          <LiquidEther
            colors={["#0a0d12", "#243a4a", "#9db8d2"]}
            intensity={1}
            mouseForce={22}
            cursorSize={110}
            persistence={0.8}
            resolution={0.5}
            clickBurst={false}
            autoDemo
            autoSpeed={0.6}
            autoIntensity={2.4}
            intro
          />
        </div>
        <nav className="nav container" aria-label="主导航">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="回到首页">
            <span className="brand__mark">LZ</span>
            <span className="brand__text">
              廖振宁
              <small>VISUAL DESIGNER</small>
            </span>
          </a>

          <div className="nav-links">
            <GooeyNav
              items={NAV_ITEMS}
              activeIndex={navActive}
              onChange={(index) => setNavActive(index)}
              onNavigate={scrollToSection}
              theme="dark"
              size="md"
              frame
              color="#9db8d2"
              activeTextColor="#0c1015"
              particleCount={8}
              spread={28}
              gooeyness={0.5}
              wobble={0.5}
              hoverEffect
            />
          </div>

          <button
            type="button"
            className={`nav-contact ${emailCopied ? "is-copied" : ""}`}
            onClick={copyEmail}
            aria-label="复制邮箱 2265410431@qq.com"
          >
            <span aria-live="polite">{emailCopied ? "邮箱已复制" : "一起合作"}</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">{menuOpen ? "关闭菜单" : "打开菜单"}</span>
            <MenuIcon open={menuOpen} />
          </button>
        </nav>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <div className="mobile-menu__links">
            <a href="#top" onClick={() => closeAndScroll("#top")}>
              <span>01</span>首页
            </a>
            <a href="#about" onClick={() => closeAndScroll("#about")}>
              <span>02</span>关于
            </a>
            <a href="#work" onClick={() => closeAndScroll("#work")}>
              <span>03</span>作品
            </a>
            <a href="#capabilities" onClick={() => closeAndScroll("#capabilities")}>
              <span>04</span>能力
            </a>
            <a href="#contact" onClick={() => closeAndScroll("#contact")}>
              <span>05</span>联系
            </a>
          </div>
          <div className="mobile-menu__footer">
            <a href="mailto:2265410431@qq.com">2265410431@qq.com</a>
            <span>CHINA · {time} CST</span>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="site-background" aria-hidden="true">
          <Grainient
            colors={["#050506", "#0a0d12", "#14202b", "#243a4a", "#3a5a70"]}
            angle={0}
            flow={0.9}
            silk={0.35}
            grainAmount={0.04}
            speed={0.4}
            saturation={0.75}
            contrast={0.9}
            interactive={false}
            clickSwirl={false}
            dpr={1.5}
          />
        </div>
        <section className="hero">
          <video
            ref={heroVideoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.webp"
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__grid container" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="hero__content container">
            <div className="hero__eyebrow">
              <span>PORTFOLIO / 2026</span>
              <span>CHINA · AVAILABLE FOR COLLABORATION</span>
            </div>

            <div className="hero__headline">
              <div className="hero__intro">
                <span className="hero__intro-name">廖振宁</span>
                <span className="hero__intro-role">视觉设计师 / AI 设计师 / 品牌设计师</span>
              </div>
              <h1>
                <span className="hero-line hero-line--accent">
                  <span>FORM</span>
                </span>
                <span className="hero-line">
                  <span>FEELING FUTURE.</span>
                </span>
              </h1>
              <p className="hero__script">Imagine it into reality</p>
              <div className="hero__stamp">
                <span className="status-dot" />
                <span>OPEN FOR 2027 PROJECTS</span>
              </div>
              <p className="hero__lead">
                用视觉，把想象变成可被感受的现实。
              </p>
              <div className="hero__actions">
                <a className="hero__action hero__action--solid" href="#work">
                  查看作品
                  <ArrowUpRight size={15} />
                </a>
                <a className="hero__action" href="#contact">
                  联系我
                </a>
              </div>
            </div>

            <div className="hero__foot">
              <a className="hero__scroll" href="#about">
                <span>向下探索</span>
                <span className="hero__scroll-icon">
                  <ArrowDown size={16} />
                </span>
              </a>
            </div>
          </div>

          <div className="hero__side-note" aria-hidden="true">
            <span>SELECTED WORKS</span>
            <i />
            <span>2023 — 2027</span>
          </div>
        </section>

        <section className="section about">
          <div className="container">
            <div id="about" className="section-anchor" aria-hidden="true" />
            <SectionLabel index="01" label="PROFILE" note="DESIGNING BETWEEN CRAFT, CULTURE & COMPUTE" />

            <div className="about__grid">
              <div className="about__portrait" data-reveal>
                <TiltedCard
                  className="about__portrait-tilt"
                  containerWidth="100%"
                  containerHeight="100%"
                  imageWidth="100%"
                  imageHeight="100%"
                  rotateAmplitude={8}
                  scaleOnHover={1.03}
                  glare={0.4}
                  shadow={0.5}
                  radius={18}
                  smoothness={0.6}
                  intro
                >
                  <div className="about__portrait-frame">
                    <img src="/media/liao-portrait.webp" alt="廖振宁肖像" />
                    <span className="about__portrait-scan" aria-hidden="true" />
                  </div>
                </TiltedCard>
                <div className="about__portrait-meta">
                  <span>LIAO ZHENNING</span>
                  <span>DIGITAL MEDIA ART / 2027</span>
                </div>
              </div>

              <div className="about__content">
                <h2 className="about__statement" data-reveal>
                  把策略、审美与技术，
                  <br />
                  编织成一套
                  <em>会呼吸的视觉系统。</em>
                </h2>

                <div className="about__summary" data-reveal>
                  <SpotlightCard
                    className="summary-card"
                    theme="dark"
                    spotlightColor="#9db8d2"
                    intensity={0.12}
                    spotlightSize={260}
                    softness={0.7}
                    shape="circle"
                    borderGlow={0.5}
                    proximity={80}
                    smoothing={0.3}
                    ambient={false}
                    flare
                    grain={0}
                    style={{
                      "--spotlight-card-surface": "rgba(15, 18, 22, 0.62)",
                      "--spotlight-card-border": "rgba(241, 237, 228, 0.1)",
                    }}
                  >
                    <span className="summary-card__index">01</span>
                    <div>
                      <h3>
                        影像全流程
                        <span>PRODUCTION</span>
                      </h3>
                      <p>从概念、分镜、角色与场景生成，到剪辑、声音和成片交付。</p>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    className="summary-card"
                    theme="dark"
                    spotlightColor="#9db8d2"
                    intensity={0.12}
                    spotlightSize={260}
                    softness={0.7}
                    shape="circle"
                    borderGlow={0.5}
                    proximity={80}
                    smoothing={0.3}
                    ambient={false}
                    flare
                    grain={0}
                    style={{
                      "--spotlight-card-surface": "rgba(15, 18, 22, 0.62)",
                      "--spotlight-card-border": "rgba(241, 237, 228, 0.1)",
                    }}
                  >
                    <span className="summary-card__index">02</span>
                    <div>
                      <h3>
                        视觉与 IP
                        <span>IDENTITY</span>
                      </h3>
                      <p>聚焦 AI 影像、视觉设计与角色 IP，建立可延展的统一语言。</p>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    className="summary-card"
                    theme="dark"
                    spotlightColor="#9db8d2"
                    intensity={0.12}
                    spotlightSize={260}
                    softness={0.7}
                    shape="circle"
                    borderGlow={0.5}
                    proximity={80}
                    smoothing={0.3}
                    ambient={false}
                    flare
                    grain={0}
                    style={{
                      "--spotlight-card-surface": "rgba(15, 18, 22, 0.62)",
                      "--spotlight-card-border": "rgba(241, 237, 228, 0.1)",
                    }}
                  >
                    <span className="summary-card__index">03</span>
                    <div>
                      <h3>
                        创作方法
                        <span>METHOD</span>
                      </h3>
                      <p>围绕角色一致性、镜头连续性与素材修正，让技术服务于叙事。</p>
                    </div>
                  </SpotlightCard>
                </div>

                <div className="about__details" data-reveal>
                  <button
                    type="button"
                    className="about__detail-link"
                    onClick={copyPhone}
                    aria-label="复制手机号 151 7792 4409"
                  >
                    <span>PHONE</span>
                    {phoneCopied ? "已复制" : "151 7792 4409"}
                  </button>
                  <a href="mailto:2265410431@qq.com">
                    <span>EMAIL</span>
                    2265410431@qq.com
                  </a>
                  <div>
                    <span>EDUCATION</span>
                    首都师范大学科德学院
                    <small>数字媒体艺术 / 本科在读 / 2027 届</small>
                  </div>
                </div>

                <div className="about__timeline" data-reveal>
                  <div>
                    <span>2026.10</span>
                    <p>《末班车》AI 短片</p>
                    <small>编剧 / 分镜 / 生成 / 剪辑</small>
                  </div>
                  <div>
                    <span>2026</span>
                    <p>《吼山怪 · 阿岩》</p>
                    <small>角色 IP / 视觉系统</small>
                  </div>
                  <div>
                    <span>2023—2027</span>
                    <p>首都师范大学科德学院</p>
                    <small>数字媒体艺术</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section work">
          <div className="container">
            <div id="work" className="section-anchor" aria-hidden="true" />
            <SectionLabel index="02" label="SELECTED WORK" note="A CURATED SET OF IMAGES, SYSTEMS & MOVING STORIES" />

            <div className="work__heading" data-reveal>
              <h2>
                精选项目
                <span>/ SELECTED WORK</span>
              </h2>
              <p>从单帧到系统，从角色到叙事。以克制的方式，让每个项目拥有自己的气质。</p>
            </div>

            <div className="work__featured">
              {projects.slice(0, 1).map((project) => (
                <article className="project project--featured" key={project.id} data-reveal>
                  <TiltedCard
                    className="project__tilt"
                    containerWidth="100%"
                    containerHeight="100%"
                    imageWidth="100%"
                    imageHeight="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.04}
                    glare={0.5}
                    shadow={0.55}
                    radius={18}
                    smoothness={0.6}
                    intro
                  >
                    <button
                      type="button"
                      className="project__visual"
                      onClick={() => setActiveProject(project)}
                      aria-label={`查看${project.title}项目详情`}
                    >
                      <ProjectCover project={project} />
                      <span className="project__index">P.{project.number}</span>
                      <span className="project__year">{project.year}</span>
                      <span className="project__overlay-title">
                        <small>{project.category}</small>
                        <strong>{project.title}</strong>
                        <em>{project.english}</em>
                      </span>
                      <span className="project__open">
                        {project.film ? "WATCH FILM" : "VIEW CASE"}
                        <ArrowUpRight />
                      </span>
                    </button>
                  </TiltedCard>
                  <div className="project__caption">
                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <em>{project.english}</em>
                    </div>
                    <p>{project.summary}</p>
                    <div className="project__metrics">
                      {project.metrics.map((metric) => (
                        <span key={metric}>{metric}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="work__grid">
              {projects.slice(1).map((project) => (
                <article className="project" key={project.id} data-reveal>
                  <TiltedCard
                    className="project__tilt"
                    containerWidth="100%"
                    containerHeight="100%"
                    imageWidth="100%"
                    imageHeight="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.04}
                    glare={0.5}
                    shadow={0.55}
                    radius={18}
                    smoothness={0.6}
                    intro
                  >
                    <button
                      type="button"
                      className="project__visual"
                      onClick={() => setActiveProject(project)}
                      aria-label={`查看${project.title}项目详情`}
                    >
                      <ProjectCover project={project} />
                      <span className="project__index">P.{project.number}</span>
                      <span className="project__year">{project.year}</span>
                      <span className="project__overlay-title">
                        <small>{project.category}</small>
                        <strong>{project.title}</strong>
                        <em>{project.english}</em>
                      </span>
                      <span className="project__open">
                        {project.film ? "WATCH FILM" : "VIEW CASE"}
                        <ArrowUpRight />
                      </span>
                    </button>
                  </TiltedCard>
                  <div className="project__caption">
                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <em>{project.english}</em>
                    </div>
                    <p>{project.summary}</p>
                    <div className="project__metrics">
                      {project.metrics.map((metric) => (
                        <span key={metric}>{metric}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {projects
              .filter((project) => project.boards?.length)
              .map((project) => (
                <div className="project-boards" key={project.id} data-reveal>
                  <div className="project-boards__head">
                    <div>
                      <span>PROJECT BOARDS / 0{project.boards.length}</span>
                      <h3>
                        {project.title}
                        <em>{project.english}</em>
                      </h3>
                    </div>
                    <p>完整展板 / 点击查看原图</p>
                  </div>

                  <div className="project-boards__grid">
                    {project.boards.map((board, index) => (
                      <TiltedCard
                        className="board-tilt"
                        key={board.src}
                        containerWidth="100%"
                        containerHeight="100%"
                        imageWidth="100%"
                        imageHeight="100%"
                        rotateAmplitude={9}
                        scaleOnHover={1.035}
                        glare={0.45}
                        shadow={0.5}
                        radius={18}
                        smoothness={0.6}
                        intro
                      >
                        <a
                          className="board-card"
                          href={board.src}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`查看${board.label}完整展板`}
                        >
                          <img src={board.src} alt={board.alt} />
                          <span className="board-card__index">0{index + 1}</span>
                          <span className="board-card__label">
                            {board.label}
                            <small>{board.english}</small>
                          </span>
                          <span className="board-card__open">
                            VIEW FULL SIZE
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      </TiltedCard>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="section capabilities">
          <div className="container">
            <div id="capabilities" className="section-anchor" aria-hidden="true" />
            <SectionLabel index="03" label="CAPABILITIES" note="ONE VISUAL LANGUAGE, TRANSLATED ACROSS MEDIA" />

            <div className="capabilities__intro" data-reveal>
              <h2>
                个人优势
                <span>/ WHAT I DO</span>
              </h2>
              <p>
                从概念到交付，以设计判断组织 AI 工具。
                <br />
                既能进入细节，也能把握整体的视觉方向。
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <BorderGlow
                  key={capability.number}
                  className="capability-card"
                  data-reveal
                  edgeSensitivity={30}
                  glowColor="205 32% 68%"
                  backgroundColor="#0c1015"
                  borderRadius={24}
                  glowRadius={16}
                  glowIntensity={0.7}
                  coneSpread={25}
                  animated={false}
                  colors={["#9db8d2", "#8aa6c1", "#c0d1e2"]}
                  fillOpacity={0}
                >
                  <div className="capability-card__top">
                    <span>{capability.number}</span>
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="capability-card__diagram" aria-hidden="true">
                    <CapabilityDiagram index={index} />
                  </div>
                  <div className="capability-card__mark">
                    <i />
                    {capability.number} — {capability.note}
                  </div>
                  <h3>{capability.title}</h3>
                  <em>{capability.english}</em>
                  <p>{capability.body}</p>
                  <div className="capability-card__tags">
                    {capability.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="capability-card__ghost">{capability.number}</span>
                </BorderGlow>
              ))}
            </div>

            <div className="tool-strip" data-reveal>
              <span>TOOLKIT</span>
              <div>
                <span>CHATGPT</span>
                <i />
                <span>LIBTV</span>
                <i />
                <span>TAPNOW</span>
                <i />
                <span>MIDJOURNEY</span>
                <i />
                <span>STABLE DIFFUSION</span>
                <i />
                <span>剪映专业版</span>
                <i />
                <span>AFTER EFFECTS</span>
                <i />
                <span>PHOTOSHOP</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="contact__glow" aria-hidden="true" />
          <div className="contact__threads" aria-hidden="true">
            <Threads
              color="#9db8d2"
              accentColor="#c0d1e2"
              lineCount={70}
              thickness={0.55}
              softness={1.2}
              amplitude={1.5}
              distance={0.4}
              waves={1.0}
              speed={0.5}
              split={0.04}
              fray={0.5}
              angle={22}
              taper={0.85}
              brightness={1.3}
              fade={0.35}
              opacity={0.55}
              enableMouseInteraction={false}
              parting={0}
            />
          </div>
          <div className="contact__grid container">
            <div id="contact" className="section-anchor" aria-hidden="true" />
            <div className="contact__top" data-reveal>
              <div>
                <span className="status-dot" />
                <span>AVAILABLE FOR SELECTED PROJECTS</span>
              </div>
              <span>04 / CONTACT</span>
            </div>

            <div className="contact__main">
              <p className="contact__kicker" data-reveal>
                有一个想法？
                <br />
                让它从这里开始。
              </p>

              <h2 data-reveal>
                LET&apos;S MAKE
                <br />
                <em>SOMETHING</em>
                <br />
                WORTH FEELING.
              </h2>

              <div className="contact__actions" data-reveal>
                <button
                  type="button"
                  className={`contact__mail ${emailCopied ? "is-copied" : ""}`}
                  onClick={copyEmail}
                  aria-label="复制邮箱 2265410431@qq.com"
                >
                  <span aria-live="polite">
                    {emailCopied ? "邮箱已复制" : "2265410431@qq.com"}
                  </span>
                  <ArrowUpRight size={28} />
                </button>
                <a
                  className="contact__resume"
                  href="/media/Liao-Zhenning-Resume-2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SpecularButton
                    className="contact__resume__btn"
                    size="md"
                    radius={28}
                    tint="#ffffff"
                    tintOpacity={0.05}
                    textColor="#c9c4ba"
                    lineColor="#9db8d2"
                    baseColor="#39434f"
                    intensity={1}
                    idleIntensity={0.35}
                    shineSize={10}
                    shineFade={34}
                    thickness={1.2}
                    glow={1}
                    followMouse
                    proximity={250}
                  >
                    查看完整简历
                    <span>PDF</span>
                  </SpecularButton>
                </a>
              </div>
            </div>

            <footer className="footer">
              <div className="footer__col footer__identity">
                <span className="footer__label">Identity / 身份</span>
                <div className="footer__name">
                  LIAO ZHENNING <em>廖振宁</em>
                </div>
                <small>Visual Designer · AI Creator · Brand Designer</small>
              </div>
              <div className="footer__col footer__links">
                <span className="footer__label">Contact / 联系</span>
                <button
                  type="button"
                  className="footer__tel"
                  onClick={copyPhone}
                  aria-label="复制手机号 151 7792 4409"
                >
                  {phoneCopied ? "已复制" : "151 7792 4409"}
                </button>
              </div>
              <div className="footer__col footer__meta">
                <span className="footer__label">Details / 信息</span>
                <span className="footer__loc">CHINA · {time} CST</span>
                <span className="footer__copy">© {year} All Rights Reserved</span>
              </div>
            </footer>
          </div>
        </section>
      </main>

      <div className={`back-to-top ${scrolled ? "is-visible" : ""}`}>
        <SlingButton
          onSend={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          padColor="#f1ede4"
          iconColor="#0c1015"
          accentColor="#9db8d2"
          wellColor="#161c23"
          bandColor="#3a4653"
          size={52}
          strokeWidth={3}
          armAt={48}
          maxPull={160}
          launchSpeed={2600}
          recoil={0.2}
          flight={120}
          particles={12}
          spread={60}
          axis="any"
          tapSends
          ariaLabel="返回顶部"
        />
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

export default App;
