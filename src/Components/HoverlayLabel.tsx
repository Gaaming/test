import * as React from "react";
import { css } from "azure-devops-ui/Util";

export const HoverlayLabel: React.FC<{ className?: string }> = props => {
  return (
    <div
      className={css(
        "hoverlay-label flex-grow body-m font-weight-semibold",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
