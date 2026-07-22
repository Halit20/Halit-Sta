import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PROFILE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing the use of halitsta.com — intellectual property, disclaimers, and applicable law of the Republic of Kosovo.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="22 July 2026"
      otherPage={{ label: "Privacy Policy", href: "./privacy.html" }}
    >
      <h2>1. Acceptance of these terms</h2>
      <p>
        By accessing <strong>halitsta.com</strong> (the &quot;Site&quot;) you
        agree to these Terms of Use. If you do not agree with them, please do
        not use the Site.
      </p>

      <h2>2. About this site</h2>
      <p>
        The Site is the personal portfolio of{" "}
        <strong>Halit Statovci</strong>, Prishtina, Republic of Kosovo. It
        presents my work, services, and ways to get in touch. Content on the
        Site is provided for general information and presentation purposes
        only — it is not a binding offer. Any engagement is agreed separately
        and individually.
      </p>

      <h2>3. Permitted use</h2>
      <p>
        You may browse the Site and share links to it. You agree not to misuse
        the Site — including attempting to disrupt its availability, scraping
        it in an abusive manner, submitting unlawful or misleading content
        through the contact form, or using the contact channels to send spam.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The design of the Site and its original content — text, branding,
        photography, video, and code — are the property of Halit Statovci
        unless stated otherwise, and are protected by the applicable
        intellectual property laws. You may not reproduce or reuse them for
        commercial purposes without prior written permission.
      </p>
      <p>
        Client projects shown in the portfolio are presented as references of
        my work. Trademarks, names, and content belonging to those clients
        remain the property of their respective owners.
      </p>

      <h2>5. Third-party links and embeds</h2>
      <p>
        The Site links to and embeds content from third-party platforms
        (LinkedIn, GitHub, Instagram, YouTube, X, Twitch, and client
        websites). I have no control over those external sites and accept no
        responsibility for their content or practices. Their own terms and
        privacy policies apply.
      </p>

      <h2>6. No warranties</h2>
      <p>
        The Site is provided <strong>&quot;as is&quot;</strong>. While I aim
        to keep the information accurate and the Site available, I make no
        warranties of any kind — express or implied — about completeness,
        accuracy, reliability, or uninterrupted availability.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by the law of the Republic of Kosovo,
        I am not liable for any indirect or consequential damages arising from
        your use of, or inability to use, the Site. Nothing in these terms
        excludes liability that cannot be excluded by law, including liability
        for intent or gross negligence.
      </p>

      <h2>8. Privacy</h2>
      <p>
        How personal data is handled on the Site is described in the{" "}
        <a href="./privacy.html">Privacy Policy</a>.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        These terms may be updated from time to time. The current version,
        with its date, is always published on this page. Continued use of the
        Site after changes means you accept the updated terms.
      </p>

      <h2>10. Governing law and jurisdiction</h2>
      <p>
        These terms are governed by the laws of the{" "}
        <strong>Republic of Kosovo</strong>. Any dispute arising from the use
        of the Site falls under the jurisdiction of the competent courts in
        Prishtina, Republic of Kosovo, unless mandatory law provides
        otherwise.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </p>
    </LegalPage>
  );
}
