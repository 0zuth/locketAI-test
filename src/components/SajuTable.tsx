import Image from "next/image";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { SAJU_DATA, SAJU_ROW_LABELS } from "@/constants/SAJU_DATA";

// 천간, 지지에 해당하는 데이터 셀 스타일
const sajuItemStyles = cva(
  "w-full flex flex-col items-center rounded-2xl p-1 border",
  {
    variants: {
      variant: {
        destructive: "bg-saju-destructive text-white border-transparent",
        primary: "bg-text-primary text-white border-transparent",
        accent: "bg-saju-accent text-white border-transparent",
        white: "bg-white text-black border-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

// 테이블 셀 스타일
const cellStyles = cva("flex flex-col", {
  variants: {
    // 셀 타입별 스타일
    type: {
      header:
        "font-bold border-b border-black text-[clamp(14px,4.46vw,20px)] p-[clamp(8px,1.34vw,12px)]", // 헤더 셀
      label:
        "bg-saju-background border-b border-r border-black p-[clamp(6px,0.89vw,8px)]", // 라벨 셀
      data: "bg-white p-[clamp(6px,0.89vw,8px)]", // 일반 데이터 셀
      dataCompact: "bg-white p-[clamp(4px,0.67vw,6px)]", // 컴팩트 데이터 셀 (천간, 지지)
    },
    // 하단 테두리 스타일
    borderBottom: {
      thick: "border-b border-black",
      thin: "border-b-[0.5px] border-b-icon-border",
      normal: "border-b",
      none: "",
    },
    // 우측 회색 테두리 적용 여부
    hasRightBorder: {
      true: "border-r-[0.5px] border-r-icon-border",
      false: "",
    },
    // 정렬 방식
    alignment: {
      center: "items-center justify-center",
      left: "items-start justify-start",
    },
  },
  defaultVariants: {
    type: "data",
    borderBottom: "normal",
    hasRightBorder: false,
    alignment: "center",
  },
});

// 테이블 행 컴포넌트 Props 타입 정의
interface TableRowProps {
  label: string;
  subLabel: string;
  data: Array<{
    main?: string;
    sub?: string;
    ganJi?: string;
    element?: string;
    topText?: string;
    icon?: string;
    variant?: "destructive" | "primary" | "accent" | "white";
  }>;
  rowIndex: number; // 행 인덱스 (0-7)
  cellType?: "data" | "dataCompact"; // 셀 타입
  borderBottom?: "thick" | "thin" | "normal" | "none";
  labelBorderBottom?: "thick" | "thin" | "normal" | "none";
  renderCell?: (
    item: TableRowProps["data"][0],
    index: number
  ) => React.ReactNode; // 커스텀 셀 렌더링 함수
}

// 테이블 행 컴포넌트
function TableRow({
  label,
  subLabel,
  data,
  rowIndex,
  cellType = "data",
  borderBottom = "normal",
  labelBorderBottom,
  renderCell,
}: TableRowProps) {
  // 마지막 행 여부 확인
  const isLastRow = rowIndex === 7;
  // 마지막 행이면 테두리 없음, 아니면 지정된 테두리 사용
  const finalBorderBottom = isLastRow ? "none" : borderBottom;
  const finalLabelBorderBottom = isLastRow
    ? "none"
    : labelBorderBottom || borderBottom;

  // 행별 설명 텍스트 생성
  const getRowDescription = (rowIndex: number, label: string) => {
    const descriptions = {
      0: `${label}: 간지, 사주의 기본 정보`,
      1: `${label}: 천간 정보`,
      2: `${label}: 지지 정보`,
      3: `${label}: 십성 정보`,
      4: `${label}: 십이운성 정보`,
      5: `${label}: 십이신살 정보`,
      6: `${label}: 신살 정보`,
    };
    return descriptions[rowIndex as keyof typeof descriptions] || `${label} 행`;
  };

  return (
    <tr
      className="contents"
      role="row"
      aria-label={getRowDescription(rowIndex, label)}
    >
      {/* 라벨 셀 (1열) */}
      <th
        className={twMerge(
          cellStyles({ type: "label" }),
          // 천간 행의 라벨 셀만 회색 하단 테두리 적용
          finalLabelBorderBottom === "thin" &&
            "border-b-[0.5px] border-b-icon-border"
        )}
        scope="row"
        role="rowheader"
        aria-label={`${label} ${subLabel}`}
      >
        <span className="text-[clamp(7px,2.23vw,10px)] font-bold leading-tight">
          {label}
        </span>
        <span className="text-[clamp(6px,1.79vw,8px)]">{subLabel}</span>
      </th>
      {/* 데이터 셀 (2-5열) */}
      {data.map((item, index) => (
        <td
          key={index}
          className={cellStyles({
            type: cellType,
            borderBottom: finalBorderBottom,
            hasRightBorder: index < 3, // 마지막 열 제외하고 우측 테두리 적용
          })}
          role="cell"
          aria-label={`${SAJU_DATA.header[index]} 시간 ${label} 정보: ${
            item.main || item.ganJi || item.icon || ""
          } ${item.sub || item.element || ""}`}
        >
          {/* 커스텀 렌더링 함수가 있으면 사용, 없으면 기본 렌더링 */}
          {renderCell ? (
            renderCell(item, index)
          ) : (
            <>
              <span className="text-[clamp(11px,3.57vw,16px)] leading-tight">
                {item.main || item.ganJi}
              </span>
              <span className="text-[clamp(7px,2.23vw,10px)]">
                {item.sub || item.element}
              </span>
            </>
          )}
        </td>
      ))}
    </tr>
  );
}

// 테이블 1행
function TableHeader() {
  return (
    <thead className="contents" role="rowgroup">
      <tr className="contents" role="row">
        {/* 1열 */}
        <th
          className="border-b border-r border-black p-[clamp(8px,1.34vw,12px)]"
          scope="col"
          role="columnheader"
          aria-label="구분"
        />
        {/* 2-5열 */}
        {SAJU_DATA.header.map((char, index) => (
          <th
            key={index}
            className={cellStyles({
              type: "header",
              hasRightBorder: index < 3, // 마지막 열 제외하고 우측 테두리 적용
            })}
            scope="col"
            role="columnheader"
            aria-label={`${char} 시간`}
          >
            {char}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function SajuTable() {
  // 테이블 행 데이터 - 각 행의 설정을 배열로 관리
  const tableRows = [
    // 2행: 간지
    {
      label: SAJU_ROW_LABELS[0].label,
      subLabel: SAJU_ROW_LABELS[0].subLabel,
      data: SAJU_DATA.ganJi,
      cellType: "data" as const,
      borderBottom: "thick" as const,
    },
    // 3행: 천간
    {
      label: SAJU_ROW_LABELS[1].label,
      subLabel: SAJU_ROW_LABELS[1].subLabel,
      data: SAJU_DATA.cheonGan,
      cellType: "dataCompact" as const,
      borderBottom: "thin" as const,
      labelBorderBottom: "thin" as const,
      renderCell: (item: TableRowProps["data"][0]) => (
        <div
          className={twMerge(sajuItemStyles({ variant: item.variant }))}
          role="img"
          aria-label={`천간 아이콘: ${item.topText} ${item.icon} ${item.element}`}
        >
          <span className="text-[clamp(6px,1.79vw,8px)]">{item.topText}</span>
          <div className="w-5 h-5 rounded flex items-center justify-center mx-auto my-1">
            <span className="text-[clamp(18px,5.58vw,25px)] font-bold">
              {item.icon}
            </span>
          </div>
          <span className="text-[clamp(7px,2.23vw,10px)]">{item.element}</span>
        </div>
      ),
    },
    // 4행: 지지
    {
      label: SAJU_ROW_LABELS[2].label,
      subLabel: SAJU_ROW_LABELS[2].subLabel,
      data: SAJU_DATA.jiJi,
      cellType: "dataCompact" as const,
      renderCell: (item: TableRowProps["data"][0]) => (
        <div
          className={twMerge(sajuItemStyles({ variant: item.variant }))}
          role="img"
          aria-label={`지지 아이콘: ${item.topText} ${item.icon} ${item.element}`}
        >
          <span className="text-[clamp(6px,1.79vw,8px)]">{item.topText}</span>
          <div className="w-5 h-5 rounded flex items-center justify-center mx-auto my-1">
            <span className="text-[clamp(18px,5.58vw,25px)] font-bold">
              {item.icon}
            </span>
          </div>
          <span className="text-[clamp(7px,2.23vw,10px)]">{item.element}</span>
        </div>
      ),
    },
    // 5행: 십성
    {
      label: SAJU_ROW_LABELS[3].label,
      subLabel: SAJU_ROW_LABELS[3].subLabel,
      data: SAJU_DATA.sipSeong,
      cellType: "data" as const,
    },
    // 6행: 십이운성
    {
      label: SAJU_ROW_LABELS[4].label,
      subLabel: SAJU_ROW_LABELS[4].subLabel,
      data: SAJU_DATA.sipIUnSeong,
      cellType: "data" as const,
    },
    // 7행: 십이신살
    {
      label: SAJU_ROW_LABELS[5].label,
      subLabel: SAJU_ROW_LABELS[5].subLabel,
      data: SAJU_DATA.sipISinSal,
      cellType: "data" as const,
    },
    // 8행: 신살
    {
      label: SAJU_ROW_LABELS[6].label,
      subLabel: SAJU_ROW_LABELS[6].subLabel,
      data: SAJU_DATA.sinSal,
      cellType: "data" as const,
    },
  ];

  return (
    <section
      className="absolute top-2/3 w-full px-3.5 pb-10"
      aria-label="사주팔자 테이블"
    >
      <div className="relative w-full h-full bg-saju-background border-saju-border shadow-xl border-[3px] flex flex-col overflow-hidden">
        {/* 사용자 정보 영역 */}
        <div className="items-center flex flex-col gap-3 mt-10 mb-8 flex-shrink-0">
          <h2 className="text-sm text-text-primary leading-none">
            김로켓님의 사주
          </h2>
          <p className="text-base text-text-primary font-bold leading-none">
            1980년 8월27일 08:10
          </p>
        </div>

        {/* 사주팔자 테이블 영역 */}
        <div className="px-4.5 pb-10 flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
          <table
            className="grid grid-cols-[2fr_repeat(4,3fr)] w-full border-b border-r cursor-default"
            role="table"
            aria-label="사주팔자 분석표"
            aria-describedby="saju-table-description"
          >
            <caption id="saju-table-description" className="sr-only">
              간지, 천간, 지지, 십성, 십이운성, 십이신살, 신살 정보를 정리한
              표입니다.
            </caption>
            {/* 테이블 헤더 */}
            <TableHeader />
            {/* 테이블 본문 */}
            <tbody className="contents" role="rowgroup">
              {tableRows.map((row, index) => (
                <TableRow
                  key={index}
                  label={row.label}
                  subLabel={row.subLabel}
                  data={row.data}
                  rowIndex={index}
                  cellType={row.cellType}
                  borderBottom={row.borderBottom}
                  labelBorderBottom={row.labelBorderBottom}
                  renderCell={row.renderCell}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* 컴포넌트 장식 이미지 */}
        <Image
          src="/images/ui/saju-graph/cloud-left.png"
          alt="왼쪽 구름 장식"
          width={56}
          height={38}
          className="absolute left-2 top-11"
          aria-hidden="true"
        />
        <Image
          src="/images/ui/saju-graph/cloud-right.png"
          alt="오른쪽 구름 장식"
          width={56}
          height={38}
          className="absolute right-2 top-7"
          aria-hidden="true"
        />

        {/* 컴포넌트 외곽 테두리 */}
        <div
          className="absolute left-0 top-1.5 h-[1px] bg-pri-navy w-full"
          aria-hidden="true"
        />
        <div
          className="absolute left-1.5 top-0 w-[1px] bg-pri-navy h-full"
          aria-hidden="true"
        />
        <div
          className="absolute right-1.5 top-0 w-[1px] bg-pri-navy h-full"
          aria-hidden="true"
        />
        <div
          className="absolute left-0 bottom-1.5 h-[1px] bg-pri-navy w-full"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
