import { JsonTree } from '@gfazioli/mantine-json-tree';
import { Code, Paper, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const dataWithFunctions = {
  name: 'UserProfile',
  age: 25,
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
  isActive: true,
};

const code = `
import { JsonTree } from '@gfazioli/mantine-json-tree';
import { Code, Paper, Stack } from '@mantine/core';

const dataWithFunctions = {
  name: 'UserProfile',
  age: 25,
  onClick: function handleClick() {
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
  isActive: true,
};

function Demo() {
  return (
    <Stack>
      <Paper withBorder p="sm">
        <Code>as-string</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-string" mb="md" />
      </Paper>
      <Paper withBorder p="sm">
        <Code>hide</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="hide" mb="md" />
      </Paper>
      <Paper withBorder p="sm">
        <Code>as-object</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-object" />
      </Paper>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Paper withBorder p="sm">
        <Code>as-string</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-string" mb="md" />
      </Paper>
      <Paper withBorder p="sm">
        <Code>hide</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="hide" mb="md" />
      </Paper>
      <Paper withBorder p="sm">
        <Code>as-object</Code>
        <JsonTree data={dataWithFunctions} defaultExpanded displayFunctions="as-object" />
      </Paper>
    </Stack>
  );
}

export const functions: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
