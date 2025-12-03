import { BorderAnimate, BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { Box } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataCode } from './data';

function Demo(props: BorderAnimateProps) {
  return (
    <BorderAnimate {...props}>
      <Box>Animate Border</Box>
    </BorderAnimate>
  );
}

const code = `
import { BorderAnimate } from "@gfazioli/mantine-border-animate";
import { data } from './data';

function Demo() {
  return <BorderAnimate{{props}} data={data} maxDepth={1} defaultExpanded/>;
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  controls: [
    { type: 'string', prop: 'title', initialValue: undefined as any, libraryValue: null },
    { type: 'size', prop: 'size', initialValue: 'xs', libraryValue: 'xs' },
    { type: 'boolean', prop: 'withExpandAll', initialValue: false, libraryValue: false },
    { type: 'boolean', prop: 'withCopyToClipboard', initialValue: false, libraryValue: false },
    { type: 'boolean', prop: 'showIndentGuides', initialValue: false, libraryValue: false },
    { type: 'boolean', prop: 'showItemsCount', initialValue: false, libraryValue: false },
    {
      type: 'select',
      prop: 'displayFunctions',
      initialValue: 'as-string',
      libraryValue: 'as-string',
      data: [
        { value: 'as-string', label: 'as-string' },
        { value: 'hide', label: 'hide' },
        { value: 'as-object', label: 'as-object' },
      ],
    },
  ],
};
