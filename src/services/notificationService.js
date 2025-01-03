export const fetchNotifications = () => {
    return [
        {
            id: 1,
            title: "Company Created",
            message: "A new company profile has been created successfully.",
            type: "success",
            date: "2025-01-01",
        },
        {
            id: 2,
            title: "Method Updated",
            message: "The communication method was updated.",
            type: "info",
            date: "2025-01-02",
        },
        {
            id: 3,
            title: "Error in Processing",
            message: "There was an issue with the server. Please try again later.",
            type: "error",
            date: "2025-01-02",
        },
    ];
};

export const addNotification = (currentNotifications, newNotification) => {
    return [...currentNotifications, { ...newNotification, id: Date.now() }];
};

export const removeNotification = (currentNotifications, id) => {
    return currentNotifications.filter((notification) => notification.id !== id);
};

export const filterNotificationsByType = (notifications, type) => {
    return notifications.filter((notification) => notification.type === type);
};
