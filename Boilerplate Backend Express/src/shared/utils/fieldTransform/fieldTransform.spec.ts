import {
  dateTransform,
  stringToDateTransform,
  getStartAndFinishOfDay
} from "./fieldTransform"

describe("FieldMask Utils", () => {
  it("should transform date in string", () => {
    const newDate = new Date("2020-06-01T12:30:00Z")

    const date1 = dateTransform({
      date: newDate,
      format: "dd/mm/yyyy",
      intl: { timeZone: "Europe/London" }
    })

    const date2 = dateTransform({
      date: newDate,
      format: "mm-dd-yyyy hh:MM:ss"
    })

    const date3 = dateTransform({
      date: newDate,
      format: "mm",
      intl: {
        dateStyle: "full",
        year: undefined,
        month: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined
      }
    })

    expect(date1).toEqual("01/06/2020")
    expect(date2).toEqual("06-01-2020 09:30:00")
    expect(date3).toEqual("junho")
  })

  it("should transform string in date", () => {
    const dateString = "2020-06-01"
    const date = stringToDateTransform(dateString)

    expect(date.toISOString().split("T")[0]).toEqual("2020-06-01")
  })

  it("should get init and finish date", () => {
    const dateString = "2020-06-01"
    const { start, end } = getStartAndFinishOfDay(dateString)

    expect(start.toISOString()).toEqual("2020-06-01T00:00:00.000Z")
    expect(end.toISOString()).toEqual("2020-06-01T23:59:59.000Z")
  })
})
