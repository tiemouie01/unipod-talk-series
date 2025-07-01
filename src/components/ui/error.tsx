import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "./button"

interface ErrorUIProps {
  title?: string
  message?: string
  retry?: () => void
}

export function ErrorUI({ 
  title = "Something went wrong", 
  message = "An error occurred while fetching the data. Please try again.",
  retry
}: ErrorUIProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="rounded-full bg-red-100/10 p-3">
        <AlertCircle className="h-6 w-6 text-red-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
        <p className="text-sm text-slate-400 max-w-md">{message}</p>
      </div>
      {retry && (
        <Button 
          variant="outline" 
          onClick={retry}
          className="mt-4 border-slate-700 hover:bg-slate-800"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  )
}
