import { Dropdown, Form } from "react-bootstrap"
import type FilterOffer from "../../../types/FilterOffer"
import type { FilterType } from "../../../types/FilterOffer"

type Props = {
    variant: string
    filterKey: FilterType
    setFilters: React.Dispatch<React.SetStateAction<FilterOffer | null>>
    filters: FilterOffer | null
}

export default function DropdownFilters({ variant, filterKey, filters, setFilters }: Readonly<Props>){
    const handleChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: value
        }))
    }

    if(filterKey === "salary"){
        return (
            <Dropdown key={variant} autoClose={false}>
                <Dropdown.Toggle variant="light">
                    {variant}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Form.Group className="mx-3 my-2 w-auto">
                        <Form.Label>Minimo</Form.Label>
                        <Form.Control 
                            autoFocus
                            className="w-auto"
                            value={filters?.salaryMin ?? ""}
                            placeholder={`Filtrar por ${variant}`}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setFilters(prev => ({
                                    ...prev,
                                    salaryMin: value
                                }))
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mx-3 my-2 w-auto">
                        <Form.Label>Maximo</Form.Label>
                        <Form.Control 
                            autoFocus
                            className="w-auto"
                            value={filters?.salaryMax ?? ""}
                            placeholder={`Filtrar por ${variant}`}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setFilters(prev => ({
                                    ...prev,
                                    salaryMax: value
                                }))
                            }}
                        />
                    </Form.Group>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <Dropdown key={variant} autoClose={false}>
            <Dropdown.Toggle variant="light">
                {variant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Form.Control 
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder={`Filtrar por ${variant}`}
                    value={filters?.[filterKey] ?? ""}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </Dropdown.Menu>
        </Dropdown>
    )
}