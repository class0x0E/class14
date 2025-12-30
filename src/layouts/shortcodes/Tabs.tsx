import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";

interface TabChildrenProps {
  value: string;
}

const Tabs = ({ children }: { children: React.ReactElement<TabChildrenProps> }) => {
  const [active, setActive] = useState<number>(0);
  const [defaultFocus, setDefaultFocus] = useState<boolean>(false);

  const tabRefs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    if (defaultFocus) {
      //@ts-ignore
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);

  // Improved parsing logic to handle nested divs
  const parseTabs = (html: string) => {
    const tabs = [];
    const regex = /<div\s+data-name="([^"]+)"[^>]*>/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      const name = match[1];
      const startIndex = match.index;
      const contentStartIndex = startIndex + match[0].length;

      let depth = 1;
      let currentIndex = contentStartIndex;

      while (depth > 0 && currentIndex < html.length) {
        const nextOpen = html.indexOf("<div", currentIndex);
        const nextClose = html.indexOf("</div>", currentIndex);

        if (nextClose === -1) {
          break; // Malformed HTML
        }

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          currentIndex = nextOpen + 4;
        } else {
          depth--;
          currentIndex = nextClose + 6;
        }
      }

      if (depth === 0) {
        const fullString = html.substring(startIndex, currentIndex);
        tabs.push({ name, children: fullString });
        // Continue searching after the current tab
        regex.lastIndex = currentIndex;
      }
    }
    return tabs;
  };

  const tabLinks = parseTabs(children.props.value);

  const handleKeyDown = (
    event: React.KeyboardEvent<EventTarget>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };

  return (
    <div className="tab">
      <ul className="tab-nav">
        {tabLinks.map(
          (item: { name: string; children: string }, index: number) => (
            <li
              key={index}
              className={`tab-nav-item ${index === active ? "active" : ""}`}
              role="tab"
              tabIndex={index === active ? 0 : -1}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => setActive(index)}
              //@ts-ignore
              ref={(ref) => (tabRefs.current[index] = ref)}
            >
              {item.name}
            </li>
          ),
        )}
      </ul>
      {tabLinks.map((item: { name: string; children: string }, i: number) => (
        <div
          className={`tab-content ${active === i ? "block px-5" : "hidden"}`}
          key={i}
          dangerouslySetInnerHTML={{
            __html: marked.parse(item.children),
          }}
        />
      ))}
    </div>
  );
};

export default Tabs;
