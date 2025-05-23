"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
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
import { ArrowLeft, FileText, Calendar, User, Briefcase } from "lucide-react"

// Form validation schema
const caseFormSchema = z.object({
  caseNumber: z.string().min(1, { message: "Case number is required" }),
  clientName: z.string().min(1, { message: "Client name is required" }),
  lawyerName: z.string().min(1, { message: "Lawyer name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  description: z.string().optional(),
  caseType: z.string().optional(),
  court: z.string().optional(),
  nextHearing: z.string().optional(),
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

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseNumber: "",
      clientName: "",
      lawyerName: "",
      status: "",
      description: "",
      caseType: "",
      court: "",
      nextHearing: "",
    },
  })

  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true)
      try {
        const data = await CaseService.getCaseById(caseId)
        if (data) {
          setCaseData(data)
          // Set form values
          form.reset({
            caseNumber: data.caseNumber,
            clientName: data.clientName,
            lawyerName: data.lawyerName,
            status: data.status,
            description: data.description || "",
            caseType: data.caseType || "",
            court: data.court || "",
            nextHearing: data.nextHearing || "",
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
      // In a real app, this would update the case via API
      console.log("Updating case with values:", values)

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

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50 w-full max-w-none">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 overflow-auto w-full max-w-none">
              <main className="p-4 md:p-8 w-full max-w-none">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse">Loading case details...</div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (!caseData) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50 w-full max-w-none">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 overflow-auto w-full max-w-none">
              <main className="p-4 md:p-8 w-full max-w-none">
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  Case not found
                  <Button variant="outline" className="ml-4" onClick={() => router.push("/my-cases")}>
                    Back to My Cases
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 w-full max-w-none">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto w-full max-w-none">
            <main className="p-4 md:p-8 w-full max-w-none">
              <div className="flex items-center mb-6">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="md:col-span-2 w-full">
                  <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="caseNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Case Number</FormLabel>
                                <FormControl>
                                  <Input {...field} readOnly className="bg-gray-50" />
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

                          <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client</FormLabel>
                                <FormControl>
                                  <Input {...field} readOnly className="bg-gray-50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lawyerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lawyer</FormLabel>
                                <FormControl>
                                  <Input {...field} readOnly className="bg-gray-50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="caseType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Case Type</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g. Family Law, Criminal, etc." />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="court"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Court</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Court name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="nextHearing"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Next Hearing Date</FormLabel>
                                <FormControl>
                                  <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Case Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Enter case details and notes"
                                  className="min-h-[120px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Case Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Case Number</p>
                          <p className="text-sm text-gray-600">{caseData.caseNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Created On</p>
                          <p className="text-sm text-gray-600">{caseData.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Client</p>
                          <p className="text-sm text-gray-600">{caseData.clientName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Lawyer</p>
                          <p className="text-sm text-gray-600">{caseData.lawyerName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Documents</h3>
                    <div className="text-center py-8 border border-dashed rounded-md">
                      <p className="text-sm text-gray-500">No documents uploaded yet</p>
                      <Button variant="outline" className="mt-2">
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
