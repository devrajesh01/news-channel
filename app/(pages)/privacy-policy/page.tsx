// app/privacy/page.tsx
import type { Metadata } from "next";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
 
};

const PrivacyPage = () => {
  return (
    <div className="site-container mx-auto py-10">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <div className="post-content ">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated: September 10, 2026</p>

        <p>
          NewsWala ("we," "us," or "our") operates this website. This page
          explains what information we collect, how we use it, and the
          choices you have.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Comments:</strong> when you post a comment, we collect the
            name, email address, and comment content you submit. Your email
            is never displayed publicly. We also use your email to generate a
            profile image via Gravatar, a service operated by Automattic.
          </li>
          <li>
            <strong>Contact form:</strong> when you send us a message, we
            collect your name, email address, and message content, solely to
            respond to your inquiry.
          </li>
          <li>
            <strong>Automatically collected data:</strong> like most
            websites, our hosting and analytics providers may automatically
            log standard technical information such as IP address, browser
            type, device type, and pages visited.
          </li>
          <li>
            <strong>Cookies:</strong> we use minimal cookies/local storage for
            site functionality, such as remembering your light/dark theme
            preference.
          </li>
        </ul>

        <h2>How We Use Information</h2>
        <ul>
          <li>To publish and moderate comments on articles</li>
          <li>To respond to messages sent through our contact form</li>
          <li>To maintain and improve site performance and security</li>
          <li>To understand how visitors use the site, in aggregate</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use a small number of third-party services to run this site:</p>
        <ul>
          <li>
            <strong>Gravatar</strong> — for comment author profile images,
            based on a hash of the commenter's email address.
          </li>
          <li>
            <strong>Resend</strong> — to deliver emails submitted through our
            contact form.
          </li>
          <li>
            <strong>Vercel</strong> — our hosting provider, which may log
            standard request data for security and performance purposes.
          </li>
        </ul>
        <p>
          Each of these services has its own privacy policy governing how
          they handle data.
        </p>

        <h2>Data Retention</h2>
        <p>
          Comments and their associated data are retained for as long as the
          comment remains published. Contact form submissions are retained
          only as long as needed to respond to your inquiry, after which they
          may be deleted.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          or delete personal data we hold about you. To make such a request,
          contact us using the details below.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Material changes will
          be reflected by updating the "Last updated" date above.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy? Reach out via our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;