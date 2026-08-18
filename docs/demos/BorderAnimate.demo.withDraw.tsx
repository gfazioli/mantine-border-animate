import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Group, Paper, Slider, Stack, Switch, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const code = `import { useState } from 'react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Group, Paper, Slider, Stack, Switch, Text, Title } from '@mantine/core';

function Demo() {
  const [progress, setProgress] = useState(65);
  const [withTrack, setWithTrack] = useState(true);

  return (
    <Stack w={360}>
      <BorderAnimate
        variant="draw"
        progress={progress}
        withTrack={withTrack}
        trackColor="gray.6"
        borderWidth="sm"
        colorFrom="blue.5"
        colorTo="cyan.4"
      >
        <Paper radius="md" p="md" w="100%">
          <Title order={4}>Uploading assets</Title>
          <Text size="sm" c="dimmed">
            The border is the progress bar: {progress}% complete
          </Text>
        </Paper>
      </BorderAnimate>

      <Group justify="space-between">
        <Slider w={220} value={progress} onChange={setProgress} label={(v) => \`\${v}%\`} />
        <Switch
          label="Track"
          checked={withTrack}
          onChange={(event) => setWithTrack(event.currentTarget.checked)}
        />
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [progress, setProgress] = useState(65);
  const [withTrack, setWithTrack] = useState(true);

  return (
    <Stack w={360}>
      <BorderAnimate
        variant="draw"
        progress={progress}
        withTrack={withTrack}
        trackColor="gray.6"
        borderWidth="sm"
        colorFrom="blue.5"
        colorTo="cyan.4"
      >
        <Paper radius="md" p="md" w="100%">
          <Title order={4}>Uploading assets</Title>
          <Text size="sm" c="dimmed">
            The border is the progress bar: {progress}% complete
          </Text>
        </Paper>
      </BorderAnimate>

      <Group justify="space-between">
        <Slider w={220} value={progress} onChange={setProgress} label={(v) => `${v}%`} />
        <Switch
          label="Track"
          checked={withTrack}
          onChange={(event) => setWithTrack(event.currentTarget.checked)}
        />
      </Group>
    </Stack>
  );
}

export const withDraw: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
