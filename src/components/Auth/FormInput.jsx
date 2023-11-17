import { TEInput } from "tw-elements-react"

export default function FormInput({
    name,
    label
}) {
    return (
        <TEInput
            type="text"
            label={label}
            name={name}
            className="mb-4"
        ></TEInput>
    )
}