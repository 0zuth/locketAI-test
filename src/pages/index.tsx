import Image from "next/image";
import SajuTable from "@/components/SajuTable";

export default function Home() {
  return (
    <div>
      <h1 className="sr-only">제 1장 - 나의 사주팔자</h1>
      <main
        className="relative max-w-md mx-auto bg-saju-background"
        role="main"
      >
        <section
          className="w-full aspect-[375/2081]"
          aria-label="사주팔자 웹툰 배경"
        >
          <Image
            src="/images/background.png"
            alt="사주팔자 웹툰 이미지"
            fill
            className="w-full h-full object-cover"
            priority
          />
          <article
            className="absolute cursor-default text-center tracking-tight top-1/3 left-1/4 -translate-x-1/5 -translate-y-1/2 text-text-primary text-[clamp(0.75rem,4.46vw,1.25rem)]"
            aria-label="사주 분석 안내"
          >
            <p>
              이제 본격적으로 <br />
              OO님의 사주팔자를 <br />
              분석해볼 차례네요.
            </p>
          </article>
          <article
            className="absolute cursor-default text-center tracking-tight top-1/2 left-1/6 -translate-y-1/3 text-text-primary text-[clamp(0.75rem,4.46vw,1.25rem)]"
            aria-label="사주 표 정리 안내"
          >
            <p>
              제가 oo님의 사주를 <br />
              보기 쉽게 표로 정리했어요
            </p>
          </article>
        </section>
        <SajuTable />
      </main>
    </div>
  );
}
