import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

const SearchProducts = ({
  value,
  onSearch,
  onClearSearch,
  disabled = false
}: {
  value?: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearSearch?: () => void
  disabled: boolean
}) => {
  return (
    <div className="relative w-full md:w-56">
      <Input
        placeholder="filter products..."
        value={value}
        onChange={onSearch}
        className="pr-20"
        disabled={disabled}
      />
      <div className="absolute top-0 z-1 right-0 w-20 h-full flex justify-center items-center">
        {value ? (
          <Button
            variant="link"
            size="sm"
            className="px-1"
            onClick={onClearSearch}
          >
            <X />
          </Button>
        ) : null}
        <Button variant="link" size="sm" className="px-1">
          <Search />
        </Button>
      </div>
    </div>
  )
}

export default SearchProducts
