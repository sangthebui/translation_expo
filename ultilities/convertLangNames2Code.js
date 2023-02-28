import countryCodeList from "../i18n/countryCodeList.json";

const convertLangNames2Code = (name) => {
  return countryCodeList[name];
};

export default convertLangNames2Code;
