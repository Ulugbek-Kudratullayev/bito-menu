import React, { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import BitoMenu from "./BitoMenu";
import A4MenuPage from "./A4MenuPage";
import useMenuData from "./useMenuData";

function App() {
  const { menuData } = useMenuData();
  const [view, setView] = useState("tv");
  const [saving, setSaving] = useState(false);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);

  const fastFoodData = menuData.filter(
    (cat) => cat.category !== "ICHIMLIKLAR" && cat.category !== "DESERTLAR"
  );

  const drinksDessertsData = menuData.filter(
    (cat) => cat.category === "ICHIMLIKLAR" || cat.category === "DESERTLAR"
  );

  React.useEffect(() => {
    if (window.location.search.includes("print")) {
      setView("print");
    }
  }, []);

  const saveAsImage = useCallback(async (ref, filename) => {
    if (!ref.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#0a0a0a",
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = filename;
      link.click();
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
    setSaving(false);
  }, []);

  const saveAll = useCallback(async () => {
    await saveAsImage(page1Ref, "BITO-menu-fastfood.png");
    setTimeout(async () => {
      await saveAsImage(page2Ref, "BITO-menu-ichimlik-desert.png");
    }, 500);
  }, [saveAsImage]);

  const btnStyle = {
    padding: "8px 18px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  };

  if (view === "print") {
    return (
      <div style={{ backgroundColor: "#222", minHeight: "100vh", padding: "20px 0" }}>
        {/* Tugmalar */}
        <div
          className="no-print"
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            zIndex: 999,
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={() => saveAsImage(page1Ref, "BITO-menu-fastfood.png")}
            disabled={saving}
            style={{ ...btnStyle, backgroundColor: "#2563eb", color: "#fff" }}
          >
            {saving ? "..." : "Fast Food PNG"}
          </button>
          <button
            onClick={() => saveAsImage(page2Ref, "BITO-menu-ichimlik-desert.png")}
            disabled={saving}
            style={{ ...btnStyle, backgroundColor: "#16a34a", color: "#fff" }}
          >
            {saving ? "..." : "Ichimlik+Desert PNG"}
          </button>
          <button
            onClick={saveAll}
            disabled={saving}
            style={{ ...btnStyle, backgroundColor: "#B8860B", color: "#fff" }}
          >
            {saving ? "Saqlanmoqda..." : "Hammasini saqlash"}
          </button>
          <button
            onClick={() => { setView("tv"); window.history.replaceState({}, "", "/"); }}
            style={{ ...btnStyle, backgroundColor: "#555", color: "#fff" }}
          >
            TV versiya
          </button>
        </div>

        {/* Sahifa 1: Fast Food */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div ref={page1Ref}>
            <A4MenuPage
              title="MENU"
              categories={fastFoodData}
            />
          </div>
        </div>

        {/* Sahifa 2: Ichimliklar + Desertlar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div ref={page2Ref}>
            <A4MenuPage
              title="ICHIMLIKLAR & DESERTLAR"
              categories={drinksDessertsData}
              singleColumn
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => { setView("print"); window.history.replaceState({}, "", "/?print"); }}
        style={{
          ...btnStyle,
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 999,
          backgroundColor: "#FFD700",
          color: "#000",
        }}
      >
        A4 saqlash
      </button>
      <BitoMenu />
    </div>
  );
}

export default App;
