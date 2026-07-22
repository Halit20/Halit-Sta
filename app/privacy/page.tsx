import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PROFILE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How halitsta.com handles personal data — contact form, hosting, embedded content — under the Law on Protection of Personal Data of the Republic of Kosovo.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="22 July 2026"
      otherPage={{ label: "Terms of Use", href: "./terms.html" }}
    >
      <h2>1. Who is responsible</h2>
      <p>
        This website, <strong>halitsta.com</strong>, is the personal portfolio
        of <strong>Halit Statovci</strong>, based in Prishtina, Republic of
        Kosovo. I am the data controller for any personal data processed
        through this site.
      </p>
      <p>
        Contact:{" "}
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </p>

      <h2>2. The short version</h2>
      <ul>
        <li>This site sets no cookies of its own and runs no analytics.</li>
        <li>
          I only receive personal data when you choose to send it — through
          the contact form or by emailing me directly.
        </li>
        <li>
          A few third-party services (hosting, fonts, video embeds) are
          technically necessary to deliver the site and may process your IP
          address, as described below.
        </li>
      </ul>

      <h2>3. Legal framework</h2>
      <p>
        Personal data is processed in accordance with{" "}
        <strong>
          Law No. 06/L-082 on Protection of Personal Data of the Republic of
          Kosovo
        </strong>
        , which is closely aligned with the EU General Data Protection
        Regulation (GDPR).
      </p>

      <h2>4. Contact form and email</h2>
      <p>
        If you use the contact form, you provide: your name, email address,
        optionally a company or project name, the service you are interested
        in, a budget range, and your message. If you email me directly, I
        receive whatever you include in your message.
      </p>
      <p>
        I use this information solely to respond to your enquiry and, where it
        leads to a project, to prepare and carry out that engagement (legal
        basis: your consent and steps taken at your request prior to entering
        a contract). Your data is not sold, shared for marketing, or used for
        anything unrelated to your enquiry.
      </p>
      <p>
        Correspondence is kept only as long as needed to handle the enquiry or
        maintain the business relationship, and is deleted afterwards unless a
        legal obligation requires keeping it longer.
      </p>

      <h2>5. Hosting (GitHub Pages)</h2>
      <p>
        This site is hosted on <strong>GitHub Pages</strong>, a service of
        GitHub, Inc. (USA). When you visit the site, GitHub&apos;s servers
        technically necessarily process your IP address and standard server
        log data (browser type, time of access, pages requested) to deliver
        the pages. I have no access to these logs. See the{" "}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Privacy Statement
        </a>
        .
      </p>

      <h2>6. Google Fonts</h2>
      <p>
        The site loads its typefaces from Google Fonts servers. To deliver the
        font files, Google (Google Ireland Ltd. / Google LLC, USA) processes
        your IP address. No cookies are set by this. See the{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>
        .
      </p>

      <h2>7. Embedded YouTube videos</h2>
      <p>
        Some videos are embedded using YouTube&apos;s{" "}
        <strong>privacy-enhanced mode</strong> (youtube-nocookie.com). In this
        mode YouTube does not store cookies until you actually play a video.
        When you press play, YouTube (Google) processes your IP address and
        may set cookies under its own responsibility. See the{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>
        .
      </p>

      <h2>8. International transfers</h2>
      <p>
        The services above (GitHub, Google) may process data on servers
        outside the Republic of Kosovo, including in the United States. Such
        transfers take place under the safeguards those providers offer
        (contractual protections and, where applicable, adequacy frameworks).
      </p>

      <h2>9. Your rights</h2>
      <p>Under Law No. 06/L-082 you have the right to:</p>
      <ul>
        <li>access the personal data I hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data deleted;</li>
        <li>restrict or object to processing;</li>
        <li>receive your data in a portable format;</li>
        <li>withdraw consent at any time, with effect for the future.</li>
      </ul>
      <p>
        To exercise any of these rights, email me at{" "}
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>. You also have
        the right to lodge a complaint with the Kosovo supervisory authority:
        the{" "}
        <a
          href="https://aip.rks-gov.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Information and Privacy Agency (AIP)
        </a>
        , Prishtina.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        This policy may be updated if the site&apos;s functionality or the legal
        requirements change. The current version, with its date, is always
        published on this page.
      </p>
    </LegalPage>
  );
}
