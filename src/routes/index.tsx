import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import tanjoreImage from "@/assets/lotus-tanjore.jpg";
import oilImage from "@/assets/monsoon-oil.jpg";
import riverImage from "@/assets/river-watercolour.jpg";
import peacockImage from "@/assets/peacock-miniature.jpg";

type Medium = "All works" | "Oil" | "Watercolour" | "Tanjore" | "Miniature";
type Work = {
  title: string;
  medium: Exclude<Medium, "All works">;
  material: string;
  dimensions: string;
  image: string;
  alt: string;
  shape: "portrait" | "landscape";
  story: string;
};

const works: Work[] = [
  {
    title: "After the Rain",
    medium: "Oil",
    material: "Oil on canvas",
    dimensions: "76 × 102 cm",
    image: oilImage,
    alt: "Oil painting of a woman in a saffron sari walking through a rain-soaked Indian street",
    shape: "portrait",
    story: "An imagined monsoon passage, where the last light catches on wet stone and a saffron sari becomes the warmest note in a blue-grey city. Layered brushwork gives the street its sense of movement.",
  },
  {
    title: "Lotus & Light",
    medium: "Tanjore",
    material: "Tanjore-inspired painting with gold detailing",
    dimensions: "61 × 81 cm",
    image: tanjoreImage,
    alt: "Gold-detailed Tanjore-inspired painting of Lakshmi seated on a pink lotus",
    shape: "portrait",
    story: "Inspired by the radiance of South Indian Tanjore painting, this composition gathers lotus pink, deep green and gold around a still central figure. The ornament is as much a part of the story as the portrait itself.",
  },
  {
    title: "A River Wakes",
    medium: "Watercolour",
    material: "Watercolour on paper",
    dimensions: "56 × 42 cm",
    image: riverImage,
    alt: "Soft watercolour of boats and riverside ghats at dawn in Varanasi",
    shape: "landscape",
    story: "Morning on the river is rendered in transparent washes: steps and spires appear through the mist while small boats carry the eye across the pale, reflective water.",
  },
  {
    title: "The Peacock Garden",
    medium: "Miniature",
    material: "Miniature-inspired gouache on paper",
    dimensions: "38 × 51 cm",
    image: peacockImage,
    alt: "Detailed miniature-inspired painting of a blue peacock in a flowering courtyard",
    shape: "portrait",
    story: "A peacock holds court among tiny flowers, patterned borders and a quiet garden pavilion. The piece borrows the patient, intimate scale of Indian miniature painting to invite a closer look.",
  },
];

const mediums: Medium[] = ["All works", "Oil", "Watercolour", "Tanjore", "Miniature"];

