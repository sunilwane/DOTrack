const onlineUsers = new Set<string>();
const lastSeenByUser = new Map<string, Date>();

export const setUserOnline = (userId: string) => {
  onlineUsers.add(userId);
  lastSeenByUser.set(userId, new Date());
};

export const setUserOffline = (userId: string) => {
  onlineUsers.delete(userId);
  lastSeenByUser.set(userId, new Date());
};

export const isUserOnline = (userId: string): boolean => onlineUsers.has(userId);

export const getUserLastSeenAt = (userId: string): Date | undefined => lastSeenByUser.get(userId);

