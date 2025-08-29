import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="sr-only">제 1장 - 나의 사주팔자</h1>
      <main className="max-w-md min-h-screen mx-auto">
        <div className="relative w-full aspect-[375/2081] bg-saju-background">
          <Image
            src="/images/background.png"
            alt="이미지"
            fill
            className="w-full h-full object-cover"
            priority
          />
          <p className="absolute cursor-default text-center tracking-tight top-1/3 left-1/4 -translate-x-1/5 -translate-y-1/2 text-text-primary text-fluid-responsive">
            이제 본격적으로 <br />
            OO님의 사주팔자를 <br />
            분석해볼 차례네요.
          </p>
          <p className="absolute cursor-default text-center tracking-tight top-1/2 right-2/5 -translate-y-1/3 text-text-primary text-fluid-responsive">
            제가 oo님의 사주를 <br />
            보기 쉽게 표로 정리했어요
          </p>
        </div>
      </main>
    </div>
  );
}
