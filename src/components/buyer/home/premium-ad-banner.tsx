import Image from "next/image";

import { Container } from "@/components/common/container";

export function PremiumAdBanner() {
  return (
    <section className="bg-white py-3 sm:py-5">
      <Container>
        <div className="w-full overflow-hidden">
          <Image
            src="/images/home/ads/summercool banner.png"
            alt="Premium advertising"
            width={1320}
            height={170}
            priority
            className="h-auto w-full rounded-[10px] border border-gray-400 object-contain sm:rounded-[12px]"
          />
        </div>
      </Container>
    </section>
  );
}