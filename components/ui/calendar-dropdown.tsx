"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarDropdownProps {
  selectedDays: Date[]
  onDaysChange: (days: Date[]) => void
  placeholder?: string
  className?: string
}

export function CalendarDropdown({
  selectedDays,
  onDaysChange,
  placeholder = "Select preferred days",
  className,
}: CalendarDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return

    const isSelected = selectedDays.some(
      (selectedDay) => selectedDay.toDateString() === day.toDateString()
    )

    if (isSelected) {
      onDaysChange(
        selectedDays.filter(
          (selectedDay) => selectedDay.toDateString() !== day.toDateString()
        )
      )
    } else {
      onDaysChange([...selectedDays, day])
    }
  }

  const formatSelectedDays = () => {
    if (selectedDays.length === 0) return placeholder
    
    if (selectedDays.length === 1) {
      return format(selectedDays[0], "EEE, MMM d")
    }
    
    if (selectedDays.length <= 3) {
      return selectedDays.map(day => format(day, "EEE")).join(", ")
    }
    
    return `${selectedDays.length} days selected`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-10 sm:h-12 text-base sm:text-lg border-2 transition-all duration-200 focus:scale-[1.02] focus:shadow-lg",
            "border-[#8B5A3C] hover:border-[#A67B5F] focus:border-[#A67B5F] focus:ring-2 focus:ring-[#A67B5F]/20",
            "bg-white hover:bg-[#FCF9F5] focus:bg-[#FCF9F5]",
            "text-[#8B5A3C] placeholder:text-[#A67B5F]",
            className
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {formatSelectedDays()}
          </span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 border-2 border-[#8B5A3C] shadow-lg"
        align="start"
      >
        <Calendar
          mode="multiple"
          selected={selectedDays}
          onSelect={handleDaySelect}
          className="rounded-md"
          classNames={{
            root: "w-fit",
            months: "flex gap-4 flex-col md:flex-row",
            month: "flex flex-col w-full gap-4",
            nav: "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
            button_previous: cn(
              "size-8 aria-disabled:opacity-50 p-0 select-none rounded-md",
              "hover:bg-[#FCF9F5] hover:text-[#8B5A3C]",
              "text-[#8B5A3C] border border-[#E8D5C4]"
            ),
            button_next: cn(
              "size-8 aria-disabled:opacity-50 p-0 select-none rounded-md",
              "hover:bg-[#FCF9F5] hover:text-[#8B5A3C]",
              "text-[#8B5A3C] border border-[#E8D5C4]"
            ),
            month_caption: "flex items-center justify-center h-8 w-full px-8 text-[#8B5A3C] font-medium",
            caption_label: "text-sm font-medium text-[#8B5A3C]",
            table: "w-full border-collapse",
            weekdays: "flex",
            weekday: "text-[#A67B5F] rounded-md flex-1 font-normal text-[0.8rem] select-none",
            week: "flex w-full mt-2",
            day: cn(
              "relative w-full h-full p-0 text-center aspect-square select-none",
              "hover:bg-[#FCF9F5] hover:text-[#8B5A3C] rounded-md transition-colors",
              "data-[selected=true]:bg-[#8B5A3C] data-[selected=true]:text-white",
              "data-[selected=true]:hover:bg-[#A67B5F] data-[selected=true]:hover:text-white",
              "focus:bg-[#FCF9F5] focus:text-[#8B5A3C] focus:outline-none focus:ring-2 focus:ring-[#A67B5F]/20"
            ),
            today: "bg-[#E8D5C4] text-[#8B5A3C] rounded-md font-medium",
            outside: "text-[#D4C4B7] opacity-50",
            disabled: "text-[#D4C4B7] opacity-50",
          }}
          components={{
            Chevron: ({ className, orientation, ...props }) => {
              if (orientation === 'left') {
                return (
                  <ChevronDownIcon className={cn('size-4 rotate-90', className)} {...props} />
                )
              }
              if (orientation === 'right') {
                return (
                  <ChevronDownIcon className={cn('size-4 -rotate-90', className)} {...props} />
                )
              }
              return (
                <ChevronDownIcon className={cn('size-4', className)} {...props} />
              )
            },
          }}
        />
      </PopoverContent>
    </Popover>
  )
} 