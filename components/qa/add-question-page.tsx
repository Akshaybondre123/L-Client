"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const questionFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  isPrivate: z.boolean().default(false),
})

type QuestionFormValues = z.infer<typeof questionFormSchema>

interface AddQuestionPageProps {
  onAddQuestion?: () => void
  onCancel?: () => void
}

export function AddQuestionPage({ onAddQuestion, onCancel }: AddQuestionPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      isPrivate: true,
    },
  })

  const onSubmit = async (values: QuestionFormValues) => {
    setIsSubmitting(true)
    try {
      console.log("Form values:", values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Question submitted successfully!")
      if (onAddQuestion) {
        onAddQuestion()
      } else {
        router.push("/qa")
      }
    } catch (error) {
      console.error("Error submitting question:", error)
      alert("Failed to submit question. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.push("/qa")
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={handleCancel}
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Add Questions</h1>
                  <p className="text-sm text-gray-500">Submit your legal queries</p>
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your question title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Property Law">Property Law</SelectItem>
                              <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                              <SelectItem value="Family Law">Family Law</SelectItem>
                              <SelectItem value="Employment Law">Employment Law</SelectItem>
                              <SelectItem value="Immigration Law">Immigration Law</SelectItem>
                              <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea rows={4} placeholder="Full details / background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPrivate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Privacy</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-3 mt-2">
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                              <span className={field.value ? "text-green-600" : "text-gray-500"}>
                                {field.value ? "Private" : "Public"}
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2 flex gap-4">
                      <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel}>
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
