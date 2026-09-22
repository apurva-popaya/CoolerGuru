import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

import { WideContainer } from "@/components/common/wide-container";

const buyerLinks = [
  {
    label: "Search Companies",
    href: "/companies",
  },
  {
    label: "Search Products",
    href: "/products",
  },
  {
    label: "By Category",
    href: "/categories",
  },
  {
    label: "By Location",
    href: "/companies",
  },
  {
    label: "New Launches",
    href: "/new-launches",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const supplierLinks = [
  {
    label: "List Your Company",
    href: "/supplier",
  },
  {
    label: "Add Products",
    href: "/supplier/dashboard/products/add",
  },
  {
    label: "Supplier Dashboard",
    href: "/supplier/dashboard",
  },
  {
    label: "Supplier Benefits",
    href: "/supplier",
  },
  {
    label: "Pricing",
    href: "/supplier/pricing",
  },
];

const companyLinks = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Why CoolerGuru",
    href: "/why-coolerguru",
  },
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const resourceLinks = [
  {
    label: "Buying Guide",
    href: "/buying-guide",
  },

  {
    label: "Industry Insights",
    href: "/industry-insights",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "FAQs",
    href: "/faq",
  },
];

export function BuyerFooter() {
  return (
    <WideContainer>
      <footer className="w-full overflow-hidden bg-[#07194d] px-5 py-7 text-white sm:px-8 lg:px-10">
        {/* MAIN FOOTER */}
        <div
          className="
      mx-auto w-full max-w-[1600px]
      grid grid-cols-1 gap-8
      sm:grid-cols-2
      lg:grid-cols-4
      xl:grid-cols-[1.35fr_1fr_1fr_1fr_1fr_1.2fr]
      xl:gap-7
    "
        >
          {/* BRAND */}
          <div className="min-w-0">
            <Image
              src="/images/logo/logo-light1.png"
              alt="CoolerGuru"
              width={175}
              height={55}
              className="h-auto w-[150px] brightness-0 invert"
            />

            <p className="mt-3 max-w-[190px] text-[9px] leading-[1.55] text-white/80">
              India&apos;s most comprehensive directory for air cooler manufacturers,
              OEMs, suppliers &amp; exporters.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <SocialIcon href="#" label="Facebook">
                <FaFacebookF size={13} />
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <FaLinkedinIn size={13} />
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <FaYoutube size={14} />
              </SocialIcon>

              <SocialIcon href="#" label="Instagram">
                <FaInstagram size={14} />
              </SocialIcon>
            </div>
          </div>

          {/* BUYERS */}
          <div className="min-w-0">
            <FooterColumn title="For Buyers" links={buyerLinks} />
          </div>

          {/* SUPPLIERS */}
          <div className="min-w-0">
            <FooterColumn title="For Suppliers" links={supplierLinks} />
          </div>

          {/* COMPANY */}
          <div className="min-w-0">
            <FooterColumn title="Company" links={companyLinks} />
          </div>

          {/* RESOURCES */}
          <div className="min-w-0">
            <FooterColumn title="Resources" links={resourceLinks} />
          </div>

          {/* CONTACT */}
          <div className="min-w-0">
            <h3 className="font-bold text-[10px] text-white">
              Contact Us
            </h3>

            <div className="mt-3 space-y-2.5">
              <ContactItem
                icon={<Phone size={13} />}
                text="+91 98765 43210"
              />

              <ContactItem
                icon={<Mail size={13} />}
                text="support@coolerguru.com"
              />

              <ContactItem
                icon={<MapPin size={13} />}
                text="Ahmedabad, Gujarat, India"
              />

              <ContactItem
                icon={<Clock3 size={13} />}
                text="Mon - Sat: 10:00 AM - 6:00 PM"
              />

              <p className="pl-[22px] text-[8px] text-white/75">
                GST: 24AABCC1234D1Z5
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mx-auto mt-7 w-full max-w-[1600px] border-t border-white/15 pt-4">
          <div
            className="
        flex flex-col gap-3
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
          >
            {/* COPYRIGHT */}
            <p className="text-[8px] leading-[1.5] text-white/65">
              © {new Date().getFullYear()} CoolerGuru Systems Pvt. Ltd.
              All Rights Reserved.
            </p>

            {/* LINKS */}
            <div
              className="
          flex flex-wrap items-center
          gap-x-3 gap-y-2
          text-[8px] text-white/70
          sm:justify-end
        "
            >
              <Link
                href="/sitemap"
                className="transition hover:text-white"
              >
                Sitemap
              </Link>

              <span className="text-white/25">|</span>

              <Link
                href="/disclaimer"
                className="transition hover:text-white"
              >
                Disclaimer
              </Link>

              <span className="text-white/25">|</span>

              <Link
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <span className="text-white/25">|</span>

              <Link
                href="/terms-and-conditions"
                className="transition hover:text-white"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </WideContainer>
  );
}

interface FooterColumnProps {
  title: string;

  links: {
    label: string;
    href: string;
  }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-bold text-[10px] text-white">{title}</h3>

      <div className="mt-3 flex flex-col gap-[7px]">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[8px] text-white/75 leading-[1.25] transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

interface SocialIconProps {
  href: string;

  label: string;

  children: ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

interface ContactItemProps {
  icon: ReactNode;
  text: string;
}

function ContactItem({ icon, text }: ContactItemProps) {
  return (
    <div className="flex items-start gap-2 text-[8px] text-white/80 leading-[1.35]">
      <span className="mt-px shrink-0 text-white/90">{icon}</span>

      <span>{text}</span>
    </div>
  );
}
