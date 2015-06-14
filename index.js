var styles = require('./styles.styl');
var insertCSS = require('insert-css');
insertCSS(styles);

function truthtable(el, rows, options) {
    var doc = el.ownerDocument;
    var symbols = '01';

    function appendFields(tr, fields) {
        for (var i=0, l=fields.length; i<l; ++i) {
            var td = doc.createElement('div');
            td.classList.add('cell');
            td.innerHTML = fields[i];
            var symbol = fields[i];
            if (symbols.indexOf(symbol)>0) {
                td.classList.add('on');
            } else {
                td.classList.add('off');
            }
            tr.appendChild(td);
        }
    }

    function appendRow(table, row) {
        var tr = doc.createElement('div');
        tr.classList.add('row');
        
        var inputs = doc.createElement('div');
        inputs.classList.add('inputs');
        appendFields(inputs, row.inputs);
        tr.appendChild(inputs);

        var outputs = doc.createElement('div');
        outputs.classList.add('outputs');
        appendFields(outputs, row.outputs);
        tr.appendChild(outputs);

        table.appendChild(tr);
    }

    var table = doc.createElement('div');
    table.classList.add('truthtable');
    for (var i=0, l=rows.length; i<l; ++i) {
        appendRow(table, rows[i]);
    }
    el.appendChild(table);
}

var rows = [
    {inputs: [0,0,0,0], outputs: [1,0]},
    {inputs: [0,0,0,1], outputs: [0,0]},
    {inputs: [0,0,1,0], outputs: [1,1]}
];

truthtable(document.body, rows);

