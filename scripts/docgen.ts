import { generateDeclarations } from 'mantine-docgen-script';
import fs from 'node:fs';
import path from 'node:path';

const getComponentPath = (componentPath: string) =>
  path.join(process.cwd(), 'package/src', componentPath);

const outputPath = path.join(process.cwd(), 'docs');

/* ------------------------------------------------------------------ */
/*  Post-processing: re-inject `variant`                               */
/* ------------------------------------------------------------------ */

// `variant` lives in the factory payload, and mantine-docgen-script excludes it
// upstream via DEFAULT_EXCLUDE_PROPS — options can only ADD exclusions, not
// remove them. Inject it manually so the Props tab documents the component's
// single most important prop. (.then(): tsx runs this file as CJS, so no
// top-level await.)

function injectVariant() {
  const docgenPath = path.join(outputPath, 'docgen.json');
  const docgen = JSON.parse(fs.readFileSync(docgenPath, 'utf-8'));

  if (!docgen.BorderAnimate?.props) {
    throw new Error(
      'docgen.json is missing "BorderAnimate.props" — did generateDeclarations change its output shape?'
    );
  }

  docgen.BorderAnimate.props.variant = {
    defaultValue: "'beam'",
    description:
      'Animation variant: <code>beam</code> (a glow traveling along the perimeter, see ' +
      '<code>beamMode</code>), <code>glow</code> (a pulsating halo behind the content), ' +
      '<code>pulse</code> (a breathing expand-and-fade), <code>draw</code> (draws ' +
      '<code>progress</code>% of the border) or <code>dash</code> (a dashed border marching ' +
      'around the perimeter).',
    name: 'variant',
    required: false,
    type: {
      name: '"beam" | "glow" | "pulse" | "draw" | "dash"',
      raw: 'BorderAnimateVariant | undefined',
      value: [
        { value: 'undefined' },
        { value: '"beam"' },
        { value: '"glow"' },
        { value: '"pulse"' },
        { value: '"draw"' },
        { value: '"dash"' },
      ],
    },
  };

  // Keep the Props table alphabetically sorted (the injected key would
  // otherwise land last).
  docgen.BorderAnimate.props = Object.fromEntries(
    Object.entries(docgen.BorderAnimate.props).sort(([a], [b]) => a.localeCompare(b))
  );

  fs.writeFileSync(docgenPath, JSON.stringify(docgen, null, 2));
  // eslint-disable-next-line no-console
  console.log('docgen.json post-processed: `variant` injected');
}

generateDeclarations({
  componentsPaths: [getComponentPath('BorderAnimate.tsx')],
  tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
  outputPath,
})
  .then(injectVariant)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('docgen failed:', error);
    process.exit(1);
  });
