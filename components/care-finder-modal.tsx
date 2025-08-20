"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CareFinderFlow } from "./care-finder-flow"

interface CareFinderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareFinderModal({ open, onOpenChange }: CareFinderModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        <CareFinderFlow onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
