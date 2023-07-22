import fs from 'fs';

try {
    const doc = JSON.parse(fs.readFileSync('src/apiClients/codegen/openapi_raw.json', 'utf8'));

    for (const [pathName, path] of Object.entries(doc.paths)) {
        for (const [operationName, operation] of Object.entries(path)) {
            // Perform operations on each path within the schema.
        }
    }

    const output = JSON.stringify(doc);
    fs.writeFileSync('src/apiClients/codegen/openapi.json', output, 'utf8');

    console.log('schema preprocessing complete');
} catch (e) {
    console.log(e);
    throw new Error('Failed to parse or tweak openapi.yaml.');
}
