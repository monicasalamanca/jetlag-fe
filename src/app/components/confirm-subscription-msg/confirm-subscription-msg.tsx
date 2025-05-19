import React from "react";

import s from "./confirm-subscription-msg.module.scss";

const ConfirmSubscriptionMsg: React.FC = () => {
  return (
    <div className={s.container}>
      <h2>Subscription confirmed!</h2>
      <p>
        Boom! You&apos;re officially confirmed and on the list. Expect some
        great emails headed your way very soon.
      </p>
    </div>
  );
};

export default ConfirmSubscriptionMsg;
