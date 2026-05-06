// req_prntto_file.js
{
let body = '';

    // Collect data chunks as they arrive
    req.on('data', (chunk) => {
        body += chunk;
    });

    // Once all data is received, write to file
    req.on('end', () => {
        fs.writeFile('request_body.json', body, (err) => {
            if (err) throw err;
            console.log('Body saved to request_body.json');
            res.end('Data received and saved.');
        });
    });
}