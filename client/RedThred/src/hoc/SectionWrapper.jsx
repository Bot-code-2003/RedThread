import React from "react";
import { styles } from "../styles";

const SectionWrapper = (Component) =>
  function HOC() {
    return (
      <div className={`${styles.padding}`}>
        <Component />
      </div>
    );
  };

export default SectionWrapper;
