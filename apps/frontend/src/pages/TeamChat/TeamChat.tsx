import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Bell, Code2, Hash, LoaderCircle, MessageSquareText, Send, Users } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import { chatService } from '../../services/chatService';
import type { ChatChannel, ChatMessage, ChatProfile, ChatPresenceStatus } from '../../types/chat';

type SocketEvent =
  | { type: 'connected'; user: ChatProfile; channels: ChatChannel[]; members: ChatProfile[] }
  | { type: 'channel:joined'; channelId: string; messages: ChatMessage[]; members: ChatProfile[] }
  | { type: 'message:new'; message: ChatMessage }
  | { type: 'presence:update'; channelId: string; members: ChatProfile[] }
  | { type: 'error'; message: string };

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));

const formatStatus = (status: ChatPresenceStatus) => {
  if (status === 'online') return 'Active now';
  if (status === 'away') return 'Away';
  return 'Offline';
};

const TeamChat = () => {
  const { user: authUser } = useAuth();
  const [workspaceUser, setWorkspaceUser] = useState<ChatProfile | null>(null);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatProfile[]>([]);
  const [draft, setDraft] = useState('');
  const [messageMode, setMessageMode] = useState<'text' | 'code'>('text');
  const [isLoading, setIsLoading] = useState(true);
  const [socketReady, setSocketReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        const data = await chatService.getWorkspace();
        setWorkspaceUser(data.user);
        setChannels(data.channels);
        setMembers(data.members);
        setActiveChannelId((current) => current || data.channels[0]?.id || '');
      } catch (workspaceError) {
        setError(workspaceError instanceof Error ? workspaceError.message : 'Unable to load chat');
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkspace();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  useEffect(() => {
    if (!activeChannelId) return;

    setMessages([]);

    const socket = chatService.createSocket();
    if (!socket) {
      setError('You must be signed in to use chat.');
      return;
    }

    socketRef.current = socket;
    setSocketReady(false);

    socket.addEventListener('open', () => {
      setSocketReady(true);
      setError(null);
      socket.send(JSON.stringify({ type: 'join_channel', channelId: activeChannelId }));
    });

    socket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(event.data) as SocketEvent;

        if (payload.type === 'connected') {
          setChannels(payload.channels);
          setWorkspaceUser(payload.user);
          setMembers(payload.members);
          return;
        }

        if (payload.type === 'channel:joined' && payload.channelId === activeChannelId) {
          setMessages(payload.messages);
          setMembers(payload.members);
          return;
        }

        if (payload.type === 'message:new' && payload.message.channelId === activeChannelId) {
          setMessages((current) => [...current, payload.message]);
          return;
        }

        if (payload.type === 'presence:update' && payload.channelId === activeChannelId) {
          setMembers(payload.members);
          return;
        }

        if (payload.type === 'error') {
          setError(payload.message);
        }
      } catch {
        setError('Received an invalid chat payload.');
      }
    });

    socket.addEventListener('close', () => {
      setSocketReady(false);
    });

    socket.addEventListener('error', () => {
      setError('Chat connection failed. Please refresh and try again.');
      setSocketReady(false);
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [activeChannelId]);

  useEffect(() => {
    if (!activeChannelId || socketReady) return;

    const loadMessages = async () => {
      try {
        const history = await chatService.getMessages(activeChannelId);
        setMessages(history);
      } catch {
        // websocket join remains the primary path; this keeps the room usable if it lags.
      }
    };

    loadMessages();
  }, [activeChannelId, socketReady]);

  const activeChannel = channels.find((channel) => channel.id === activeChannelId) || null;
  const onlineMembers = members.filter((member) => member.presenceStatus === 'online');
  const currentProfile = workspaceUser;

  const handleSendMessage = () => {
    const content = draft.trim();
    if (!content || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    socketRef.current.send(
      JSON.stringify({
        type: 'send_message',
        channelId: activeChannelId,
        content,
        kind: messageMode,
      })
    );

    setDraft('');
  };

  const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full min-h-0 bg-[#0a0f1a] text-slate-100">
      <div className="mx-auto flex h-full min-h-0 max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/8 bg-white/5 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Mission Control
              </p>
              <h1 className="text-xl font-semibold text-white">Team Collaboration Chat</h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 sm:flex">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            {socketReady ? 'Live websocket sync' : 'Connecting...'}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="min-h-0 overflow-hidden rounded-3xl border border-white/8 bg-[#0d1321]/95 p-4 shadow-2xl shadow-black/25">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Channels</p>
                <h2 className="mt-1 text-lg font-semibold text-white">Active Rooms</h2>
              </div>
              <Users className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="space-y-2">
              {channels.map((channel) => {
                const isActive = channel.id === activeChannelId;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition-all ${
                      isActive
                        ? 'border-cyan-400/30 bg-cyan-400/15 text-white shadow-lg shadow-cyan-500/10'
                        : 'border-white/5 bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Hash className={`h-4 w-4 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                        <span className="truncate font-medium">{channel.name}</span>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">{channel.topic}</p>
                    </div>
                    <span className="ml-3 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                      {channel.memberCount}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-4">
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/70">Signed in as</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-white">
                  {getInitials(currentProfile?.displayName || workspaceUser?.email || authUser?.email || 'TT')}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {currentProfile?.displayName || workspaceUser?.name || authUser?.email}
                  </p>
                  <p className="truncate text-sm text-slate-400">{currentProfile?.role || 'Team Member'}</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-h-0 overflow-hidden rounded-3xl border border-white/8 bg-[#0b1120]/95 shadow-2xl shadow-black/25">
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    {activeChannel?.slug || 'general'}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    {activeChannel?.name || 'Select a channel'}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-200">
                    {onlineMembers.length} online
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                    {messages.length} messages
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                    Loading chat...
                  </div>
                ) : error ? (
                  <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-rose-100">
                    {error}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => {
                      const isCurrentUser = message.sender.id === (workspaceUser?.id || authUser?.sub);
                      const isCode = message.kind === 'code';
                      return (
                        <article
                          key={message.id}
                          className={`flex gap-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-white">
                            {getInitials(message.sender.displayName)}
                          </div>

                          <div className={`max-w-[min(760px,calc(100%-4rem))] ${isCurrentUser ? 'text-right' : ''}`}>
                            <div className={`mb-2 flex items-center gap-2 ${isCurrentUser ? 'justify-end' : ''}`}>
                              <span className="font-medium text-white">{message.sender.displayName}</span>
                              <span className="text-xs text-slate-500">{message.sender.role}</span>
                              <span className="text-xs text-slate-600">{formatTime(message.createdAt)}</span>
                            </div>

                            <div
                              className={`rounded-3xl border px-4 py-3 ${
                                isCurrentUser
                                  ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-50'
                                  : 'border-white/8 bg-white/[0.03] text-slate-100'
                              }`}
                            >
                              {isCode ? (
                                <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-black/30 p-4 text-sm leading-6 text-cyan-200">
                                  <code>{message.content}</code>
                                </pre>
                              ) : (
                                <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-100">
                                  {message.content}
                                </p>
                              )}

                              {message.attachments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <a
                                      key={attachment.url}
                                      href={attachment.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="block rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cyan-200 hover:bg-black/30"
                                    >
                                      {attachment.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              <div className="border-t border-white/8 p-5">
                <div className="rounded-3xl border border-white/8 bg-[#0f1729] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                    <button
                      type="button"
                      onClick={() => setMessageMode('text')}
                      className={`rounded-full px-3 py-1 transition ${
                        messageMode === 'text'
                          ? 'bg-cyan-400/15 text-cyan-200'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageMode('code')}
                      className={`rounded-full px-3 py-1 transition ${
                        messageMode === 'code'
                          ? 'bg-cyan-400/15 text-cyan-200'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Code2 className="inline h-4 w-4" />
                    </button>
                    <span className="mx-2 h-5 w-px bg-white/10" />
                    <span className="text-cyan-200/80">Add Label</span>
                  </div>

                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <label className="block">
                        <span className="sr-only">Type a message to the team</span>
                        <textarea
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          onKeyDown={handleMessageKeyDown}
                          rows={3}
                          placeholder={
                            activeChannel
                              ? `Type a message in #${activeChannel.slug}...`
                              : 'Select a channel to start chatting...'
                          }
                          className="w-full resize-none rounded-2xl border border-white/8 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!draft.trim() || !socketReady}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <aside className="min-h-0 overflow-hidden rounded-3xl border border-white/8 bg-[#0d1321]/95 p-4 shadow-2xl shadow-black/25">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Team Online</p>
                <h2 className="mt-1 text-lg font-semibold text-white">Members</h2>
              </div>
              <Bell className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="space-y-3">
              {members.map((member) => {
                const isOnline = member.presenceStatus === 'online';
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3"
                  >
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-white">
                      {getInitials(member.displayName)}
                      <span
                        className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#0d1321] ${
                          isOnline ? 'bg-emerald-400' : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{member.displayName}</p>
                      <p className="truncate text-sm text-slate-400">{member.role}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {isOnline ? 'Live' : 'Idle'}
                      </p>
                      <p className="text-sm text-slate-300">{formatStatus(member.presenceStatus)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/70">Channel summary</p>
              <div className="mt-3 space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between">
                  <span>Private channel</span>
                  <span>{activeChannel?.isPrivate ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Members</span>
                  <span>{members.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Connection</span>
                  <span>{socketReady ? 'WebSocket live' : 'Reconnecting'}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
