# @kokoro-ele/a2ui-ink

Community-maintained [Ink](https://github.com/vadimdemedes/ink) renderer for
[A2UI](https://a2ui.org/) v0.9 and v0.9.1.

The package uses `@a2ui/web_core` for message processing, state, data binding,
and catalog functions. It maps all 18 basic catalog components to terminal UI.
Interaction is keyboard-based: Tab changes focus, Enter or Space activates a
control, and arrow keys operate tabs and sliders.

This project is not maintained by the A2UI team.

## Install

```bash
yarn add @kokoro-ele/a2ui-ink @a2ui/web_core ink react
```

## Usage

```tsx
import {render} from 'ink';
import {MessageProcessor} from '@a2ui/web_core/v0_9';
import {A2uiSurface, basicCatalog} from '@kokoro-ele/a2ui-ink/v0_9';

const processor = new MessageProcessor([basicCatalog], async action => {
  console.log(action);
});

processor.processMessages(messages);
const surface = [...processor.model.surfacesMap.values()][0]!;
render(<A2uiSurface surface={surface} />);
```

## Catalog support

- Text, Icon, Image, Video, and AudioPlayer
- Row, Column, List, Card, and Divider
- Button, CheckBox, ChoicePicker, TextField, and DateTimeInput
- Slider, Tabs, and Modal

Image, Video, and AudioPlayer render terminal placeholders because Ink cannot
display media. Markdown markers in Text are reduced to a plain-text fallback.

## Examples

The repository includes the official v0.9.1 basic catalog examples as test and
demo fixtures.

```bash
yarn install
yarn demo --list
yarn demo 00_interactive-button
yarn demo 32_advanced-form
yarn demo 36_modal
```

Run the terminal gallery with:

```bash
yarn explorer
yarn explorer 32_advanced-form
```

The mock restaurant flow does not require an agent or API key:

```bash
yarn demo:live --mock --auto
```

For a live A2A connection, start the A2UI
[Restaurant Finder Agent](https://github.com/a2ui-project/a2ui/tree/main/samples/agent/adk/restaurant_finder)
on port 10002, then run:

```bash
yarn demo:live --auto
```

Set `A2A_AGENT_URL` or pass `--url` to use another endpoint.

## Development

```bash
yarn install
yarn build
yarn test
yarn lint
yarn format:check
yarn typecheck
```

## License

Apache-2.0. The JSON examples under `fixtures/examples` are copied from the
A2UI repository and retain the same license.
