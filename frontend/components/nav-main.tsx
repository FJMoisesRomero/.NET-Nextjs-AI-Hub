"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  itemClassName?: string
  iconClassName?: string
  collapsed?: boolean
}

export function NavMain({ items, itemClassName, iconClassName, collapsed }: NavMainProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1">
        {items?.map((item, index) => {
          const Icon = item.icon
          return (
            <Collapsible key={index}>
              <Link href={item.url}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={"w-full justify-start text-white/90 hover:text-white " + itemClassName}
                  data-active={item.isActive}
                  title={collapsed ? item.title : undefined}
                >
                  {Icon && (
                    <Icon className={"h-4 w-4 shrink-0 " + (collapsed ? "" : "mr-2 ") + iconClassName} />
                  )}
                  {!collapsed && item.title}
                </Button>
              </Link>
              {!collapsed && item.items?.length ? (
                <CollapsibleContent className="pl-6">
                  <div className="flex flex-col gap-1">
                    {item.items.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.url}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-white/70 hover:text-white"
                        >
                          {subItem.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              ) : null}
            </Collapsible>
          )
        })}
      </div>
    </ScrollArea>
  )
}
