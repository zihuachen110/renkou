import type { Locale } from "./locales";

const zh = {
  brand: "人口观",
  brandEn: "China Population",

  nav: {
    explore: "探索",
    sources: "来源",
    about: "关于",
    disclaimer: "免责",
    privacy: "隐私",
    ads: "广告说明",
  },

  banner: {
    text: "非官方独立项目 · 数据以国家统计局发布为准 · 地图边界非正式审图成果",
    disclaimerLink: "免责声明",
  },

  footer: {
    tagline: "人口观 · 非官方 · 边界非正式审图 · 数据以统计局为准",
    disclaimer: "免责声明",
  },

  lang: {
    zh: "中文",
    en: "EN",
    switchTo: "切换语言",
  },

  home: {
    title: (year: number, yi: string) =>
      `中国人口数据 · ${year}年全国总人口 ${yi} 亿人 | 人口观`,
    description: (year: number, yi: string) =>
      `非官方人口数据探索：查看中国${year}年常住总人口 ${yi} 亿人、各年趋势与省级分布，含来源与口径说明。`,
    insightAgingTitle: "哪里在变老？",
    insightAgingBody:
      "用 2010 与 2020 老龄化率对比下钻到地级市——传播向专题，不打断总人口主线。数据接入后开放完整专题页。",
    insightAgingCta: "了解数据方法 →",
    insightUpdateTitle: "数据如何更新？",
    insightUpdateBody:
      "全站静态托管。官方公报更新后替换 JSON 并重新部署；每条数值可追溯原始发布页。",
    insightUpdateCta: "关于本项目 →",
    adsSlot: "广告位 · 默认关闭 · 不遮挡数据",
  },

  explore: {
    heroLabel: "全国总人口",
    unitYi: "亿人",
    heroLeadBefore: "",
    heroLeadAfter:
      " 年常住人口。点右侧年份，可看各年变化并同步下方分布。",
    scopeLabel: "口径：常住人口",
    scopePrefix: "口径：",
    sourcesLink: "数据来源与方法",
    trendTitle: (from: number, to: number) => `全国各年人口（${from}–${to}）`,
    trendHint: "点击年份同步地图",
    yearAria: "选择年份",
    provinceRangeNote: (from: number, to: number) =>
      `省级分布已收录 ${from}–${to}；当前年份只更新全国趋势。`,
    exploreAria: "人口分布探索",
    tabMap: "地图",
    tabRank: "排名",
    tabTable: "表格",
    totalPop: "总人口",
    crumbNational: "全国",
    crumbProvince: "省",
    cityDrillHint: "（市级下钻下一阶段）",
    downloadCsv: "下载 CSV",
    sourceBtn: "来源",
    noProvince: (year: number, from: number, to: number) =>
      `${year} 年暂无省级截面。请切换到 ${from}–${to} 查看分布地图。`,
    selectedLabel: "当前选中",
    national: "全国",
    shareOfNational: (pct: string) => `占全国 ${pct}%`,
    shareHint: "相对全国 · 横向对比",
    nationalScope: "当前为全国口径",
    nationalHint: "各年变化见上方趋势",
    sourcePrefix: "来源：",
    traceLink: "溯源",
    backNational: "返回全国",
    provinceRank: "省级排名",
    metaAria: "数据元信息",
    scopeValue: "常住人口",
    retrievedPrefix: "获取：",
    boundaryPrefix: "边界：",
    fullMethod: "完整方法与原始链接",
    colRegion: "地区",
    colPopWan: "人口（万人）",
    colShare: "占全国",
    colSource: "来源",
    sourceYearbook: "年鉴/公报",
  },

  map: {
    legendTitle: "常住人口（大陆 31 省区市）",
    less: "少",
    more: "多",
    legendNote: "灰底描边=无本站普查数据 · 边界非正式审图",
  },

  meta: {
    indicatorName: "常住总人口",
    unit: "万人",
    unitDisplayNote: "（页面展示换算为亿人）",
    methodologyNote:
      "常住人口·年末数。全国为年鉴/国家数据逐年序列（1949–2025）；省级截面为统计年鉴「各地区年末人口」2000–2024，其中 2010/2020 用六普/七普公报精确值覆盖年鉴舍入；2021–2024 自《中国统计年鉴2025》表 2-5 图片转录。2025 分省年末数年鉴尚未刊出。早期年份多为户籍统计推算，口径与近年常住人口不完全等同。",
    publisher:
      "国家统计局（年鉴/国家数据·年末总人口；年鉴分省年末人口；普查公报·分省）",
    licenseNote:
      "公开统计整理展示；非官方。边界为 DataV 可视化用 GeoJSON（含台港澳等要素），非正式审图号；人口着色仅大陆31省区市。",
    geoAttribution: "阿里云 DataV areas_v3 bound/100000_full.json",
  },

  sources: {
    title: "数据来源与方法 · 人口观",
    description: "人口观数据口径、来源机构、获取日期与原始链接说明。",
    h1: "数据来源与方法",
    intro: "每个指标页面都会展示来源摘要。本页汇总方法与授权记录入口。",
    currentIndicator: "当前指标：",
    dtScope: "口径",
    scopeValue: "常住人口 · ",
    dtUnit: "单位",
    dtPublisher: "发布机构",
    dtSourceUrl: "原始链接",
    dtRetrieved: "获取日期",
    dtLicense: "使用说明",
    mapTitle: "地图边界",
    mapBodyBefore: "省界底图为第三方可视化 GeoJSON（DataV），",
    mapBodyStrong: "非正式审图号地图",
    mapBodyAfter:
      "。人口着色仅大陆 31 省区市；国界与争议地区以国家正式公布为准。详见",
    mapDisclaimer: "免责声明",
    mapLinkEnd: "。",
    updateTitle: "更新方式",
    updateBodyBefore: "ETL 脚本产出静态 JSON（见仓库 ",
    updateBodyAfter: "）。替换文件并重新部署即可更新，无需数据库。",
    backHome: "← 返回首页",
  },

  about: {
    title: "关于与免责声明 · 人口观",
    description: "人口观非官方声明、数据与地图边界免责、联系方式。",
    h1: "关于人口观",
    introBefore: "人口观是面向公众的",
    introStrong: "非官方",
    introAfter:
      "人口数据探索站：用公开统计做「有引导」的可视化，帮助理解全国人口规模、各年变化与省级分布。",
    whatTitle: "我们做什么",
    what1: "整理并可视化公开人口指标（当前：常住总人口）",
    what2: "标注来源、口径与获取日期，支持 CSV 下载",
    what3: "境外静态托管；广告可关闭，不干扰阅读",
    disclaimerTitle: "免责声明",
    disclaimerLead: "请完整阅读。使用本站即视为已知悉下列说明。",
    s1Title: "1. 非官方身份",
    s1BodyBefore: "本站由独立项目维护，",
    s1Not: "不是",
    s1BodyAfter:
      "国家统计局、国务院普查机构、自然资源部或任何地方政府的官方网站，亦不代表上述机构立场。站名、页面中出现的「全国」「中国」等表述，仅用于描述公开统计口径下的数据范围，不构成任何官方授权。",
    s2Title: "2. 数据准确性",
    s2Li1:
      "人口数值整理自国家统计局公开发布的人口普查公报、统计年鉴等材料；整理、换算（如「万人」与「亿人」）或展示过程中可能存在四舍五入差异。",
    s2Li2Strong: "一切以官方原始发布为准。",
    s2Li2After: "若本站与统计局网站、正式公报不一致，请以官方文本为准。",
    s2Li3Before: "非普查年份的全国序列多为抽样调查推算，口径可能与普查年不完全相同，详见",
    s2Li3Link: "数据来源与方法",
    s2Li3After: "。",
    s2Li4: "本站不对因使用、引用本站数据而产生的任何直接或间接损失承担责任。",
    s3Title: "3. 地图与行政区划边界",
    s3Li1Before: "地图所用边界来自第三方",
    s3Li1Viz: "可视化用途",
    s3Li1Mid: "的 GeoJSON（当前为阿里云 DataV areas），",
    s3Li1Not: "不是",
    s3Li1Mid2: "自然资源部或测绘地理信息主管部门审定、带审图号的正式地图成果，",
    s3Li1NoLegal: "不具法定效力",
    s3Li1End: "。",
    s3Li2Before:
      "底图中可能包含大陆省级行政区、台湾、香港、澳门以及南海等相关示意要素。此类轮廓",
    s3Li2Strong: "仅供界面示意",
    s3Li2After: "，不代表本站对领土、领海、岛礁或未定界的主张或定性。",
    s3Li3Before: "",
    s3Li3Color: "人口着色范围",
    s3Li3Mid: "仅对应国家统计局人口普查公报中的",
    s3Li3Mainland: "大陆 31 个省、自治区、直辖市",
    s3Li3Mid2:
      "常住人口。台港澳等若显示为浅灰色，表示「本站无该口径下的省级普查着色数据」，",
    s3Li3NotEq: "不等于",
    s3Li3After: "本站发布其人口数，也不等于「人口为零」。",
    s3Li4:
      "凡涉及国界线、行政区域界线、岛礁归属、争议地区等，一律以中华人民共和国官方正式公布的地图和文件为准。本站地图不得作为外交、法律、产权或行政管理的依据。",
    s4Title: "4. 引用与传播",
    s4Body:
      "转载、截图或二次传播时，请注明「非官方整理、数据以统计局为准」，并避免将本站地图当作官方标准地图使用。需要权威边界请查阅带审图号的正式出版物或政府公开地图服务。",
    s5Title: "5. 下架与更正",
    s5Body:
      "若权利人或主管部门认为本站某项数据、边界或表述不当，可提出更正或下架请求；我们将在合理时间内处理（目标 24–48 小时内下线相关静态文件或页面）。",
    contactTitle: "联系",
    contactBody:
      "数据勘误、边界异议或下架请求：请通过项目仓库 Issue 联系（上线后将补充邮箱）。",
    sourcesLink: "数据来源与方法",
    backHome: "← 返回首页",
  },

  privacy: {
    title: "隐私政策 · 人口观",
    description: "人口观隐私政策：Cookie、分析与广告相关说明。",
    h1: "隐私政策",
    updated: "最近更新：2026-10-20",
    intro: "人口观是静态站点。默认不要求注册，不采集可识别个人身份的表单数据。",
    analyticsTitle: "分析",
    analyticsBody:
      "MVP 阶段可不启用分析。若启用，优先使用不依赖侵入式 Cookie 的方案（如 Cloudflare Web Analytics），并在此页更新说明。",
    adsTitle: "广告与 Cookie",
    adsBodyBefore:
      "广告位默认关闭。若日后接入 Google AdSense 等第三方广告，可能使用 Cookie 或类似技术用于展示与计量；届时将补充同意提示与本页细则。关闭广告后，数据探索功能仍完整可用。详见",
    adsLink: "广告说明",
    adsBodyAfter: "。",
    contactTitle: "联系",
    contactBody: "隐私相关请求可通过项目仓库 Issue 提出。",
    backHome: "← 返回首页",
  },

  ads: {
    title: "广告说明 · 人口观",
    description: "人口观广告位政策：标识、不干扰内容、可关闭。",
    h1: "广告说明",
    introBefore: "广告是独立可配置模块，默认 ",
    introAfter: "，不加载第三方广告脚本。",
    li1: "广告位显著标注「广告」",
    li2: "不弹窗、不自动播放、不遮挡地图与数据表",
    li3: "用户屏蔽广告时，核心探索功能仍可用",
    li4: "若接入 AdSense，将遵守其政策并更新隐私说明",
    privacyLink: "隐私政策",
    backHome: "← 返回首页",
  },
} as const;

