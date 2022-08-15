import { ErrorMessage } from "@hookform/error-message"
import React from "react"
import { MultipleFieldErrors } from "react-hook-form"
import Tooltip from "../tooltip"

type InputErrorProps = {
  errors?: { [x: string]: unknown }
  name?: string
  className?: string
}

const InputError = ({ errors, name, className }: InputErrorProps) => {
  if (!errors || !name) {
    return null
  }

  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message, messages }) => {
        return (
          <div className="text-rose-50 inter-small-regular mt-2">
            {messages ? (
              <MultipleMessages messages={messages} />
            ) : (
              <p>{message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

const MultipleMessages = ({ messages }: { messages: MultipleFieldErrors }) => {
  const errors = Object.entries(messages).map(([_, message]) => message)

  const displayedError = errors[0]
  const remainderErrors = errors.slice(1)

  return (
    <div className="flex items-center gap-x-1 cursor-default">
      <p>{displayedError}</p>
      {remainderErrors?.length > 0 && (
        <Tooltip
          content={
            <div className="text-rose-50 inter-small-regular">
              {remainderErrors.map((e, i) => {
                return (
                  <p key={i}>
                    {Array.from(Array(i + 1)).map((_) => "*")}
                    {e}
                  </p>
                )
              })}
            </div>
          }
        >
          <p>
            +{remainderErrors.length}{" "}
            {remainderErrors.length > 1 ? "errors" : "error"}
          </p>
        </Tooltip>
      )}
    </div>
  )
}

const getErrorMessage = (type: string, message?: string) => {
  if (message) {
    return message
  }

  switch (type) {
    case "required":
      return "This field is required"
    case "minLength":
      return "Input is too short"
    case "maxLength":
      return "Input is too long"
    case "pattern":
      return "Input is invalid"
    default:
      return "Input is invalid"
  }
}

export default InputError
