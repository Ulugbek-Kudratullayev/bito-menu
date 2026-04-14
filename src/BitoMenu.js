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
      <div style={{ display: "flex", alignItems: "baseline", gap: 5, padding: "0.2vh 0" }}>
        <span style={{ fontSize: "1.65vh", fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 6, marginBottom: 3 }} />
        <span style={{ fontSize: "1.65vh", fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
          {item.variants[0].price}
        </span>
      </div>
    );
  }

  if (inline) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 5, padding: "0.2vh 0" }}>
        <span style={{ fontSize: "1.65vh", fontWeight: 500, color: "#ccc", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1px dotted #2a2a2a", minWidth: 6, marginBottom: 3 }} />
        <span style={{ whiteSpace: "nowrap" }}>
          {item.variants.map((v, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: "#444", fontSize: "1.3vh" }}> / </span>}
              {v.label && (
                <span style={{ fontSize: "1.4vh", color: "#999" }}>{v.label} </span>
              )}
              <span style={{ fontSize: "1.55vh", fontWeight: 700, color: gold }}>{v.price}</span>
            </React.Fragment>
          ))}
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: "0.2vh 0" }}>
      <div style={{ fontSize: "1.65vh", fontWeight: 500, color: "#ccc" }}>
        {item.name}
      </div>
      {item.variants.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 4, paddingLeft: "1vh", padding: "0.1vh 0 0.1vh 1vh" }}>
          {v.label && (
            <span style={{ fontSize: "1.45vh", color: "#888", whiteSpace: "nowrap" }}>{v.label}</span>
          )}
          <span style={{ flex: 1, borderBottom: "1px dotted #222", minWidth: 6, marginBottom: 3 }} />
          <span style={{ fontSize: "1.5vh", fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>{v.price}</span>
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
        borderRadius: "0.8vh",
        padding: "1vh 1.2vh",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8vh",
          marginBottom: "0.4vh",
          paddingBottom: "0.4vh",
          borderBottom: `1px solid ${gold}25`,
        }}
      >
        {image && (
          <div
            style={{
              width: "4.5vh",
              height: "4.5vh",
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
            fontSize: "2.2vh",
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
            <span style={{ fontSize: "1.2vh", color: "#666", fontWeight: 400, marginLeft: "0.5vh", fontFamily: "'Inter', sans-serif" }}>
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
          width: "3.5vw",
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
              fontSize: "3.5vh",
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
              fontSize: "1.2vh",
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
          padding: "1.2vh 1.5vw 0.8vh",
          minWidth: 0,
        }}
      >
        <main
          style={{
            flex: 1,
            display: "flex",
            gap: "1vw",
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
                gap: "1vh",
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
            marginTop: "0.8vh",
            paddingTop: "0.6vh",
            borderTop: `1px solid ${gold}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {komboData && (
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "2vh",
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
                    gap: "0.8vw",
                    background: cardBg,
                    padding: "0.5vh 1.2vw",
                    borderRadius: "0.6vh",
                    border: `1px solid ${gold}15`,
                  }}
                >
                  <span style={{ fontSize: "1.8vh", fontWeight: 700, color: "#fff" }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: "2vh", fontWeight: 800, color: gold }}>
                    {item.variants[0].price}
                  </span>
                  {item.description && (
                    <span style={{ fontSize: "1.3vh", color: "#999", fontStyle: "italic" }}>
                      ({item.description})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1.5vw", color: "#555", fontSize: "1.3vh" }}>
            <span>+998877707711</span>
            <span style={{ fontSize: "1.8vh", fontWeight: 700, color: gold, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
              BITO
            </span>
            <span>Andijon</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
