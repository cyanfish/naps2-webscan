// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import Scanner from 'escl-sdk-ts'

document.getElementById('scan-button').addEventListener('click', e => {
    console.log('Starting scan attempt');

    const ip = '192.168.0.134';
    const port = '8080';
    const scanner = new Scanner({ ip, port });

    scanner.ScannerCapabilities().then(res => {
        console.log('scanner ScannerCapabilities', res)
    }).catch(err => {
        console.log('scanner ScannerCapabilities err', err)
    })
});