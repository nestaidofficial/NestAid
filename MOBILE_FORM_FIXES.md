# Mobile Form Keyboard Fixes

## Problem
On real mobile devices (especially iOS), the keyboard cursor keeps disappearing when users type in form fields inside the get-started-modal. This works fine in desktop inspect mode but fails on actual phones.

## Root Causes
1. **100vh lies on iOS** - Safari interprets `100vh` as the full screen height, not accounting for the keyboard
2. **Fixed positioning breaks** - Elements with `position: fixed` get misaligned when keyboard opens
3. **No auto-scroll** - Inputs near the bottom get covered by the keyboard without automatic scrolling
4. **Font-size triggers zoom** - iOS Safari zooms in when input font-size < 16px
5. **Viewport changes** - Keyboard opening/closing changes viewport height dynamically

## Solutions Implemented

### 1. Created Mobile Form Handler Hook
**File:** `hooks/use-mobile-form-handler.ts`

Features:
- Detects when keyboard opens (focusin event)
- Automatically scrolls focused input into view with `scrollIntoView()`
- Adds/removes `keyboard-open` class to body
- Tracks viewport height changes using `visualViewport` API
- Sets CSS custom property `--viewport-height` for dynamic use

### 2. Fixed Modal Viewport Issues
**File:** `components/get-started-modal.tsx`

Changes:
- Replaced `h-full` with `mobile-modal-height` class
- Uses `100dvh` (dynamic viewport height) for modern browsers
- Falls back to `100vh` for older browsers
- When keyboard opens, switches from fixed height to `min-height: 100vh`
- Prevents body scroll when modal is open on mobile
- Forces all inputs to `font-size: 16px` on mobile to prevent zoom

### 3. Updated All Form Components
**Files:** 
- `components/in-home-care-form.tsx`
- `components/companion-care-form.tsx`
- `components/modal-job-application-form.tsx`

Changes:
- Imported and used `useMobileFormHandler()` hook
- Attached `formRef` to form wrapper div
- Forms now respond to keyboard events automatically

### 4. Input Component Already Optimized
**File:** `components/ui/input.tsx`

Already has:
- `text-base` (16px) on mobile
- `md:text-sm` on desktop
- This prevents iOS Safari from auto-zooming

## CSS Fixes Applied

```css
/* Dynamic viewport height */
.mobile-modal-height {
  height: 100vh;
  height: 100dvh; /* Modern browsers */
}

/* Adjust when keyboard is open */
body.keyboard-open .mobile-modal-height {
  height: auto;
  min-height: 100vh;
}

/* Prevent zoom on iOS */
@media screen and (max-width: 768px) {
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    font-size: 16px !important;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Prevent body scroll when modal open */
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}
```

## How It Works

1. **User opens modal** → Body gets `modal-open` class, prevents background scroll
2. **User taps input** → Hook detects focusin event
3. **Keyboard opens** → Body gets `keyboard-open` class
4. **Auto-scroll triggers** → Input scrolls to center of viewport smoothly (300ms delay for keyboard animation)
5. **User types** → No zoom because font-size is 16px
6. **Cursor stays visible** → Input remains in view due to scrollIntoView()
7. **User closes keyboard** → Hook detects focusout, removes `keyboard-open` class

## Testing Checklist

- [x] All inputs have min 16px font-size on mobile
- [x] scrollIntoView() triggers on input focus
- [x] Keyboard open/close events detected
- [x] Modal height adjusts when keyboard opens
- [x] No unexpected zoom behavior
- [x] Cursor stays visible while typing
- [x] Works on both iOS Safari and Android Chrome
- [x] Smooth scroll behavior
- [x] No layout jumps or shifts

## Browser Support

- ✅ iOS Safari 13+
- ✅ Android Chrome
- ✅ Modern browsers with `100dvh` support
- ✅ Older browsers (fallback to `100vh`)

## References

Based on best practices from:
- Visual Viewport API
- iOS Safari mobile form behavior
- Modern CSS viewport units (dvh)
- Mobile UX patterns

