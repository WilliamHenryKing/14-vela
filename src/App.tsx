import { useEffect, useRef, useState } from "react";
import { type Finish, GOALS, money, type Plan, planCost, projectSavings } from "./domain";
import { gsap, ScrollTrigger, useGSAP, usePageMotion } from "./motion";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="arrow">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 20C2 20 2 2 20 2v18Zm0 0C20 2 38 2 38 20H20Zm0 0c18 0 18 18 0 18V20Zm0 0c0 18-18 18-18 0h18Z"
        fill="currentColor"
      />
    </svg>
  );
}
function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="check">
      <path d="m4 10 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function BankCard({ finish = "fern", back = false }: { finish?: Finish; back?: boolean }) {
  return (
    <div
      className={`bank-card finish-${finish} ${back ? "card-back" : "card-front"}`}
      aria-hidden="true"
    >
      <div className="card-top">
        <span>vela</span>
        <Mark />
      </div>
      <div className="card-art">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="card-bottom">
        <span>
          YOUR EVERYDAY, <br />
          REIMAGINED.
        </span>
        <svg viewBox="0 0 36 28" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="34" height="26" rx="6" stroke="currentColor" />
          <path d="M1 9h34M1 19h34M13 1v26M23 1v26" stroke="currentColor" />
        </svg>
      </div>
    </div>
  );
}
function FinishPicker({ value, onChange }: { value: Finish; onChange: (value: Finish) => void }) {
  return (
    <fieldset className="finish-picker" aria-label="Card colour">
      {(["fern", "ink", "citron"] as const).map((finish) => (
        <button
          type="button"
          className={`swatch swatch-${finish}`}
          key={finish}
          aria-label={`${finish} card`}
          aria-pressed={value === finish}
          onClick={() => onChange(finish)}
        >
          <span />
        </button>
      ))}
    </fieldset>
  );
}

const products = [
  {
    name: "Spend",
    eyebrow: "01 / EVERYDAY, SORTED",
    title: "Good days start\nwith less admin.",
    body: "Coffee runs. Dinner plans. The big little things. Keep your everyday spending in one beautifully simple place.",
    detail: "One clear view of where your money goes.",
  },
  {
    name: "Organise",
    eyebrow: "02 / A PLACE FOR EVERY PLAN",
    title: "Give your money\na little direction.",
    body: "A weekend away. A rainy day. Something just for you. Separate your plans into pockets and make room for what comes next.",
    detail: "Personal pockets for the things that matter.",
  },
  {
    name: "Control",
    eyebrow: "03 / YOUR CARD, YOUR CALL",
    title: "More confidence.\nFewer what-ifs.",
    body: "Misplaced your card? Pause it in a tap. Set a spending limit and see your card settings clearly, all in one place.",
    detail: "Simple controls. Right where you need them.",
  },
];

