import ContactForm from "../contact-form/contact-form";
import s from "./privacy-policy.module.scss";

const PrivacyPolicyComponent = () => {
  return (
    <div className={s.container}>
      <h1>Privacy Policy</h1>

      <p>Last Updated: March, 29, 2025</p>
      <p>
        Alright, here’s the deal. We respect your privacy, but let’s be
        honest—if you’re online, someone somewhere is tracking you. We’ll try to
        be the least creepy about it.
      </p>

      <ul>
        <li>
          <h2>What We Collect</h2>
          <p>
            We gather a few things, like: Your name and email (if you willingly
            give them to us, like a weirdo). Some nerdy internet data (IP
            address, browser type, pages you visit, etc.). Cookies—yes, the
            digital kind, not the delicious ones.
          </p>
        </li>
        <li>
          <h2>What We Do With It</h2>
          <p>
            We use your info to: Make the site better (or at least try). Send
            you emails, but only if you said it was okay. Keep the site running
            without bots taking over.
          </p>
        </li>
        <li>
          <h2>Who Sees Your Info?</h2>
          <p>
            Us. Maybe some third-party tech nerds who help keep the site alive.
            If the government asks, we’ll pretend we didn’t hear them.
          </p>
        </li>
        <li>
          <h2>Your Rights (Yes, You Have Some)</h2>
          <p>
            You can ask us what info we have on you. You can tell us to delete
            it. You can unsubscribe from our emails, and we won’t take it
            personally (okay, maybe a little).
          </p>
        </li>
        <li>
          <h2>Security (or “How We Try to Not Get Hacked”)</h2>
          <p>
            We do our best to protect your info, but let’s be real—if
            billion-dollar companies can get hacked, so can we. So, don’t store
            your nuclear codes here, alright?
          </p>
        </li>
        <li>
          <h2>Changes to This Policy</h2>
          <p>
            We might change this policy. Will you read the update? Probably not.
            But if you keep using the site, you’re agreeing to whatever we did.
          </p>
        </li>
        <li>
          <h2>Questions? Complaints? Existential Crises?</h2>
          <p>
            Hit us up at{" "}
            <ContactForm buttonName="The Jet Lag Chronicles" showIcon={false} />
            , but please, no weird conspiracy theories.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyComponent;
