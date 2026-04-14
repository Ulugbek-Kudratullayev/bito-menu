import React from "react";

const gold = "#FFD700";

const W = 794;
const H = 1123;
const vh = (n) => (H / 100) * n;

function MenuItemRow({ item }) {
  const hasLabels = item.variants.some((v) => v.label);

  if (item.variants.length === 1 && !hasLabels) {
    return (
      <div style={{ margin: `${vh(0.3)}px 0` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: vh(1.65), fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
            {item.name}
          </span>
          <span style={{ flex: 1, borderBottom: "1.5px dotted #555", minWidth: 4, marginBottom: 2 }} />
          <span style={{ fontSize: vh(1.65), fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
            {item.variants[0].price}
          </span>
        </div>
        {item.description && (
          <div style={{ fontSize: vh(1.1), color: "#999", fontStyle: "italic", paddingLeft: vh(0.5), marginTop: vh(0.1) }}>
            {item.description}
          </div>
        )}
      </div>
    );
  }

  if (!hasLabels && item.variants.length > 1) {
    const prices = item.variants.map((v) => v.price).join(" / ");
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, margin: `${vh(0.3)}px 0` }}>
        <span style={{ fontSize: vh(1.55), fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
          {item.name}
        </span>
        <span style={{ flex: 1, borderBottom: "1.5px dotted #555", minWidth: 4, marginBottom: 2 }} />
        <span style={{ fontSize: vh(1.45), fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
          {prices}
        </span>
      </div>
    );
  }

  return (
    <div style={{ margin: `${vh(0.35)}px 0` }}>
      <div style={{ fontSize: vh(1.65), fontWeight: 600, color: "#fff" }}>
        {item.name}
      </div>
      {item.variants.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 3, paddingLeft: vh(1.2), margin: `${vh(0.1)}px 0` }}>
          {v.label && (
            <span style={{ fontSize: vh(1.35), color: "#aaa", fontWeight: 400, whiteSpace: "nowrap" }}>{v.label}</span>
          )}
          <span style={{ flex: 1, borderBottom: "1px dotted #444", minWidth: 4, marginBottom: 2 }} />
          <span style={{ fontSize: vh(1.45), fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>{v.price}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryBlock({ category, subtitle, items, imageOnRight }) {
  const catImage = items[0]?.image;

  const imageEl = (
    <div
      style={{
        width: vh(6.5),
        height: vh(6.5),
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: `2px solid ${gold}`,
        boxShadow: "0 2px 8px rgba(255,215,0,0.15)",
      }}
    >
      <img
        src={catImage}
        alt={category}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );

  const contentEl = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h3
        style={{
          fontSize: vh(2.1),
          fontWeight: 700,
          color: gold,
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: "0.08em",
          margin: `0 0 ${vh(0.3)}px`,
          textTransform: "uppercase",
        }}
      >
        {category}
        {subtitle && (
          <span
            style={{
              fontSize: vh(1.25),
              color: "#888",
              fontWeight: 400,
              marginLeft: vh(0.5),
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ({subtitle})
          </span>
        )}
      </h3>
      {items.map((item, idx) => (
        <MenuItemRow key={idx} item={item} />
      ))}
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: vh(1) }}>
      {imageOnRight ? <>{contentEl}{imageEl}</> : <>{imageEl}{contentEl}</>}
    </div>
  );
}

// Kategoriyalarni ustunlarga taqsimlash
function splitColumns(categories) {
  // Har bir kategoriya uchun vizual qator soni
  const weights = categories.map((cat) => {
    const itemLines = cat.items.reduce((sum, item) => {
      const hasLabels = item.variants.some((v) => v.label);
      if (item.variants.length === 1 && !hasLabels) return sum + 1;
      if (!hasLabels) return sum + 1;
      return sum + 1 + item.variants.length;
    }, 0);
    return itemLines + 2; // +2 for header + spacing
  });

  const total = weights.reduce((a, b) => a + b, 0);
  const half = total / 2;
  let w = 0;
  let mid = categories.length;
  for (let i = 0; i < categories.length; i++) {
    w += weights[i];
    if (w >= half) {
      // Qaysi biri yaqinroq?
      mid = (w - half) > (half - (w - weights[i])) ? i : i + 1;
      break;
    }
  }
  if (mid === 0) mid = 1;

  return [categories.slice(0, mid), categories.slice(mid)];
}

export default function A4MenuPage({ title, categories, singleColumn = false }) {
  const komboData = categories.find((cat) => cat.category === "KOMBO SETLAR");
  const mainCategories = categories.filter((cat) => cat.category !== "KOMBO SETLAR");
  const [col1, col2] = singleColumn ? [[], []] : splitColumns(mainCategories);

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#0a0a0a",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: `${vh(2.5)}px ${vh(3)}px ${vh(2)}px`,
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <header style={{ flexShrink: 0, textAlign: "center", marginBottom: vh(1.5) }}>
        <h1
          style={{
            fontSize: vh(4.5),
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.15em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          BITO
        </h1>
        <p
          style={{
            fontSize: vh(1.8),
            color: gold,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.3em",
            margin: `${vh(0.4)}px 0 0`,
            fontWeight: 600,
          }}
        >
          {title}
        </p>
        <div
          style={{
            width: "60%",
            height: 2,
            margin: `${vh(0.8)}px auto 0`,
            background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
          }}
        />
      </header>

      {/* Menu content */}
      <main style={{ flex: 1, minHeight: 0, ...(singleColumn
        ? { display: "flex", flexDirection: "column", gap: vh(2.5) }
        : { display: "flex", gap: vh(2) }
      )}}>
        {singleColumn ? (
          mainCategories.map((cat, idx) => (
            <CategoryBlock key={idx} {...cat} imageOnRight={idx % 2 !== 0} />
          ))
        ) : (
          <>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: vh(3) }}>
              {col1.map((cat, idx) => (
                <CategoryBlock key={idx} {...cat} imageOnRight={idx % 2 !== 0} />
              ))}
            </div>
            <div style={{ width: 1, background: `linear-gradient(180deg, ${gold}, transparent)`, opacity: 0.25 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: vh(3) }}>
              {col2.map((cat, idx) => (
                <CategoryBlock key={idx} {...cat} imageOnRight={idx % 2 !== 0} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Kombo Setlar - 2 ta yonma-yon */}
      {komboData && (
        <div style={{ flexShrink: 0, marginTop: vh(1.2) }}>
          <h3
            style={{
              fontSize: vh(2.1),
              fontWeight: 700,
              color: gold,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: vh(0.8),
            }}
          >
            KOMBO SETLAR
          </h3>
          <div style={{ display: "flex", gap: vh(2), justifyContent: "center" }}>
            {komboData.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: vh(1),
                  padding: `${vh(0.8)}px ${vh(1)}px`,
                  border: "1px solid rgba(255,215,0,0.15)",
                  borderRadius: vh(0.8),
                }}
              >
                <div
                  style={{
                    width: vh(5.5),
                    height: vh(5.5),
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: `2px solid ${gold}`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 4 }}>
                    <span style={{ fontSize: vh(1.5), fontWeight: 600, color: "#fff" }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: vh(1.6), fontWeight: 700, color: gold }}>
                      {item.variants[0].price}
                    </span>
                  </div>
                  {item.description && (
                    <div style={{ fontSize: vh(1), color: "#999", fontStyle: "italic", marginTop: vh(0.15) }}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ flexShrink: 0, textAlign: "center", paddingTop: vh(1), marginTop: vh(1), borderTop: "1px solid rgba(255,215,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: vh(2.5) }}>
          <span style={{ color: "#777", fontSize: vh(1.4), fontWeight: 500 }}>
            📞 +998877707711
          </span>
          <span style={{ fontSize: vh(1.8), fontWeight: 700, color: gold, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.15em" }}>
            BITO
          </span>
          <span style={{ color: "#777", fontSize: vh(1.4), fontWeight: 500 }}>
            📍 Andijon, Yusupotabekov ko'chasi 1-uy
          </span>
        </div>
      </footer>
    </div>
  );
}
