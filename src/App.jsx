import { useEffect, useRef, useState } from 'react';

const COSMIC_STAR_COUNT = 42;
const cosmicStars = Array.from({ length: COSMIC_STAR_COUNT }, (_, index) => ({
  id: index,
  layer: index % 3,
  left: (index * 37 + 11) % 100,
  top: (index * 53 + 7) % 112 - 6,
  size: index % 11 === 0 ? 22 + (index % 4) * 6 : index % 5 === 0 ? 10 + (index % 3) * 3 : 2 + (index % 4),
  delay: -((index * 0.37) % 4.8),
  duration: 2.8 + (index % 7) * 0.42,
  warm: index % 4 === 0,
}));

const careerItems = [
  { period: '2026.05 - 2026.08', company: '中科院', role: '产品设计师 / AI设计师', text: '深耕政企科研 B 端系统设计，搭建标准化组件库，梳理复杂专业业务逻辑，跟进前端落地迭代，沉淀科研可视化设计流程。' },
  { period: '2026.02 - 2026.04', company: '美的集团', role: 'UX设计师', text: '负责工业数字孪生大屏可视化设计，搭建配套图标体系，梳理多层级数据信息层级，联动产研完成大屏视觉方案落地。' },
  { period: '2025.06 - 2025.11', company: '金山办公有限公司', role: 'UX设计师', text: '负责 WPS365 双端界面设计，重构后台信息架构，统一双端设计规范，优化操作交互路径，全程跟进设计开发验收。' },
  { period: '2024.10 - 2025.02', company: '居然装饰有限公司', role: '体验设计师 / 视觉设计师', text: '主导家装 APP 全视觉改版，搭建完整产品设计规范；运用 AIGC 批量产出运营页面，设计游戏化激励模块提升用户转化与活跃度。' },
];

const strengths = [
  { title: '完整交互项目主导能力', text: '从需求理解、视觉策略、方案推进到最终落地，能够独立统筹完整视觉项目。', tags: ['Project Lead', 'Visual Strategy', 'Delivery'] },
  { title: '视觉体系搭建', text: '擅长B/C端、可视化大屏完整视觉体系与组件库搭建，可独立输出标准化设计规范;熟练运用 AIGC提升视觉产出效率,掌握Vibe Coding实现网页展示,熟悉全流程设计落地协作兼顾视觉统一度与业务实用性。', tags: ['Brand System', 'VI', 'Guideline'] },
  { title: 'AI 设计提效', text: '结合 AIGC 工具进行风格探索、素材生成、方案筛选与批量内容生产。', tags: ['AIGC', 'Workflow', 'ComfyUI'] },
  { title: '设计管理统筹', text: '能够沉淀模板、规范与流程，提升团队协作效率与输出稳定性。', tags: ['Design Ops', 'Template', 'Standard'] },
  { title: '跨部门协同', text: '与产品、运营、市场和开发团队协作，推动视觉目标转化为实际结果。', tags: ['Teamwork', 'Business', 'Communication'] },
];       

