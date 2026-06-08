import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildGithubApiUrl, buildGithubRequestOptions } from './api';
import type { Branch } from './types';

interface UseBranchSelectorParams {
  owner: string;
  repo: string;
  currentBranch: string;
}

export const useBranchSelector = ({
  owner,
  repo,
  currentBranch,
}: UseBranchSelectorParams) => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const branchListScrollRef = useRef<HTMLDivElement | null>(null);
  const currentBranchLabel = currentBranch || 'default';

  useEffect(() => {
    const loadBranches = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          buildGithubApiUrl(owner, repo, '/branches'),
          buildGithubRequestOptions()
        );

        if (res.ok) {
          const json = (await res.json()) as { branches?: Branch[] };
          const loadedBranches = json.branches || [];
          setBranches(loadedBranches);

          if (
            loadedBranches.length > 0 &&
            !loadedBranches.find((branch) => branch.name === currentBranch)
          ) {
            navigate(
              `/projects/${owner}/${repo}?ref=${encodeURIComponent(
                loadedBranches[0].name
              )}`
            );
          }
        } else {
          const text = await res.text().catch(() => '');
          console.error('Failed loading branches', { status: res.status, body: text });
        }
      } catch {
        // Ignore and keep fallback branch label.
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      void loadBranches();
    }
  }, [owner, repo, currentBranch, navigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleBranchChange = (newBranch: string) => {
    setIsOpen(false);
    navigate(`/projects/${owner}/${repo}?ref=${encodeURIComponent(newBranch)}`);
  };

  const handleBranchListWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = branchListScrollRef.current;
    if (!element) return;

    event.preventDefault();
    event.stopPropagation();

    if (element.scrollHeight <= element.clientHeight) return;

    const maxTop = element.scrollHeight - element.clientHeight;
    const nextTop = Math.max(0, Math.min(maxTop, element.scrollTop + event.deltaY));
    element.scrollTop = nextTop;
  };

  const visibleBranches = branches.length > 0 ? branches : [{ name: currentBranchLabel }];

  return {
    loading,
    isOpen,
    setIsOpen,
    dropdownRef,
    branchListScrollRef,
    currentBranchLabel,
    visibleBranches,
    handleBranchChange,
    handleBranchListWheel,
  };
};
