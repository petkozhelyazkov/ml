import { useContext } from "react"
import { AlertContext, alertType } from "../../contexts/AlertContext"
import { TEAlert } from "tw-elements-react";


export default function Alert() {
    const { alert } = useContext(AlertContext)

    return (
        <>
            {alert.visible && <div className="fixed right-4 top-6 z-50 opacity-80">
                <TEAlert staticAlert open={true}
                    color={alert.type == alertType.success
                        ? "bg-success-200 text-success-800"
                        : "bg-danger-100 text-danger-700"
                    }
                >
                    <span className="mr-2">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            {alert.type == 'success' ?
                                <path clipRule="evenodd" fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                                : <path clipRule="evenodd" fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" />
                            }
                        </svg>
                    </span>
                    {alert.message}
                </TEAlert>
            </div>
            }
        </>
    )
}