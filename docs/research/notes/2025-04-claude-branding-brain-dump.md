# Claude branding brain dump

These are some notes I have been keeping while I reverse engineer claude.ai and anthropic's branding.

Tech Stack:

- next.js
- shadcn
- https://katex.org/

## Claude app component hierarchy

App
├── NotificationsProvider (React Context)
│ └── ToastList
│ └── ToastItem
│ ├── ToastContent
│ └── ToastActions
├── AuthProvider (React Context - handles authentication)
│ └── Layout
│ ├── Sidebar
│ │ ├── Navigation
│ │ │ ├── NewChatLink (NavLink)
│ │ │ ├── ProjectsLink (NavLink)
│ │ │ ├── ChatsLink (NavLink)
│ │ │ ├── StarredSection
│ │ │ │ ├── SectionHeader (Reusable component for headings)
│ │ │ │ ├── StarredProjectLink (NavLink) _ (Repeated)
│ │ │ │ │ └── ProjectIcon
│ │ │ │ └── ProjectMenuDropdown (DropdownMenu)
│ │ │ │ └── DropdownMenuItem_ (Repeated)
│ │ │ ├── UsageSection
│ │ │ │ ├── SectionHeader
│ │ │ │ ├── UsageMeter (Progress) _ (Repeated for Opus, Sonnet, Haiku)
│ │ │ │ │ ├── MeterLabel
│ │ │ │ │ ├── ProgressBar
│ │ │ │ │ └── UsageResetInfo
│ │ │ ├── RecentsSection
│ │ │ │ ├── SectionHeader
│ │ │ │ ├── RecentChatLink (NavLink) _ (Repeated)
│ │ │ │ │ └── ChatTitle
│ │ │ │ └── AllChatsLink (NavLink)
│ │ │ └── UserMenu
│ │ │ ├── Avatar
│ │ │ │ └── InitialsAvatar (Generates initials if no image)
│ │ │ ├── UserInfo
│ │ │ │ ├── UserName
│ │ │ │ └── PlanInfo
│ │ │ └── UserMenuDropdown (DropdownMenu)
│ │ │ └── DropdownMenuItem* (Repeated)
│ │ └── PinSidebarToggle (Button)
│ │ └── LogoLink (NavLink)
│ └── MainContent
│ ├── HeroSection
│ │ └── ClaudeLogo (inline SVG)
│ └── ChatInputArea
│ ├── ChatInput (Tiptap Editor)
│ │ └── ProseMirror (Tiptap's core component)
│ ├── InputControls
│ │ ├── InputMenu (DropdownMenu)
│ │ │ ├── DropdownTrigger (Button)
│ │ │ └── DropdownContent
│ │ │ └── DropdownMenuItem* (Repeated)
│ │ ├── InputTools (DropdownMenu)
│ │ │ ├── DropdownTrigger (Button)
│ │ │ └── DropdownContent
│ │ │ └── DropdownMenuItem* (Repeated)
│ │ ├── ModelSelector (DropdownMenu)
│ │ │ ├── DropdownTrigger (Button)
│ │ │ │ ├── ClaudeLogo
│ │ │ │ └── ModelName
│ │ │ └── DropdownContent
│ │ │ └── ModelOption (DropdownMenuItem) * (Repeated)
│ │ └── SendButton (Button)
│ └── UsageDisplay
│ ├── QuotaIndicator
│ └── UsageResetTimer

## All components

Okay, here's the component list with the analysis of their similarity to original Shadcn UI components, following your formatting requirements. Please note: These ratings are highly speculative based on my understanding of the provided HTML snippet and general Shadcn UI usage.

- `App`: _N/A_ (C: 1 [base level component]) - [Likely the root component, so no direct Shadcn base.] (Sig: 1 [core app component]) (Acc: 7 [root almost always exists])
- `NotificationsProvider`: _N/A_ (C: 2 [likely custom context]) - [Manages notification state, unlikely to be a direct Shadcn component.] (Sig: 3 [custom implementation]) (Acc: 6 [context Providers common])
- `ToastList`: _`Toast`_ (C: 5 [follows toast pattern]) - [Likely displays toasts from `useToast` hook, custom arrangement.] (Sig: 4 [custom arrangement]) (Acc: 5 [toasts are predictable])
- `ToastItem`: _`Toast`_ (C: 6 [follows shadcn]) - [Represents a single toast with content and actions.] (Sig: 3 [inherits toast type]) (Acc: 6 [more is known about this])
- `ToastContent`: _N/A_ (C: 3 [custom division]) - [likely a wrapper around the text shown in the toast] (Sig: 2 [stylistic only]) (Acc: 7 [almost certainty])
- `ToastActions`: _N/A_ (C: 3 [custom division]) - [likely a wrapper around buttons that take actions] (Sig: 2 [stylistic only]) (Acc: 7 [almost certainty])
- `AuthProvider`: _N/A_ (C: 1 [very high level]) - [Handles authentication, not directly a Shadcn UI component.] (Sig: 1 [very high level]) (Acc: 7 [almost certainty])
- `Layout`: _N/A_ (C: 1 [very high level]) - [Base level layout, no Shadcn counterpart.] (Sig: 1 [very high level]) (Acc: 7 [almost certainty])
- `Sidebar`: _`Sheet` or N/A_ (C: 4 [could be "Sheet"]) - [Potentially a modified `Sheet` component for mobile responsiveness.] (Sig: 5 [changes for side nav]) (Acc: 4 [responsiveness unclear])
- `Navigation`: _N/A_ (C: 3 [likely div-based]) - [Simple list wrapper, styling handles by tailwind] (Sig: 2 [structural only]) (Acc: 7 [almost certainty])
- `NewChatLink`: _`Link` or `Button`_ (C: 5 [basic component type]) - [Standard link with Shadcn UI styling.] (Sig: 2 [custom text]) (Acc: 6 [basic components easy])
- `ProjectsLink`: _`Link` or `Button`_ (C: 5 [basic component type]) - [Standard link with Shadcn UI styling.] (Sig: 2 [custom text]) (Acc: 6 [basic components easy])
- `ChatsLink`: _`Link` or `Button`_ (C: 5 [basic component type]) - [Standard link with Shadcn UI styling.] (Sig: 2 [custom text]) (Acc: 6 [basic components easy])
- `StarredSection`: _N/A_ (C: 3 [custom section]) - [Wraps the starred projects list.] (Sig: 3 [group and label]) (Acc: 7 [almost certainty])
- `SectionHeader`: _N/A_ (C: 3 [custom]) - [Reusable component, styling driven by tailwind] (Sig: 3 [tail wind usage]) (Acc: 7 [almost certainty])
- `StarredProjectLink`: _`Link`_ (C: 6 [basic component type]) - [Styled link to a project page.] (Sig: 3 [list item usage]) (Acc: 6 [basic components easy])
- `ProjectIcon`: _N/A or `Icon`_ (C: 5 [basic SVG]) - [Displays the project icon; might use a Shadcn UI `Icon` component.] (Sig: 2 [svg or img]) (Acc: 6 [svg is common])
- `ProjectMenuDropdown`: _`DropdownMenu`_ (C: 7 [definite match]) - [For actions on individual starred projects.] (Sig: 2 [standard dropdown]) (Acc: 7 [almost certainty])
- `DropdownMenuItem`: _`DropdownMenuItem`_ (C: 7 [definite match]) - [Individual item in the dropdown.] (Sig: 2 [standard item]) (Acc: 7 [almost certainty])
- `UsageSection`: _N/A_ (C: 3 [group related info]) - [Wraps the usage stats components.] (Sig: 3 [group related info]) (Acc: 7 [almost certainty])
- `UsageMeter`: _`Progress`_ (C: 7 [progress indicator]) - [Displays a meter for resource usage.] (Sig: 2 [progress indicator]) (Acc: 7 [almost certainty])
- `MeterLabel`: _N/A_ (C: 2 [custom name]) - [custom label over the progress bar] (Sig: 1 [name and position]) (Acc: 7 [almost certainty])
- `ProgressBar`: _N/A_ (C: 2 [custom styling]) - [custom styling over the progress bar] (Sig: 3 [styling of child]) (Acc: 7 [almost certainty])
- `UsageResetInfo`: _N/A_ (C: 2 [text only]) - [displays when will the usage reset] (Sig: 1 [style of font]) (Acc: 7 [almost certainty])
- `RecentsSection`: _N/A_ (C: 3 [group related info]) - [Wraps the recent chats list.] (Sig: 3 [group related info]) (Acc: 7 [almost certainty])
- `RecentChatLink`: _`Link`_ (C: 6 [basic component type]) - [Link to a recent chat.] (Sig: 3 [styling differences]) (Acc: 6 [basic components easy])
- `ChatTitle`: _N/A_ (C: 3 [likely span]) - [displays the title of the chat link] (Sig: 1 [text element]) (Acc: 7 [almost certainty])
- `AllChatsLink`: _`Link`_ (C: 6 [basic component type]) - [Link to view all chats.] (Sig: 3 [styling differences]) (Acc: 6 [basic components easy])
- `UserMenu`: _`DropdownMenu`_ (C: 7 [dropdown for profile]) - [Dropdown menu for user profile and settings.] (Sig: 3 [profile items]) (Acc: 7 [almost certainty])
- `InitialsAvatar`: _`Avatar`_ (C: 7 [avatar primitive]) - [Generates initials if no user image is available. Extends Avatar.] (Sig: 4 [logic is customized]) (Acc: 7 [almost certainty])
- `UserName`: _N/A_ (C: 3 [likely div]) - [display users name in menu] (Sig: 1 [text element]) (Acc: 7 [almost certainty])
- `PlanInfo`: _N/A_ (C: 3 [likely div]) - [likely text denoting the users plan] (Sig: 1 [text element]) (Acc: 7 [almost certainty])
- `UserMenuDropdown`: _`DropdownMenu`_ (C: 7 [definite match]) - [actual menu items in the usermenu] (Sig: 2 [standard item]) (Acc: 7 [almost certainty])
- `PinSidebarToggle`: _`Button`_ (C: 5 [it is a button]) - [Toggles the sidebar's fixed state.] (Sig: 4 [svg is changed]) (Acc: 7 [almost certainty])
- `LogoLink`: _`Link`_ (C: 6 [basic component type]) - [Link to the homepage with the logo.] (Sig: 3 [svg element]) (Acc: 6 [basic components easy])
- `MainContent`: _N/A_ (C: 2 [structure only]) - [likely wraps the page elements] (Sig: 1 [div element]) (Acc: 7 [almost certainty])
- `HeroSection`: _N/A_ (C: 2 [structure only]) - [likely wraps the main text of the page] (Sig: 1 [div element]) (Acc: 7 [almost certainty])
- `ClaudeLogo`: _N/A or `Icon`_ (C: 4 [embedded SVG]) - [The Claude logo SVG.] (Sig: 2 [svg differences]) (Acc: 6 [svg are common])
- `ChatInputArea`: _N/A_ (C: 2 [structure only]) - [Container for the chat input, model selector, and send button.] (Sig: 1 [div element]) (Acc: 7 [almost certainty])
- `ChatInput`: _N/A_ (C: 3 [Likely Tiptap]) - [The rich text editor component.] (Sig: 6 [tiptap functionality]) (Acc: 5 [reliant on tiptap])
- `ProseMirror`: _N/A_ (C: 3 [Tiptap specific]) - [Likely a core component of the Tiptap editor.] (Sig: 6 [tiptap functionality]) (Acc: 5 [reliant on tiptap])
- `InputControls`: _N/A_ (C: 2 [Likely only styling]) - [Likely container for other components] (Sig: 1 [Likely only styling]) (Acc: 7 [almost certainty])
- `InputMenu`: _`DropdownMenu`_ (C: 7 [for input items]) - [For attaching files or media.] (Sig: 3 [menu content custom]) (Acc: 7 [almost certainty])
- `InputTools`: _`DropdownMenu`_ (C: 7 [for input formatting]) - [Contains input formatting and style options.] (Sig: 3 [menu content custom]) (Acc: 7 [almost certainty])
- `ModelSelector`: _`Select` or `DropdownMenu`_ (C: 7 [match either option]) - [For choosing the language model.] (Sig: 5 [significant rework]) (Acc: 7 [almost certainty])
- `SendButton`: _`Button`_ (C: 7 [standard option]) - [Button to send the message.] (Sig: 3 [standard button changes]) (Acc: 7 [almost certainty])
- `QuotaIndicator`: _`ProgressBar`_ (C: 7 [show use percentage]) - [hows the percentage use of that agent] (Sig: 2 [value can change]) (Acc: 7 [almost certainty])
- `UsageResetTimer`: _N/A_ (C: 3 [Likely basic text]) - [displays when use quota is reset] (Sig: 1 [text formatting]) (Acc: 7 [almost certainty])

**Key:**

- **C:** Confidence I am right
- **Sig:** Significance of Changes from the base
- **Acc:** Accuracy of the description

**Important Notes:**

- This is still speculative.
- The ratings are subjective estimations.
- Without access to the actual codebase, it's impossible to be 100% accurate.
