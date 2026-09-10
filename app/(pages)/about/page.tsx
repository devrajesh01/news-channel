import type { Metadata } from "next";
import { HiOutlineNewspaper, HiOutlineShieldCheck, HiOutlineLightningBolt } from "react-icons/hi";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who we are and what NewsWala stands for.",
};

const values = [
  {
    icon: HiOutlineLightningBolt,
    title: "Fast, Not Reckless",
    description:
      "We move quickly on breaking stories, but we don't publish something just to be first. Verified before speed.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Straight Reporting",
    description:
      "We tell you what happened and let you form your own opinion. No spin, no agenda dressed up as news.",
  },
  {
    icon: HiOutlineNewspaper,
    title: "Actually Readable",
    description:
      "News shouldn't need a dictionary. We write for people who have five minutes, not five hours.",
  },
];

const AboutPage = () => {
  return (
    <div className="site-container mx-auto py-10">
      <Breadcrumb items={[{ label: "About Us" }]} />

      {/* Intro */}
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          About NewsWala
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          NewsWala started with a simple frustration: most news online is either
          buried under ads, stretched into a ten-minute read for a two-minute
          story, or too slow to matter. We built this to be the opposite —
          quick to load, easy to read, and focused on what's actually
          happening.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          We're not a giant newsroom, and we don't pretend to be. We cover
          what we can cover well, we correct ourselves when we get something
          wrong, and we'd rather have fewer readers who trust us than a lot
          who don't.
        </p>
      </div>

      {/* Values */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <div className="mt-12 border-t border-border pt-8">
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
          Got a story we should be covering, or think we got something wrong?
          We'd genuinely like to hear it —{" "}
          <a href="/contact" className="text-accent underline hover:text-accent-hover">
            reach out here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutPage;