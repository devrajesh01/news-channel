// app/terms/page.tsx
import type { Metadata } from "next";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const TermsPage = () => {
  return (
    <div className="site-container mx-auto py-10">
      <Breadcrumb items={[{ label: "Terms of Service" }]} />

      <div className="post-content ">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted">Last updated: September 10, 2026</p>

        <p>
          By accessing or using NewsWala ("the site"), you agree to these
          Terms of Service. If you do not agree, please do not use the site.
        </p>

        <h2>Use of Content</h2>
        <p>
          Articles, images, and other content on this site are provided for
          personal, non-commercial use. You may not republish, redistribute,
          or reproduce our content without prior written permission, except
          for brief excerpts with proper attribution and a link back to the
          original article.
        </p>

        <h2>User Comments</h2>
        <p>
          When you post a comment, you're responsible for its content. By
          submitting a comment, you agree not to post material that is:
        </p>
        <ul>
          <li>Defamatory, abusive, harassing, or threatening</li>
          <li>Illegal, or promotes illegal activity</li>
          <li>Spam, or unrelated commercial promotion</li>
          <li>A violation of someone else's rights, including copyright</li>
        </ul>
        <p>
          We reserve the right to remove, edit, or decline to publish any
          comment at our discretion, without notice.
        </p>

        <h2>Accuracy of Content</h2>
        <p>
          We aim for accurate, fair reporting, and we correct errors when
          they're brought to our attention. However, news is often published
          under time pressure, and we cannot guarantee that all content is
          complete, current, or error-free at all times.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. We are not
          responsible for the content, accuracy, or practices of any linked
          external site.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          This site and its content are provided "as is," without warranties
          of any kind, express or implied, to the fullest extent permitted by
          law.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, NewsWala shall not be
          liable for any indirect, incidental, or consequential damages
          arising from your use of the site.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may revise these terms from time to time. Continued use of the
          site after changes are posted constitutes acceptance of the
          updated terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of [your state/country —
          insert jurisdiction here].
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about these terms? Reach out via our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;