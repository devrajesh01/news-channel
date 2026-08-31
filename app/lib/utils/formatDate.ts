export const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = d.getDate();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = d.toLocaleDateString("en-US", {
    month: "short",
  });

  return `${day}${suffix} ${month} ${d.getFullYear()}`;
};
