"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ArrowLeft, AlertCircle } from "lucide-react"
import type { Document } from "@/types/document"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const documentFormSchema = z.object({
  documentType: z.string().min(1, { message: "Document type is required" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  file: z.any().optional(),
})

type DocumentFormValues = z.infer<typeof documentFormSchema>

interface AddDocumentFormProps {
  onAddDocument: (document: Document) => void
  onCancel: () => void
  isSubmitting?: boolean
  error?: string | null
}

export function AddDocumentForm({ onAddDocument, onCancel, isSubmitting = false, error = null }: AddDocumentFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // State to toggle summary textarea visibility
  const [showSummary, setShowSummary] = useState(false)

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      documentType: "",
      summary: "", // Start with empty summary, or change as needed
    },
  })

  const onSubmit = (values: DocumentFormValues) => {
    // Create a new document object
    const newDocument: Document = {
      id: Math.random().toString(),
      name: selectedFile ? selectedFile.name : "Document",
      uploadedBy: "Client",
      uploadDate: new Date().toLocaleDateString("en-GB"),
      summary: values.summary,
      status: "Pending",
      fileType: selectedFile ? selectedFile.type : "",
      fileSize: selectedFile ? selectedFile.size : 0,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
    }

    // Add the new document
    onAddDocument(newDocument)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex flex-col flex-1 overflow-hidden bg-white">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-8 w-full max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                {/* Back button */}
                <button
                  onClick={() => window.history.back()}
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                  aria-label="Go back"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Add Document</h1>
                  <p className="text-sm text-gray-500">Add Document</p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
                <Form {...form} className="w-full">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                    <FormField
                      control={form.control}
                      name="documentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full max-w-md">
                                <SelectValue placeholder="Select document type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="aadhaar_card">Aadhaar Card</SelectItem>
                              <SelectItem value="pan_card">PAN Card</SelectItem>
                              <SelectItem value="agreement">Agreement</SelectItem>
                              <SelectItem value="legal_notice">Legal Notice</SelectItem>
                              <SelectItem value="court_order">Court Order</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Document</FormLabel>
                          <FormControl>
                            <div
                              className={`mt-1 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer max-w-md mx-auto ${
                                isDragging ? "border-gray-400 bg-gray-50" : "border-gray-300"
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={() => document.getElementById("file-upload")?.click()}
                            >
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  handleFileChange(e)
                                  field.onChange(e.target.files)
                                }}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M24 8l8 16H16l8-16zm0 32a8 8 0 100-16 8 8 0 000 16z"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="mt-2 flex text-sm text-gray-600">
                                <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                  Upload file here
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                (pdf, doc, jpg, png, max 5MB) supported file extension (PDF, DOC)
                              </p>
                              {selectedFile && (
                                <div className="mt-3 text-sm text-gray-500">
                                  Selected: <span className="font-medium">{selectedFile.name}</span> (
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            onClick={() => {
                              if (!showSummary) {
                                // Optionally, set a default generated summary on first reveal
                                if (!field.value) {
                                  field.onChange("Property sale agreement summary")
                                }
                              }
                              setShowSummary(true)
                            }}
                            className="cursor-pointer text-blue-600 hover:underline select-none"
                          >
                            Generate Summary
                          </FormLabel>
                          {showSummary && (
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter document summary"
                                className="min-h-[100px] max-w-md mt-2"
                              />
                            </FormControl>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-start gap-4 max-w-md">
                      <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
