export const stripSpecialCharacters = (string: string) => {
  return string.replace(/[^\d]+/g, "");
};

export const formatPhoneNumber = (string: string) => {
  return stripSpecialCharacters(string).replace(
    /(\d{1})(\d{3})(\d{3})(\d{4})/,
    "($2) $3-$4"
  );
};
