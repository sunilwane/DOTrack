export type ProjectChatMessage = {
  id: string;
  roomId: string;
  sender: {
    name: string;
    email: string;
  };
  content: string;
  kind: 'text' | 'code';
  createdAt: string;
};

const projectRoomMessages = new Map<string, ProjectChatMessage[]>();

export const getProjectRoomMessages = (roomId: string): ProjectChatMessage[] => {
  return projectRoomMessages.get(roomId) || [];
};

export const addProjectRoomMessage = (message: ProjectChatMessage): ProjectChatMessage[] => {
  const nextMessages = [...getProjectRoomMessages(message.roomId), message].slice(-100);
  projectRoomMessages.set(message.roomId, nextMessages);
  return nextMessages;
};

