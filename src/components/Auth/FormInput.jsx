import { TEInput } from "tw-elements-react"

export default function FormInput({
    name,
    label,
    type
}) {
    return (
        <TEInput
            type={type}
            label={label}
            name={name}
            className="mb-4"
        ></TEInput>
    )
}