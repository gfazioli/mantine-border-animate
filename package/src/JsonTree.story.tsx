import React from 'react';
import { ScrollArea, Stack, Title } from '@mantine/core';
import { JsonTree } from './JsonTree';
import classes from './Classes.module.css';

export default {
  title: 'JsonTree',
  args: {},
  argTypes: {},
};

const data = {
  name: 'John Doe',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zip: '12345',
  },
  action: { type: 'click', payload: undefined },
  projects: [
    {
      name: 'Project A',
      status: 'completed',
    },
    {
      name: 'Project B',
      status: 'in progress',
    },
  ],
};

export function Usage() {
  return (
    <Stack>
      <JsonTree data={data} />
      <JsonTree data="Simple String" />
      <JsonTree data />
      <JsonTree data={false} />
      <JsonTree data={[1, 2, 3]} />
      <JsonTree data={{ on: true }} />
      <JsonTree data={null} />
      <JsonTree data={undefined} />
    </Stack>
  );
}

export function WithSize() {
  return (
    <Stack>
      <JsonTree data={data} />
      <JsonTree data={data} size="xs" />
      <JsonTree data={data} size="xl" />
    </Stack>
  );
}

export function WithTitle() {
  return (
    <Stack>
      <JsonTree data={data} />
      <JsonTree data={data} title="Convert.json" />
      <JsonTree data={data} title="Convert.json" styles={{ header: { backgroundColor: 'red' } }} />

      <JsonTree data={data} title={<Title order={2}>data.json</Title>} />
    </Stack>
  );
}

export function ContainerHeight() {
  return (
    <Stack h={100} style={{ border: '1px solid red' }}>
      <JsonTree data={data} />
    </Stack>
  );
}

export function WrapScrollArea() {
  return (
    <Stack style={{ border: '1px solid red' }}>
      <ScrollArea style={{ height: 200 }} type="scroll">
        <JsonTree data={data} />
      </ScrollArea>
    </Stack>
  );
}

export function WrapScrollAreaAndTitle() {
  return (
    <Stack style={{ border: '1px solid red' }} pos="relative">
      <ScrollArea style={{ height: 200 }} type="scroll">
        <JsonTree data={data} title="contact.json" withExpandAll />
      </ScrollArea>
    </Stack>
  );
}

export function WrapScrollAreaAndTitleStickyHeader() {
  return (
    <Stack style={{ border: '1px solid red' }} pos="relative">
      <ScrollArea style={{ height: 200 }} type="scroll">
        <JsonTree data={data} title="contact.json" withExpandAll stickyHeader />
      </ScrollArea>
    </Stack>
  );
}

export function WrapScrollAreaAndTitleStickyHeaderBgColor() {
  return (
    <Stack style={{ border: '1px solid red' }} pos="relative">
      <ScrollArea style={{ height: 200 }} type="scroll">
        <JsonTree bg="red" data={data} title="contact.json" withExpandAll stickyHeader />
      </ScrollArea>
    </Stack>
  );
}

export function IndentGuide() {
  return (
    <Stack>
      <JsonTree data={data} title="contact.json" withExpandAll stickyHeader showIndentGuides />
    </Stack>
  );
}

export function ClassesStyled() {
  return (
    <Stack>
      <JsonTree
        classNames={classes}
        data={data}
        title="contact.json"
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
      />
    </Stack>
  );
}

export function StyleStyled() {
  return (
    <Stack>
      <JsonTree
        data={data}
        title="contact.json"
        style={{
          color: 'red',
          '--json-tree-font-size': '28px',
          '.mantine-JsonTree-key': { '--json-tree-color-key': 'purple', color: 'purple' },
        }}
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
      />
    </Stack>
  );
}

export function StylesStyled() {
  return (
    <Stack>
      <JsonTree
        data={data}
        title="contact.json"
        styles={{
          root: { fontSize: 22 },
          key: { color: 'purple' },
        }}
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
      />
    </Stack>
  );
}

export function Container() {
  return (
    <Stack p={16} bg="dark.9">
      <JsonTree
        data={data}
        title="contact.json"
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
      />
    </Stack>
  );
}

export function CustomCollapseIcon() {
  return (
    <Stack>
      <JsonTree
        data={data}
        title="contact.json"
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
        expandControlIcon={<span style={{ color: 'green' }}>👉</span>}
      />
    </Stack>
  );
}

export function CustomCollapseExpandIcon() {
  return (
    <Stack>
      <JsonTree
        data={data}
        title="contact.json"
        withExpandAll
        defaultExpanded
        stickyHeader
        showIndentGuides
        expandControlIcon={<span style={{ color: 'green' }}>⊕</span>}
        collapseControlIcon={<span style={{ color: 'red' }}>⊖</span>}
      />
    </Stack>
  );
}

const dataWithFunctions = {
  name: 'Example',
  onClick: function handleClick() {
    // eslint-disable-next-line no-console
    console.log('clicked');
  },
  calculate: (a: number, b: number) => a + b,
  methods: {
    async fetchData() {
      return 'data';
    },
    process: function process(value: string) {
      return value.toUpperCase();
    },
  },
  data: [1, 2, 3],
};

export function DisplayFunctionsAsString() {
  return (
    <Stack>
      <Title order={3}>displayFunctions: &quot;as-string&quot; (default)</Title>
      <JsonTree
        data={dataWithFunctions}
        title="data.json"
        defaultExpanded
        displayFunctions="as-string"
      />
    </Stack>
  );
}

export function DisplayFunctionsHide() {
  return (
    <Stack>
      <Title order={3}>displayFunctions: &quot;hide&quot;</Title>
      <JsonTree
        data={dataWithFunctions}
        title="data.json"
        defaultExpanded
        displayFunctions="hide"
      />
    </Stack>
  );
}

export function DisplayFunctionsAsObject() {
  return (
    <Stack>
      <Title order={3}>displayFunctions: &quot;as-object&quot;</Title>
      <JsonTree
        data={dataWithFunctions}
        title="data.json"
        defaultExpanded
        displayFunctions="as-object"
      />
    </Stack>
  );
}

export function DisplayFunctionsComparison() {
  return (
    <Stack>
      <Title order={3}>as-string</Title>
      <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-string" />

      <Title order={3}>hide</Title>
      <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="hide" />

      <Title order={3}>as-object</Title>
      <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-object" />
    </Stack>
  );
}