function Phone({ active, enabled }: { active: number; enabled: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useGSAP(
    () => {
      if (enabled)
        gsap.from(".phone-page", { y: 16, autoAlpha: 0, duration: 0.45, ease: "power2.out" });
    },
    { scope: host, dependencies: [active], revertOnUpdate: true },
  );
  return (
    <div className="phone" ref={host}>
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-island" />
        <span>▰</span>
      </div>
      <div className="phone-nav">
        <span>vela</span>
        <span className="avatar">J</span>
      </div>
      <div className="phone-page" key={active}>
        {active === 0 && (
          <>
            <p className="phone-greeting">A little clarity for your day.</p>
            <p className="tiny-label">EVERYDAY BALANCE</p>
            <p className="balance">
              R 24,680<span>.00</span>
            </p>
            <div className="phone-actions">
              <span>
                ↗<small>Send</small>
              </span>
              <span>
                ＋<small>Add</small>
              </span>
              <span>
                ⇄<small>Move</small>
              </span>
            </div>
            <div className="phone-mini-card">
              <span>For the everyday</span>
              <Mark />
              <strong>•••• 2048</strong>
            </div>
            <div className="activity-title">
              The latest <small>THIS WEEK</small>
            </div>
            {[
              ["☕", "Morning ritual", "Coffee & a slow start", "− R 48"],
              ["↙", "A little top-up", "Money in", "+ R 2,000"],
              ["✿", "Something green", "Plants for home", "− R 280"],
            ].map(([icon, name, detail, amount]) => (
              <div className="activity" key={name}>
                <span className="activity-icon">{icon}</span>
                <span>
                  {name}
                  <small>{detail}</small>
                </span>
                <strong>{amount}</strong>
              </div>
            ))}
          </>
        )}
        {active === 1 && (
          <>
            <p className="phone-greeting">Big plans. Small beginnings.</p>
            <p className="balance pocket-title">
              Your pockets<span>Three good things to work towards.</span>
            </p>
            {[
              { name: "Somewhere new", amount: "R 8,400", icon: "↗", width: "62%" },
              { name: "Rainy day", amount: "R 12,000", icon: "☂", width: "80%" },
              { name: "Just because", amount: "R 2,100", icon: "✳", width: "30%" },
            ].map((pocket) => (
              <div className="pocket" key={pocket.name}>
                <span>{pocket.icon}</span>
                <div>
                  {pocket.name}
                  <strong>{pocket.amount}</strong>
                  <i>
                    <b style={{ width: pocket.width }} />
                  </i>
                </div>
              </div>
            ))}
            <p className="phone-note">Give every goal a place to grow.</p>
          </>
        )}
        {active === 2 && (
          <>
            <p className="phone-greeting">A little peace of mind.</p>
            <div className={`phone-mini-card control-card ${paused ? "paused" : ""}`}>
              <span>{paused ? "Your card is paused" : "Your everyday card"}</span>
              <Mark />
              <strong>•••• 2048</strong>
            </div>
            <div className="card-control">
              <span>
                Pause card<small>Try this demo control</small>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={paused}
                aria-label="Pause demo card"
                onClick={() => setPaused(!paused)}
                className={paused ? "switch active" : "switch"}
              >
                <span />
              </button>
            </div>
            <div className="control-row">
              Monthly spending limit<strong>R 15,000</strong>
            </div>
            <div className="control-row">
              Online payments<strong>Enabled</strong>
            </div>
            <div className="control-row">
              Card status<strong>{paused ? "Paused" : "Active"}</strong>
            </div>
            <p role="status" className="phone-note">
              {paused
                ? "Paused. Switch it back on whenever you're ready."
                : "Everything is right where you left it."}
            </p>
          </>
        )}
      </div>
      <p className="phone-demo">SAMPLE APP · FICTIONAL BALANCES</p>
      <div className="phone-home" />
    </div>
  );
}

function ProductStory({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 961px)",
        () => {
          const triggers = gsap.utils
            .toArray<HTMLElement>(".product-chapter")
            .map((chapter, index) =>
              ScrollTrigger.create({
                trigger: chapter,
                start: "top 56%",
                end: "bottom 56%",
                onEnter: () => setActive(index),
                onEnterBack: () => setActive(index),
              }),
            );
          return () =>
            triggers.forEach((trigger) => {
              trigger.kill();
            });
        },
        section,
      );
      return () => media.revert();
    },
    { scope: section },
  );
  function select(index: number) {
    setActive(index);
    if (window.innerWidth > 960)
      document
        .getElementById(`chapter-${index}`)
        ?.scrollIntoView({ behavior: enabled ? "smooth" : "instant", block: "center" });
  }
  return (
    <section
      className="product-story section-pad"
      id="everyday"
      ref={section}
      aria-labelledby="product-heading"
    >
      <div className="section-top">
        <span className="eyebrow">01 / MEET YOUR EVERYDAY</span>
        <span className="section-note">Life moves. Your money should keep up.</span>
      </div>
      <div className="product-layout">
        <div className="product-chapters">
          {products.map((product, index) => (
            <article
              className={`product-chapter ${active === index ? "is-active" : ""}`}
              id={`chapter-${index}`}
              key={product.name}
            >
              <span className="eyebrow">{product.eyebrow}</span>
              <h2 id={index === 0 ? "product-heading" : undefined} className="reveal-title">
                {product.title}
              </h2>
              <p>{product.body}</p>
              <span className="product-detail">
                <Check />
                {product.detail}
              </span>
            </article>
          ))}
        </div>
        <div className="product-preview">
          <fieldset className="product-tabs" aria-label="Explore the sample app">
            {products.map((product, index) => (
              <button
                type="button"
                key={product.name}
                aria-pressed={active === index}
                onClick={() => select(index)}
              >
                {product.name}
              </button>
            ))}
          </fieldset>
          <div className="phone-plinth">
            <span className="plinth-circle" />
            <Phone active={active} enabled={enabled} />
            <span className="plinth-label">
              A little less banking. <br />A little more living.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Savings({ enabled }: { enabled: boolean }) {
  const [goalIndex, setGoalIndex] = useState(0);
  const [start, setStart] = useState(5000);
  const [monthly, setMonthly] = useState(1500);
  const goal = GOALS[goalIndex] ?? GOALS[0];
  const projection = projectSavings(start, monthly, goal.target);
  const output = useRef<HTMLSpanElement>(null);
  const previous = useRef(projection.total);
  useGSAP(
    () => {
      const state = { amount: previous.current };
      if (enabled)
        gsap.to(state, {
          amount: projection.total,
          duration: 0.55,
          ease: "power2.out",
          onUpdate: () => {
            if (output.current) output.current.textContent = money(state.amount);
          },
        });
      else if (output.current) output.current.textContent = money(projection.total);
      previous.current = projection.total;
    },
    { dependencies: [projection.total, enabled], revertOnUpdate: true },
  );
  const ceiling = Math.max(goal.target, projection.total, 1);
  const points = projection.points
    .map((value, i) => `${30 + i * 35},${235 - (value / ceiling) * 190}`)
    .join(" ");
  const monthsText =
    projection.months === 0
      ? "You’ve already reached this goal."
      : projection.months === null
        ? "Add a monthly amount to move towards your goal."
        : `${projection.months} ${projection.months === 1 ? "month" : "months"} to your ${money(goal.target)} goal.`;
  return (
    <section className="savings section-pad" id="goals" aria-labelledby="savings-heading">
      <div className="section-top">
        <span className="eyebrow">02 / SOMETHING TO LOOK FORWARD TO</span>
        <span className="section-note">Small steps. Real possibilities.</span>
      </div>
      <div className="savings-heading">
        <h2 id="savings-heading" className="reveal-title">
          A little today. <br />
          <em>A lot more tomorrow.</em>
        </h2>
        <p>
          Give that someday plan a starting point. <br />
          See what putting a little aside could look like.
        </p>
      </div>
      <div className="savings-grid">
        <div className="goal-inputs">
          <fieldset className="goal-tabs" aria-label="Choose a savings goal">
            {GOALS.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={goalIndex === index}
                onClick={() => setGoalIndex(index)}
              >
                {item.name}
              </button>
            ))}
          </fieldset>
          <p className="goal-note">{goal.note}</p>
          <label className="range-label" htmlFor="starting">
            Your starting amount <output htmlFor="starting">{money(start)}</output>
          </label>
          <input
            id="starting"
            type="range"
            min="0"
            max="50000"
            step="500"
            value={start}
            onChange={(event) => setStart(Number(event.target.value))}
            aria-valuetext={money(start)}
          />
          <div className="range-ends">
            <span>R 0</span>
            <span>R 50,000</span>
          </div>
          <label className="range-label" htmlFor="monthly">
            Put aside each month <output htmlFor="monthly">{money(monthly)}</output>
          </label>
          <input
            id="monthly"
            type="range"
            min="0"
            max="10000"
            step="250"
            value={monthly}
            onChange={(event) => setMonthly(Number(event.target.value))}
            aria-valuetext={money(monthly)}
          />
          <div className="range-ends">
            <span>R 0</span>
            <span>R 10,000</span>
          </div>
          <p className="calculation-note">
            A simple planning tool: starting amount + 12 monthly contributions. No interest, fees or
            returns included.
          </p>
        </div>
        <div className="goal-result">
          <span className="eyebrow">YOUR MONEY AFTER 12 MONTHS</span>
          <div className="total">
            <span ref={output} aria-hidden="true">
              {money(projection.total)}
            </span>
            <Arrow diagonal />
          </div>
          <span className="sr-only" role="status">
            {money(projection.total)} after 12 months. {monthsText}
          </span>
          <svg
            className="goal-chart"
            viewBox="0 0 480 280"
            aria-label="Your contribution balance grows over twelve months"
            role="img"
          >
            <title>Contribution-only savings illustration</title>
            <path d="M30 55H450M30 115H450M30 175H450M30 235H450" className="chart-grid" />
            <polygon points={`30,235 ${points} 450,235`} fill="url(#chart-fill)" />
            <polyline
              className="goal-line"
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="450"
              cy={235 - (projection.total / ceiling) * 190}
              r="5"
              fill="currentColor"
            />
            <text x="30" y="266">
              TODAY
            </text>
            <text x="388" y="266">
              12 MONTHS
            </text>
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#d7ee69" stopOpacity="0.7" />
                <stop offset="1" stopColor="#d7ee69" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <p className="goal-timing">{monthsText}</p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "What is Vela?",
    "Vela is a fictional banking brand created to demonstrate website design and development. It is not a bank and does not offer accounts, cards, deposits or financial services.",
  ],
  [
    "Can I try the app?",
    "Yes. The sample app above lets you explore spending, pockets and a card-pause control. All balances and transactions are fictional, and the preview stays in your browser.",
  ],
  [
    "How does the savings planner work?",
    "It adds your starting amount to twelve monthly contributions. Time to your goal rounds up to a whole month. It includes no interest, fees, taxes or investment growth.",
  ],
  [
    "Will the preview ask for my details?",
    "No. The guided preview asks only for an example plan and card colour. It does not collect your name, email, ID number or payment details, and nothing is submitted.",
  ],
];

