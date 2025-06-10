interface IDateTransform {
  date?: Date
  format?: string
  intl?: Intl.DateTimeFormatOptions
  locales?: string | string[]
}

/**
 * dateTransform function return a date as string formatted.
 * @returns Return a date formatted.
 */
export const dateTransform = ({
  date = new Date(),
  format = "yyyy-mm-dd", // yyyy-mm-ddThh:MM:ssZ
  intl = {},
  locales = "pt-BR"
}: IDateTransform = {}): string => {
  const intlObject: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Fortaleza",
    hour12: false,
    ...intl
  }

  const formatter = new Intl.DateTimeFormat(locales, intlObject)
  const formattedDate = formatter.formatToParts(date)

  const formattedObject = formattedDate.reduce((acc, part) => {
    acc[part.type] = part.value
    return acc
  }, {} as Record<string, string>)

  const formattedDateString = format
    .replace(/yyyy/g, formattedObject.year || "")
    .replace(/mm/g, formattedObject.month || "")
    .replace(/dd/g, formattedObject.day || "")
    .replace(/hh/g, formattedObject.hour || "")
    .replace(/MM/g, formattedObject.minute || "")
    .replace(/ss/g, formattedObject.second || "")

  return formattedDateString
}

/**
 * stringToDateTransform function return a date valid, based in a string.
 *
 * @param dateString - Insert a date in format string. Example: "yyyy-mm-dd"
 *
 * @returns Return a date formatted valid.
 */
export const stringToDateTransform = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-")

  const currentDate = new Date()
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  date.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())

  return date
}

export const getStartAndFinishOfDay = (dateString: string): { start: Date, end: Date } => {
  const startString = `${dateString}T00:00:00.000Z`
  const endString = `${dateString}T23:59:59.000Z`

  return {
    start: new Date(startString),
    end: new Date(endString)
  }
}
