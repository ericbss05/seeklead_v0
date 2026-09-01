"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<a href="/dashboard" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BotIcon className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  Seeklead
                </span>
                <span className="truncate text-xs">
                  Prospection
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