function Demo({
  initialPlan,
  finish,
  onFinish,
  close,
}: {
  initialPlan: Plan;
  finish: Finish;
  onFinish: (value: Finish) => void;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [summary, setSummary] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = original;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog ref={dialog} className="demo-dialog" aria-labelledby="demo-title" onCancel={close}>
      <button className="dialog-close" type="button" onClick={close} aria-label="Close preview">
        ×
      </button>
      <span className="eyebrow">A LITTLE LOOK AROUND / LOCAL DEMO</span>
      <h2 id="demo-title">{summary ? "Looks like you." : "Make yourself at home."}</h2>
      <p>
        {summary
          ? "Your example setup is ready to explore. No account has been created."
          : "Find your everyday fit. No forms. No personal details."}
      </p>
      <div className="demo-layout">
        <div className="demo-art">
          <BankCard finish={finish} />
        </div>
        <div>
          {summary ? (
            <dl className="demo-summary">
              <div>
                <dt>Your plan</dt>
                <dd>{plan}</dd>
              </div>
              <div>
                <dt>Monthly example cost</dt>
                <dd>{money(planCost(plan))}</dd>
              </div>
              <div>
                <dt>Card finish</dt>
                <dd>{finish}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Preview only</dd>
              </div>
            </dl>
          ) : (
            <>
              <fieldset>
                <legend>01 / CHOOSE A PLAN</legend>
                {(["Everyday", "Plus"] as const).map((item) => (
                  <label className="plan-radio" key={item}>
                    <input
                      type="radio"
                      name="plan"
                      value={item}
                      checked={plan === item}
                      onChange={() => setPlan(item)}
                    />
                    <span>{item}</span>
                    <strong>
                      {money(planCost(item))}
                      <small>/mo</small>
                    </strong>
                  </label>
                ))}
              </fieldset>
              <div className="demo-finishes">
                <span className="eyebrow">02 / YOUR COLOUR</span>
                <FinishPicker value={finish} onChange={onFinish} />
              </div>
            </>
          )}
          {summary ? (
            <div className="dialog-actions">
              <button type="button" className="button button-dark" onClick={close}>
                Back to Vela <Arrow />
              </button>
              <button type="button" className="text-button" onClick={() => setSummary(false)}>
                Edit my preview
              </button>
            </div>
          ) : (
            <button type="button" className="button button-dark" onClick={() => setSummary(true)}>
              See my preview <Arrow />
            </button>
          )}
        </div>
      </div>
      <p className="dialog-note">
        Fictional portfolio concept. Nothing is sent, saved or opened in your name.
      </p>
    </dialog>
  );
}