const en: typeof zh = {
  brand: "人口观",
  brandEn: "China Population",

  nav: {
    explore: "Explore",
    sources: "Sources",
    about: "About",
    disclaimer: "Disclaimer",
    privacy: "Privacy",
    ads: "Ads",
  },

  banner: {
    text: "Unofficial independent project · Data per NBS releases · Map boundaries are not officially surveyed",
    disclaimerLink: "Disclaimer",
  },

  footer: {
    tagline:
      "人口观 · Unofficial · Boundaries not officially surveyed · Data per NBS",
    disclaimer: "Disclaimer",
  },

  lang: {
    zh: "中文",
    en: "EN",
    switchTo: "Language",
  },

  home: {
    title: (year: number, yi: string) =>
      `China Population Data · ${year} National Total ${yi}×100M | 人口观`,
    description: (year: number, yi: string) =>
      `Unofficial explorer: China ${year} resident population ${yi}×100 million, yearly trends and provincial distribution, with sources and methodology.`,
    insightAgingTitle: "Where is aging?",
    insightAgingBody:
      "Compare 2010 vs 2020 aging rates down to prefecture level—a shareable topic that does not interrupt the national population storyline. Full topic page opens when data is ready.",
    insightAgingCta: "Data methods →",
    insightUpdateTitle: "How is data updated?",
    insightUpdateBody:
      "Fully static hosting. Replace JSON and redeploy after official bulletins update; every figure traces back to the original release page.",
    insightUpdateCta: "About this project →",
    adsSlot: "Ad slot · off by default · never covers data",
  },

  explore: {
    heroLabel: "National total population",
    unitYi: "×100M",
    heroLeadBefore: "Resident population in ",
    heroLeadAfter:
      ". Click a year on the right to see change and sync the map below.",
    scopeLabel: "Scope: resident population",
    scopePrefix: "Scope: ",
    sourcesLink: "Sources & methods",
    trendTitle: (from: number, to: number) =>
      `National series (${from}–${to})`,
    trendHint: "Click a year to sync the map",
    yearAria: "Select year",
    provinceRangeNote: (from: number, to: number) =>
      `Provincial cross-sections cover ${from}–${to}; other years update the national trend only.`,
    exploreAria: "Population distribution explorer",
    tabMap: "Map",
    tabRank: "Rank",
    tabTable: "Table",
    totalPop: "Total",
    crumbNational: "National",
    crumbProvince: "Province",
    cityDrillHint: "(city drill-down next)",
    downloadCsv: "Download CSV",
    sourceBtn: "Sources",
    noProvince: (year: number, from: number, to: number) =>
      `No provincial slice for ${year}. Switch to ${from}–${to} for the distribution map.`,
    selectedLabel: "Selected",
    national: "National",
    shareOfNational: (pct: string) => `${pct}% of national`,
    shareHint: "Share of national · compare across provinces",
    nationalScope: "National scope",
    nationalHint: "See yearly change in the trend chart above",
    sourcePrefix: "Source: ",
    traceLink: "Trace",
    backNational: "Back to national",
    provinceRank: "Provincial rank",
    metaAria: "Data metadata",
    scopeValue: "Resident population",
    retrievedPrefix: "Retrieved: ",
    boundaryPrefix: "Boundaries: ",
    fullMethod: "Full methods & original links",
    colRegion: "Region",
    colPopWan: "Population (10k)",
    colShare: "% of national",
    colSource: "Source",
    sourceYearbook: "Yearbook / bulletin",
  },

  map: {
    legendTitle: "Resident population (31 mainland provinces)",
    less: "Less",
    more: "More",
    legendNote: "Gray outline = no census coloring here · boundaries not officially surveyed",
  },

  meta: {
    indicatorName: "Total resident population",
    unit: "10,000 persons",
    unitDisplayNote: " (shown on site as billions)",
    methodologyNote:
      "Resident population, year-end. National series from yearbooks / National Data (1949–2025); provincial cross-sections from yearbook “year-end population by region” 2000–2024, with 2010/2020 overwritten by 6th/7th census bulletin precision; 2021–2024 transcribed from China Statistical Yearbook 2025 Table 2-5. 2025 provincial year-end figures not yet published. Early years often use household registration estimates; scope may differ from recent resident population.",
    publisher:
      "NBS (yearbook / National Data · year-end total; yearbook provincial year-end; census bulletins · provincial)",
    licenseNote:
      "Public statistics curated for display; unofficial. Boundaries are DataV visualization GeoJSON (incl. TW/HK/MO elements), not officially surveyed; population coloring covers 31 mainland provinces only.",
    geoAttribution: "Alibaba Cloud DataV areas_v3 bound/100000_full.json",
  },

  sources: {
    title: "Sources & Methods · 人口观",
    description:
      "Population data scope, publishers, retrieval dates, and original links.",
    h1: "Sources & Methods",
    intro:
      "Each indicator page shows a source summary. This page collects methods and attribution.",
    currentIndicator: "Current indicator: ",
    dtScope: "Scope",
    scopeValue: "Resident population · ",
    dtUnit: "Unit",
    dtPublisher: "Publisher",
    dtSourceUrl: "Original URL",
    dtRetrieved: "Retrieved",
    dtLicense: "Usage",
    mapTitle: "Map boundaries",
    mapBodyBefore: "Provincial boundaries are third-party visualization GeoJSON (DataV), ",
    mapBodyStrong: "not an officially surveyed map",
    mapBodyAfter:
      ". Population coloring covers 31 mainland provinces only; borders and disputed areas follow official national publications. See ",
    mapDisclaimer: "Disclaimer",
    mapLinkEnd: ".",
    updateTitle: "Updates",
    updateBodyBefore: "ETL scripts emit static JSON (see ",
    updateBodyAfter:
      " in the repo). Replace files and redeploy—no database required.",
    backHome: "← Home",
  },

  about: {
    title: "About & Disclaimer · 人口观",
    description:
      "Unofficial notice, data and map-boundary disclaimer, and contact.",
    h1: "About 人口观",
    introBefore: "人口观 is a public-facing ",
    introStrong: "unofficial",
    introAfter:
      " population data explorer: guided visualizations from open statistics to help understand national scale, yearly change, and provincial distribution.",
    whatTitle: "What we do",
    what1: "Curate and visualize open population indicators (currently: total resident population)",
    what2: "Label sources, scope, and retrieval dates; support CSV download",
    what3: "Hosted statically abroad; ads can be disabled and never interrupt reading",
    disclaimerTitle: "Disclaimer",
    disclaimerLead:
      "Please read in full. Using this site means you acknowledge the following.",
    s1Title: "1. Unofficial status",
    s1BodyBefore: "This site is maintained independently and is ",
    s1Not: "not",
    s1BodyAfter:
      " an official website of the National Bureau of Statistics, national census authorities, the Ministry of Natural Resources, or any local government, nor does it represent their positions. Phrases such as “national” or “China” describe the statistical scope of published figures only and do not imply official authorization.",
    s2Title: "2. Data accuracy",
    s2Li1:
      "Figures are curated from NBS census bulletins, statistical yearbooks, and similar public materials; rounding differences may occur in curation, unit conversion (e.g. 10,000 persons ↔ billions), or display.",
    s2Li2Strong: "Official original publications always prevail.",
    s2Li2After:
      " If this site differs from the NBS website or formal bulletins, follow the official text.",
    s2Li3Before:
      "Non-census national series are often sample-survey estimates; scope may differ from census years. See ",
    s2Li3Link: "Sources & methods",
    s2Li3After: ".",
    s2Li4:
      "We are not liable for any direct or indirect loss arising from use or citation of data on this site.",
    s3Title: "3. Maps and administrative boundaries",
    s3Li1Before: "Map boundaries come from third-party GeoJSON for ",
    s3Li1Viz: "visualization",
    s3Li1Mid: " (currently Alibaba Cloud DataV areas), ",
    s3Li1Not: "not",
    s3Li1Mid2:
      " maps approved by surveying authorities with survey approval numbers, and ",
    s3Li1NoLegal: "have no legal effect",
    s3Li1End: ".",
    s3Li2Before:
      "The basemap may include mainland provinces, Taiwan, Hong Kong, Macao, and South China Sea schematic elements. Such outlines are ",
    s3Li2Strong: "for UI illustration only",
    s3Li2After:
      " and do not represent claims about territory, waters, reefs, or unsettled boundaries.",
    s3Li3Before: "",
    s3Li3Color: "Population coloring",
    s3Li3Mid: " covers only the ",
    s3Li3Mainland: "31 mainland provinces, autonomous regions, and municipalities",
    s3Li3Mid2:
      " in NBS census bulletins. Gray for TW/HK/MO means “no provincial census coloring under this site’s scope,” ",
    s3Li3NotEq: "not",
    s3Li3After: " that we publish their population, nor that population is zero.",
    s3Li4:
      "For national borders, administrative boundaries, reef claims, or disputed areas, always follow maps and documents officially published by the People’s Republic of China. Maps on this site must not be used for diplomacy, law, property, or administration.",
    s4Title: "4. Citation and redistribution",
    s4Body:
      "When republishing or sharing screenshots, note “unofficial curation; data per NBS” and do not treat this site’s map as an official standard map. For authoritative boundaries, consult publications with survey approval numbers or government map services.",
    s5Title: "5. Takedown and correction",
    s5Body:
      "Rights holders or authorities who believe data, boundaries, or wording are inappropriate may request correction or takedown; we aim to act within a reasonable time (target: take down related static files or pages within 24–48 hours).",
    contactTitle: "Contact",
    contactBody:
      "Data corrections, boundary objections, or takedown requests: open an Issue on the project repository (email to be added after launch).",
    sourcesLink: "Sources & methods",
    backHome: "← Home",
  },

  privacy: {
    title: "Privacy Policy · 人口观",
    description: "Privacy policy: cookies, analytics, and ads.",
    h1: "Privacy Policy",
    updated: "Last updated: 2026-10-20",
    intro:
      "人口观 is a static site. No account is required by default, and we do not collect personally identifiable form data.",
    analyticsTitle: "Analytics",
    analyticsBody:
      "MVP may run without analytics. If enabled, we prefer non-intrusive options (e.g. Cloudflare Web Analytics) and will update this page.",
    adsTitle: "Ads & cookies",
    adsBodyBefore:
      "Ad slots are off by default. If we later integrate Google AdSense or similar, cookies or similar tech may be used for serving and measurement; we will add consent prompts and details here. Core exploration remains available with ads off. See ",
    adsLink: "Ads policy",
    adsBodyAfter: ".",
    contactTitle: "Contact",
    contactBody: "Privacy requests can be raised via project repository Issues.",
    backHome: "← Home",
  },

  ads: {
    title: "Ads Policy · 人口观",
    description: "Ad slot policy: labeled, non-intrusive, disableable.",
    h1: "Ads Policy",
    introBefore: "Ads are a separate configurable module, default ",
    introAfter: ", with no third-party ad scripts loaded.",
    li1: "Slots are clearly labeled “Ad”",
    li2: "No pop-ups, autoplay, or covering maps and tables",
    li3: "Core exploration remains usable if ads are blocked",
    li4: "If AdSense is added, we will follow its policies and update privacy notices",
    privacyLink: "Privacy policy",
    backHome: "← Home",
  },
};

export const messages = {
  "zh-CN": zh,
  en,
} as const;

export type Messages = typeof zh;

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages["zh-CN"];
}