const projectItems = [
  {
    no: '01',
    period: '中科院',
    title: '政企中台系统',
    role: '产品设计师',
    result: '政企科研 B 端系统可视化设计，搭建组件库并全流程落地迭代。',
    text: '深耕政企科研 B 端系统设计，搭建标准化组件库，梳理复杂专业业务逻辑，跟进前端落地迭代，沉淀科研可视化设计流程。',
    tags: ['UI/UX', 'AI', 'Visual'],
    image: '/projects/project-01.jpg',
    imagePosition: 'center 78%',
  },
  {
    no: '02',
    period: '金山办公',
    title: 'WPS365管理后台',
    role: 'UX设计师',
    result: '重构WPS365管理后台架构,统一设计规范、优化交互并全程落地验收。',
    text: '负责 WPS365 管理后台设计，重构后台信息架构，统一设计规范，优化交互路径，全程跟进开发验收。',
    tags: ['Brand', 'AI', 'Visual'],
  },
  {
    no: '03',
    period: '金山办公',
    title: '企业成长计划',
    role: 'UX设计师',
    result: '独立负责WPC C端企业成长计划全模块UI设计,覆盖等级体系、任务中心、权益兑换核心页面。',
    text: '对接产品运营需求输出设计方案，对齐主站视觉规范，跟进开发落地与体验迭代',
    tags: ['Brand', 'AI', 'Visual'],
  },
  {
    no: '04',
    period: '美的',
    title: 'GMCC智慧实验室数字孪生',
    role: '视觉设计师',
    result: '参与智能制造数字孪生可视化系统设计，搭建可视化视觉规范。',
    text: '梳理数据展示逻辑，优化图表布局、信息层级，结合业务场景完成多套可视化页面输出，配合开发落地视觉方案。',
    tags: ['Brand', 'AI', 'Visual'],
  },
  {
    no: '05',
    period: '居然装饰',
    title: '家装APP视觉改版',
    role: '运营设计师',
    result: '设计产品页面与游戏化激励模块,借助AIGC完成运营视觉产出,推动体验优化落地。',
    text: '独立负责APP视觉改版设计,搭建色彩、字体、栅格整套设计规范;设计产品页面与游戏化激励模块,借助AIGC完成运营视觉产出,推动体验优化落地。',
    tags: ['Brand', 'AI', 'Visual'],
  },
  {
    no: '06',
    period: '个人项目',
    title: '夏日音乐节海报',
    role: 'AIGC设计师',
    result: '主导音乐节系列海报创意落地,借助AIGC辅助视觉创作,统筹版式、视觉调性与画面细节。',
    text: '独立负责音乐节系列海报全流程创作，确定视觉风格与版式架构,运用AIGC工具生成视觉素材,完成画面细化、色彩调校与版式整合,产出整套系列宣传视觉。',
    tags: ['Brand', 'AI', 'Visual'],
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectNo, setActiveProjectNo] = useState(() => window.location.hash.match(/^#\/project\/(0[1-6])$/)?.[1] ?? null);

  usePointerTilt();

  useEffect(() => {
    const handleRouteChange = () => {
      const projectNo = window.location.hash.match(/^#\/project\/(0[1-6])$/)?.[1] ?? null;
      setActiveProjectNo(projectNo);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  const activeProject = projectItems.find((item) => item.no === activeProjectNo);
  const openProject = (projectNo) => {
    window.location.hash = `/project/${projectNo}`;
  };

  return (
    <>
      {isLoading ? (
        <GameLoader onDone={() => setIsLoading(false)} />
      ) : activeProject ? (
        <ProjectDetail item={activeProject} onBack={() => { window.location.hash = 'projects'; }} onOpenProject={openProject} />
      ) : (
        <main className="portfolio-shell">
          <NavBar />
          <Hero isActive />
          <About />
          <Strengths />
          <Projects onOpenProject={openProject} />
          <Contact />
        </main>
      )}
    </>
  );
}

function usePointerTilt() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    let activeCard = null;
    let activeRect = null;
    let latestEvent = null;
    let frameId;

    const updateTilt = () => {
      frameId = undefined;
      const event = latestEvent;
      if (!event) return;
      const card = event.target.closest('[data-tilt]');
      if (!card) return;
      if (card !== activeCard) {
        activeCard = card;
        activeRect = card.getBoundingClientRect();
      }
      const px = event.clientX - activeRect.left;
      const py = event.clientY - activeRect.top;
      card.style.setProperty('--px', `${px.toFixed(1)}px`);
      card.style.setProperty('--py', `${py.toFixed(1)}px`);
      card.style.setProperty('--rx', `${(((py / activeRect.height) - 0.5) * -7).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(((px / activeRect.width) - 0.5) * 7).toFixed(2)}deg`);
    };

    const handleMove = (event) => {
      latestEvent = event;
      if (!frameId) frameId = requestAnimationFrame(updateTilt);
    };

    const handleOut = (event) => {
      const card = event.target.closest('[data-tilt]');
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      activeCard = null;
      activeRect = null;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerout', handleOut, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerout', handleOut);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);
}

function GameLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const progressDuration = 3200;
    const exitDuration = 800;
    const start = performance.now();
    let frameId;
    let timerId;
    const tick = (now) => {
      const ratio = Math.min((now - start) / progressDuration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      setIsLeaving(true);
      timerId = window.setTimeout(() => onDone(), exitDuration);
    };
    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
    };
  }, [onDone]);

  return (
    <section className={isLeaving ? 'game-loader is-leaving' : 'game-loader'}>
      <video className="loader-film" src="/loader-bg.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="loader-film-shade" />
      <div className="loader-film-grain" />
      <div className="loader-center">
        <p className="loader-greeting">嗷呜嗷呜~想到工作就开心~</p>

        <div className="loader-bar"><span style={{ width: `${progress}%` }} /></div>
        <strong className="loader-percent">{progress}%</strong>
      </div>
      <div className="loader-wipe loader-wipe-left" />
      <div className="loader-wipe loader-wipe-right" />
    </section>
  );
}

function NavBar() {
  return (
    <header className="nav">
      <a className="logo-pill" href="#top">柯克峰</a>
      <nav className="nav-links" aria-label="主导航">
        <a href="#about">个人经历</a>
        <a href="#strengths">个人优势</a>
        <a href="#projects">精选项目</a>
      </nav>
      <a className="nav-cta" href="#contact">联系我</a>
    </header>
  );
}

function Hero({ isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!isActive || !video) return undefined;

    const syncPlayback = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [isActive]);

  return (
    <section className="hero" id="top">
      <div className="hero-cinematic-bg">
        {isActive && <video ref={videoRef} className="hero-bg-video" src="/hero-bg.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />}
        <div className="sun-bloom" />
        <div className="floating-leaves"><span /><span /><span /><span /><span /></div>
        <div className="cloud-layer cloud-layer-back" />
        <div className="cloud-layer cloud-layer-mid" />
        <div className="cloud-layer cloud-layer-front" />
        <div className="island-scene">
          <div className="cabin" />
          <div className="character" />
        </div>
        <div className="hero-dark-mask" />
      </div>
      <div className="hero-content">
        <h1>
          <span className="hero-main-title">KEFENG <i>✦</i></span>
          <small className="hero-subtitle">PORTFOLIO<span className="subtitle-script">KeFeng</span></small>
        </h1>
        <p className="hero-copy">用视觉系统与 AI 工作流，让设计更有创意</p>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title }) {
  return <div className="section-head"><div className="section-title-line"><p>{eyebrow}</p><span aria-hidden="true">↘</span></div><h2>{title}</h2></div>;
}

function About() {
  return (
    <section className="section about" id="about">
      <SectionHead eyebrow="WORK EXPERIENCE" title="个人经历" />
      <div className="about-grid">
        <figure className="portrait-card" data-tilt><img src="/portrait.jpg" alt="柯克峰个人照片" loading="lazy" decoding="async" /></figure>
        <div className="about-copy" data-tilt>
          <p className="eyebrow">ABOUT KE KEFENG</p>
          <h3>Hi, I am 柯克峰!</h3>
          <p>我是一名交互设计师、AI 设计师与视觉设计师。擅长以品牌视觉系统、AIGC 工作流和设计方法论，提升视觉内容的效率、品质与一致性。</p>
          <div className="about-meta"><span><b>当前身份</b>交互设计师 / AI 设计师 / 视觉设计师</span><span><b>服务方向</b>UIUX交互 / AIGC / 视觉系统</span><span><b>联系方式</b>13247133364</span><span><b>邮箱</b>364045362@qq.com</span></div>
          <div className="about-numbers"><strong><b>1+</b><span>设计经验</span></strong><strong><b>6+</b><span>项目案例</span></strong><strong><b>50+</b><span>视觉素材</span></strong></div>
        </div>
      </div>
      <div className="career-line">
        {careerItems.map((item, index) => <article key={`${item.period}-${index}`} data-tilt><i /><span>{item.period}</span><h4>{item.company}</h4><strong>{item.role}</strong><p>{item.text}</p></article>)}
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <SectionHead eyebrow="CORE STRENGTHS" title="个人优势" />
      <div className="strength-grid">
        {strengths.map((item) => <article className="strength-card" key={item.title} data-tilt><h3>{item.title}<i>.</i></h3><p>{item.text}</p><div>{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div></article>)}
      </div>
    </section>
  );
}

function Projects({ onOpenProject }) {
  return (
    <section className="section projects" id="projects">
      <SectionHead eyebrow="SELECTED PROJECTS" title="精选项目" />
      <div className="project-list">
        {projectItems.map((item) => <article className="project-row" key={item.no} data-tilt><div className="project-cover"><img src={`/projects/project-${item.no}.jpg`} alt={`${item.title} 项目封面`} loading="lazy" style={{ objectPosition: item.no === '01' ? 'center 78%' : 'center' }} /></div><div className="project-copy"><span>{item.no} / {item.period}</span><h3>{item.title}</h3><p className="project-role">{item.role}</p><strong>{item.result}</strong><p className="project-detail">{item.text}</p><div>{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div><button type="button" className="project-link" onClick={() => onOpenProject(item.no)}>查看项目细节 <span aria-hidden="true">↗</span></button></div></article>)}
      </div>
    </section>
  );
}

function ProjectDetail({ item, onBack, onOpenProject }) {
  const pageRef = useRef(null);
  const projectIndex = projectItems.findIndex((project) => project.no === item.no);
  const previousProject = projectItems[(projectIndex - 1 + projectItems.length) % projectItems.length];
  const nextProject = projectItems[(projectIndex + 1) % projectItems.length];
  const pdfVersion = item.no === '01' ? '?v=20260804-new' : '';
  const pdfUrl = `/project-pdfs/project-${item.no}.pdf${pdfVersion}`;

  useEffect(() => {
    document.title = `${item.title} · 柯克峰作品集`;
    return () => { document.title = '柯克峰个人作品集'; };
  }, [item.title]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    let frameId;
    const updateCosmos = () => {
      const scrollY = window.scrollY;
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
      const purple = Math.min(1, Math.max(0, progress * 3.2)) * Math.min(1, Math.max(.28, (1 - progress) * 2.15));
      const gold = Math.min(1, Math.max(0, (progress - .5) * 2.3));
      const roundedProgress = Math.round(progress * 500) / 500;
      page.style.setProperty('--purple-strength', purple.toFixed(3));
      page.style.setProperty('--gold-strength', gold.toFixed(3));
      page.style.setProperty('--nebula-opacity', (.18 + purple * .24 + gold * .08).toFixed(3));
      page.style.setProperty('--star-far', `${(-roundedProgress * 58).toFixed(1)}px`);
      page.style.setProperty('--star-mid', `${(-roundedProgress * 112).toFixed(1)}px`);
      page.style.setProperty('--star-near', `${(-roundedProgress * 178).toFixed(1)}px`);
      frameId = undefined;
    };
    const handleScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(updateCosmos);
    };
    updateCosmos();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [item.no]);

  return (
    <main className="project-detail-page" ref={pageRef}>
      <CosmicBackground />
      <header className="project-detail-nav">
        <button type="button" onClick={onBack} className="detail-back"><span aria-hidden="true">←</span> 返回作品集</button>
        <span className="detail-nav-index">PROJECT {item.no} / 06</span>
        <a className="detail-open-pdf" href={pdfUrl} target="_blank" rel="noreferrer">新窗口打开 PDF <span aria-hidden="true">↗</span></a>
      </header>

      <section className="project-detail-hero">
        <div className="detail-hero-copy">
          <p>{item.no} / {item.period}</p>
          <h1>{item.title}</h1>
          <strong>{item.result}</strong>
          <div className="detail-tags">{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
        </div>
        <figure className="detail-cover" data-tilt>
          <img src={`/projects/project-${item.no}.jpg`} alt={`${item.title} 项目封面`} />
          <figcaption>{item.role}</figcaption>
        </figure>
      </section>

      <section className="project-pdf-section">
        <div className="project-pdf-heading">
          <div><span>PROJECT DOCUMENT</span><h2>项目完整展示</h2></div>
          <p>{item.text}</p>
        </div>
        <PdfDocument key={pdfUrl} src={pdfUrl} title={item.title} />
      </section>

      <nav className="project-detail-switcher" aria-label="项目切换">
        <button type="button" onClick={() => onOpenProject(previousProject.no)}><small>PREVIOUS PROJECT</small><strong>← {previousProject.title}</strong></button>
        <button type="button" onClick={() => onOpenProject(nextProject.no)}><small>NEXT PROJECT</small><strong>{nextProject.title} →</strong></button>
      </nav>
    </main>
  );
}

function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-color cosmic-purple" />
      <div className="cosmic-color cosmic-gold" />
      <div className="cosmic-nebula" />
      <div className="cosmic-stars">
        {[0, 1, 2].map((layer) => (
          <div className={`cosmic-star-layer layer-${layer}`} key={layer}>
            {cosmicStars.filter((star) => star.layer === layer).map((star) => (
              <i
                className={`cosmic-star${star.warm ? ' is-warm' : ''}${star.size >= 22 ? ' is-shape' : ''}`}
                key={star.id}
                style={{
                  '--star-left': `${star.left}%`,
                  '--star-top': `${star.top}%`,
                  '--star-size': `${star.size}px`,
                  '--star-delay': `${star.delay}s`,
                  '--star-duration': `${star.duration}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="cosmic-readability" />
    </div>
  );
}

function PdfDocument({ src, title }) {
  const [pdf, setPdf] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;
    let loadingTask;
    setPdf(null);
    setProgress(0);
    setError('');

    const loadPdf = async () => {
      const [pdfjsLib, workerModule] = await Promise.all([
        import('pdfjs-dist'),
        import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
      ]);
      if (isCancelled) return;
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
      loadingTask = pdfjsLib.getDocument(src);
      loadingTask.onProgress = ({ loaded, total }) => {
        if (!isCancelled) setProgress(total ? Math.round((loaded / total) * 100) : 0);
      };
      const document = await loadingTask.promise;
      if (!isCancelled) setPdf(document);
    };

    loadPdf().catch(() => {
      if (!isCancelled) setError('项目加载失败');
    });
    return () => {
      isCancelled = true;
      loadingTask?.destroy();
    };
  }, [src]);

  if (error) return (
    <div className="pdf-error">
      <a href={src} target="_blank" rel="noreferrer">新窗口打开 PDF <span aria-hidden="true">↗</span></a>
    </div>
  );
  if (!pdf) return <div className="pdf-loading"><span style={{ width: `${progress}%` }} /><strong>项目加载中 {progress}%</strong></div>;

  return (
    <div className="pdf-document" aria-label={`${title} 完整项目`}>
      {Array.from({ length: pdf.numPages }, (_, index) => <PdfPage key={`${src}-${index + 1}`} pdf={pdf} pageNumber={index + 1} />)}
    </div>
  );
}

function PdfPage({ pdf, pageNumber }) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const [isVisible, setIsVisible] = useState(pageNumber <= 2);
  const [aspectRatio, setAspectRatio] = useState(1.414);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || isVisible) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '900px 0px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return undefined;
    let renderTask;
    let cancelled = false;
    const renderPage = async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled || !canvasRef.current || !hostRef.current) return;
      const baseViewport = page.getViewport({ scale: 1 });
      setAspectRatio(baseViewport.height / baseViewport.width);
      const cssWidth = hostRef.current.clientWidth;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (cssWidth / baseViewport.width) * pixelRatio });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { alpha: false });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${viewport.height / pixelRatio}px`;
      renderTask = page.render({ canvasContext: context, viewport });
      await renderTask.promise;
    };
    renderPage().catch(() => {});
    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [isVisible, pageNumber, pdf]);

  return (
    <figure className="pdf-page" ref={hostRef} style={{ aspectRatio: `1 / ${aspectRatio}` }}>
      {isVisible ? <canvas ref={canvasRef} aria-label={`第 ${pageNumber} 页`} /> : <span>PAGE {String(pageNumber).padStart(2, '0')}</span>}
    </figure>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-inner" data-tilt>
        <p>柯克峰 / Visual Designer / AI Designer / Brand Designer</p>
        <h2>THANK YOU FOR WATCHING</h2>
        <div className="contact-links"><a href="mailto:364045362@qq.com">364045362@qq.com</a><a href="tel:13247133364">13247133364</a><a href="#top">返回顶部</a></div>
      </div>
    </section>
  );
}

export default App;
