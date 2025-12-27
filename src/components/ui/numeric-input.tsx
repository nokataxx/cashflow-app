import * as React from "react";
import { NumericFormat } from "react-number-format";
import type { NumericFormatProps } from "react-number-format";
import { cn } from "@/lib/utils";

export interface NumericInputProps
  extends Omit<NumericFormatProps, "onChange" | "onValueChange"> {
  onValueChange?: (value: number | undefined) => void;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        thousandSeparator=","
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onValueChange={(values) => {
          if (onValueChange) {
            onValueChange(values.floatValue);
          }
        }}
        {...props}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";

export { NumericInput };