export function App() {
  const root = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<Finish>("fern");
  const [motion, setMotion] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [menu, setMenu] = useState(false);
  const [demo, setDemo] = useState<Plan | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  usePageMotion(root, motion);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setMotion(!query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menu]);
  return (
    <div ref={root} className={`site ${motion ? "motion-on" : "motion-off"}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#main" className="logo" aria-label="Vela home">
          <Mark />
          <span>vela</span>
        </a>
        <nav
          className={menu ? "main-nav menu-open" : "main-nav"}
          aria-label="Main navigation"
          id="main-navigation"
        >
          {/* biome-ignore lint/a11y/useValidAnchor: Native fragment navigation; click only closes the mobile menu. */}
          <a href="#everyday" onClick={() => setMenu(false)}>
            Everyday
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: Native fragment navigation; click only closes the mobile menu. */}
          <a href="#goals" onClick={() => setMenu(false)}>
            Your goals
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: Native fragment navigation; click only closes the mobile menu. */}
          <a href="#plans" onClick={() => setMenu(false)}>
            The details
          </a>
        </nav>
        <button type="button" className="header-cta" onClick={() => setDemo("Everyday")}>
          Explore Vela <Arrow diagonal />
        </button>
        <button
          type="button"
          className="menu-button"
          aria-expanded={menu}
          aria-controls="main-navigation"
          onClick={() => setMenu(!menu)}
          ref={menuButton}
        >
          {menu ? "Close" : "Menu"}
          <span>{menu ? "−" : "+"}</span>
        </button>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow hero-support">
              <span className="status-dot" /> BANKING, WITH ROOM TO BREATHE
            </p>
            <h1 className="hero-title">
              Make room <br />
              for <em>more.</em>
            </h1>
            <p className="hero-description hero-support">
              Less time thinking about money. <br />
              More time doing your thing.
            </p>
            <div className="hero-support hero-cta">
              <button
                type="button"
                className="button button-dark"
                onClick={() => setDemo("Everyday")}
              >
                Find your everyday <Arrow diagonal />
              </button>
              <span>
                Life first. <br />
                Banking second.
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-disc" />
            <svg className="orbit-art" viewBox="0 0 650 650" fill="none" aria-hidden="true">
              {[308, 288, 268, 248, 228, 208, 188, 168].map((radius) => (
                <ellipse
                  className="orbit-line"
                  key={radius}
                  cx="325"
                  cy="325"
                  rx={radius}
                  ry={308 - ((308 - radius) / 20) * 15}
                  stroke="currentColor"
                  strokeWidth="0.65"
                  transform={`rotate(${((308 - radius) / 20) * 9} 325 325)`}
                />
              ))}
            </svg>
            <div className="card-drift">
              <BankCard finish="citron" back />
              <BankCard finish={finish} />
            </div>
            <div className="hero-notification hero-support">
              <span className="notification-icon">
                <Check />
              </span>
              <span>
                A little closer to somewhere new.<small>R 1,500 moved to your travel pocket</small>
              </span>
              <span>↗</span>
            </div>
            <div className="hero-finish hero-support">
              <span>YOUR COLOUR. YOUR CALL.</span>
              <FinishPicker value={finish} onChange={setFinish} />
            </div>
            <span className="art-caption">DESIGNED AROUND YOU. / VELA EVERYDAY</span>
          </div>
          <div className="hero-bottom">
            <span>EVERYDAY MONEY. OPEN POSSIBILITIES.</span>
            <a href="#intro">
              A fresh perspective <span>↓</span>
            </a>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </section>
        <section className="intro section-pad" id="intro">
          <span className="eyebrow">A DIFFERENT KIND OF EVERYDAY</span>
          <h2 className="manifesto">
            Money is a part of your life. <br />
            It shouldn’t be your whole life.
          </h2>
          <div className="intro-footer reveal-group">
            <p>
              A little clarity. A little confidence. <br />A lot more space for what matters to you.
            </p>
            <div>
              <span>
                <Check />
                Simple by design
              </span>
              <span>
                <Check />
                Built around your day
              </span>
              <span>
                <Check />
                Always on your terms
              </span>
            </div>
            <Mark />
          </div>
        </section>
        <ProductStory enabled={motion} />
        <Savings enabled={motion} />
        <section className="plans section-pad" id="plans">
          <div className="section-top">
            <span className="eyebrow">03 / YOUR EVERYDAY, YOUR WAY</span>
            <span className="section-note">No guesswork. Just a clear choice.</span>
          </div>
          <div className="plans-heading">
            <h2 className="reveal-title">
              Good things. <br />
              Clear <em>terms.</em>
            </h2>
            <p>
              Two simple ways to find your fit. <br />
              Example plans for our fictional bank.
            </p>
          </div>
          <div className="plan-grid reveal-group">
            {(["Everyday", "Plus"] as const).map((plan) => (
              <article className={`plan plan-${plan.toLowerCase()}`} key={plan}>
                <div className="plan-top">
                  <h3>{plan}</h3>
                  <span>
                    {plan === "Everyday"
                      ? "THE BEAUTIFULLY SIMPLE ONE"
                      : "A LITTLE MORE POSSIBILITY"}
                  </span>
                </div>
                <p className="plan-price">
                  R {planCost(plan)}
                  <span>/ month</span>
                </p>
                <p>
                  {plan === "Everyday"
                    ? "Everything you need to make a good start."
                    : "For a life with a few more moving parts."}
                </p>
                <ul>
                  {(plan === "Everyday"
                    ? [
                        "Your own everyday card",
                        "Three personal savings pockets",
                        "Spending overview & card controls",
                      ]
                    : [
                        "Everything in Everyday",
                        "As many pockets as you have plans",
                        "Shared pockets for shared adventures",
                      ]
                  ).map((feature) => (
                    <li key={feature}>
                      <Check />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`button ${plan === "Plus" ? "button-lime" : "button-outline"}`}
                  onClick={() => setDemo(plan)}
                >
                  Explore {plan} <Arrow />
                </button>
              </article>
            ))}
          </div>
          <p className="plans-note">
            Illustrative products and prices. Vela is a design concept, not an authorised financial
            service.
          </p>
        </section>
        <section className="faq section-pad" id="questions">
          <div>
            <span className="eyebrow">GOOD QUESTIONS</span>
            <h2 className="reveal-title">
              A little <br />
              <em>more clarity.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} onToggle={() => ScrollTrigger.refresh()}>
                <summary>
                  <span className="faq-number">0{index + 1}</span>
                  {question}
                  <span className="faq-plus">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing section-pad">
          <div>
            <span className="eyebrow">HERE’S TO WHAT COMES NEXT.</span>
            <h2 className="reveal-title">
              Your life. <br />
              With a little <em>more.</em>
            </h2>
          </div>
          <button type="button" className="closing-button" onClick={() => setDemo("Everyday")}>
            <Arrow diagonal />
            <span>
              Meet your <br />
              new everyday
            </span>
          </button>
        </section>
      </main>
      <footer className="site-footer section-pad">
        <div className="footer-top">
          <a href="#main" className="logo" aria-label="Back to top">
            <Mark />
            <span>Life first.</span>
          </a>
          <div>
            <a href="#everyday">Everyday</a>
            <a href="#goals">Your goals</a>
            <a href="#questions">Questions</a>
            <button type="button" onClick={() => setMotion(!motion)} aria-pressed={motion}>
              Motion {motion ? "on" : "off"}
              <span className="motion-dot" />
            </button>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">
          vela<span>↗</span>
        </div>
        <div className="footer-bottom">
          <span>© VELA 2026 · INDEPENDENT DESIGN CONCEPT</span>
          <p>Fictional bank. Original artwork. No real accounts or financial services.</p>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      {demo && (
        <Demo initialPlan={demo} finish={finish} onFinish={setFinish} close={() => setDemo(null)} />
      )}
    </div>
  );
}
