"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { Feather } from "@expo/vector-icons"
import type { Notification } from "../../lib/types"

interface NotificationsScreenProps {
  notifications: Notification[]
  onBack: () => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (id: string) => void
}

export function NotificationsScreen({
  notifications,
  onBack,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsScreenProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "expired":
      case "expiring":
        return "alert-triangle"
      case "low-stock":
      case "out-of-stock":
        return "package"
      case "price-alert":
        return "trending-up"
      case "reminder":
        return "shopping-cart"
      default:
        return "bell"
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "expired":
      case "expiring":
        return "#AC2C2F"
      case "low-stock":
      case "out-of-stock":
        return "#F97316"
      case "price-alert":
        return "#3B82F6"
      default:
        return "#9CA3AF"
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA" }
      case "medium":
        return { bg: "#FED7AA", text: "#9A3412", border: "#FDBA74" }
      case "low":
        return { bg: "#DBEAFE", text: "#1E40AF", border: "#BFDBFE" }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Notificaciones</Text>
              {unreadCount > 0 && (
                <Text style={styles.headerSubtitle}>
                  {unreadCount} {unreadCount === 1 ? "nueva" : "nuevas"}
                </Text>
              )}
            </View>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={onMarkAllAsRead}>
              <Text style={styles.markAllButton}>Marcar todas leídas</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => setFilter("all")}
            style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
              Todas ({notifications.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("unread")}
            style={[styles.filterButton, filter === "unread" && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, filter === "unread" && styles.filterTextActive]}>
              No leídas ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="bell" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>
              {filter === "unread" ? "No hay notificaciones nuevas" : "No hay notificaciones"}
            </Text>
            <Text style={styles.emptyDescription}>
              {filter === "unread"
                ? "Has leído todas tus notificaciones"
                : "Aquí aparecerán tus notificaciones sobre productos y alertas"}
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification) => {
              const priorityColors = getPriorityColor(notification.priority)
              return (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationClick(notification)}
                  style={[styles.notificationCard, !notification.read && styles.notificationCardUnread]}
                >
                  <View style={styles.notificationContent}>
                    <Feather
                      name={getNotificationIcon(notification.type)}
                      size={24}
                      color={getIconColor(notification.type)}
                      style={styles.notificationIcon}
                    />

                    <View style={styles.notificationBody}>
                      <View style={styles.notificationHeader}>
                        <View style={styles.notificationTitleRow}>
                          <Text style={styles.notificationTitle}>{notification.title}</Text>
                          {!notification.read && <View style={styles.unreadDot} />}
                        </View>
                        <View
                          style={[
                            styles.priorityBadge,
                            { backgroundColor: priorityColors.bg, borderColor: priorityColors.border },
                          ]}
                        >
                          <Text style={[styles.priorityText, { color: priorityColors.text }]}>
                            {notification.priority === "high" && "Alta"}
                            {notification.priority === "medium" && "Media"}
                            {notification.priority === "low" && "Baja"}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.notificationMessage}>{notification.message}</Text>

                      <View style={styles.notificationFooter}>
                        <View style={styles.timestampRow}>
                          <Feather name="clock" size={12} color="#9CA3AF" />
                          <Text style={styles.timestamp}>{formatDate(notification.date)}</Text>
                        </View>
                        {notification.read && (
                          <View style={styles.readBadge}>
                            <Feather name="check-circle" size={12} color="#10B981" />
                            <Text style={styles.readText}>Leída</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  markAllButton: {
    color: "#AC2C2F",
    fontSize: 14,
    fontWeight: "500",
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  filterButtonActive: {
    backgroundColor: "#AC2C2F",
  },
  filterText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  notificationCardUnread: {
    backgroundColor: "#FEF3F2",
    borderColor: "#FCA5A5",
  },
  notificationContent: {
    flexDirection: "row",
    gap: 12,
  },
  notificationIcon: {
    marginTop: 4,
  },
  notificationBody: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#AC2C2F",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 12,
    lineHeight: 20,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestampRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  readBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readText: {
    fontSize: 12,
    color: "#10B981",
  },
})
