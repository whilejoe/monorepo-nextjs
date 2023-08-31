import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { MdExpandMore, MdLanguage } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import i18nconfig from "i18n.json";
import {
  languageSelectContainer,
  languageSelectInput,
  languageSelectGroup,
} from "./LanguageSelector.css";
import { selectOption } from "ui/components/Forms";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation("common");
  const { push, asPath } = useRouter();
  const { locales } = i18nconfig;

  const handleLanguageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    i18n.changeLanguage(value);
    push(asPath, undefined, { locale: value });

    localStorage.setItem("lang", value);
  };

  return (
    <Box display="flex" gap="2.5x" py="2x" alignItems="center" width="100%">
      <AccessibleIcon icon={<MdLanguage size={18} />} />
      <div className={languageSelectGroup}>
        <div className={languageSelectContainer}>
          <select
            aria-label="Language"
            className={languageSelectInput}
            defaultValue={i18n.language}
            onChange={handleLanguageSelection}
            placeholder="Select language"
          >
            {locales.map((lng) => {
              return (
                <option
                  aria-label={t<string>(`common:language-name-${lng}`)}
                  key={lng}
                  value={lng}
                  className={selectOption}
                >
                  {t(`common:language-name-${lng}`)}
                </option>
              );
            })}
          </select>
          <Box position="absolute" right={0} mr="2x" pointerEvents="none">
            <AccessibleIcon icon={<MdExpandMore size={20} />} />
          </Box>
        </div>
      </div>
    </Box>
  );
};

export { LanguageSelector };
