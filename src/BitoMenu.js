import React from "react";
import useMenuData from "./useMenuData";

const gold = "#FFD700";
const cardBg = "#111";

const CATEGORY_IMAGES = {
  BURGERLAR: "/images/burger.jpg",
  PITSA: "/images/peperoni.jpg",
  LAVASH: "/images/lavash.png",
  "HOT-DOGLAR": "/images/hotdog.webp",
  FRI: "/images/fri.jpg",
  "KOMBO SETLAR": "/images/kombo1.jpg",
  ICHIMLIKLAR: "/images/cola.jpg",
  DESERTLAR: "/images/chizkeyk-newyork.jpg",
};

function getCatImage(category, items) {
  if (CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];
  const found = items.find((i) => i.image);
  return found?.image || null;
}

function MenuItemRow({ item, inline }) {
  const hasLabels = item.variants.some((v) => v.label);

  if (item.variants.length === 1 && !hasLabels) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, padding: "2px 0" }}>
        <span style={{ fontSize: "1vw", fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 6, marginBottom: 3 }} />
        <span style={{ fontSize: "1vw", fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
          {item.variants[0].price}
        </span>
      </div>
    );
  }

  if (inline) {
    const priceStr = item.variants
      .map((v) => (v.label ? `${v.label} ${v.price}` : v.price))
      .join(" / ");
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, padding: "2px 0" }}>
        <span style={{ fontSize: "1vw", fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 6, marginBottom: 3 }} />
        <span style={{ fontSize: "0.88vw", fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
          {priceStr}
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: "2px 0" }}>
      <div style={{ fontSize: "1vw", fontWeight: 500, color: "#ccc" }}>
        {item.name}
      </div>
      {item.variants.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 4, paddingLeft: "0.6vw", padding: "1px 0 1px 0.6vw" }}>
          {v.label && (
            <span style={{ fontSize: "0.88vw", color: "#888", whiteSpace: "nowrap" }}>{v.label}</span>
          )}
          <span style={{ flex: 1, borderBottom: "1px dotted #222", minWidth: 6, marginBottom: 3 }} />
          <span style={{ fontSize: "0.92vw", fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>{v.price}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryCard({ category, subtitle, items, inline }) {
  const image = getCatImage(category, items);

  return (
    <div
      style={{
        background: cardBg,
        borderRadius: "0.5vw",
        padding: "0.6vw 0.8vw",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5vw",
          marginBottom: "0.3vw",
          paddingBottom: "0.3vw",
          borderBottom: `1px solid ${gold}25`,
        }}
      >
        {image && (
          <div
            style={{
              width: "2.8vw",
              height: "2.8vw",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: `2px solid ${gold}`,
            }}
          >
            <img
              src={image}
              alt={category}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        )}
        <h3
          style={{
            fontSize: "1.3vw",
            fontWeight: 700,
            color: gold,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.08em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {category}
          {subtitle && (
            <span style={{ fontSize: "0.7vw", color: "#666", fontWeight: 400, marginLeft: "0.3vw", fontFamily: "'Inter', sans-serif" }}>
              ({subtitle})
            </span>
          )}
        </h3>
      </div>
      {items.map((item, idx) => (
        <MenuItemRow key={idx} item={item} inline={inline} />
      ))}
    </div>
  );
}

// Chap 3 ustun uchun qo'lda tartib
const LEFT_COLUMNS = [
  ["BURGERLAR", "LAVASH"],
  ["PITSA", "FRI"],
  ["HOT-DOGLAR", "DESERTLAR"],
];

function buildLeftColumns(categories) {
  const catMap = {};
  for (const cat of categories) {
    catMap[cat.category] = cat;
  }

  return LEFT_COLUMNS.map((names) =>
    names.map((n) => catMap[n]).filter(Boolean)
  );
}

export default function BitoMenu() {
  const { menuData } = useMenuData();

  const ichimliklar = menuData.find((cat) => cat.category === "ICHIMLIKLAR");
  const komboData = menuData.find((cat) => cat.category === "KOMBO SETLAR");
  const foodCategories = menuData.filter(
    (cat) => cat.category !== "ICHIMLIKLAR" && cat.category !== "KOMBO SETLAR"
  );
  const leftCols = buildLeftColumns(foodCategories);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#080808",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Chap BITO strip */}
      <div
        style={{
          width: "3.2vw",
          backgroundColor: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            display: "flex",
            alignItems: "center",
            gap: "1.5vh",
          }}
        >
          <span
            style={{
              fontSize: "2vw",
              fontWeight: 800,
              color: "#fff",
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.2em",
            }}
          >
            BITO
          </span>
          <span
            style={{
              fontSize: "0.7vw",
              fontWeight: 600,
              color: gold,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.4em",
            }}
          >
            MENU
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "12%",
            bottom: "12%",
            width: 2,
            background: `linear-gradient(180deg, transparent, ${gold}, transparent)`,
          }}
        />
      </div>

      {/* Asosiy kontent */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0.7vw 1.2vw 0.5vw",
          minWidth: 0,
        }}
      >
        <main
          style={{
            flex: 1,
            display: "flex",
            gap: "0.7vw",
            minHeight: 0,
          }}
        >
          {/* Chap 3 ustun: taomlar */}
          {leftCols.map((col, colIdx) => (
            <div
              key={colIdx}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.6vw",
              }}
            >
              {col.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
              ))}
            </div>
          ))}

          {/* Ajratuvchi chiziq */}
          <div
            style={{
              width: 2,
              background: `linear-gradient(180deg, ${gold}60, ${gold}10)`,
              flexShrink: 0,
            }}
          />

          {/* O'ng ustun: ICHIMLIKLAR */}
          {ichimliklar && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <CategoryCard {...ichimliklar} inline />
            </div>
          )}
        </main>

        {/* Footer: kombo + kontakt */}
        <footer
          style={{
            flexShrink: 0,
            marginTop: "0.5vw",
            paddingTop: "0.4vw",
            borderTop: `1px solid ${gold}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {komboData && (
            <div style={{ display: "flex", gap: "1vw", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "1.1vw",
                  fontWeight: 700,
                  color: gold,
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                KOMBO
              </span>
              {komboData.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5vw",
                    background: cardBg,
                    padding: "0.3vw 0.8vw",
                    borderRadius: "0.3vw",
                    border: `1px solid ${gold}15`,
                  }}
                >
                  <span style={{ fontSize: "0.9vw", fontWeight: 600, color: "#ccc" }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: "0.95vw", fontWeight: 700, color: gold }}>
                    {item.variants[0].price}
                  </span>
                  {item.description && (
                    <span style={{ fontSize: "0.6vw", color: "#666", fontStyle: "italic" }}>
                      ({item.description})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1.2vw", color: "#555", fontSize: "0.8vw" }}>
            <span>+998877707711</span>
            <span style={{ fontSize: "1.1vw", fontWeight: 700, color: gold, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
              BITO
            </span>
            <span>Andijon</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
