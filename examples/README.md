# Interactive form

A small, self-contained example that renders an A2UI form in the terminal and
handles its submit event locally. No agent, server, or API key is required.

## Run

From the repository root, with Node.js 20.11 or newer:

```bash
yarn install
node --import tsx examples/interactive-form.tsx
```

## Try it

1. Press **Tab** to focus the name field, then type to edit its value.
2. Press **Tab**, then **Space** to toggle notifications.
3. Press **Tab**, then **Left/Right** to change progress in steps of five.
4. Press **Tab**, then **Enter** to submit. The status shows the submission
   count and the current form values received in the event context.
5. Press **Tab**, then **Enter** to open the explanation. Press **Esc** to close it.
6. Press **Ctrl+C** to exit.

## How it works

[`interactive-form.tsx`](./interactive-form.tsx) demonstrates:

- `createSurface` to create a surface using the basic catalog.
- `updateDataModel` to initialize form values.
- `updateComponents` to define a Column, TextField, CheckBox, Slider, Button,
  Modal, and Text components.
- Path bindings that connect controls and event context to the data model.
- A `MessageProcessor` action callback that receives the submitted values and
  sends an incremental status update without recreating the surface.

The example imports the renderer from this checkout so it runs without a build.
In a separate application, import `A2uiSurface`, `basicCatalog`, and
`InkComponentImplementation` from `@kokoro-ele/a2ui-ink/v0_9` instead.

The modal expands inline because terminals have no overlay layer. The submit
handler is a local simulation; it does not send form data to an external service.
