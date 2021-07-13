import { UserT, ShiftT, DisplayShiftT } from '../types'
import dayJs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayJs.extend(localizedFormat)

const MINUTES_IN_DAY = 1440

export const createEpoch = (date: string, time: string): number => new Date(`${date}T${time}:00`).valueOf()

export const getStartDateString = (epoch: number): string => dayJs(epoch).format('L')

export const getTimeString = (epoch: number): string => dayJs(epoch).format('LT')

export const calculateDuration = (start: number, end: number): string => {
  const hours = (end - start) / 60 / 60 / 1000
  return hours.toFixed(2)
}

export const findAndReturnName = (employees: UserT[], _id: string): string => {
  const employee = employees.find((employee) => _id === employee._id)
  if (employee) {
    return `${employee?.lastName}, ${employee?.firstName}`
  } else {
    return ''
  }
}

export const getMinutes = (hour: string, minute: string): number => parseInt(hour) * 60 + parseInt(minute)

export const convertMinutesToMilliseconds = (minutes: number): number => minutes * 60 * 1000

export const createEndTime = (epoch: number, startTime: string, endTime: string): number => {
  const [hourEnd, minuteEnd] = endTime.split(':')
  const [hourStart, minuteStart] = startTime.split(':')
  const startMinutes = getMinutes(hourStart, minuteStart)
  const endMinutes = getMinutes(hourEnd, minuteEnd)
  let duration = 0
  if (endMinutes < startMinutes) {
    duration = MINUTES_IN_DAY - (startMinutes - endMinutes)
  } else {
    duration = endMinutes - startMinutes
  }

  return epoch + convertMinutesToMilliseconds(duration)
}

export const formatShifts = (shifts: ShiftT[], employees: UserT[]): DisplayShiftT[] => {
  const formattedShifts: DisplayShiftT[] = []
  shifts.forEach((shift) => {
    if (findAndReturnName(employees, shift.userId)) {
      formattedShifts.push({
        _id: shift._id,
        shiftName: shift.name,
        fullName: findAndReturnName(employees, shift.userId),
        startDate: getStartDateString(shift.startTime),
        startTime: getTimeString(shift.startTime),
        endTime: getTimeString(shift.endTime),
        duration: calculateDuration(shift.startTime, shift.endTime),
      })
    }
  })
  return formattedShifts
}
