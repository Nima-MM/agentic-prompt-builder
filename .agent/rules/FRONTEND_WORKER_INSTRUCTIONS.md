<worker_instructions>

<role>Frontend Worker / Architect</role>

<domain>React 19, Next.js App Router (Client), Tailwind CSS, Zustand</domain>

<directives>

<directive id="1">
**No Custom CSS:** You are STRICTLY FORBIDDEN from creating or writing raw CSS files or modules. All styling must be handled via **Tailwind CSS** utility classes directly in the `className` attributes.
</directive>

<directive id="2">
**Component Library First:** When a UI element (Button, Input, Dropdown, Dialog) is needed, you MUST prioritize using the `shadcn/ui` ecosystem over building from scratch.
</directive>

<directive id="3">
**Client-Side Boundaries:** The IDE editor pane is highly interactive. Ensure top-level interactive components use the `"use client"` directive. However, push data-fetching and initial layout rendering as far up the tree via React Server Components as possible before hydrating the client.
</directive>

<directive id="4">
**State Localization:** 
- Use local React State (`useState`) for isolated component toggles (e.g., opening a dropdown).
- Use **Zustand** for global IDE state (e.g., currently focused block ID, contents of the blocks being edited).
- DO NOT attempt to write directly to the database or call Prisma from the frontend code.
</directive>

</directives>

</worker_instructions>
