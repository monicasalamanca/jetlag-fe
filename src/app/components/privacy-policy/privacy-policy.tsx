import ContactForm from "../contact-form/contact-form";
import s from "./privacy-policy.module.scss";

const PrivacyPolicyComponent = () => {
  return (
    <div className={s.container}>
      <h1>Privacy Policy</h1>

      <p>Last Updated: Feb, 1, 2026</p>
      <p>
        Alright, here’s the deal. We respect your privacy. That said, if you’re
        on the internet in 2025, some level of tracking exists. We aim to be
        transparent, minimal, and significantly less creepy than most.
      </p>

      <ul>
        <li>
          <h2>What We Collect</h2>
          <p>
            We collect a limited amount of information, including:
            <hr />• Personal information you voluntarily provide, such as your
            name and email address when you subscribe to our newsletter,
            download a guide, or contact us.
            <hr />• Basic technical data, like IP address, browser type, device
            information, and pages visited.
            <hr />• Cookies and similar technologies, which help the site
            function properly, measure performance, and display ads.
            <hr />
            No nuclear codes. No social insurance numbers. No drama.
          </p>
        </li>
        <li>
          <h2>Cookies, Ads, and Tracking (The Important Part)</h2>
          <p>
            We use cookies and similar technologies for a few reasons:
            <hr />• To understand how people use the site so we can improve it.
            <hr />• To remember preferences and consent choices.
            <hr />• To display advertising through Google AdSense.
          </p>
        </li>
        <li>
          <h2>Google AdSense</h2>
          <p>
            We use Google AdSense to display ads on some pages. Google may use
            cookies or similar technologies to:
            <hr />• Show ads based on visits to this and other websites.
            <hr />• Measure ad performance and prevent fraud.
            <hr />
            Google’s use of advertising cookies enables it and its partners to
            serve ads based on users’ browsing behavior across the web.
          </p>
          <p>
            You can learn more about how Google handles data here:
            https://policies.google.com/technologies/ads
          </p>
        </li>
        <li>
          <h2>Consent and Your Choices</h2>
          <p>
            <hr />• Ads and analytics are not loaded until you give consent,
            where required by law.
            <hr />• You can accept or decline cookies through our cookie notice.
            <hr />• You can adjust your browser settings to block or delete
            cookies at any time, though some site features may not work as
            intended.
            <hr />
            Using the site after consenting means you’re okay with this setup.
            Not consenting means fewer cookies, fewer ads, and the same content.
          </p>
        </li>
        <li>
          <h2>What We Do With Your Information</h2>
          <p>
            We use collected information to:
            <hr />• Improve site performance and content.
            <hr />• Communicate with you if you opted in.
            <hr />• Keep the site secure and functioning.
            <hr />• Display ads and measure their performance.
            <hr />
            We do not sell your personal data. Ever.
          </p>
        </li>
        <li>
          <h2>Who Sees Your Information</h2>
          <p>
            Your data may be processed by:
            <hr />• Us (obviously).
            <hr />• Trusted third-party services that help keep the site running
            (analytics, email tools, advertising platforms like Google AdSense).
            <hr />
            If required by law, we may disclose information to authorities,
            though we won’t do it enthusiastically.
          </p>
        </li>
        <li>
          <h2>Your Rights (Yes, You Have Them)</h2>
          <p>
            Depending on where you live, you may have the right to:
            <hr />• Request access to your data.
            <hr />• Ask us to correct or delete it.
            <hr />• Withdraw consent at any time.
            <hr />• Unsubscribe from emails with one click and zero guilt.
            <hr />
            To exercise any of these rights, contact us using the details below.
          </p>
        </li>
        <li>
          <h2>Security (Also Known as “We’re Trying”)</h2>
          <p>
            We take reasonable steps to protect your information. However, no
            system is perfectly secure. Please don’t treat this website like a
            vault.
          </p>
        </li>
        <li>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy occasionally. If you continue using the
            site after changes are made, that means you’re fine with them, even
            if you didn’t read the update. No judgment.
          </p>
        </li>
        <li>
          <h2>Contact</h2>
          <p>
            Questions, concerns, or polite existential dread can be sent to:{" "}
            <ContactForm buttonName="The Jet Lag Chronicles" showIcon={false} />
            , but please, no weird conspiracy theories.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyComponent;
