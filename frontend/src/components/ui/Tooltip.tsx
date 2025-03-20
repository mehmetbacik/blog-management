"use client";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  text: string;
  limit: number;
  children: React.ReactNode;
}

const CustomTooltip = ({ text, limit, children }: TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        {text.length > limit && (
          <Tooltip.Portal>
            <Tooltip.Content className="tooltipContent">{text}</Tooltip.Content>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
