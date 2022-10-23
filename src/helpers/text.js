export const persianToEnglish = (s) =>
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const convertToRls = (number) =>
  new Intl.NumberFormat("fa-IR").format(number);
