import React from "react";

import styles from "./NotFound.module.css";
export default function NotFound() {
  return (
    <div className="text-center mt-5 ">
      <h1 className={`my-5 ${styles.notfound_error}`}>
        4
        <span>
          <i class="fa-solid fa-gear fa-spin loading-icon"></i>
        </span>
        4
      </h1>
      <h2 className={` ${styles.notfound_error2}`}>page not found </h2>
    </div>
  );
}
