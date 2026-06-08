import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Bell, Eye, Paperclip, Rocket, Send, Smile, X } from 'lucide-react';
import { githubService, type GithubCollaborator } from '../../../services/githubService';
import { chatService } from '../../../services/chatService';

type ProjectChatMessage = {
  id: string;
  roomId: string;
  sender: { name: string; email: string };
  content: string;
  kind: 'text' | 'code';
  createdAt: string;
};

const ProjectChatPanel = ({
  owner,
  repo,
  currentBranch,
  isOpen,
  onClose,
}: {
  owner: string;
  repo: string;
  currentBranch: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [collaborators, setCollaborators] = useState<GithubCollaborator[]>([]);
  const [messages, setMessages] = useState<ProjectChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAttachmentName, setPendingAttachmentName] = useState<string | null>(null);
  const [formatMode, setFormatMode] = useState<'plain' | 'bold' | 'italic' | 'code'>('plain');
  const socketRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingEchoRef = useRef<{ content: string; kind: 'text' | 'code'; expiresAt: number } | null>(null);

  const roomId = useMemo(() => `${owner}/${repo}`, [owner, repo]);
  const onlineCount = collaborators.length;
  const visibleCollaborators = collaborators.slice(0, 3);

  useEffect(() => {
    if (!isOpen) return;

    const loadCollaborators = async () => {
      try {
        const data = await githubService.getRepoCollaborators(owner, repo);
        setCollaborators(Array.isArray(data) ? data : []);
      } catch {
        setCollaborators([]);
      }
    };

    void loadCollaborators();
  }, [isOpen, owner, repo]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    setMessages([]);

    const socket = chatService.createProjectSocket(roomId);
    if (!socket) {
      setIsLoading(false);
      return;
    }

    socketRef.current = socket;

    socket.addEventListener('open', () => {
      setIsConnected(true);
      setIsLoading(false);
    });

    socket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(event.data) as
          | { type: 'connected'; messages: ProjectChatMessage[] }
          | { type: 'message:new'; message: ProjectChatMessage }
          | { type: 'error'; message: string };

        if (payload.type === 'connected') {
          setMessages(payload.messages || []);
          return;
        }

        if (payload.type === 'message:new') {
          setMessages((current) => {
            const pending = pendingEchoRef.current;
            if (
              pending &&
              pending.kind === payload.message.kind &&
              pending.content === payload.message.content &&
              Date.now() <= pending.expiresAt
            ) {
              pendingEchoRef.current = null;

              const optimisticIndex = current.findIndex((message) => message.id.startsWith('temp-'));
              if (optimisticIndex >= 0) {
                const next = [...current];
                next[optimisticIndex] = payload.message;
                return next;
              }
            }

            return [...current, payload.message];
          });
          return;
        }
      } catch {
        // ignore malformed payloads
      }
    });

    socket.addEventListener('close', () => {
      setIsConnected(false);
    });

    socket.addEventListener('error', () => {
      setIsConnected(false);
      setIsLoading(false);
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [isOpen, roomId]);

  useEffect(() => {
    if (!isOpen) return;

    const loadHistory = async () => {
      try {
        const history = await chatService.getProjectMessages(roomId);
        setMessages((current) => (current.length === 0 ? history : current));
      } catch {
        // websocket remains the primary path; this is only a history fallback.
      }
    };

    void loadHistory();
  }, [isOpen, roomId]);

  const handleSend = () => {
    const attachmentLine = pendingAttachmentName ? `\n[attached: ${pendingAttachmentName}]` : '';
    const content = `${draft.trim()}${attachmentLine}`.trim();
    const kind = formatMode === 'code' ? 'code' : 'text';
    if (!content) return;

    const optimisticMessage: ProjectChatMessage = {
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      roomId,
      sender: { name: 'You', email: '' },
      content,
      kind,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, optimisticMessage]);
    pendingEchoRef.current = {
      content,
      kind,
      expiresAt: Date.now() + 2500,
    };

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      setDraft('');
      setPendingAttachmentName(null);
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: 'send_message',
        channelId: roomId,
        content,
        kind,
      })
    );
    setDraft('');
    setPendingAttachmentName(null);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPendingAttachmentName(file.name);
    event.target.value = '';
  };

  const handleEmojiClick = () => {
    setDraft((current) => `${current}${current ? ' ' : ''}\u{1F642}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 right-0 z-30 flex w-full overflow-hidden border-l border-slate-800 bg-[#0b1020] shadow-2xl shadow-black/60">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-cyan-300">
              <Eye className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Mission Control
                </p>
                <p className="text-sm text-slate-300">{roomId}</p>
                <p className="text-[12px] text-slate-500">Branch: {currentBranch || 'default'}</p>
              </div>
              <div className="hidden h-8 w-px bg-slate-800 sm:block" />
              <div className="hidden items-center gap-1 sm:flex">
                {['Mainnet', 'Testnet', 'Staging'].map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={`px-3 py-1 text-sm transition ${
                      index === 1 ? 'border-b-2 border-slate-200 text-slate-100' : 'text-slate-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-700 p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex min-h-0 flex-1 flex-col border-r border-slate-800">
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center text-slate-500">Loading chat...</div>
                ) : (
                  <div className="space-y-8">
                    {messages.map((message, index) => {
                      const badge =
                        index === 0 ? 'Deployment' : index === 1 ? 'Action Required' : index === 2 ? 'Signed' : '';
                      const badgeClass =
                        index === 0
                          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                          : index === 1
                            ? 'border-rose-400/25 bg-rose-400/10 text-rose-200'
                            : index === 2
                              ? 'border-cyan-500/25 bg-cyan-500/10 text-cyan-200'
                              : 'border-slate-700 bg-slate-900 text-slate-300';

                      return (
                        <div key={message.id} className="flex gap-4">
                          <img
                            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(message.sender.name)}`}
                            alt={message.sender.name}
                            className="h-12 w-12 rounded-lg border border-slate-800 object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-[15px] font-medium text-slate-100">{message.sender.name}</span>
                              <span className="rounded border border-cyan-400/10 bg-cyan-400/10 px-2 py-1 text-[13px] text-cyan-300">
                                DevOps Eng
                              </span>
                              <span className="text-[15px] text-slate-500">
                                {new Intl.DateTimeFormat('en', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                }).format(new Date(message.createdAt))}
                              </span>
                            </div>
                            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">{message.content}</p>
                            {badge && (
                              <div className={`mt-4 inline-flex rounded-full border px-4 py-2 text-[15px] font-medium ${badgeClass}`}>
                                {badge}
                              </div>
                            )}
                            {message.kind === 'code' && (
                              <pre className="mt-4 max-w-3xl rounded-lg border border-slate-900 bg-[#090d18] p-5 font-mono text-[15px] leading-7 text-emerald-400 shadow-inner shadow-black/40">
                                <code>{message.content}</code>
                              </pre>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 px-3 py-3 sm:px-5 sm:py-5">
                <div className="overflow-hidden rounded-[22px] border border-[#232636] bg-[#12131a] shadow-[0_1px_0_rgba(255,255,255,0.02),inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <div className="flex items-center gap-4 overflow-x-auto px-5 py-4 text-slate-300 sm:px-6">
                    <button
                      type="button"
                      onClick={() => {
                        setFormatMode((current) => (current === 'bold' ? 'plain' : 'bold'));
                      }}
                      className="text-[17px] font-bold hover:text-white"
                      aria-label="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormatMode((current) => (current === 'italic' ? 'plain' : 'italic'));
                      }}
                      className="text-[17px] italic hover:text-white"
                      aria-label="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormatMode((current) => (current === 'code' ? 'plain' : 'code'));
                      }}
                      className="text-[17px] font-mono hover:text-white"
                      aria-label="Code"
                    >
                      &lt;&gt;
                    </button>
                    <span className="h-5 w-px bg-slate-700/70" />
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((current) => `${current}${current && !current.endsWith(' ') ? ' ' : ''}[label] `);
                      }}
                      className="inline-flex items-center gap-2 text-[16px] text-blue-500 hover:text-blue-400"
                      aria-label="Add label"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-[4px] border border-blue-500/60 text-[11px] font-semibold leading-none">
                        []
                      </span>
                      Add Label
                    </button>
                    <span className="h-5 w-px bg-slate-700/70" />
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((current) => `${current}${current && !current.endsWith(' ') ? ' ' : ''}[request deployment] `);
                      }}
                      className="inline-flex items-center gap-2 text-[16px] text-emerald-400 hover:text-emerald-300"
                      aria-label="Request deployment"
                    >
                      <Rocket className="h-5 w-5" />
                      Request Deployment
                    </button>
                  </div>

                  <div className="flex items-end gap-3 border-t border-white/5 px-5 py-5 sm:px-6">
                    <button
                      type="button"
                      onClick={handleAttachClick}
                      className="mb-2 text-slate-400 hover:text-slate-200"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-6 w-6" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder="Type a message to the team..."
                        className={`min-h-[44px] w-full resize-none bg-transparent px-2 py-2 text-[17px] leading-7 outline-none placeholder:text-slate-500 ${
                          formatMode === 'bold'
                            ? 'font-bold text-slate-100'
                            : formatMode === 'italic'
                              ? 'italic text-slate-200'
                              : formatMode === 'code'
                                ? 'font-mono text-emerald-300'
                                : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleEmojiClick}
                      className="mb-2 text-slate-400 hover:text-slate-200"
                      aria-label="Emoji"
                    >
                      <Smile className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleSend}
                      className="mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#1d66f5] text-white shadow-[0_10px_24px_rgba(29,102,245,0.28)] hover:bg-[#2d74ff]"
                      aria-label="Send"
                    >
                      <Send className="h-5 w-5 rotate-[45deg]" />
                    </button>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  {pendingAttachmentName ? (
                    <div className="border-t border-white/5 px-5 pb-4 sm:px-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
                        <Paperclip className="h-4 w-4" />
                        {pendingAttachmentName}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="min-h-0 bg-[#0d1321] px-5 py-5">
              <p className="mb-5 text-[18px] uppercase tracking-[0.26em] text-slate-400">
                Team Online - {collaborators.length}
              </p>
              <div className="space-y-6">
                {visibleCollaborators.map((collaborator, index) => (
                  <div key={collaborator.id} className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={collaborator.avatar_url}
                        alt={collaborator.login}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0d1321] ${
                          index < 2 ? 'bg-emerald-400' : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[18px] font-medium text-slate-100">{collaborator.login}</p>
                      <p className="text-[15px] text-slate-500">{index < 2 ? 'Active now' : 'Away'}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg border border-slate-800 bg-[#10172e] p-4">
                <div className="mb-3 flex items-center gap-2 text-blue-400">
                  <Bell className="h-4 w-4" />
                  <span className="text-[17px]">Network Alert</span>
                </div>
                <p className="text-[18px] leading-7 text-slate-300">
                  Scheduled maintenance for validator nodes in 4h 12m.
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-[13px] text-cyan-100">
                {isConnected ? 'WebSocket live' : 'Connecting to chat...'} and {onlineCount} collaborators loaded.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChatPanel;
