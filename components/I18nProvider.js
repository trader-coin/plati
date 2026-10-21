"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    categories: "Categories",
    all: "All",
    productsCount: "{{count}} products",
    popular: "Popular",
    lowestPrice: "Lowest price",
    highestPrice: "Highest price",
    noProducts: "No products found. Run /api/sync to load data, or clear the current filters.",
    sold: "{{sales}} sold",
    sellerLine: "Seller: {{seller}} · {{sales}} sold · ★ {{rating}} ({{reviews}} reviews)",
    backToCatalog: "← Back to catalog",
    buyOnPlati: "Buy on Plati",
    searchPlaceholder: "Search games, keys, accounts, software…",
    search: "Search",
    login: "Login",
    footer: "Payment and delivery are handled by the Plati.Market platform.",
    selectLanguage: "Select language",
    displayPreferences: "Display preferences",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  vi: {
    categories: "Danh mục",
    all: "Tất cả",
    productsCount: "{{count}} sản phẩm",
    popular: "Phổ biến",
    lowestPrice: "Giá thấp nhất",
    highestPrice: "Giá cao nhất",
    noProducts: "Không tìm thấy sản phẩm. Hãy chạy /api/sync để tải dữ liệu hoặc bỏ bộ lọc hiện tại.",
    sold: "{{sales}} đã bán",
    sellerLine: "Người bán: {{seller}} · {{sales}} đã bán · ★ {{rating}} ({{reviews}} đánh giá)",
    backToCatalog: "← Quay lại danh sách",
    buyOnPlati: "Mua trên Plati",
    searchPlaceholder: "Tìm game, key, tài khoản, phần mềm…",
    search: "Tìm kiếm",
    login: "Đăng nhập",
    footer: "Thanh toán và giao hàng được xử lý bởi nền tảng Plati.Market.",
    selectLanguage: "Chọn ngôn ngữ",
    displayPreferences: "Tùy chọn hiển thị",
    switchToLight: "Chuyển sang giao diện sáng",
    switchToDark: "Chuyển sang giao diện tối",
  },
  ru: {
    categories: "Категории",
    all: "Все",
    productsCount: "Товаров: {{count}}",
    popular: "Популярные",
    lowestPrice: "Сначала дешевые",
    highestPrice: "Сначала дорогие",
    noProducts: "Товары не найдены. Запустите /api/sync или сбросьте фильтры.",
    sold: "Продано: {{sales}}",
    sellerLine: "Продавец: {{seller}} · Продано: {{sales}} · ★ {{rating}} (отзывов: {{reviews}})",
    backToCatalog: "← Вернуться в каталог",
    buyOnPlati: "Купить на Plati",
    searchPlaceholder: "Поиск игр, ключей, аккаунтов, программ…",
    search: "Поиск",
    login: "Войти",
    footer: "Оплата и доставка обрабатываются платформой Plati.Market.",
    selectLanguage: "Выбрать язык",
    displayPreferences: "Настройки отображения",
    switchToLight: "Включить светлую тему",
    switchToDark: "Включить темную тему",
  },
  "zh-CN": {
    categories: "分类",
    all: "全部",
    productsCount: "{{count}} 个商品",
    popular: "热门",
    lowestPrice: "价格最低",
    highestPrice: "价格最高",
    noProducts: "未找到商品。请运行 /api/sync 加载数据，或清除当前筛选条件。",
    sold: "已售 {{sales}}",
    sellerLine: "卖家：{{seller}} · 已售 {{sales}} · ★ {{rating}}（{{reviews}} 条评价）",
    backToCatalog: "← 返回目录",
    buyOnPlati: "在 Plati 购买",
    searchPlaceholder: "搜索游戏、密钥、账号、软件…",
    search: "搜索",
    login: "登录",
    footer: "付款和配送由 Plati.Market 平台处理。",
    selectLanguage: "选择语言",
    displayPreferences: "显示设置",
    switchToLight: "切换到浅色主题",
    switchToDark: "切换到深色主题",
  },
  ja: {
    categories: "カテゴリー",
    all: "すべて",
    productsCount: "{{count}} 件の商品",
    popular: "人気順",
    lowestPrice: "価格の安い順",
    highestPrice: "価格の高い順",
    noProducts: "商品が見つかりません。/api/sync を実行するか、現在のフィルターを解除してください。",
    sold: "{{sales}} 件販売",
    sellerLine: "販売者: {{seller}} · {{sales}} 件販売 · ★ {{rating}}（{{reviews}} 件のレビュー）",
    backToCatalog: "← カタログに戻る",
    buyOnPlati: "Platiで購入",
    searchPlaceholder: "ゲーム、キー、アカウント、ソフトウェアを検索…",
    search: "検索",
    login: "ログイン",
    footer: "支払いと配送は Plati.Market プラットフォームが処理します。",
    selectLanguage: "言語を選択",
    displayPreferences: "表示設定",
    switchToLight: "ライトテーマに切り替え",
    switchToDark: "ダークテーマに切り替え",
  },
  ko: {
    categories: "카테고리",
    all: "전체",
    productsCount: "상품 {{count}}개",
    popular: "인기순",
    lowestPrice: "낮은 가격순",
    highestPrice: "높은 가격순",
    noProducts: "상품을 찾을 수 없습니다. /api/sync를 실행하거나 현재 필터를 지워 주세요.",
    sold: "{{sales}}개 판매",
    sellerLine: "판매자: {{seller}} · {{sales}}개 판매 · ★ {{rating}} (리뷰 {{reviews}}개)",
    backToCatalog: "← 카탈로그로 돌아가기",
    buyOnPlati: "Plati에서 구매",
    searchPlaceholder: "게임, 키, 계정, 소프트웨어 검색…",
    search: "검색",
    login: "로그인",
    footer: "결제와 배송은 Plati.Market 플랫폼에서 처리됩니다.",
    selectLanguage: "언어 선택",
    displayPreferences: "화면 설정",
    switchToLight: "라이트 테마로 전환",
    switchToDark: "다크 테마로 전환",
  },
  es: {
    categories: "Categorías",
    all: "Todos",
    productsCount: "{{count}} productos",
    popular: "Más populares",
    lowestPrice: "Precio más bajo",
    highestPrice: "Precio más alto",
    noProducts: "No se encontraron productos. Ejecuta /api/sync o elimina los filtros actuales.",
    sold: "{{sales}} vendidos",
    sellerLine: "Vendedor: {{seller}} · {{sales}} vendidos · ★ {{rating}} ({{reviews}} reseñas)",
    backToCatalog: "← Volver al catálogo",
    buyOnPlati: "Comprar en Plati",
    searchPlaceholder: "Buscar juegos, claves, cuentas, software…",
    search: "Buscar",
    login: "Iniciar sesión",
    footer: "El pago y la entrega son gestionados por la plataforma Plati.Market.",
    selectLanguage: "Seleccionar idioma",
    displayPreferences: "Preferencias de pantalla",
    switchToLight: "Cambiar al tema claro",
    switchToDark: "Cambiar al tema oscuro",
  },
  fr: {
    categories: "Catégories",
    all: "Tous",
    productsCount: "{{count}} produits",
    popular: "Populaires",
    lowestPrice: "Prix le plus bas",
    highestPrice: "Prix le plus élevé",
    noProducts: "Aucun produit trouvé. Exécutez /api/sync ou effacez les filtres actuels.",
    sold: "{{sales}} vendus",
    sellerLine: "Vendeur : {{seller}} · {{sales}} vendus · ★ {{rating}} ({{reviews}} avis)",
    backToCatalog: "← Retour au catalogue",
    buyOnPlati: "Acheter sur Plati",
    searchPlaceholder: "Rechercher des jeux, clés, comptes, logiciels…",
    search: "Rechercher",
    login: "Connexion",
    footer: "Le paiement et la livraison sont gérés par la plateforme Plati.Market.",
    selectLanguage: "Choisir la langue",
    displayPreferences: "Préférences d’affichage",
    switchToLight: "Passer au thème clair",
    switchToDark: "Passer au thème sombre",
  },
  de: {
    categories: "Kategorien",
    all: "Alle",
    productsCount: "{{count}} Produkte",
    popular: "Beliebt",
    lowestPrice: "Niedrigster Preis",
    highestPrice: "Höchster Preis",
    noProducts: "Keine Produkte gefunden. Führe /api/sync aus oder entferne die aktuellen Filter.",
    sold: "{{sales}} verkauft",
    sellerLine: "Verkäufer: {{seller}} · {{sales}} verkauft · ★ {{rating}} ({{reviews}} Bewertungen)",
    backToCatalog: "← Zurück zum Katalog",
    buyOnPlati: "Auf Plati kaufen",
    searchPlaceholder: "Spiele, Keys, Konten, Software suchen…",
    search: "Suchen",
    login: "Anmelden",
    footer: "Zahlung und Lieferung werden von der Plati.Market-Plattform abgewickelt.",
    selectLanguage: "Sprache auswählen",
    displayPreferences: "Anzeigeeinstellungen",
    switchToLight: "Zum hellen Theme wechseln",
    switchToDark: "Zum dunklen Theme wechseln",
  },
};

const I18nContext = createContext(null);

function interpolate(template, values = {}) {
  return template.replace(/{{(\w+)}}/g, (_, key) => values[key] ?? "");
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function T({ id, values }) {
  const { t } = useI18n();
  return t(id, values);
}

export default function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("locale");
    const initialLocale = savedLocale && translations[savedLocale] ? savedLocale : "en";
    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  function setLocale(nextLocale) {
    const validLocale = translations[nextLocale] ? nextLocale : "en";
    setLocaleState(validLocale);
    window.localStorage.setItem("locale", validLocale);
    document.documentElement.lang = validLocale;
  }

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (id, values) => interpolate(translations[locale]?.[id] || translations.en[id] || id, values),
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
