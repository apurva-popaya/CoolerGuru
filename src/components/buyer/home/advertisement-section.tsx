import Image from "next/image";

import { Container } from "@/components/common/container";

export function AdvertisementSection() {
  return (
    <section className="bg-white py-4">
      <Container>
        <div className="w-full overflow-hidden">
          <Image
            src="/images/home/ads/ecocool banner.png"
            alt="Premium advertising"
            width={1320}
            height={170}
            className="h-auto w-full rounded-[12px] object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
