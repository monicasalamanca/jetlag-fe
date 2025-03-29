import s from "./terms-of-service.module.scss";

const TermsOfServiceComponent = () => {
  return (
    <div className={s.container}>
      <h1>Terms of Service</h1>

      <p>Last Updated: March, 29, 2025</p>
      <p>
        Hey there. Welcome to The Jet Lag Chronicles. If you’re here, it means
        you either love travel, got lost on the internet, or you’re really into
        reading legal nonsense. Either way, thanks for stopping by.
      </p>

      <ul>
        <li>
          <h2>Agreement to Terms</h2>
          <p>
            Look, by using this site, you agree to these terms. If you don’t
            agree, that’s cool—just leave. We won’t hunt you down. But if you
            stay, you’re saying, &quot;Yeah, sure, I’ll follow the rules.&quot;
            Also, we can change these terms whenever we want, because… well,
            it’s our site.
          </p>
        </li>
        <li>
          <h2>What You Can and Can’t Do</h2>
          <p>
            Don’t break the law. Simple. Don’t hack, spam, or be a general pain
            in the ass. If you leave comments, don’t be a jerk. No one likes
            that guy.
          </p>
        </li>
        <li>
          <h2>Our Content & Your (Maybe) Brilliant Ideas</h2>
          <p>
            Everything here—articles, photos, bad jokes—is ours unless we say
            otherwise. Don’t steal it. If you send us something, like a comment
            or an idea, we might use it. No, we won’t pay you.
          </p>
        </li>
        <li>
          <h2>Intellectual Property (Fancy Words for ‘Don’t Steal’)</h2>
          <p>
            The stuff on this site took effort. If you want to use it, ask us
            first. If you steal it, well… we hope you get stuck in an airport
            with no WiFi.
          </p>
        </li>
        <li>
          <h2>We’re Not Responsible for Your Life Choices</h2>
          <p>
            If you take our advice and something goes wrong, that’s on you. We
            try to give accurate info, but if we screw up, don’t sue us.
            Seriously. If you click a sketchy link and end up on a site selling
            black market alpacas, that’s also on you.
          </p>
        </li>
        <li>
          <h2>If You Get Kicked Out, You Probably Deserved It</h2>
          <p>
            We can block you if you act like a jackass. No appeal process, no
            crying.
          </p>
        </li>
        <li>
          <h2>Legal Stuff We Had to Include</h2>
          <p>
            This whole thing is governed by the laws of Canada. If you want to
            sue us, first, ask yourself: “Do I really want to waste my life on
            this?
          </p>
        </li>
      </ul>
    </div>
  );
};

export default TermsOfServiceComponent;
