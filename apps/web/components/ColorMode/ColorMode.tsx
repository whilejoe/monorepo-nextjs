import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { menuLink } from "components/UserAvatar/UserAvatar.css";
import { useTranslation } from "react-i18next";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import {
  ColorMode,
  COLOR_MODE_KEY,
  COLOR_MODE_DARK,
  COLOR_MODE_LIGHT,
} from "ui/styles/color";

type ColorModeProviderProps = {
  children: React.ReactNode;
};

export type ColorModeContextValues = {
  colorMode: ColorMode | null;
  setColorMode: (colorMode: ColorMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextValues>({
  colorMode: null,
  setColorMode: () => {},
});

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode | null>(null);

  useEffect(() => {
    setColorMode(
      document.documentElement.classList.contains(COLOR_MODE_DARK)
        ? COLOR_MODE_DARK
        : COLOR_MODE_LIGHT
    );
  }, []);

  const setter = useCallback((c: ColorMode) => {
    setColorMode(c);

    document.documentElement.classList.remove(
      COLOR_MODE_LIGHT,
      COLOR_MODE_DARK
    );
    document.documentElement.classList.add(c);

    try {
      localStorage.setItem(COLOR_MODE_KEY, c);
    } catch (e) {}
  }, []);

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode: setter,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { t } = useTranslation("common");
  const isLightMode = colorMode === COLOR_MODE_LIGHT;

  return (
    <button
      aria-label="toggle a light and dark color scheme"
      aria-live="polite"
      className={menuLink}
      data-automation-hook="toggle-colormode-button"
      onClick={() => {
        setColorMode(isLightMode ? COLOR_MODE_DARK : COLOR_MODE_LIGHT);
      }}
    >
      {isLightMode && (
        <>
          <AccessibleIcon icon={<MdLightMode size={18} />} />
          {t("DarkMode")}
        </>
      )}
      {!isLightMode && (
        <>
          <AccessibleIcon icon={<MdOutlineDarkMode size={18} />} />
          {t("LightMode")}
        </>
      )}
    </button>
  );
};
