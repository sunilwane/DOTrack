# Project Viewer - Testing Checklist

## Setup

1. Ensure backend is running with GitHub OAuth configured
2. Ensure frontend is running
3. Have test repositories ready (public and private)

## Recommended Test Repositories

- **Public**: `facebook/react`, `vercel/next.js`, `octocat/Hello-World`
- **Private**: Your own private repo (requires GitHub OAuth connection)

## Test Cases

### ✅ 1. Public Repository Access (No Authentication)
- [ ] Navigate to `/projects/facebook/react`
- [ ] Verify file tree loads without errors
- [ ] Click folders to expand/collapse
- [ ] Click a file (e.g., `README.md`)
- [ ] Verify syntax highlighting appears
- [ ] Check URL updates: `?ref=main&path=README.md`

### ✅ 2. Branch Switching
- [ ] Use branch selector dropdown
- [ ] Switch from `main` to another branch
- [ ] Verify tree reloads
- [ ] Confirm no stale files from previous branch
- [ ] Check URL: `?ref=<new-branch>`

### ✅ 3. Navigation & URL State
- [ ] Click file → verify URL updates
- [ ] Copy URL and paste in new tab → verify same file opens
- [ ] Use browser back button → verify previous file/folder state restores
- [ ] Refresh page → verify selected file remains open

### ✅ 4. Folder Expand/Collapse & Lazy Loading
- [ ] Expand folder → verify children load
- [ ] Collapse folder → verify children hidden
- [ ] Re-expand → verify no refetch (cached)
- [ ] Expand nested folder → verify lazy load only when clicked

### ✅ 5. File Highlighting & Edge Cases
- [ ] Open `.ts` / `.tsx` file → verify TypeScript syntax highlighting
- [ ] Open `.md` file → verify Markdown highlighting
- [ ] Open large file (>200KB) → verify "File too large" message + "View Raw" button
- [ ] Open binary file (image, pdf) → verify "Cannot preview binary file" message

### ✅ 6. Private Repository Access
- [ ] Navigate to private repo **without** GitHub connection
- [ ] Verify "Insufficient access - please connect GitHub" message
- [ ] Click "Connect GitHub" button
- [ ] Complete OAuth flow
- [ ] Return to repo → verify tree + files now load

### ✅ 7. Error Handling
- [ ] Navigate to non-existent repo → verify 404 handling
- [ ] Navigate to non-existent file → verify error message
- [ ] Test rate limit (make many rapid requests) → verify rate limit message
- [ ] Disconnect internet → verify network error handling

### ✅ 8. UI States
- [ ] Loading directory → verify skeleton/loading indicator
- [ ] Empty directory → verify "Empty directory" message
- [ ] Loading file → verify "Loading file..." message
- [ ] No file selected → verify "Select a file to view its contents"

### ✅ 9. File Selection Highlighting
- [ ] Click file → verify blue highlight + border
- [ ] Click another file → verify previous unhighlights
- [ ] Expand folder containing selected file → verify highlight persists

### ✅ 10. Branch Selector
- [ ] Verify current branch shown correctly
- [ ] Dropdown shows all available branches
- [ ] Disabled during loading
- [ ] Updates URL when changed

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Click file | URL updates, CodeViewer loads & highlights |
| Click folder | Expands, lazy-loads children, caches result |
| Switch branch | Clears caches, reloads root tree |
| Refresh page | Restores file/path from URL |
| Browser back | Navigates to previous file |
| Large file | Shows "too large" notice |
| Binary file | Shows "cannot preview" notice |
| Private repo (no auth) | Shows "connect GitHub" prompt |
| 404 repo/file | Shows error message |
| Rate limit | Shows rate limit warning |

## Known Limitations (Phase 1)

- No file search yet
- No commit history view
- No raw file download proxy
- No pagination for large directories (>1000 files)
- Filter input in sidebar not yet functional

## Next Steps (Future Phases)

- Phase 2: Add search, history, raw proxy, pagination
- Phase 3: Verification system (blockchain/IPFS attestation)
- Performance: Server-side caching, ETag support
