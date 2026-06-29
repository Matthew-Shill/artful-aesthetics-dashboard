"use client";

import { useId, useState } from "react";
import styles from "./ui.module.css";

export function Accordion({ items }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(null);

  if (!items?.length) return null;

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;

        return (
          <div key={item.q} className={styles.accordionItem}>
            <button
              type="button"
              id={triggerId}
              className={styles.accordionTrigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.q}</span>
              <span className={styles.accordionIcon} aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`${styles.accordionPanel} ${isOpen ? styles.accordionPanelOpen : ""}`}
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
