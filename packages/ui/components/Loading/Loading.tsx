import { rotator, circle, container, LoadingVariants } from "./Loading.css";

const sizes = {
  sm: 18,
  md: 40,
  lg: 48,
} as const;

type LoadingProps = {
  show?: boolean;
  size?: keyof typeof sizes;
} & LoadingVariants;

const Loading = ({ show = false, color, size = "md" }: LoadingProps) => {
  if (!show) return null;

  return (
    <div className={container({ color })}>
      <div
        style={{
          height: sizes[size],
          width: sizes[size],
        }}
      >
        <svg viewBox="22 22 44 44" className={rotator}>
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
            className={circle}
          />
        </svg>
      </div>
    </div>
  );
};

export { Loading };
