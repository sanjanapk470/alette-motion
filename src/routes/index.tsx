import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import tanjoreImage from "@/assets/lotus-tanjore.jpg";
import oilImage from "@/assets/monsoon-oil.jpg";
import riverImage from "@/assets/river-watercolour.jpg";
import placeholder from "@/assets/artwork-placeholder.svg";

type Artwork = { title: string; detail: string };
type Category = { name: string; description: string; works: Artwork[] };

const categories: Category[] = [
  {
    name: "Traditional, Devotional & Sacred Art",
    description: "Classical Indian iconography, deity portraits, Tanjore style, Kalamkari, Pattachitra, and temple art.",
    works: [
      { title: "Indian Woman Portrait", detail: "Realism portrait with traditional attire and jewelry." },
      { title: "Krishna Close-Up", detail: "Detailed Kerala mural and Kalamkari-style face." },
      { title: "Ganesha in Frame", detail: "Relief and mirror-work motif." },
      { title: "Pattachitra Forest/Village Panel", detail: "Traditional narrative depicting figure groups and deer." },
      { title: "Saraswati/Goddess Portrait", detail: "Ornate framed icon." },
      { title: "Thangka/Deity Painting", detail: "Figure on a lotus pedestal with an aura." },
      { title: "Radha-Krishna Painting", detail: "Vibrant traditional mural composition." },
      { title: "Srinathji/Krishna Icon", detail: "Traditional Shrinathji painting with cows." },
      { title: "Goddess Lakshmi", detail: "Framed traditional deity portrait on a lotus." },
      { title: "Ganesha Face", detail: "Stylized framed artwork." },
      { title: "Large Vishnu/Panoramas", detail: "Epic mythic scene." },
    ],
  },
  {
    name: "Folk, Tribal & Decorative Arts",
    description: "Patterns, dot-work, traditional decorative craft, and Lippan/mirror arts.",
    works: [
      { title: "Gond Tree with Birds", detail: "Yellow background with patterned birds." },
      { title: "Patterned Birds on Grey Tree", detail: "Stylized folk art composition." },
      { title: "Lippan / Mirror Work Square", detail: "Geometric blue and copper pattern." },
      { title: "Peacocks Under Tree", detail: "Folk art painting on white canvas." },
      { title: "Pattachitra Narrative Scenes", detail: "Red-bordered multi-panel traditional folk painting." },
    ],
  },
  {
    name: "Nature, Wildlife & Landscapes",
    description: "Florals, birds, landscapes, and natural scenery.",
    works: [
      { title: "Cranes & Wisteria", detail: "East Asian style with a gold-foil finish." },
      { title: "Stag at Sunset", detail: "Silhouette landscape." },
      { title: "Bird Silhouette at Sunset", detail: "Warm sky with a branch." },
      { title: "Village Woman Carrying Pot", detail: "Rural landscape and figure study." },
    ],
  },
  {
    name: "Modern, Still Life & Whimsical",
    description: "Contemporary themes, still lifes, architectural accents, and modern mixed media.",
    works: [
      { title: "Single Red Mushroom", detail: "Whimsical illustration." },
      { title: "Window with Flowers", detail: "Architectural wall art." },
      { title: "Blue Bike & Fence", detail: "Impressionistic outdoor scene." },
      { title: "Potted Plant & Urn", detail: "Decorative still life canvas." },
      { title: "Fruit & Blue Jar", detail: "Classic realism still life." },
    ],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "The Layered Canvas — Indian-Inspired Art Portfolio" },
    { name: "description", content: "Explore The Layered Canvas: traditional and sacred art, folk and decorative works, nature, landscapes and contemporary still lifes." },
    { property: "og:title", content: "The Layered Canvas — Indian-Inspired Art Portfolio" },
    { property: "og:description", content: "An Indian-inspired art portfolio spanning traditional, folk, nature and contemporary work." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const category = categories[categoryIndex] ?? categories[0];
  const active = selected === null ? null : category?.works[selected];

  function chooseCategory(index: number) {
    setCategoryIndex(index);
    railRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }
  function openWork(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(index);
  }
  function closeWork() {
    setSelected(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }
  function moveWork(direction: number) {
    if (selected === null || !category) return;
    setSelected((selected + direction + category.works.length) % category.works.length);
  }
  function scrollWorks(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".artwork-card");
    rail.scrollBy({ left: direction * (card?.offsetWidth ?? 320) + direction * 22, behavior: "smooth" });
  }

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeWork();
      if (event.key === "ArrowLeft") moveWork(-1);
      if (event.key === "ArrowRight") moveWork(1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <div className="portfolio-shell">
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-half hero-half-left"><img src={riverImage} alt="Watercolour of boats and riverside ghats at dawn" /><div className="hero-inset"><span>THE LAYERED CANVAS</span><img src={tanjoreImage} alt="Gold-detailed Tanjore-inspired painting of Lakshmi" /></div></div>
          <div className="hero-half hero-half-right"><img src={oilImage} alt="Oil painting of a rain-soaked Indian street" /><div className="hero-thought"><h1 id="hero-title">Indian art, seen<br />in a new light.</h1><a href="#collection">Explore the collection <ArrowRight size={16} aria-hidden="true" /></a></div></div>
          <header className="site-header"><a href="#studio">THE STUDIO</a><a className="wordmark" href="#top" aria-label="The Layered Canvas, back to top">the layered canvas</a><a href="#collection">THE COLLECTION</a><span>EST. IN IMAGINATION</span></header>
          <div className="hero-title" aria-hidden="true"><span>LAYERED</span><span>CANVAS</span></div>
        </section>

        <section className="gallery-band" id="collection" aria-labelledby="collection-title">
          <div className="gallery-inner">
            <div className="collection-heading"><span className="section-kicker">THE COLLECTION / FOUR WORLDS</span><h2 id="collection-title">Illustrative works</h2></div>
            <div className="collection-browser">
              <nav className="collection-categories" aria-label="Artwork categories">
                {categories.map((item, index) => <Button key={item.name} variant="artwork" size="artwork" className={`collection-category ${categoryIndex === index ? "collection-category-active" : ""}`} onClick={() => chooseCategory(index)} aria-pressed={categoryIndex === index} aria-controls="artwork-rail">
                  <span className="category-index">0{index + 1}</span><span className="category-name">{item.name}</span><span className="category-count">{item.works.length} works <ArrowRight size={16} aria-hidden="true" /></span>
                </Button>)}
              </nav>
              {category && <div className="collection-overview" aria-live="polite"><span className="section-kicker">CATEGORY 0{categoryIndex + 1} / 04</span><h3>{category.name}</h3><p>{category.description}</p></div>}
            </div>
            {category && <div className="artwork-area">
              <div className="artwork-area-heading"><span className="section-kicker">{category.works.length} WORKS</span><div className="rail-controls"><Button variant="outline" size="icon" onClick={() => scrollWorks(-1)} aria-label="Scroll artworks left"><ArrowLeft aria-hidden="true" /></Button><Button variant="outline" size="icon" onClick={() => scrollWorks(1)} aria-label="Scroll artworks right"><ArrowRight aria-hidden="true" /></Button></div></div>
              <div className="artwork-rail" id="artwork-rail" ref={railRef} aria-label={`${category.name} artworks`}>
                {category.works.map((work, index) => <article className="artwork-card" key={work.title}>
                  <Button variant="artwork" size="artwork" className="artwork-image" onClick={(event) => openWork(index, event.currentTarget)} aria-label={`View details for ${work.title}`}><img src={placeholder} alt="Artwork image coming soon" loading="lazy" /></Button>
                  <div className="artwork-caption"><span className="section-kicker">{String(index + 1).padStart(2, "0")} / {String(category.works.length).padStart(2, "0")}</span><h3>{work.title}</h3><Button variant="detailLink" size="default" onClick={(event) => openWork(index, event.currentTarget)} aria-label={`Explore details for ${work.title}`}>Explore detail <ArrowRight aria-hidden="true" /></Button></div>
                </article>)}
              </div>
            </div>}
          </div>
        </section>

        <section className="studio-note" id="studio" aria-labelledby="studio-title"><div className="studio-note-inner"><div><div className="eyebrow">The practice</div><h2 id="studio-title">Many mediums.<br /><em>One imagination.</em></h2></div><div className="studio-copy"><p>From the softness of a watercolour wash to the glow of gold, every surface tells its story differently.</p><small>Artwork images are placeholders until the collection photographs are provided.</small></div></div></section>
      </main>
      <footer className="site-footer"><span>The Layered Canvas</span><span>Indian-inspired art · An illustrative collection</span><a href="#top">Back to top ↑</a></footer>

      {active && category && <div className="detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeWork(); }}>
        <div className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" key={active.title}>
          <Button ref={closeRef} variant="detailIcon" size="icon" className="detail-close" onClick={closeWork} aria-label="Close artwork details"><X aria-hidden="true" /></Button>
          <div className="detail-visual"><img src={placeholder} alt="Artwork image coming soon" /></div>
          <div className="detail-content"><div className="eyebrow">Artwork {String((selected ?? 0) + 1).padStart(2, "0")} / {String(category.works.length).padStart(2, "0")}</div><h2 id="detail-title">{active.title}</h2><p>{active.detail}</p>
            <dl className="detail-facts"><div><dt>Medium</dt><dd></dd></div><div><dt>Materials</dt><dd></dd></div><div><dt>Size</dt><dd></dd></div></dl>
            <div className="detail-actions"><Button variant="outline" size="icon" onClick={() => moveWork(-1)} aria-label="Previous artwork"><ArrowLeft aria-hidden="true" /></Button><span className="gallery-count">{String((selected ?? 0) + 1).padStart(2, "0")} — {String(category.works.length).padStart(2, "0")}</span><Button variant="outline" size="icon" onClick={() => moveWork(1)} aria-label="Next artwork"><ArrowRight aria-hidden="true" /></Button></div>
          </div>
        </div>
      </div>}
    </div>
  );
}