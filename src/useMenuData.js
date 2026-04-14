import { useState, useEffect, useCallback } from "react";
import staticMenuData from "./menuData";

const API_URL = "https://backend-production-f7999.up.railway.app/api/monitor-menu/";
const POLL_INTERVAL = 30000;

function formatPrice(num) {
  return Math.round(Number(num)).toLocaleString("uz-UZ").replace(/\s/g, ",");
}

const CATEGORY_ORDER = [
  "BURGERLAR",
  "PITSA",
  "LAVASH",
  "HOT-DOGLAR",
  "FRI",
  "KOMBO SETLAR",
  "ICHIMLIKLAR",
  "DESERTLAR",
];

function transformApiData(data) {
  const { products, categories: apiCategories } = data;

  const categoryImageMap = {};
  for (const cat of apiCategories) {
    if (cat.image_url) {
      categoryImageMap[cat.id] = cat.image_url;
    }
  }

  const grouped = {};
  for (const p of products) {
    const catName = (p.category_name || "").toUpperCase();
    if (!grouped[catName]) {
      grouped[catName] = {
        category: catName,
        items: [],
      };
    }

    const basePrice = Number(p.price);
    const variants = p.variants && p.variants.length > 0
      ? p.variants.map((v) => ({
          label: v.name || undefined,
          price: formatPrice(basePrice + Number(v.price_modifier || 0)),
        }))
      : [{ price: formatPrice(basePrice) }];

    const image = p.image_base64 || p.image_url || categoryImageMap[p.category_id] || null;

    const comboDesc = p.combo_items && p.combo_items.length > 0
      ? p.combo_items.map((c) => c.product_name).join(" + ")
      : null;

    const staticFallback = staticMenuData
      .find((c) => c.category === catName)
      ?.items.find((i) => i.name === p.name);

    grouped[catName].items.push({
      name: p.name,
      image,
      description: p.description || comboDesc || staticFallback?.description || undefined,
      variants,
    });
  }

  const pitsa = grouped["PITSA"];
  if (pitsa) {
    const allLabels = pitsa.items.flatMap((item) =>
      item.variants.filter((v) => v.label).map((v) => v.label)
    );
    const uniqueLabels = [...new Set(allLabels)];
    if (uniqueLabels.length > 0 && uniqueLabels.every((l) => l.includes("sm"))) {
      pitsa.subtitle = uniqueLabels.join(" / ");
    }
  }

  const result = [];
  for (const name of CATEGORY_ORDER) {
    if (grouped[name]) {
      result.push(grouped[name]);
    }
  }

  for (const name of Object.keys(grouped)) {
    if (!CATEGORY_ORDER.includes(name)) {
      result.push(grouped[name]);
    }
  }

  return result;
}

export default function useMenuData() {
  const [menuData, setMenuData] = useState(staticMenuData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const transformed = transformApiData(data);
      if (transformed.length > 0) {
        setMenuData(transformed);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
    const interval = setInterval(fetchMenu, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMenu]);

  return { menuData, loading, error };
}
