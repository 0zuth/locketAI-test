type SajuItemVariant = "destructive" | "primary" | "accent" | "white";

interface SajuItem {
  topText: string;
  icon: string;
  element: string;
  variant: SajuItemVariant;
}

export const SAJU_ROW_LABELS = [
  { label: "干支", subLabel: "(양음)" },
  { label: "天干", subLabel: "(천간)" },
  { label: "地支", subLabel: "(지지)" },
  { label: "十星", subLabel: "(십성)" },
  { label: "十二運星", subLabel: "(십이운성)" },
  { label: "十二神殺", subLabel: "(십이신살)" },
  { label: "貴人", subLabel: "(귀인)" },
];

export const SAJU_DATA = {
  header: ["時", "日", "月", "年"],

  ganJi: [
    { ganJi: "庚申", element: "(양금)" },
    { ganJi: "乙酉", element: "(음목)" },
    { ganJi: "庚申", element: "(양금)" },
    { ganJi: "庚申", element: "(양금)" },
  ],

  cheonGan: [
    {
      topText: "임",
      icon: "壬",
      element: "陽水",
      variant: "primary",
    },
    {
      topText: "정",
      icon: "丁",
      element: "陰火",
      variant: "destructive",
    },
    {
      topText: "계",
      icon: "癸",
      element: "陰水",
      variant: "primary",
    },
    {
      topText: "계",
      icon: "癸",
      element: "陰水",
      variant: "primary",
    },
  ] as SajuItem[],

  jiJi: [
    {
      topText: "인",
      icon: "寅",
      element: "陽木",
      variant: "accent",
    },
    {
      topText: "사",
      icon: "巳",
      element: "陰火",
      variant: "destructive",
    },
    {
      topText: "해",
      icon: "亥",
      element: "陰水",
      variant: "primary",
    },
    {
      topText: "유",
      icon: "西",
      element: "陽金",
      variant: "white",
    },
  ] as SajuItem[],

  sipSeong: [
    { main: "比肩", sub: "(어깨)" },
    { main: "劫財", sub: "(겁재)" },
    { main: "食神", sub: "(식신)" },
    { main: "偏財", sub: "(편재)" },
  ],

  sipIUnSeong: [
    { main: "死" },
    { main: "帝旺", sub: "(제왕)" },
    { main: "胎", sub: "(태)" },
    { main: "長生", sub: "(장생)" },
  ],

  sipISinSal: [
    { main: "劫殺" },
    { main: "地殺", sub: "(지살)" },
    { main: "驛馬殺", sub: "(역마살)" },
    { main: "將星殺", sub: "(장성살)" },
  ],

  sinSal: [
    { sub: "(없음)" },
    { main: "天乙", sub: "(천을귀인)" },
    { main: "太極", sub: "(태극귀인)" },
    {
      items: [
        { main: "文昌", sub: "(문창귀인)" },
        { main: "太極", sub: "(태극귀인)" },
      ],
    },
  ],
};
