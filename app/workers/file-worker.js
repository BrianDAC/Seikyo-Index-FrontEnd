importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.11/jszip.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.11/xlsx.js');

self.addEventListener('message', function(event) {
    var file = event.data;

    var reader = new FileReaderSync();

    var workbook = XLSX.read(reader.readAsArrayBuffer(file), { type : 'binary' })
    var sheet = workbook.Sheets[workbook.SheetNames[0]];

    postMessage(XLSX.utils.sheet_to_row_object_array(sheet));
}, false);
