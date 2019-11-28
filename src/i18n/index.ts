import i18nJS from "i18n-js";
import * as RNLocalize from "react-native-localize";
import {
  isSupportedLocale,
  SupportedLocale
} from "react-native-urbi-ui/components/form/DatePicker";
import en, { Locale } from "src/i18n/en";
import it from "src/i18n/it";

i18nJS.fallbacks = true;
i18nJS.translations = { en, it };
i18nJS.defaultLocale = "en";

const fallback = { languageTag: "en" };

const { languageTag } =
  RNLocalize.findBestAvailableLanguage(["en", "it"]) || fallback;
i18nJS.locale = languageTag;

export const appLocale = i18nJS.locale;
export const appLocaleShort: SupportedLocale = isSupportedLocale(appLocale)
  ? appLocale
  : "en";

export const currency = (cents: number, unit: string) =>
  i18nJS.toCurrency(cents / 100, {
    precision: 2,
    sign_first: false,
    unit: currencySimbols[unit] || unit
  });

export const i18n = (
  k: keyof Locale,
  interpolatedValues: { [k: string]: string } | undefined = {},
  count: number | undefined = undefined
) => i18nJS.t(k, { ...(interpolatedValues || {}), count });

const currencySimbols: { [currency: string]: string } = {
  cad: "$",
  chf: "CHF",
  dkk: "kr.",
  eur: "€",
  gbp: "£",
  sek: "kr",
  usd: "$"
};

export const time = (d: Date) => i18nJS.l("date.formats.time", d);
