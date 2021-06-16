export const formatDate = (date) => {
  let d;
  if (date) d = new Date(date);
  if (!date) d = new Date();

  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const fullDate = (date) => {
  const monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  month = monthName[month];
  return day + " " + month + " " + year;
};
