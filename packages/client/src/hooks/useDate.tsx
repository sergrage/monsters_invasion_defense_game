import { format } from "date-fns";

const useFormattedDate = (originalDate: string) => {
  return format(new Date(originalDate), "dd.MM.yyyy");
};

export default useFormattedDate;
