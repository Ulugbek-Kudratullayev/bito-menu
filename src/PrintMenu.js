import React from "react";
import menuData from "./menuData";

const gold = "#B8860B";
const black = "#111111";

function DottedPrice({ name, price }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 4,
        margin: "3px 0",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: black, whiteSpace: "nowrap" }}>
        {name}
      </span>
      <span
        style={{
          flex: 1,
          borderBottom: "1.5px dotted #bbb",
          minWidth: 10,
          marginBottom: 2,
        }}
      />
      <span style={{ fontSize: 13, fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
        {price}
      </span>
    </div>
  );
}

function CategoryBlock({ category, subtitle, items, imageOnRight }) {
  const catImage = items[0]?.image;

  const imageEl = (
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: `2.5px solid ${gold}`,
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
          fontSize: 16,
          fontWeight: 700,
          color: gold,
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: "0.06em",
          margin: "0 0 4px",
          textTransform: "uppercase",
        }}
      >
        {category}
        {subtitle && (
          <span
            style={{
              fontSize: 10,
              color: "#888",
              fontWeight: 400,
              marginLeft: 6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ({subtitle})
          </span>
        )}
      </h3>
      {items.map((item, idx) => {
        if (item.variants.length === 1 && !item.variants[0].label) {
          return <DottedPrice key={idx} name={item.name} price={item.variants[0].price} />;
        }
        return item.variants.map((v, vi) => (
          <DottedPrice
            key={`${idx}-${vi}`}
            name={v.label ? `${item.name} (${v.label})` : item.name}
            price={v.price}
          />
        ));
      })}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        marginBottom: 16,
      }}
    >
      {imageOnRight ? (
        <>
          {contentEl}
          {imageEl}
        </>
      ) : (
        <>
          {imageEl}
          {contentEl}
        </>
      )}
    </div>
  );
}

export default function PrintMenu() {
  // 2 ustunga taqsimlash
  const totalWeight = menuData.reduce(
    (s, c) => s + c.items.reduce((a, it) => a + Math.max(it.variants.length, 1), 0) + 1.5,
    0
  );
  const half = totalWeight / 2;
  let w = 0;
  let mid = menuData.length;
  for (let i = 0; i < menuData.length; i++) {
    w +=
      menuData[i].items.reduce((a, it) => a + Math.max(it.variants.length, 1), 0) + 1.5;
    if (w >= half) {
      mid = i + 1;
      break;
    }
  }
  const col1 = menuData.slice(0, mid);
  const col2 = menuData.slice(mid);

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        margin: "0 auto",
        backgroundColor: "#fff",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "10mm 8mm 8mm",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 10, flexShrink: 0 }}>
        <div
          style={{
            width: "100%",
            height: 6,
            background: `linear-gradient(90deg, transparent 0%, ${gold} 20%, ${gold} 80%, transparent 100%)`,
            borderRadius: 3,
            marginBottom: 12,
          }}
        />
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: black,
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
            fontSize: 14,
            color: gold,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.35em",
            margin: "4px 0 0",
            fontWeight: 600,
          }}
        >
          MENU
        </p>
        <div
          style={{
            width: "60%",
            height: 1,
            backgroundColor: "#ddd",
            margin: "10px auto 0",
          }}
        />
      </header>

      {/* 2 Column Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          gap: 20,
          minHeight: 0,
        }}
      >
        <div style={{ flex: 1 }}>
          {col1.map((cat, idx) => (
            <CategoryBlock key={idx} {...cat} imageOnRight={idx % 2 !== 0} />
          ))}
        </div>

        <div style={{ width: 1, backgroundColor: "#e0e0e0" }} />

        <div style={{ flex: 1 }}>
          {col2.map((cat, idx) => (
            <CategoryBlock key={idx} {...cat} imageOnRight={idx % 2 !== 0} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          flexShrink: 0,
          textAlign: "center",
          paddingTop: 6,
          borderTop: `1px solid #ddd`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <span style={{ color: "#888", fontSize: 10 }}>+998 XX XXX XX XX</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: gold,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            BITO
          </span>
          <span style={{ color: "#888", fontSize: 10 }}>Manzil, Shahar</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 4,
            background: `linear-gradient(90deg, transparent 0%, ${gold} 20%, ${gold} 80%, transparent 100%)`,
            borderRadius: 3,
            marginTop: 6,
          }}
        />
      </footer>
    </div>
  );
}
