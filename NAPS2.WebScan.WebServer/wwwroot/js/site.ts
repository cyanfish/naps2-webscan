// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import Scanner from '../lib/escl-sdk-ts/escl/scanner'

document.getElementById('scan-button').addEventListener('click', async e => {
    console.log('Starting scan attempt');

    const ip = '127.0.0.1';
    const port = 9880;
    const scanner = new Scanner({ip, port});

    try {
        const capabilities = await scanner.ScannerCapabilities();
        console.log('scanner ScannerCapabilities', capabilities)

        const jobUrl = await scanner.ScanJobs({
            Resolution: 300
        });
        console.log('scanner ScanJobs', jobUrl);

        const jobId = jobUrl.split('/').at(-1);

        const doc = await scanner.NextDocument(jobId);
        console.log('scanner NextDocument', doc);


        var blob = new Blob([doc.data], {type: "image/jpeg"});
        var imageUrl = window.URL.createObjectURL(blob);
        var img = document.querySelector("#preview") as HTMLImageElement;
        img.src = imageUrl;

    } catch (err) {
        console.log('scanner err', err.response)
    }
});