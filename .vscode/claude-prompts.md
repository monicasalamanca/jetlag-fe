# 🤖 Claude Sonnet 3.5 Prompt Reference

**For Frontend Engineers using VSCode with Copilot Pro**

## 💡 Quick Start

1. **Select code** in your editor
2. Press **Cmd+I** (opens Claude chat with context)
3. **Copy & paste** any prompt below
4. Get instant improvements!

---

## 🔍 Code Explanation & Refactor

**Explain a Component or Hook**

```
Explain what this React hook/component does, its dependencies, and suggest 3 specific improvements for performance or maintainability.
```

**Refactor for Readability**

```
Refactor this component to extract logic into custom hooks and improve readability. Focus on: 1) separating concerns, 2) reducing prop drilling, 3) improving TypeScript types.
```

**Extract Custom Hook**

```
Extract the logic in this component into a reusable custom hook. Include proper TypeScript types and error handling.
```

---

## 🧩 Generate UI Components

**Hero Section**

```
Generate a responsive React component with Tailwind CSS that includes a hero image, title, subtitle, and CTA button. Should be mobile-friendly and include proper TypeScript types.
```

**Product Card**

```
Create a reusable ProductCard component with image, title, price, and 'Add to Cart' button. Style it using Tailwind CSS and include hover states and loading states.
```

**Form Component**

```
Create a contact form component with validation using React Hook Form and Zod. Include proper error handling and accessibility features.
```

**Loading Skeleton**

```
Generate a skeleton loading component that matches the layout of [describe your component]. Use Tailwind CSS for animations.
```

---

## ⚙️ Convert or Upgrade Code

**Class to Functional**

```
Convert this class-based React component to a modern functional component using hooks. Preserve all existing functionality and improve TypeScript types.
```

**JS to TS**

```
Convert this JavaScript component to TypeScript. Include proper prop interfaces, return types, and strict type checking.
```

**Add Error Boundaries**

```
Wrap this component with an error boundary and add proper error handling for async operations.
```

---

## 🩺 Debugging & Optimization

**Help Me Fix This Error**

```
I'm getting this error: [paste error]. Here's the related file and stack trace. Can you find the cause and provide a step-by-step fix?
```

**Optimize for Performance**

```
This page is slow to render. Here's the Next.js page and the hook it uses. Identify performance bottlenecks and suggest optimizations like memoization, lazy loading, or code splitting.
```

**Memory Leak Detection**

```
Review this component for potential memory leaks. Check for: 1) uncleared timeouts/intervals, 2) event listeners not removed, 3) uncanceled API calls.
```

---

## 🧠 Code Audits

**Audit Multiple Files**

```
Here are 4 components. Find duplicate logic, unnecessary re-renders, and suggest reusable abstractions.
```

**UX Accessibility Review**

```
Review this React component for accessibility issues (ARIA, keyboard nav, focus trap) and suggest improvements.
```

**UX Accessibility Improvement**

```
Improve the accessibility and HTML semantics of the poll component. Add proper ARIA labels, semantics HTML, screen reader support, and better keyborad navigation.
```

---

## 📦 Utils & Hooks

**Debounce Hook**

```
Write a useDebouncedValue hook in TypeScript that accepts a value and delay. Include proper cleanup and type safety.
```

**Email Validator**

```
Create a function that validates whether a string is a valid email address. Return both boolean result and specific error messages.
```

**Date Formatter**

```
Create a utility to format an ISO date string to "Jul 24, 2025" format. Handle edge cases and invalid dates gracefully.
```

**API Hook Generator**

```
Create a custom hook for fetching data from [API endpoint]. Include loading states, error handling, and proper TypeScript types.
```

---

## 🎨 Tailwind Styling Help

**Simplify Tailwind**

```
Refactor this component's Tailwind class names to be more readable. Use logical groups or reusable classes.
```

**Grid Layout Prompt**

```
Generate a responsive 3-column layout for cards using Tailwind. Should be 1-col on mobile.
```

---

## 📘 Documentation

**Add JSDoc**

```
Add JSDoc comments to this component and describe what each prop does.
```

**README Generator**

```
Write a README file explaining how to use this component in a project.
```

---

## 🧭 Best Practices

• Break large prompts into specific goals
• Highlight code and use Cmd+I to ask Claude in context
• Use Claude for multi-file or large-component reasoning (thanks to 200K token window)
• Use GPT-4 for tighter completions; use Claude for deeper architecture/code audits

---
