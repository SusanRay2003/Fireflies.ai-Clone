import { ProductPreview } from "./ProductPreview";

export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#ECECEC] bg-gradient-to-r from-[#f7f9ff] via-white to-[#fff7eb] p-6 shadow-[0_8px_24px_rgba(109,74,255,0.04)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[460px]">
          <div className="inline-flex items-center rounded-full border border-[#F0E7FF] bg-[#F5F1FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6D4AFF]">
            New workspace
          </div>
          <h1 className="mt-4 text-[30px] font-semibold tracking-[-0.02em] text-[#1F1F1F] sm:text-[34px] lg:text-[36px]">
            Welcome Aboard, SUSAN!
          </h1>
          <p className="mt-3 max-w-[400px] text-sm leading-6 text-[#666666] sm:text-[15px]">
            Fireflies is now ready to automate your meetings and streamline your workflows.
          </p>
        </div>

        <div className="w-full max-w-[340px] self-center lg:self-auto">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
