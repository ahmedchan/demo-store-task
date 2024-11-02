import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const SortProducts = ({
  value,
  onSortChange,
  disabled = false 
}: {
  value: string
  onSortChange: (v: string) => void
  disabled?: boolean
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <Select
        defaultValue={value}
        onValueChange={onSortChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full md:w-32">
          <SelectValue placeholder="select sort ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sorting</SelectLabel>
            <SelectItem value="asc">Newest</SelectItem>
            <SelectItem value="desc">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortProducts
