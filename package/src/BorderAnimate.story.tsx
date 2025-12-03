import React from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import {
  Accordion,
  Alert,
  Checkbox,
  Chip,
  Flex,
  Input,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { BorderAnimate } from './BorderAnimate';

export default {
  title: 'BorderAnimate',
  args: {},
  argTypes: {},
};

const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];

export function Usage() {
  return (
    <Stack>
      <BorderAnimate w={300} p={32}>
        <Stack>
          <Title>This is a title</Title>
          <p>This is a paragraph inside the BorderAnimate component.</p>
        </Stack>
      </BorderAnimate>
    </Stack>
  );
}

export function Glow() {
  return (
    <BorderAnimate variant="glow" blur="md" w={500} h={400}>
      <Flex flex={1} direction="column" align="center" justify="center" h="100%">
        <Title>Animate Border</Title>
        <Text>This is an example of BorderAnimate component</Text>
      </Flex>
    </BorderAnimate>
  );
}

export function WithPaper() {
  return (
    <Flex>
      <BorderAnimate size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
          </Stack>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export function WithAccordion() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Flex>
      <BorderAnimate size="lg">
        <Accordion variant="contained" defaultValue="Apples">
          {items}
        </Accordion>
      </BorderAnimate>
    </Flex>
  );
}

export function WithChip() {
  return (
    <Flex>
      <BorderAnimate size="xs" radius="lg">
        <Chip defaultChecked>Awesome chip</Chip>
      </BorderAnimate>
    </Flex>
  );
}

export function WithCheckbox() {
  return (
    <Flex>
      <BorderAnimate size={32} radius="xs">
        <Checkbox.Indicator />
      </BorderAnimate>
    </Flex>
  );
}

export function WithInput() {
  return (
    <Flex>
      <BorderAnimate size="xs" radius="xs">
        <Input placeholder="Input component" />
      </BorderAnimate>
    </Flex>
  );
}

export function WithAlert() {
  const icon = <IconInfoCircle />;
  return (
    <Flex>
      <BorderAnimate size={200} radius="sm" duration={10}>
        <Alert variant="light" color="blue" title="Alert title" icon={icon}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore
          necessitatibus placeat saepe.
        </Alert>
      </BorderAnimate>
    </Flex>
  );
}
