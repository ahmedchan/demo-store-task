import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const LimitProducts = ({
  value,
  onLimitChange,
  disabled = false
}: {
  value: string
  onLimitChange: (v: string) => void
  disabled?: boolean
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <Select
        defaultValue={value}
        onValueChange={onLimitChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full md:w-28">
          <SelectValue placeholder="select limit ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sizing</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="40">40</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LimitProducts
