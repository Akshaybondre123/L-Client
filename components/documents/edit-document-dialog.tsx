"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Document } from "@/types/document"

// Form validation schema
const documentFormSchema = z.object({
  name: z.string().min(1, { message: "Document name is required" }),
  uploadedBy: z.enum(["Client", "Lawyer"], { required_error: "Please select who uploaded the document" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  status: z.enum(["Approved", "Pending", "Rejected"], { required_error: "Please select a status" }),
})

type DocumentFormValues = z.infer<typeof documentFormSchema>

interface EditDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateDocument: (document: Document) => void
}

export function EditDocumentDialog({ document, open, onOpenChange, onUpdateDocument }: EditDocumentDialogProps) {
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      name: "",
      uploadedBy: "Client",
      summary: "",
      status: "Pending",
    },
  })

  // Update form values when document changes
  useEffect(() => {
    if (document) {
      form.reset({
        name: document.name,
        uploadedBy: document.uploadedBy,
        summary: document.summary,
        status: document.status,
      })
    }
  }, [document, form])

  const onSubmit = (values: DocumentFormValues) => {
    if (!document) return

    // Update document with new values
    const updatedDocument: Document = {
      ...document,
      name: values.name,
      uploadedBy: values.uploadedBy,
      summary: values.summary,
      status: values.status,
    }

    // Update the document
    onUpdateDocument(updatedDocument)

    // Close dialog
    onOpenChange(false)
  }

  if (!document) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>Update document information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter document name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uploaded By</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select who uploaded the document" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Client">Client</SelectItem>
                        <SelectItem value="Lawyer">Lawyer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter document summary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
