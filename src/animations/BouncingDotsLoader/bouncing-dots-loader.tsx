import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

const BouncingDotsLoader = () => {
  return (
    <div className={classNames(styles.bouncing_loader)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BouncingDotsLoader;
