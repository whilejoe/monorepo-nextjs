import { clsx } from "clsx";
import { Box, BoxProps } from "ui/components/Box";
import { progressLine, progressStep, progressActive } from "./Progress.css";

const sizes = {
  sm: 10,
  md: 13,
} as const;

type BaseProps = {
  active?: boolean;
  size?: keyof typeof sizes;
};

type ProgressStepProps = BaseProps & {
  size?: keyof typeof sizes;
};

const ProgressContainer = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    />
  );
};

const ProgressLine = ({ active }: BaseProps) => {
  return (
    <div
      className={clsx(progressLine, {
        [progressActive]: active,
      })}
    />
  );
};

const ProgressStep = ({ active, size = "md" }: ProgressStepProps) => {
  return (
    <div
      className={clsx(progressStep, {
        [progressActive]: active,
      })}
      style={{
        height: sizes[size],
        width: sizes[size],
      }}
    />
  );
};

export { ProgressContainer, ProgressLine, ProgressStep };
