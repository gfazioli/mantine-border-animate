import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Badge, Button, Group, Paper, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const code = `import { useState } from 'react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Badge, Button, Group, Paper, Text } from '@mantine/core';

const colors = { idle: 'gray', running: 'blue', done: 'teal' } as const;

function Demo() {
  const [status, setStatus] = useState<keyof typeof colors>('idle');

  return (
    // The ring mounts when the job starts, runs two laps, then reports back
    <BorderAnimate
      show={status === 'running'}
      beamMode="comet"
      borderWidth="sm"
      duration={1.5}
      iterations={2}
      onComplete={() => setStatus('done')}
    >
      <Paper withBorder radius="md" p="md" w={280}>
        <Group justify="space-between">
          <Text fw={600}>Deploy</Text>
          <Badge color={colors[status]} variant="light">
            {status}
          </Badge>
        </Group>
        <Button
          mt="md"
          fullWidth
          variant="default"
          disabled={status === 'running'}
          onClick={() => setStatus('running')}
        >
          {status === 'idle' ? 'Start' : 'Run again'}
        </Button>
      </Paper>
    </BorderAnimate>
  );
}
`;

const colors = { idle: 'gray', running: 'blue', done: 'teal' } as const;

function Demo() {
  const [status, setStatus] = useState<keyof typeof colors>('idle');

  return (
    // The ring mounts when the job starts, runs two laps, then reports back
    <BorderAnimate
      show={status === 'running'}
      beamMode="comet"
      borderWidth="sm"
      duration={1.5}
      iterations={2}
      onComplete={() => setStatus('done')}
    >
      <Paper withBorder radius="md" p="md" w={280}>
        <Group justify="space-between">
          <Text fw={600}>Deploy</Text>
          <Badge color={colors[status]} variant="light">
            {status}
          </Badge>
        </Group>
        <Button
          mt="md"
          fullWidth
          variant="default"
          disabled={status === 'running'}
          onClick={() => setStatus('running')}
        >
          {status === 'idle' ? 'Start' : 'Run again'}
        </Button>
      </Paper>
    </BorderAnimate>
  );
}

export const withIterations: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
