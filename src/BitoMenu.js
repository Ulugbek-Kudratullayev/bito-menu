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
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "3px 0" }}>
        <span style={{ fontSize: 19, fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 8, marginBottom: 3 }} />
        <span style={{ fontSize: 19, fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
          {item.variants[0].price}
        </span>
      </div>
    );
  }

  if (inline) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "3px 0" }}>
        <span style={{ fontSize: 19, fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 8, marginBottom: 3 }} />
        <span style={{ whiteSpace: "nowrap" }}>
          {item.variants.map((v, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: "#444", fontSize: 15 }}> / </span>}
              {v.label && (
                <span style={{ fontSize: 16, color: "#999" }}>{v.label} </span>
              )}
              <span style={{ fontSize: 18, fontWeight: 700, color: gold }}>{v.price}</span>
            </React.Fragment>
          ))}
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: "3px 0" }}>
      <div style={{ fontSize: 19, fontWeight: 500, color: "#ccc" }}>
        {item.name}
      </div>
      {item.variants.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 5, paddingLeft: 12, padding: "2px 0 2px 12px" }}>
          {v.label && (
            <span style={{ fontSize: 17, color: "#888", whiteSpace: "nowrap" }}>{v.label}</span>
          )}
          <span style={{ flex: 1, borderBottom: "1px dotted #222", minWidth: 8, marginBottom: 3 }} />
          <span style={{ fontSize: 18, fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>{v.price}</span>
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
        borderRadius: 10,
        padding: "12px 16px",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
          paddingBottom: 6,
          borderBottom: `1px solid ${gold}25`,
        }}
      >
        {image && (
          <div
            style={{
              width: 52,
              height: 52,
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
            fontSize: 26,
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
            <span style={{ fontSize: 14, color: "#666", fontWeight: 400, marginLeft: 6, fontFamily: "'Inter', sans-serif" }}>
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
        width: 1920,
        height: 1080,
        backgroundColor: "#080808",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {/* Chap BITO strip */}
      <div
        style={{
          width: 60,
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
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 38,
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
              fontSize: 14,
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
          padding: "14px 22px 10px",
          minWidth: 0,
        }}
      >
        <main
          style={{
            flex: 1,
            display: "flex",
            gap: 14,
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
                gap: 12,
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
            marginTop: 10,
            paddingTop: 8,
            borderTop: `1px solid ${gold}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {komboData && (
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 22,
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
                    gap: 12,
                    background: cardBg,
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: `1px solid ${gold}15`,
                  }}
                >
                  <span style={{ fontSize: 21, fontWeight: 700, color: "#fff" }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 23, fontWeight: 800, color: gold }}>
                    {item.variants[0].price}
                  </span>
                  {item.description && (
                    <span style={{ fontSize: 15, color: "#999", fontStyle: "italic" }}>
                      ({item.description})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 22, color: "#555", fontSize: 15 }}>
            <span>+998877707711</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: gold, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
              BITO
            </span>
            <span>Andijon</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
