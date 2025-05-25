"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CaseService } from "@/services/case-service"
import type { Case, CaseStatus } from "@/types/case"
import { CRIMINAL_CASE_CODES, CIVIL_CASE_CODES, CASE_TYPES, COURTS } from "@/types/case"
import { ArrowLeft, FileText, Calendar, User, Briefcase, Plus, Trash2, Upload } from "lucide-react"

// Form validation schema
const caseFormSchema = z.object({
  caseYear: z.string().min(4, { message: "Year is required" }),
  caseCode: z.string().min(1, { message: "Case code is required" }),
  caseSerialNumber: z.string().min(1, { message: "Serial number is required" }),
  litigantType: z.enum(["Plaintiff", "Defendant"], { required_error: "Please select litigant type" }),
  litigantName: z.string().min(1, { message: "Litigant name is required" }),
  caseTitle: z.string().min(1, { message: "Case title is required" }),
  caseType: z.enum(["Criminal", "Civil"], { required_error: "Please select case type" }),
  court: z.string().min(1, { message: "Court is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  description: z.string().optional(),
  recentUpdate: z.string().optional(),
  hearingDates: z.array(
    z.object({
      date: z.string().min(1, { message: "Date is required" }),
      time: z.string().min(1, { message: "Time is required" }),
      description: z.string().optional(),
    }),
  ),
})

type CaseFormValues = z.infer<typeof caseFormSchema>

interface CaseDetailProps {
  caseId: string
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const router = useRouter()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseYear: new Date().getFullYear().toString(),
      caseCode: "",
      caseSerialNumber: "",
      litigantType: "Plaintiff",
      litigantName: "",
      caseTitle: "",
      caseType: "Criminal",
      court: "",
      status: "",
      description: "",
      recentUpdate: "",
      hearingDates: [{ date: "", time: "", description: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hearingDates",
  })

  const selectedCaseType = form.watch("caseType")
  const availableCaseCodes = selectedCaseType === "Criminal" ? CRIMINAL_CASE_CODES : CIVIL_CASE_CODES

  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true)
      try {
        const data = await CaseService.getCaseById(caseId)
        if (data) {
          setCaseData(data)
          // Set form values
          form.reset({
            caseYear: data.caseYear || new Date().getFullYear().toString(),
            caseCode: data.caseCode || "",
            caseSerialNumber: data.caseSerialNumber || "",
            litigantType: data.litigantType || "Plaintiff",
            litigantName: data.litigantName || "",
            caseTitle: data.caseTitle || "",
            caseType: data.caseType || "Criminal",
            court: data.court || "",
            status: data.status,
            description: data.description || "",
            recentUpdate: data.recentUpdate || "",
            hearingDates:
              data.nextHearingDates?.length > 0
                ? data.nextHearingDates.map((h) => ({ date: h.date, time: h.time, description: h.description || "" }))
                : [{ date: "", time: "", description: "" }],
          })
        }
      } catch (error) {
        console.error("Error fetching case:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCase()
  }, [caseId, form])

  const onSubmit = async (values: CaseFormValues) => {
    setSaving(true)
    try {
      console.log("Updating case with values:", values)

      // Format case number
      const caseNumber = `${values.caseYear}-${values.caseCode}-${values.caseSerialNumber}`

      // Update status if changed
      if (values.status !== caseData?.status) {
        await CaseService.updateCaseStatus(caseId, values.status as CaseStatus)
      }

      // Show success message
      alert("Case updated successfully")
    } catch (error) {
      console.error("Error updating case:", error)
      alert("Failed to update case")
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "audio/mpeg",
      "video/mp4",
    ]

    const validFiles = files.filter((file) => allowedTypes.includes(file.type))
    setUploadedFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse text-gray-600">Loading case details...</div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (!caseData) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-red-50 text-red-700 p-6 rounded-lg">
                <p className="mb-4">Case not found</p>
                <Button variant="outline" onClick={() => router.push("/my-cases")}>
                  Back to My Cases
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-4 md:p-6">
            <div className="h-full flex flex-col max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center mb-6 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="mr-4 p-0 hover:bg-transparent"
                  onClick={() => router.push("/my-cases")}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Case Details</h1>
                  <p className="text-sm text-gray-500">View and update case information</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-0">
                {/* Main Form - Takes up 3/4 on xl screens */}
                <div className="xl:col-span-3 bg-white rounded-lg shadow-sm border">
                  <div className="h-full flex flex-col">
                    <div className="p-6 flex-1 overflow-y-auto">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          {/* Case Number Section */}
                          <div className="pb-8 border-b border-gray-200">
                            <h3 className="text-lg font-semibold mb-6 text-gray-900">Case Number</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <FormField
                                control={form.control}
                                name="caseYear"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Year</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-10">
                                          <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => {
                                          const year = new Date().getFullYear() - i
                                          return (
                                            <SelectItem key={year} value={year.toString()}>
                                              {year}
                                            </SelectItem>
                                          )
                                        })}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="caseCode"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Case Code</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-10">
                                          <SelectValue placeholder="Select code" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {availableCaseCodes.map((code) => (
                                          <SelectItem key={code} value={code}>
                                            {code}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="caseSerialNumber"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Serial Number</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="1827" className="h-10" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm font-medium text-blue-800">
                                Case Number: {form.watch("caseYear")}-{form.watch("caseCode")}-
                                {form.watch("caseSerialNumber")}
                              </p>
                            </div>
                          </div>

                          {/* Litigant Information */}
                          <div className="pb-8 border-b border-gray-200">
                            <h3 className="text-lg font-semibold mb-6 text-gray-900">Litigant Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="litigantType"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Litigant Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-10">
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Plaintiff">Plaintiff</SelectItem>
                                        <SelectItem value="Defendant">Defendant</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="litigantName"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Litigant Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Enter litigant name" className="h-10" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Case Details */}
                          <div className="pb-8 border-b border-gray-200">
                            <h3 className="text-lg font-semibold mb-6 text-gray-900">Case Details</h3>
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="caseTitle"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">Case Title</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Enter case title" className="h-10" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                  control={form.control}
                                  name="caseType"
                                  render={({ field }) => (
                                    <FormItem className="space-y-2">
                                      <FormLabel className="text-sm font-medium text-gray-700">Case Type</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select case type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {CASE_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                              {type}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="court"
                                  render={({ field }) => (
                                    <FormItem className="space-y-2">
                                      <FormLabel className="text-sm font-medium text-gray-700">Court</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select court" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {COURTS.map((court) => (
                                            <SelectItem key={court} value={court}>
                                              {court}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem className="space-y-2">
                                      <FormLabel className="text-sm font-medium text-gray-700">Status</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="active">Active</SelectItem>
                                          <SelectItem value="in progress">In Progress</SelectItem>
                                          <SelectItem value="closed">Closed</SelectItem>
                                          <SelectItem value="pending">Pending</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Client and Lawyer Information (Auto-filled) */}
                          <div className="pb-8 border-b border-gray-200">
                            <h3 className="text-lg font-semibold mb-6 text-gray-900">
                              <span className="text-red-600">*</span> Client and Lawyer Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <label className="text-sm font-semibold text-red-700 block mb-2">Client Name</label>
                                <p className="text-sm text-red-600">{caseData.clientName} (Auto-filled)</p>
                              </div>
                              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <label className="text-sm font-semibold text-red-700 block mb-2">Lawyer Name</label>
                                <p className="text-sm text-red-600">{caseData.lawyerName} (Auto-filled)</p>
                              </div>
                            </div>
                          </div>

                          {/* Next Hearing Dates */}
                          <div className="pb-8 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-semibold text-gray-900">Next Hearing Dates</h3>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => append({ date: "", time: "", description: "" })}
                                className="h-9"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Hearing
                              </Button>
                            </div>
                            <div className="space-y-6">
                              {fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-lg bg-gray-50"
                                >
                                  <FormField
                                    control={form.control}
                                    name={`hearingDates.${index}.date`}
                                    render={({ field }) => (
                                      <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-medium text-gray-700">Date</FormLabel>
                                        <FormControl>
                                          <Input {...field} type="date" className="h-10" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`hearingDates.${index}.time`}
                                    render={({ field }) => (
                                      <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-medium text-gray-700">Time</FormLabel>
                                        <FormControl>
                                          <Input {...field} type="time" className="h-10" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`hearingDates.${index}.description`}
                                    render={({ field }) => (
                                      <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                                        <FormControl>
                                          <Input {...field} placeholder="Optional description" className="h-10" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex items-end">
                                    {fields.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => remove(index)}
                                        className="h-10 w-10 p-0"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recent Update */}
                          <div className="pb-8 border-b border-gray-200">
                            <FormField
                              control={form.control}
                              name="recentUpdate"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Recent Update</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Enter recent case updates"
                                      className="min-h-[100px] resize-none"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Case Description */}
                          <div className="pb-8">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Case Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Enter case details and notes"
                                      className="min-h-[140px] resize-none"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-end pt-6 border-t border-gray-200">
                            <Button type="submit" disabled={saving} className="h-10 px-8">
                              {saving ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Takes up 1/4 on xl screens */}
                <div className="xl:col-span-1 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900">Case Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <FileText className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Case Number</p>
                          <p className="text-sm text-gray-600">{caseData.caseNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Calendar className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Created On</p>
                          <p className="text-sm text-gray-600">{caseData.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <User className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Client</p>
                          <p className="text-sm text-gray-600">{caseData.clientName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Briefcase className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Lawyer</p>
                          <p className="text-sm text-gray-600">{caseData.lawyerName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900">Documents</h3>

                    {/* File Upload */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Upload Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.txt,.docx,.xlsx,.jpg,.png,.mp3,.mp4"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-3" />
                          <span className="text-sm font-medium text-gray-600 text-center mb-1">
                            Click to upload files
                          </span>
                          <span className="text-xs text-gray-500 text-center">
                            PDF, TXT, DOCX, XLSX, JPG, PNG, MP3, MP4
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Uploaded Files:</h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                            >
                              <span className="text-sm text-gray-700 truncate flex-1 mr-2">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 p-0 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {uploadedFiles.length === 0 && (
                      <div className="text-center py-8 border border-dashed rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">No documents uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
