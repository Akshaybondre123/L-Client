"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Mail, Phone, MapPin } from "lucide-react"

// Profile form validation schema
const profileFormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  notifications: z.boolean().default(true),
})

// Password form validation schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "Anima Agr",
      email: "xxxxxxxx",
      phone: "123 XXXXXXXXXX",
      address: "102-304 Sajik-ro-3-gil 23 Jongno-gu",
      notifications: true,
    },
  })

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onProfileSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      console.log("Profile form values:", values)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Show success message
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      console.log("Password form values:", values)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Show success message
      alert("Password changed successfully!")

      // Reset form
      passwordForm.reset()
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Failed to change password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-8 w-full overflow-x-hidden flex-1">
              <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Profile Card */}
                <div className="w-full lg:w-1/3">
                  <div className="rounded-lg shadow-sm border-gray-200 border p-6 bg-white">
                    <h2 className="text-2xl font-semibold mb-6">Hi Agr,</h2>

                    {/* Profile Photo and Name Section */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=48&width=48"
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Anima Agr</h3>
                        <p className="text-sm text-gray-600">Lioxxxxx</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>xxxxxxxxxx@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>XX 12345678900</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>102-304 Sajik-ro-3-gil 2 Jongno-gu</span>
                      </div>
                    </div>

                    {/* Notification Toggle */}
                    <div className="pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Notification</span>
                        <Switch
                          checked={profileForm.watch("notifications")}
                          onCheckedChange={(checked) => {
                            profileForm.setValue("notifications", checked)
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 block mt-1">
                        {profileForm.watch("notifications") ? "On" : "Off"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Settings Forms */}
                <div className="w-full lg:flex-1 min-w-0">
                  <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="profile">Update Profile</TabsTrigger>
                      <TabsTrigger value="password">Change Password</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your email"
                                      className="placeholder:text-gray-100"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={profileForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={profileForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="password" className="space-y-6">
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isSubmitting}>
                            {isSubmitting ? "Changing..." : "Change Password"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
