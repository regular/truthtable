var styles = require('./styles.styl');
var insertCSS = require('insert-css');
insertCSS(styles);

function truthtable(el, data, options) {
    var doc = el.ownerDocument;
    var symbols = '01';

    function appendFields(tr, fields, options) {
        options = options || {};
        var contentFilter = options.contentFilter || function(x) {return x;};

        for (var i=0, l=fields.length; i<l; ++i) {
            var td = doc.createElement('div');
            td.classList.add('cell');
            td.innerHTML = contentFilter(fields[i]);
            var symbol = fields[i];
            if (symbols.indexOf(symbol)>0) {
                td.classList.add('on');
            } else {
                td.classList.add('off');
            }
            tr.appendChild(td);
        }
    }

    function appendRow(table, row, options) {
        var tr = doc.createElement('div');
        tr.classList.add('row');
        
        var inputs = doc.createElement('div');
        inputs.classList.add('inputs');
        appendFields(inputs, row.inputs, options);
        tr.appendChild(inputs);

        var outputs = doc.createElement('div');
        outputs.classList.add('outputs');
        appendFields(outputs, row.outputs, options);
        tr.appendChild(outputs);

        table.appendChild(tr);
    }

    var table = doc.createElement('div');
    table.classList.add('truthtable');
    appendRow(table, data.header, {contentFilter: function(s) {
        return s.replace(/([0-9]*)$/g, function(a,b,c) {
            return "<sub>" + b + "</sub>";
        });
    }});
    for (var i=0, l=data.rows.length; i<l; ++i) {
        appendRow(table, data.rows[i]);
    }
    el.appendChild(table);
}

var rows = [
    {inputs: [0,0,0,0], outputs: [1,0]},
    {inputs: [0,0,0,1], outputs: [0,0]},
    {inputs: [0,0,1,0], outputs: [1,1]}
];

var table = {
    header: {inputs: 'a\u03053 a2 a1 a0'.split(' '), outputs: 'y1 y\u03050'.split(' ')},
    rows: rows
};

truthtable(document.body, table);

