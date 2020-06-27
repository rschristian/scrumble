// This exists to convert all references of "className" to "class".
// This project uses Preact, which can take advantage of "class", but
// many IDEs unfortunately do not provide functionality to use "class"
// in JSX, leading to a messy mixture of "className" and "class"

import replace from 'replace-in-file';

const options = {
    files: 'src/**/*.{jsx,tsx}',
    from: 'className',
    to: 'class',
};

try {
    replace.sync(options);
} catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error occurred:', error);
}
