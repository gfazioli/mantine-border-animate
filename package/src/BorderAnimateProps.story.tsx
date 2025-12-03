import React from 'react';
import { Box, Button, Flex, Group, Stack, Text } from '@mantine/core';
import { BorderAnimate, BorderAnimateProps } from './BorderAnimate';

export default {
  title: 'BorderAnimate Props',
  args: {
    variant: 'beam',
    duration: 5,
    borderWidth: 1,
    radius: 12,
    size: 200,
    blur: 0,
    colorFrom: '#ffaa40',
    colorTo: '#9c40ff',
    reverse: false,
    delay: 0,
    withMask: true,
    opacity: 1,
    zIndex: 1,
    anchor: 0,
    show: true,
    animate: true,
    angle: 0,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['beam', 'glow', 'gradient', 'pulse'],
    },
    duration: { control: { type: 'number', min: 0.5, max: 20, step: 0.5 } },
    borderWidth: { control: { type: 'number', min: 1, max: 10, step: 1 } },
    radius: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    size: { control: { type: 'number', min: 50, max: 500, step: 10 } },
    blur: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    colorFrom: { control: 'color' },
    colorTo: { control: 'color' },
    reverse: { control: 'boolean' },
    delay: { control: { type: 'number', min: 0, max: 10, step: 0.5 } },
    withMask: { control: 'boolean' },
    opacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    zIndex: { control: { type: 'number', min: -10, max: 100, step: 1 } },
    anchor: { control: { type: 'number', min: -50, max: 100, step: 1 } },
    show: { control: 'boolean' },
    animate: { control: 'boolean' },
    angle: { control: { type: 'number', min: 0, max: 360, step: 1 } },
  },
};

export function Usage(props: BorderAnimateProps) {
  return (
    <BorderAnimate {...props} w={300} h={200} p={1}>
      <Box
        w="100%"
        h="100%"
        style={{
          backgroundColor: 'var(--mantine-color-default)',
          borderRadius: Math.max(0, Number(props.radius ?? 12) - Number(props.borderWidth ?? 2)),
        }}
      />
    </BorderAnimate>
  );
}

export function WithButton(props: BorderAnimateProps) {
  return (
    <Flex direction="column" align="center" gap="md">
      <BorderAnimate {...props} display="inline-flex" p={0} radius={4} size={80}>
        <Button>Click me</Button>
      </BorderAnimate>
      <BorderAnimate {...props} display="inline-flex" p={0} radius={256} size={80}>
        <Button radius={256} variant="default">
          Click me
        </Button>
      </BorderAnimate>
    </Flex>
  );
}

export function Multiple(props: BorderAnimateProps) {
  return (
    <BorderAnimate w={400} h={250}>
      <BorderAnimate
        w={400}
        h={250}
        duration={55}
        reverse
        borderWidth={1}
        size={400}
        colorFrom="#ff6b6b"
        colorTo="#2b00ffff"
      >
        <BorderAnimate
          w={400}
          h={250}
          duration={23}
          withMask={false}
          size={300}
          opacity={0.2}
          blur={14}
          anchor={50}
          zIndex={-1}
        >
          <BorderAnimate w={400} h={250} variant="glow" blur={4}>
            <Box
              w="100%"
              h="100%"
              p="md"
              style={{
                backgroundColor: 'var(--mantine-color-default)',
                borderRadius: Math.max(
                  0,
                  Number(props.radius ?? 12) - Number(props.borderWidth ?? 2)
                ),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Animated Border Effect
            </Box>
          </BorderAnimate>
        </BorderAnimate>
      </BorderAnimate>
    </BorderAnimate>
  );
}

export function WithContent(props: BorderAnimateProps) {
  return (
    <BorderAnimate {...props} w={400} h={250} p={1}>
      <Box
        w="100%"
        h="100%"
        p="md"
        style={{
          backgroundColor: 'var(--mantine-color-default)',
          borderRadius: Math.max(0, Number(props.radius ?? 12) - Number(props.borderWidth ?? 2)),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Animated Border Effect
      </Box>
    </BorderAnimate>
  );
}

export function AllVariants() {
  const variants = ['beam', 'glow', 'gradient', 'pulse'] as const;

  return (
    <Group>
      {variants.map((variant) => (
        <Stack key={variant} align="center" gap="xs">
          <BorderAnimate
            variant={variant}
            w={200}
            h={150}
            p={10}
            colorFrom="#00ff88"
            colorTo="#00d4ff"
            duration={variant === 'beam' ? 5 : variant === 'gradient' ? 3 : 2}
            blur={variant === 'glow' ? 4 : 0}
          >
            <Box
              w="100%"
              h="100%"
              style={{
                backgroundColor: 'var(--mantine-color-default)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text c="white" size="sm" tt="capitalize">
                {variant}
              </Text>
            </Box>
          </BorderAnimate>
        </Stack>
      ))}
    </Group>
  );
}

export function BeamVariant(props: BorderAnimateProps) {
  return (
    <Group>
      <BorderAnimate
        {...props}
        p={1}
        variant="beam"
        w={200}
        h={150}
        colorFrom="#ff6b6b"
        colorTo="#feca57"
        duration={3}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        p={2}
        variant="beam"
        w={200}
        h={150}
        colorFrom="#00ff88"
        colorTo="#00d4ff"
        duration={4}
        reverse
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        p={6}
        variant="beam"
        w={200}
        h={150}
        colorFrom="#a55eea"
        colorTo="#ff7979"
        duration={5}
        blur={4}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
    </Group>
  );
}

export function GlowVariant(props: BorderAnimateProps) {
  return (
    <Group>
      <BorderAnimate
        {...props}
        variant="glow"
        w={200}
        h={150}
        colorFrom="#ff6b6b"
        colorTo="#feca57"
        blur={4}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        p={2}
        variant="glow"
        w={200}
        h={150}
        colorFrom="#00ff88"
        colorTo="#00d4ff"
        duration={1.5}
        blur={6}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        p={3}
        variant="glow"
        w={200}
        h={150}
        colorFrom="#a55eea"
        colorTo="#ff7979"
        duration={3}
        blur={8}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
    </Group>
  );
}

export function GradientVariant(props: BorderAnimateProps) {
  return (
    <Group>
      <BorderAnimate
        {...props}
        variant="gradient"
        p={1}
        w={200}
        h={150}
        colorFrom="#ff6b6b"
        colorTo="#feca57"
        duration={3}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        variant="gradient"
        p={2}
        w={200}
        h={150}
        colorFrom="#00ff88"
        colorTo="#00d4ff"
        duration={2}
        reverse
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        variant="gradient"
        p={3}
        w={200}
        h={150}
        colorFrom="#a55eea"
        colorTo="#ff7979"
        duration={4}
        blur={2}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
    </Group>
  );
}

export function PulseVariant(props: BorderAnimateProps) {
  return (
    <Group>
      <BorderAnimate
        {...props}
        variant="pulse"
        p={1}
        w={200}
        h={150}
        colorFrom="#ff6b6b"
        colorTo="#feca57"
        duration={2}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        variant="pulse"
        p={2}
        w={200}
        h={150}
        colorFrom="#00ff88"
        colorTo="#00d4ff"
        duration={1.5}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
      <BorderAnimate
        {...props}
        variant="pulse"
        p={3}
        w={200}
        h={150}
        colorFrom="#a55eea"
        colorTo="#ff7979"
        duration={3}
        blur={2}
      >
        <Box
          w="100%"
          h="100%"
          style={{ backgroundColor: 'var(--mantine-color-default)', borderRadius: 10 }}
        />
      </BorderAnimate>
    </Group>
  );
}