const categories = [
  {
    name: "Traditional, Devotional & Sacred Art",
    description: "Classical Indian iconography, deity portraits, Tanjore style, Kalamkari, Pattachitra and temple art.",
    works: ["Indian Woman Portrait", "Krishna Close-Up", "Ganesha in Frame", "Pattachitra Forest/Village Panel", "Saraswati/Goddess Portrait", "Thangka/Deity Painting", "Radha-Krishna Painting", "Srinathji/Krishna Icon", "Goddess Lakshmi", "Ganesha Face", "Large Vishnu/Panoramas"],
  },
  {
    name: "Folk, Tribal & Decorative Arts",
    description: "Patterns, dot-work, traditional decorative craft and Lippan mirror arts.",
    works: ["Gond Tree with Birds", "Patterned Birds on Grey Tree", "Lippan / Mirror Work Square", "Peacocks Under Tree", "Pattachitra Narrative Scenes"],
  },
  {
    name: "Nature, Wildlife & Landscapes",
    description: "Florals, birds, landscapes and natural scenery.",
    works: ["Cranes & Wisteria", "Stag at Sunset", "Bird Silhouette at Sunset", "Village Woman Carrying Pot"],
  },
  {
    name: "Modern, Still Life & Whimsical",
    description: "Contemporary themes, still lifes, architectural accents and modern mixed media.",
    works: ["Single Red Mushroom", "Window with Flowers", "Blue Bike & Fence", "Potted Plant & Urn", "Fruit & Blue Jar"],
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Layered Canvas — Indian-Inspired Art Portfolio" },
      { name: "description", content: "Explore The Layered Canvas: traditional and sacred art, folk and decorative works, nature, landscapes and contemporary still lifes." },
      { property: "og:title", content: "The Layered Canvas — Indian-Inspired Art Portfolio" },
      { property: "og:description", content: "An Indian-inspired art portfolio spanning traditional, folk, nature and contemporary work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [medium, setMedium] = useState<Medium>("All works");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const filtered = medium === "All works" ? works : works.filter((work) => work.medium === medium);
  const active = selected === null ? null : works[selected];
  const currentCategory = categories[categoryIndex];

  function openWork(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(index);
  }
  function closeWork() {
    setSelected(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }
  function moveWork(direction: number) {
    if (selected === null) return;
    setSelected((selected + direction + works.length) % works.length);
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
          <div className="hero-half hero-half-left"><img src={riverImage} alt="Watercolour of boats and riverside ghats at dawn" /><div className="hero-inset"><span>02 / 04 &nbsp; LOTUS & LIGHT</span><img src={tanjoreImage} alt="Gold-detailed Tanjore-inspired painting of Lakshmi" /></div></div>
          <div className="hero-half hero-half-right"><img src={oilImage} alt="Oil painting of a rain-soaked Indian street" /><div className="hero-thought"><h1 id="hero-title">Indian art, seen<br />in a new light.</h1><a href="#collection">Explore the collection <ArrowRight size={16} aria-hidden="true" /></a></div></div>
          <header className="site-header"><a href="#studio">THE STUDIO</a><a className="wordmark" href="#top" aria-label="The Layered Canvas, back to top">the layered canvas</a><a href="#collection">THE COLLECTION</a><span>EST. IN IMAGINATION</span></header>
          <div className="hero-title" aria-hidden="true"><span>LAYERED</span><span>CANVAS</span></div>
        </section>

        <section className="gallery-band" id="collection" aria-labelledby="page-title">
          <div className="gallery-inner">
            <div className="gallery-intro">
              <div><span className="section-kicker">THE COLLECTION / FOUR WORLDS</span><h2 id="page-title">Works in many forms.</h2></div>
              <p>From sacred iconography and folk traditions to landscapes and contemporary studies.</p>
            </div>
            <div className="category-browser" aria-label="Artwork categories">
              <div className="category-options" role="group" aria-label="Choose an artwork category">
                {categories.map((category, index) => <Button key={category.name} variant="artwork" size="artwork" className={`category-option ${categoryIndex === index ? "category-option-active" : ""}`} onClick={() => setCategoryIndex(index)} aria-pressed={categoryIndex === index} aria-controls="category-works">
                  <span className="category-option-number">0{index + 1}</span>
                  <span className="category-option-name">{category.name}</span>
                  <span className="category-option-count">{category.works.length} works <ArrowRight size={16} aria-hidden="true" /></span>
                </Button>)}
              </div>
              <div className="category-content" id="category-works" aria-live="polite">
                <div className="category-content-heading"><span className="section-kicker">CATEGORY 0{categoryIndex + 1} / 04</span><h3>{currentCategory.name}</h3><p>{currentCategory.description}</p></div>
                <ol className="category-work-list">{currentCategory.works.map((name, index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span>{name}</li>)}</ol>
              </div>
            </div>
            <div className="sample-intro"><span className="section-kicker">A CLOSER LOOK</span><h2>Illustrative works</h2><p>Sample artwork images and details shown here are examples, not photographs of the works listed above.</p></div>
            <div className="medium-filter" role="group" aria-label="Filter artworks by medium">
              {mediums.map((item) => <Button key={item} variant={medium === item ? "galleryActive" : "gallery"} size="gallery" onClick={() => setMedium(item)} aria-pressed={medium === item}>{item}</Button>)}
            </div>
            <div className="gallery-count" aria-live="polite">Showing {String(filtered.length).padStart(2, "0")} / 04 works</div>
            <div className="chapters">
              {filtered.map((work) => {
                const index = works.indexOf(work);
                return <section className={`chapter chapter-${index + 1}`} key={work.title} aria-labelledby={`work-title-${index}`}>
                  <Button variant="artwork" size="artwork" className="chapter-image" onClick={(event) => openWork(index, event.currentTarget)} aria-label={`View details for ${work.title}`}>
                    <img src={work.image} alt={work.alt} width={work.shape === "landscape" ? 1200 : 900} height={work.shape === "landscape" ? 900 : 1200} loading={index === 0 ? "eager" : "lazy"} />
                  </Button>
                  <div className="chapter-copy">
                    <span className="chapter-number">0{index + 1} / {work.medium}</span>
                    <h2 id={`work-title-${index}`}>{work.title}</h2>
                    <Button variant="detailLink" size="default" onClick={(event) => openWork(index, event.currentTarget)} aria-label={`Explore details for ${work.title}`}>Explore detail <ArrowRight aria-hidden="true" /></Button>
                  </div>
                </section>;
              })}
            </div>
          </div>
        </section>

        <section className="studio-note" id="studio" aria-labelledby="studio-title">
          <div className="studio-note-inner">
            <div><div className="eyebrow">The practice</div><h2 id="studio-title">Many mediums.<br /><em>One imagination.</em></h2></div>
            <div className="studio-copy"><p>From the softness of a watercolour wash to the glow of gold, every surface tells its story differently.</p><small>This is an illustrative portfolio concept. The artwork images and details shown here are examples, ready to be replaced with the artist’s own collection.</small></div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span>The Layered Canvas</span><span>Indian-inspired art · An illustrative collection</span><a href="#top">Back to top ↑</a></footer>

      {active && <div className="detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeWork(); }}>
        <div className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" key={active.title}>
          <Button ref={closeRef} variant="detailIcon" size="icon" className="detail-close" onClick={closeWork} aria-label="Close artwork details"><X aria-hidden="true" /></Button>
          <div className="detail-visual"><img src={active.image} alt={active.alt} width={active.shape === "landscape" ? 1200 : 912} height={active.shape === "landscape" ? 912 : 1200} /></div>
          <div className="detail-content">
            <div className="eyebrow">Artwork 0{(selected ?? 0) + 1} / 04</div>
            <h2 id="detail-title">{active.title}</h2>
            <p>{active.story}</p>
            <dl className="detail-facts">
              <div><dt>Medium</dt><dd>{active.medium}</dd></div>
              <div><dt>Materials</dt><dd>{active.material}</dd></div>
              <div><dt>Size</dt><dd>{active.dimensions}</dd></div>
            </dl>
            <div className="detail-actions">
              <Button variant="outline" size="icon" onClick={() => moveWork(-1)} aria-label="Previous artwork"><ArrowLeft aria-hidden="true" /></Button>
              <span className="gallery-count">0{(selected ?? 0) + 1} — 04</span>
              <Button variant="outline" size="icon" onClick={() => moveWork(1)} aria-label="Next artwork"><ArrowRight aria-hidden="true" /></Button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
