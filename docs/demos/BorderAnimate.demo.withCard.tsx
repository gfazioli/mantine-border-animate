import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <BorderAnimate variant="glow" blur="md" radius="md" duration={3}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={340}>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Premium Package</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Get access to all premium features with our special animated
          border effect that highlights this exclusive offer.
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Get Started
        </Button>
      </Card>
    </BorderAnimate>
  );
}
`;

function Demo() {
  return (
    <BorderAnimate variant="glow" blur="md" radius="md" duration={3}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={340}>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Premium Package</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Get access to all premium features with our special animated border effect that highlights
          this exclusive offer.
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Get Started
        </Button>
      </Card>
    </BorderAnimate>
  );
}

export const withCard: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
