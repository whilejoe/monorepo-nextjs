import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "ui/components/Accordion";
import { Box } from "ui/components/Box";
import { Card } from "components/Card";
import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";
import { separator } from "./HelpCenter.css";

const HelpCenter = () => {
  const { t } = useTranslation("helpcenter");
  return (
    <>
      <Card mx="auto" style={{ maxWidth: 500 }}>
        <Box as="h1" mb="5x" textAlign="center">
          {t("FaqHeader")}
        </Box>
        <Accordion type="single">
          <AccordionItem value="1">
            <AccordionTrigger>{t("1q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:1a"
                components={{
                  p: <p />,
                  a: <Link href="https://www.Access2Care.com" passHref />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="2">
            <AccordionTrigger>{t("2q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:2a"
                components={{
                  p: <p />,
                  ol: <Box as="ol" mb="3x" />,
                  li: <Box as="li" />,
                  b: <Box as="span" fontWeight="xbold" />,
                  a: <Link href="terms-and-conditions" />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="3">
            <AccordionTrigger>{t("3q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:3a"
                components={{
                  p: <p />,
                  ol: <Box as="ol" mb="3x" />,
                  li: <Box as="li" />,
                  b: <Box as="span" fontWeight="xbold" />,
                  a: <Link href="terms-and-conditions" />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="4">
            <AccordionTrigger>{t("4q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("4a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="5">
            <AccordionTrigger>{t("5q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:5a"
                components={{
                  p: <p />,
                  ul: <Box as="ul" mb="3x" />,
                  li: <Box as="li" />,
                  b: <Box as="span" fontWeight="xbold" />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="6">
            <AccordionTrigger>{t("6q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:6a"
                components={{
                  p: <p />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="7">
            <AccordionTrigger>{t("7q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:7a"
                components={{
                  p: <p />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="8">
            <AccordionTrigger>{t("8q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("8a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="9">
            <AccordionTrigger>{t("9q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:9a"
                components={{
                  p: <p />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="10">
            <AccordionTrigger>{t("10q")}</AccordionTrigger>
            <AccordionContent>
              <Trans i18nKey="helpcenter:10a" components={{ p: <p /> }} />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="11">
            <AccordionTrigger>{t("11q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("11a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="12">
            <AccordionTrigger>{t("12q")}</AccordionTrigger>
            <AccordionContent>
              <Trans i18nKey="helpcenter:12a" components={{ p: <p /> }} />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="13">
            <AccordionTrigger>{t("13q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("13a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="14">
            <AccordionTrigger>{t("14q")}</AccordionTrigger>
            <AccordionContent>
              <p>
                <Trans
                  i18nKey="helpcenter:14a"
                  components={{
                    a: <Box as="span" color="red9" />,
                  }}
                />
              </p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="15">
            <AccordionTrigger>{t("15q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("15a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="16">
            <AccordionTrigger>{t("16q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("16a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="17">
            <AccordionTrigger>{t("17q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:17a"
                components={{
                  p: <p />,
                  ol: <Box as="ol" mb="3x" />,
                  li: <Box as="li" />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="18">
            <AccordionTrigger>{t("18q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:18a"
                components={{
                  p: <p />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="19">
            <AccordionTrigger>{t("19q")}</AccordionTrigger>
            <AccordionContent>
              <p>{t("19a")}</p>
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="20">
            <AccordionTrigger>{t("20q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:20a"
                components={{
                  p: <p />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <div className={separator} />
          <AccordionItem value="21">
            <AccordionTrigger>{t("21q")}</AccordionTrigger>
            <AccordionContent>
              <Trans
                i18nKey="helpcenter:21a"
                components={{
                  p: <p />,
                  ul: <Box as="ul" mb="3x" />,
                  li: <Box as="li" />,
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};

export default HelpCenter;
