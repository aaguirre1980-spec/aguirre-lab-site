// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Publications data (edit this list)
const PUBLICATIONS = [
  {
    year: 2025,
    area: "Organoids",
    title:
      "Human heart–macrophage assembloids reveal immune control of cardiac maturation and rhythm",
    venue: "Cell Stem Cell",
    authors: "O’Hern et al.",
    url: "#",
    note: "Replace with the DOI / journal link.",
  },
  {
    year: 2024,
    area: "Immunology",
    title: "Tissue-resident immune programs in engineered cardiac tissues",
    venue: "(Journal)",
    authors: "Aguirre Lab",
    url: "#",
    note: "",
  },
  {
    year: 2023,
    area: "Bioengineering",
    title:
      "Optical electrophysiology for scalable phenotyping of 3D cardiac microtissues",
    venue: "(Journal)",
    authors: "Aguirre Lab",
    url: "#",
    note: "",
  },
  {
    year: 2022,
    area: "Systems",
    title: "Single-cell trajectories map human cardiogenesis in vitro",
    venue: "(Journal)",
    authors: "Aguirre Lab",
    url: "#",
    note: "",
  },
];

const pubList = document.getElementById("pubList");
const tpl = document.getElementById("pubCardTpl");
const pubSearch = document.getElementById("pubSearch");
const pubArea = document.getElementById("pubArea");

function renderPubs() {
  const q = (pubSearch.value || "").trim().toLowerCase();
  const area = pubArea.value;

  const filtered = PUBLICATIONS
    .filter((p) => (area === "all" ? true : p.area === area))
    .filter((p) => {
      if (!q) return true;
      const hay = `${p.title} ${p.venue} ${p.authors} ${p.year}`.toLowerCase();
      return hay.includes(q);
    })
    .sort((a, b) => b.year - a.year);

  pubList.innerHTML = "";

  if (filtered.length === 0) {
    const div = document.createElement("div");
    div.className = "muted";
    div.textContent = "No publications match your search.";
    pubList.appendChild(div);
    return;
  }

  for (const p of filtered) {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector(".pubcard");

    card.querySelector(".pill").textContent = p.area;
    card.querySelector(".pubcard__year").textContent = String(p.year);
    card.querySelector(".pubcard__title").textContent = p.title;
    card.querySelector(".pubcard__meta").textContent = `${p.authors} • ${p.venue}`;

    const noteEl = card.querySelector(".pubcard__note");
    if (p.note && p.note.trim()) {
      noteEl.textContent = p.note;
      noteEl.style.display = "block";
    } else {
      noteEl.style.display = "none";
    }

    const a = card.querySelector("a.btn");
    a.href = p.url || "#";

    pubList.appendChild(node);
  }
}

pubSearch.addEventListener("input", renderPubs);
pubArea.addEventListener("change", renderPubs);
renderPubs();
