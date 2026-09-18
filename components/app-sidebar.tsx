"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  ListIcon,
  BotIcon,
  TargetIcon,
  UsersIcon,
  Settings2Icon,
  LifeBuoyIcon,
  SendIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Utilisateur",
    email: "user@example.com",
    avatar: "/avatars/default.jpg",
  },

  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: <ListIcon />,
    },
    {
      title: "Agents",
      url: "/dashboard/agents",
      icon: <BotIcon />,
    },
    {
      title: "Cibles",
      url: "/dashboard/targets",
      icon: <TargetIcon />,
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: <UsersIcon />,
    },
  ],

  navSecondary: [
    {
      title: "Paramètres",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "/dashboard/feedback",
      icon: <SendIcon />,
    },
  ],
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              className="flex items-center"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Seeklead"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
                  Seeklead
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* User */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}