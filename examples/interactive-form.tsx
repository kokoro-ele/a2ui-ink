/**
 * Copyright 2026 kokoro-ele
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {Box, Text, render} from 'ink';
import {pathToFileURL} from 'node:url';
import {MessageProcessor} from '@a2ui/web_core/v0_9';
import {A2uiSurface, basicCatalog, type InkComponentImplementation} from '../src/v0_9/index.js';

export function createDemo() {
  let submitted = 0;
  const processor = new MessageProcessor<InkComponentImplementation>(
    [basicCatalog],
    async action => {
      update('/status', `Submitted #${++submitted} · ${JSON.stringify(action.context)}`);
    },
  );
  function update(path: string, value: string) {
    processor.processMessages([
      {version: 'v0.9', updateDataModel: {surfaceId: 'demo', path, value}},
    ]);
  }
  processor.processMessages([
    {
      version: 'v0.9',
      createSurface: {surfaceId: 'demo', catalogId: basicCatalog.id, sendDataModel: true},
    },
    {
      version: 'v0.9',
      updateDataModel: {
        surfaceId: 'demo',
        path: '/',
        value: {name: 'Kokoro', enabled: false, progress: 40, status: 'Ready to submit'},
      },
    },
    {
      version: 'v0.9',
      updateComponents: {
        surfaceId: 'demo',
        components: [
          {
            id: 'root',
            component: 'Column',
            children: ['title', 'name', 'enabled', 'progress', 'submit', 'modal', 'status'],
          },
          {id: 'title', component: 'Text', text: 'A2UI x Ink Interactive Form', variant: 'h2'},
          {
            id: 'name',
            component: 'TextField',
            label: 'Name',
            value: {path: '/name'},
            variant: 'shortText',
          },
          {
            id: 'enabled',
            component: 'CheckBox',
            label: 'Enable notifications',
            value: {path: '/enabled'},
          },
          {
            id: 'progress',
            component: 'Slider',
            label: 'Progress',
            min: 0,
            max: 100,
            step: 5,
            value: {path: '/progress'},
          },
          {
            id: 'submit',
            component: 'Button',
            child: 'submit-label',
            variant: 'primary',
            action: {
              event: {
                name: 'submit',
                context: {
                  name: {path: '/name'},
                  enabled: {path: '/enabled'},
                  progress: {path: '/progress'},
                },
              },
            },
          },
          {id: 'submit-label', component: 'Text', text: 'Submit'},
          {id: 'modal', component: 'Modal', trigger: 'modal-label', content: 'modal-content'},
          {id: 'modal-label', component: 'Text', text: 'About this example'},
          {
            id: 'modal-content',
            component: 'Text',
            text: 'This form is generated from A2UI messages. Submitting sends an event and updates the status through an incremental data-model message.',
          },
          {id: 'status', component: 'Text', text: {path: '/status'}},
        ],
      },
    },
  ]);
  const surface = processor.model.surfacesMap.get('demo');
  if (!surface) throw new Error('Surface was not created');
  return {processor, surface, update};
}

export function App({demo}: {demo: ReturnType<typeof createDemo>}) {
  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan">
        Tab: focus | Enter/Space: activate | Arrows: slider | Esc: close | Ctrl+C: quit
      </Text>
      <Box borderStyle="round" borderColor="cyan" padding={1} flexDirection="column">
        <A2uiSurface surface={demo.surface} />
      </Box>
      <Text dimColor>Local event handler. No agent or API key required.</Text>
    </Box>
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  render(<App demo={createDemo()} />);
}
